import { useState } from 'react';
import { getVisibleSitesByRegion, REGION } from '../content';
import RegionTabs from './RegionTabs';
import SchoolCard from './SchoolCard';

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

      <RegionTabs
        activeRegion={activeRegion}
        onChange={setActiveRegion}
        ariaLabel="实践足迹区域"
        className="mb-10"
      />

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
