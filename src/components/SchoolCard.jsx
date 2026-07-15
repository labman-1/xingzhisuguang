import { ArrowRight, CalendarDays, MapPin } from 'lucide-react';
import { Link } from 'react-router-dom';

function getTagLabel(tag) {
  if (typeof tag === 'string') return tag;
  return tag?.label || tag?.title || tag?.name || '';
}

export default function SchoolCard({ school, onClick }) {
  const visit = school.visit || {};
  const name = school.name || school.title || '未命名学校';
  const summary = school.summary || school.intro || school.description || '调研资料正在整理中。';
  const stage = visit.stage || school.stage;
  const dateValue = visit.date || school.date;
  const date = visit.displayDate || school.displayDate || dateValue;
  const dateTime = visit.isoDate || (/^\d{4}-\d{2}-\d{2}/.test(dateValue || '') ? dateValue : undefined);
  const location = visit.location || school.location;
  const interviews = Array.isArray(school.interviews) ? school.interviews : [];
  const tags = (school.philosophyTags || school.tags || [])
    .map(getTagLabel)
    .filter(Boolean)
    .slice(0, 2);
  const safeId = String(school.id || name).replace(/[^a-zA-Z0-9_-]/g, '-');
  const titleId = `school-card-${safeId}-title`;

  const handleClick = (event) => {
    if (typeof onClick === 'function') onClick(school.id, event);
  };

  return (
    <article
      className="school-card group h-full overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:border-emerald-300 hover:shadow-xl hover:shadow-emerald-900/10"
      aria-labelledby={titleId}
    >
      <Link
        to={`/sites/${school.id}`}
        className="flex h-full min-h-72 flex-col p-6 outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-emerald-600"
        onClick={handleClick}
        aria-describedby={`${titleId}-summary`}
      >
        <div className="mb-5 flex items-start justify-between gap-4">
          <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-emerald-100 text-lg font-black text-emerald-800 transition-colors group-hover:bg-emerald-700 group-hover:text-white" aria-hidden="true">
            {school.logoPlaceholder || name.slice(0, 1)}
          </span>
          {stage && (
            <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 text-xs font-bold text-emerald-800">
              <MapPin aria-hidden="true" size={13} />
              {stage}
            </span>
          )}
        </div>

        <h3 id={titleId} className="text-xl font-bold leading-snug text-slate-900 transition-colors group-hover:text-emerald-800">
          {name}
        </h3>

        {(date || location) && (
          <p className="mt-3 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-slate-600">
            {date && (
              <span className="inline-flex items-center gap-1.5">
                <CalendarDays aria-hidden="true" size={16} />
                <time dateTime={dateTime}>{date}</time>
              </span>
            )}
            {location && <span>{location}</span>}
          </p>
        )}

        <p id={`${titleId}-summary`} className="mt-4 line-clamp-3 text-sm leading-7 text-slate-600">
          {summary}
        </p>

        {tags.length > 0 && (
          <ul className="mt-4 flex flex-wrap gap-2" aria-label="教育理念标签">
            {tags.map((tag) => (
              <li key={tag} className="rounded-full bg-amber-50 px-2.5 py-1 text-xs font-semibold text-amber-800">
                {tag}
              </li>
            ))}
          </ul>
        )}

        <div className="mt-auto flex items-center justify-between gap-4 border-t border-slate-100 pt-5 text-sm">
          <span className="text-slate-600">
            {interviews.length > 0 ? `${interviews.length} 个访谈主题` : '内容持续更新'}
          </span>
          <span className="inline-flex items-center gap-1 font-bold text-emerald-700">
            查看详情
            <ArrowRight aria-hidden="true" size={16} className="transition-transform group-hover:translate-x-1" />
          </span>
        </div>
      </Link>
    </article>
  );
}
