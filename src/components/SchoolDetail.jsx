import { ArrowLeft, CalendarDays, MapPin } from 'lucide-react';
import { Link } from 'react-router-dom';
import { hasImageSource } from '../utils/mediaImage';
import MediaBackdrop from './MediaBackdrop';
import PhotoWall from './PhotoWall';
import VideoPlayer from './VideoPlayer';

function asArray(value) {
  if (value == null) return [];
  return Array.isArray(value) ? value : [value];
}

function getLabel(value) {
  if (typeof value === 'string') return value;
  return value?.label || value?.title || value?.name || '';
}

export default function SchoolDetail({ school, onBack }) {
  if (!school) return null;

  const visit = school.visit || {};
  const name = school.name || school.title || '学校实践';
  const summary = school.summary || school.intro || school.description;
  const stage = visit.stage || school.stage;
  const dateValue = visit.date || school.date;
  const date = visit.displayDate || school.displayDate || dateValue;
  const dateTime = visit.isoDate || (/^\d{4}-\d{2}-\d{2}/.test(dateValue || '') ? dateValue : undefined);
  const location = visit.location || school.location;
  const philosophyTags = asArray(school.philosophyTags || school.philosophies || school.tags)
    .map(getLabel)
    .filter(Boolean);
  const focus = asArray(visit.focus || visit.focuses).map(getLabel).filter(Boolean);
  const contextualTags = [...new Set([...philosophyTags, ...focus])];
  const gallery = school.gallery || school.photos || school.media?.gallery || [];
  const videos = school.videos || school.video || school.media?.videos || [];
  const bannerImage = school.bannerImage || school.media?.banner;
  const hasBanner = hasImageSource(bannerImage);

  const handleBack = (event) => {
    if (typeof onBack === 'function') onBack(event);
  };

  return (
    <article className="mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 md:py-12" aria-labelledby="school-detail-title">
      <nav aria-label="面包屑" className="mb-6">
        <ol className="flex flex-wrap items-center gap-2 text-sm text-slate-600">
          <li><Link to="/" className="rounded font-medium text-emerald-800 hover:text-emerald-600">首页</Link></li>
          <li aria-hidden="true">/</li>
          <li><Link to="/#school-list" className="rounded font-medium text-emerald-800 hover:text-emerald-600">实践足迹</Link></li>
          <li aria-hidden="true">/</li>
          <li aria-current="page" className="text-slate-700">{name}</li>
        </ol>
      </nav>

      <Link
        to="/#school-list"
        onClick={handleBack}
        className="mb-7 inline-flex min-h-11 items-center gap-2 rounded-xl bg-emerald-50 px-4 py-2 text-sm font-bold text-emerald-800 transition-colors hover:bg-emerald-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-600"
      >
        <ArrowLeft aria-hidden="true" size={18} />
        返回实践足迹
      </Link>

      <header className={`relative min-h-80 overflow-hidden rounded-3xl px-5 py-8 shadow-xl shadow-emerald-950/10 sm:px-8 md:px-12 md:py-12 ${hasBanner ? 'text-white' : 'text-[#173c32]'}`}>
        <MediaBackdrop
          media={bannerImage}
          className="absolute inset-0"
          overlayClassName="bg-[#061b17]/76"
          loading="eager"
          showCredit={false}
        />
        <div className="relative z-10">
          <div className="mb-6 flex flex-wrap gap-2">
            {stage && (
              <span className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-sm font-semibold ${hasBanner ? 'border-white/30 bg-[#071d18]/65 text-white' : 'border-[#cdbb94] bg-[#fffaf0]/90 text-emerald-900'}`}>
                <MapPin aria-hidden="true" size={15} />
                {stage}
              </span>
            )}
            {date && (
              <span className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-sm ${hasBanner ? 'border-white/25 bg-[#071d18]/55 text-white' : 'border-[#cdbb94] bg-[#fffaf0]/90 text-emerald-900'}`}>
                <CalendarDays aria-hidden="true" size={15} />
                <time dateTime={dateTime}>{date}</time>
              </span>
            )}
            {location && (
              <span className={`inline-flex items-center rounded-full border px-3 py-1.5 text-sm ${hasBanner ? 'border-white/25 bg-[#071d18]/55 text-white' : 'border-[#cdbb94] bg-[#fffaf0]/90 text-emerald-900'}`}>
                {location}
              </span>
            )}
          </div>

          <div className={`school-detail-hero-copy w-fit max-w-4xl rounded-2xl border px-4 py-4 backdrop-blur-sm sm:px-5 sm:py-5 ${hasBanner ? 'border-white/15 bg-[#071d18]/55 shadow-md shadow-black/10' : 'border-[#d8c9a8] bg-[#fffaf0]/80 shadow-sm'}`}>
            <p className={`mb-2 text-sm font-bold tracking-[0.16em] ${hasBanner ? 'text-amber-200' : 'text-[#8a651d]'}`}>行知教育当代实践样本</p>
            <h1
              id="school-detail-title"
              data-page-heading
              tabIndex={-1}
              className="text-balance text-3xl font-black leading-tight focus:outline-none sm:text-4xl md:text-5xl"
            >
              {name}
            </h1>

            {summary && <p className={`mt-5 max-w-3xl text-base leading-8 sm:text-lg ${hasBanner ? 'text-white' : 'text-[#49645b]'}`}>{summary}</p>}

            {contextualTags.length > 0 && (
              <div className="mt-5 flex flex-wrap gap-2" aria-label="教育理念与调研重点">
                {contextualTags.map((tag) => (
                  <span key={tag} className={`rounded-full border px-3 py-1.5 text-sm font-semibold ${hasBanner ? 'border-amber-200/40 bg-[#071d18]/45 text-amber-100' : 'border-[#c8aa69] bg-[#f5e8c7] text-[#795612]'}`}>
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>
      </header>

      <div className="mx-auto mt-14 max-w-5xl space-y-16 md:mt-20">
        {gallery.length > 0 && (
          <PhotoWall
            photos={gallery}
            schoolName={name}
            description="左右滑动浏览实践影像，点击照片可查看大图。"
            autoPlay
            showCredit={false}
          />
        )}
        {videos.length > 0 && <VideoPlayer videos={videos} />}
      </div>

      <div className="mt-16 border-t border-slate-200 pt-8 text-center">
        <Link
          to="/#school-list"
          onClick={handleBack}
          className="inline-flex min-h-12 items-center gap-2 rounded-xl bg-emerald-800 px-6 py-3 text-sm font-bold text-white shadow-sm transition-colors hover:bg-emerald-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-600 focus-visible:ring-offset-2"
        >
          <ArrowLeft aria-hidden="true" size={18} />
          返回全部实践站点
        </Link>
      </div>
    </article>
  );
}
