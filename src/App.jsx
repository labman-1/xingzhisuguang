import { useState, useCallback } from 'react';
import { schools, getSchoolById } from './data/schools';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import SchoolList from './components/SchoolList';
import SchoolDetail from './components/SchoolDetail';
import AboutPage from './components/AboutPage';
import Footer from './components/Footer';

export default function App() {
  const [currentView, setCurrentView] = useState('home');
  const [activeSchoolId, setActiveSchoolId] = useState(null);

  const activeSchool = activeSchoolId ? getSchoolById(activeSchoolId) : null;

  const navigateToHome = useCallback(() => {
    setCurrentView('home');
    setActiveSchoolId(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const navigateToDetail = useCallback((schoolId) => {
    setActiveSchoolId(schoolId);
    setCurrentView('detail');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const navigateToAbout = useCallback(() => {
    setCurrentView('about');
    setActiveSchoolId(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar
        currentView={currentView}
        onNavigateToHome={navigateToHome}
        onNavigateToAbout={navigateToAbout}
      />

      <main className="flex-grow">
        {currentView === 'home' && (
          <>
            <Hero />
            <SchoolList onSchoolClick={navigateToDetail} />
          </>
        )}

        {currentView === 'detail' && activeSchool && (
          <SchoolDetail school={activeSchool} onBack={navigateToHome} />
        )}

        {currentView === 'detail' && !activeSchool && (
          <div className="max-w-4xl mx-auto px-4 py-16 text-center">
            <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-12">
              <svg className="w-16 h-16 text-slate-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                  d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <h2 className="text-lg font-semibold text-slate-700 mb-2">未找到学校信息</h2>
              <p className="text-sm text-slate-500 mb-6">可能是不存在的学校ID，或者链接已失效。</p>
              <button
                onClick={navigateToHome}
                className="inline-flex items-center gap-2 text-sm font-medium text-white bg-emerald-700 hover:bg-emerald-800 px-6 py-3 rounded-xl transition-colors"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
                返回首页
              </button>
            </div>
          </div>
        )}

        {currentView === 'about' && <AboutPage />}
      </main>

      <Footer />
    </div>
  );
}
