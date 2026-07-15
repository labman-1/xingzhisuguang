import { useState } from 'react';

export default function Navbar({ currentView, onNavigateToHome, onNavigateToAbout }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const isHome = currentView === 'home' || currentView === 'detail';
  const isAbout = currentView === 'about';

  const handleNavHome = () => {
    onNavigateToHome();
    setIsMenuOpen(false);
  };

  const handleNavAbout = () => {
    onNavigateToAbout();
    setIsMenuOpen(false);
  };

  const handleNavFootprint = () => {
    onNavigateToHome();
    // Scroll to school list after a short delay to allow view to render
    setTimeout(() => {
      const el = document.getElementById('school-list');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }, 100);
    setIsMenuOpen(false);
  };

  return (
    <nav className="sticky top-0 z-50 bg-emerald-800 text-white shadow-md">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <button
            onClick={handleNavHome}
            className="flex items-center gap-2 text-xl font-bold tracking-wide hover:text-amber-300 transition-colors"
          >
            <span className="w-8 h-8 bg-amber-500 text-emerald-900 rounded-lg flex items-center justify-center text-sm font-extrabold">
              溯
            </span>
            行知溯光
          </button>

          {/* Desktop Nav Links */}
          <div className="hidden md:flex items-center gap-1">
            <button
              onClick={handleNavHome}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                isHome
                  ? 'bg-emerald-700 text-amber-300'
                  : 'text-emerald-100 hover:bg-emerald-700 hover:text-white'
              }`}
            >
              首页人物志
            </button>
            <button
              onClick={handleNavFootprint}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                isHome
                  ? 'text-emerald-100 hover:bg-emerald-700 hover:text-white'
                  : 'text-emerald-100 hover:bg-emerald-700 hover:text-white'
              }`}
            >
              实践足迹
            </button>
            <button
              onClick={handleNavAbout}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                isAbout
                  ? 'bg-emerald-700 text-amber-300'
                  : 'text-emerald-100 hover:bg-emerald-700 hover:text-white'
              }`}
            >
              关于我们
            </button>
          </div>

          {/* Mobile Hamburger */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 rounded-lg hover:bg-emerald-700 transition-colors"
            aria-label="Toggle menu"
          >
            {isMenuOpen ? (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden border-t border-emerald-700 pb-4 pt-2 space-y-1">
            <button
              onClick={handleNavHome}
              className={`block w-full text-left px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                isHome ? 'bg-emerald-700 text-amber-300' : 'text-emerald-100 hover:bg-emerald-700'
              }`}
            >
              首页人物志
            </button>
            <button
              onClick={handleNavFootprint}
              className="block w-full text-left px-4 py-3 rounded-lg text-sm font-medium text-emerald-100 hover:bg-emerald-700 transition-colors"
            >
              实践足迹
            </button>
            <button
              onClick={handleNavAbout}
              className={`block w-full text-left px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                isAbout ? 'bg-emerald-700 text-amber-300' : 'text-emerald-100 hover:bg-emerald-700'
              }`}
            >
              关于我们
            </button>
          </div>
        )}
      </div>
    </nav>
  );
}
