import { useEffect, useRef, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

const navItems = [
  { id: 'home', label: '首页人物志', to: '/' },
  { id: 'sites', label: '实践足迹', to: '/#school-list' },
  { id: 'heritage', label: '行知文脉', to: '/heritage' },
  { id: 'resources', label: '成果资源', to: '/resources' },
  { id: 'about', label: '关于我们', to: '/about' },
];

function prefersReducedMotion() {
  return window.matchMedia?.('(prefers-reduced-motion: reduce)').matches ?? false;
}

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuButtonRef = useRef(null);
  const location = useLocation();

  useEffect(() => {
    const closeMenu = () => setIsMenuOpen(false);
    window.addEventListener('hashchange', closeMenu);
    return () => window.removeEventListener('hashchange', closeMenu);
  }, []);

  useEffect(() => {
    if (!isMenuOpen) return undefined;

    const handleEscape = (event) => {
      if (event.key === 'Escape') {
        setIsMenuOpen(false);
        menuButtonRef.current?.focus();
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isMenuOpen]);

  const isCurrentItem = (item) => {
    if (item.id === 'home') {
      return location.pathname === '/' && location.hash !== '#school-list';
    }

    if (item.id === 'sites') {
      return location.pathname === '/' && location.hash === '#school-list';
    }

    return location.pathname === item.to;
  };

  const handleSkipNavigation = (event) => {
    event.preventDefault();
    const main = document.getElementById('main-content') || document.querySelector('main');
    if (!main) return;

    if (!main.hasAttribute('tabindex')) main.setAttribute('tabindex', '-1');
    main.focus({ preventScroll: true });
    main.scrollIntoView({
      block: 'start',
      behavior: prefersReducedMotion() ? 'auto' : 'smooth',
    });
  };

  const handleSchoolListNavigation = () => {
    setIsMenuOpen(false);
  };

  const linkClasses = (isCurrent, mobile = false) => [
    'nav-link',
    mobile ? 'nav-link--mobile' : '',
    isCurrent ? 'nav-link--current' : '',
  ].filter(Boolean).join(' ');

  const renderNavigationLink = (item, mobile = false) => {
    const isCurrent = isCurrentItem(item);
    const commonProps = {
      className: linkClasses(isCurrent, mobile),
      'aria-current': isCurrent ? 'page' : undefined,
      onClick: item.id === 'sites' ? handleSchoolListNavigation : () => setIsMenuOpen(false),
    };

    if (item.id === 'home' || item.id === 'sites') {
      return (
        <Link to={item.to} {...commonProps}>
          {item.label}
        </Link>
      );
    }

    return (
      <NavLink to={item.to} {...commonProps}>
        {item.label}
      </NavLink>
    );
  };

  return (
    <>
      <a className="skip-link" href="#main-content" onClick={handleSkipNavigation}>
        跳至主要内容
      </a>

      <nav className="sticky top-0 z-50 border-b border-emerald-950/20 bg-emerald-900 text-white shadow-lg shadow-emerald-950/10" aria-label="主导航">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="flex min-h-16 items-center justify-between gap-4">
            <Link
              to="/"
              className="inline-flex min-h-11 items-center gap-3 rounded-lg font-bold tracking-wide text-white outline-none transition-colors hover:text-amber-200 focus-visible:ring-2 focus-visible:ring-amber-300 focus-visible:ring-offset-2 focus-visible:ring-offset-emerald-900"
              onClick={() => setIsMenuOpen(false)}
              aria-label="行知溯光首页"
            >
              <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-amber-400 text-sm font-black text-emerald-950 shadow-sm" aria-hidden="true">
                溯
              </span>
              <span className="text-lg sm:text-xl">行知溯光</span>
            </Link>

            <ul className="hidden items-center gap-1 lg:flex" aria-label="主要栏目">
              {navItems.map((item) => (
                <li key={item.id}>{renderNavigationLink(item)}</li>
              ))}
            </ul>

            <button
              ref={menuButtonRef}
              type="button"
              className="inline-flex min-h-11 min-w-11 items-center justify-center rounded-lg text-emerald-50 transition-colors hover:bg-emerald-800 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-300 lg:hidden"
              onClick={() => setIsMenuOpen((open) => !open)}
              aria-expanded={isMenuOpen}
              aria-controls="mobile-navigation"
              aria-label={isMenuOpen ? '关闭主菜单' : '打开主菜单'}
            >
              {isMenuOpen ? <X aria-hidden="true" size={24} /> : <Menu aria-hidden="true" size={24} />}
            </button>
          </div>

          <div
            id="mobile-navigation"
            className={`border-t border-emerald-700/70 py-3 lg:hidden ${isMenuOpen ? 'block' : 'hidden'}`}
          >
            <ul className="space-y-1" aria-label="移动端主要栏目">
              {navItems.map((item) => (
                <li key={item.id}>{renderNavigationLink(item, true)}</li>
              ))}
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}
