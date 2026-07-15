import SchoolCard from './SchoolCard';

export default function SchoolList({ schools: schoolItems = [], onSchoolClick }) {
  const items = Array.isArray(schoolItems) ? schoolItems : [];

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
        <h2 id="school-list-title" className="section-heading">六个实践点的行知回响</h2>
        <p className="section-subtitle mx-auto max-w-2xl">
          从学前教育到九年一贯制学校，我们循着时间线走访校园，记录教育理念如何转化为课程、制度与日常行动。
        </p>
      </header>

      {items.length > 0 ? (
        <ol className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3" aria-label="教育实践站点">
          {items.map((school) => (
            <li key={school.id} className="h-full">
              <SchoolCard school={school} onClick={onSchoolClick} />
            </li>
          ))}
        </ol>
      ) : (
        <div className="media-empty-state">
          <p className="font-semibold text-slate-700">实践站点正在整理中</p>
          <p className="mt-2 text-sm text-slate-600">首批学校资料发布后会在这里按走访顺序呈现。</p>
        </div>
      )}
    </section>
  );
}
