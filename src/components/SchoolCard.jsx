import { ArrowRight, CalendarDays, MapPin } from 'lucide-react';
import { Link } from 'react-router-dom';
import { hasImageSource } from '../utils/mediaImage';
import MediaBackdrop from './MediaBackdrop';

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
  const bannerImage = school.bannerImage || school.media?.banner;
  const hasBanner = hasImageSource(bannerImage);

  const handleClick = (event) => {
    if (typeof onClick === 'function') onClick(school.id, event);
  };

  return (
    <article
      className="school-card group h-full overflow-hidden rounded-2xl border border-[#ddd2ba] bg-[#fffdf8] shadow-sm transition duration-300 hover:-translate-y-1 hover:border-[#b99750] hover:shadow-xl hover:shadow-emerald-950/10"
      aria-labelledby={titleId}
    >
      <Link
        to={`/sites/${school.id}`}
        className="flex h-full min-h-[29rem] flex-col outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-emerald-700"
        onClick={handleClick}
        aria-describedby={`${titleId}-summary`}
      >
        <div className={`relative aspect-[16/9] overflow-hidden ${hasBanner ? 'text-white' : 'text-[#173c32]'}`}>
          <MediaBackdrop
            media={bannerImage}
            className="absolute inset-0"
            overlayClassName="bg-[#061b17]/64"
            showCredit={false}
          />
          <div className="relative z-10 flex h-full items-start justify-between gap-3 p-4">
            <span className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl text-lg font-black shadow-sm ${hasBanner ? 'bg-amber-300 text-emerald-950' : 'border border-[#d8c9a8] bg-[#fffaf0] text-emerald-900'}`} aria-hidden="true">
              {school.logoPlaceholder || name.slice(0, 1)}
            </span>
            {stage && (
              <span className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-bold backdrop-blur-sm ${hasBanner ? 'border-white/35 bg-[#071d18]/65 text-white' : 'border-[#cdbb94] bg-[#fffaf0]/90 text-emerald-900'}`}>
                <MapPin aria-hidden="true" size={13} />
                {stage}
              </span>
            )}
          </div>
        </div>

        <div className="flex flex-1 flex-col p-6">
          <h3 id={titleId} className="text-xl font-bold leading-snug text-[#173c32] transition-colors group-hover:text-emerald-800">
            {name}
          </h3>

          {(date || location) && (
            <p className="mt-3 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-[#617068]">
              {date && (
                <span className="inline-flex items-center gap-1.5">
                  <CalendarDays aria-hidden="true" size={16} />
                  <time dateTime={dateTime}>{date}</time>
                </span>
              )}
              {location && <span>{location}</span>}
            </p>
          )}

          <p id={`${titleId}-summary`} className="mt-4 line-clamp-3 text-sm leading-7 text-[#5c6b64]">
            {summary}
          </p>

          {tags.length > 0 && (
            <ul className="mt-4 flex flex-wrap gap-2" aria-label="教育理念标签">
              {tags.map((tag) => (
                <li key={tag} className="rounded-full bg-[#f5e8c7] px-2.5 py-1 text-xs font-semibold text-[#795612]">
                  {tag}
                </li>
              ))}
            </ul>
          )}

          <div className="mt-auto flex items-center justify-between gap-4 border-t border-[#eee5d3] pt-5 text-sm">
            <span className="text-[#69766f]">
              {interviews.length > 0 ? `${interviews.length} 个访谈主题` : '内容持续更新'}
            </span>
            <span className="inline-flex items-center gap-1 font-bold text-emerald-800">
              查看详情
              <ArrowRight aria-hidden="true" size={16} className="transition-transform group-hover:translate-x-1" />
            </span>
          </div>
        </div>
      </Link>
    </article>
  );
}
