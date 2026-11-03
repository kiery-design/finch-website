"""
Optimize photos for the FINCH site.

Usage:  python3 scripts/optimize_photos.py path/to/photo.jpg homeHero-name
        -> writes public/images/<name>-800.webp, <name>-1600.webp, <name>-1600.jpg

Requires Pillow (pip install Pillow). Free, no paid tools.
Then set `src: '/images/<name>'` for the matching slot in src/content/photos.ts.
"""
import sys
from pathlib import Path
from PIL import Image, ImageOps

def main(src: str, name: str) -> None:
    out = Path(__file__).resolve().parent.parent / "public" / "images"
    out.mkdir(parents=True, exist_ok=True)
    im = ImageOps.exif_transpose(Image.open(src)).convert("RGB")
    for w in (800, 1600):
        r = im if im.width <= w else im.resize((w, round(im.height * w / im.width)), Image.LANCZOS)
        r.save(out / f"{name}-{w}.webp", "WEBP", quality=80, method=6)
        if w == 1600:
            r.save(out / f"{name}-{w}.jpg", "JPEG", quality=82, optimize=True, progressive=True)
    for f in sorted(out.glob(f"{name}-*")):
        print(f"{f.name}: {f.stat().st_size // 1024} KB")

if __name__ == "__main__":
    if len(sys.argv) != 3:
        sys.exit(__doc__)
    main(sys.argv[1], sys.argv[2])
