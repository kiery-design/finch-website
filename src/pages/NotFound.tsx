import { ButtonLink } from '../components/Button';
import Seo from '../components/Seo';

export default function NotFound() {
  return (
    <div className="container-page py-24 text-center sm:py-32">
      <Seo title="Page not found" description="The page you're looking for doesn't exist." noindex />
      <p className="eyebrow">404</p>
      <h1 className="mt-3 text-4xl font-semibold sm:text-5xl">This page flew the coop.</h1>
      <p className="mx-auto mt-4 max-w-md text-lg text-ink-700">
        Either it moved or it never existed. Either way, here are some better places to land.
      </p>
      <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
        <ButtonLink to="/" variant="primary">Back to home</ButtonLink>
        <ButtonLink to="/free-tools" variant="secondary">Take the 3-minute assessment</ButtonLink>
      </div>
    </div>
  );
}
