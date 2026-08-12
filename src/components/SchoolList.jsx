import { useState } from 'react';
import { getVisibleSitesByRegion, REGION } from '../content';
import SchoolCard from './SchoolCard';

const REGION_TABS = [
  { value: REGION.NANJING, label: '金陵筑梦 · 晓庄星火' },
  { value: REGION.NATIONAL, label: '万里溯光 · 乡土弘毅' },
];

export default function SchoolList({ onSchoolClick }) {
  const [activeRegion, setActiveRegion] = useState(REGION.NANJING);
  const sites = getVisibleSitesByRegion(activeRegion, { includeDrafts: true });

  return (
    <section
      id="school-list"
      className="mx-auto max-w-7xl scroll-mt-24 px-4 py-16 outline-none sm:px-6 md:py-24"
      aria-labelledby="school-list-title"
      tabIndex={-1}
    >
      <header className="mx-auto mb-12 max-w-3xl text-center">
        <div className="mb-4 flex items-center justify-center gap-3" aria-hidden="true">
          <span className="h-px w-8 bg-emerald-300" />
          <span className="text-sm font-bold tracking-[0.18em] text-emerald-700">实践足迹</span>
          <span className="h-px w-8 bg-emerald-300" />
        </div>
        <h2 id="school-list-title" className="section-heading">双程寻访的行知回响</h2>
        <p className="section-subtitle mx-auto max-w-2xl">
          从晓庄故地的星火到全国乡土的弘毅，我们循着行知先生的足迹，记录教育理念如何转化为课程、制度与日常行动。
        </p>
      </header>

      {/* 区域切换 Tabs */}
      <div
        role="tablist"
        aria-label="实践足迹区域"
        className="mx-auto mb-10 flex w-full max-w-xl rounded-2xl border border-emerald-100 bg-white/70 p-1.5 shadow-sm backdrop-blur"
      >
        {REGION_TABS.map((tab) => {
          const isActive = activeRegion === tab.value;
          return (
            <button
              key={tab.value}
              role="tab"
              type="button"
              aria-selected={isActive}
              onClick={() => setActiveRegion(tab.value)}
              className={`relative flex-1 rounded-xl px-4 py-3 text-sm font-bold transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 ${
                isActive
                  ? 'bg-emerald-700 text-white shadow-md shadow-emerald-900/10'
                  : 'text-emerald-800 hover:bg-emerald-50'
              }`}
            >
              {tab.label}
            </button>
          );
        })}
      </div>

      <div className="transition-opacity duration-300">
        {sites.length > 0 ? (
          <ol className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3" aria-label="教育实践站点">
            {sites.map((school) => (
              <li key={school.id} className="h-full">
                <SchoolCard school={school} onClick={onSchoolClick} />
              </li>
            ))}
          </ol>
        ) : (
          <div className="media-empty-state">
            <p className="font-semibold text-slate-700">暂无实践站点。</p>
          </div>
        )}
      </div>
    </section>
  );
}
