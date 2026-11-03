import { lazy, Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';

// Home loads immediately; other pages load on demand to keep the first visit fast.
const Bookkeeping = lazy(() => import('./pages/Bookkeeping'));
const Shop = lazy(() => import('./pages/Shop'));
const FreeTools = lazy(() => import('./pages/FreeTools'));
const About = lazy(() => import('./pages/About'));
const Contact = lazy(() => import('./pages/Contact'));
const NotFound = lazy(() => import('./pages/NotFound'));

function PageFallback() {
  return (
    <div className="container-page py-24" role="status" aria-live="polite">
      <span className="sr-only">Loading page…</span>
      <div className="h-2 w-24 animate-pulse rounded-full bg-cream-200" />
    </div>
  );
}

export default function App() {
  return (
    <Layout>
      <Suspense fallback={<PageFallback />}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/bookkeeping" element={<Bookkeeping />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/free-tools" element={<FreeTools />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
    </Layout>
  );
}
