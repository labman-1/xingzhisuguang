import { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';

export default function useRoutePresentation({ title, description }) {
  const location = useLocation();
  const previousPathname = useRef(null);

  useEffect(() => {
    document.title = title;

    let descriptionMeta = document.querySelector('meta[name="description"]');
    if (!descriptionMeta) {
      descriptionMeta = document.createElement('meta');
      descriptionMeta.setAttribute('name', 'description');
      document.head.appendChild(descriptionMeta);
    }
    descriptionMeta.setAttribute('content', description);
  }, [description, title]);

  useEffect(() => {
    const pathnameChanged = previousPathname.current !== location.pathname;
    previousPathname.current = location.pathname;

    const frame = window.requestAnimationFrame(() => {
      let anchor = null;
      if (location.hash) {
        try {
          anchor = document.getElementById(decodeURIComponent(location.hash.slice(1)));
        } catch {
          anchor = document.getElementById(location.hash.slice(1));
        }
      }

      if (pathnameChanged || anchor) {
        const focusTarget = anchor ??
          document.querySelector('[data-page-heading], h1') ??
          document.getElementById('main-content');
        if (focusTarget && !focusTarget.hasAttribute('tabindex')) {
          focusTarget.setAttribute('tabindex', '-1');
        }
        focusTarget?.focus({ preventScroll: true });
      }

      if (anchor) {
        anchor.scrollIntoView({ block: 'start' });
      } else if (pathnameChanged) {
        window.scrollTo({ top: 0, left: 0 });
      }
    });

    return () => window.cancelAnimationFrame(frame);
  }, [location.hash, location.pathname]);
}
