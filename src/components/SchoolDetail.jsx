import {
  ArrowLeft,
  BookOpen,
  CalendarDays,
  ExternalLink,
  FileDown,
  Layers3,
  MapPin,
  Quote,
  Sparkles,
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { hasImageSource } from '../utils/mediaImage';
import InterviewAccordion from './InterviewAccordion';
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

function textBlocks(value) {
  if (value == null) return [];
  if (Array.isArray(value)) return value.flatMap(textBlocks);
  if (typeof value === 'object') return [value];
  return String(value)
    .split(/\n\s*\n/g)
    .map((block) => block.trim())
    .filter(Boolean);
}

function ProseBlocks({ value }) {
  const blocks = textBlocks(value);

  return (
    <div className="content-flow">
      {blocks.map((block, index) => {
        if (typeof block === 'string') return <p key={index} className="whitespace-pre-line">{block}</p>;

        const content = block.text || block.content || block.body || block.description || '';
        if (!content) return null;

        if (block.type === 'quote' || block.quote) {
          return (
            <blockquote key={block.id || index} className="rounded-r-xl border-l-4 border-amber-400 bg-amber-50 px-5 py-4 text-slate-800">
              <p>{block.quote || content}</p>
              {block.cite && <cite className="mt-2 block text-sm not-italic text-slate-600">—— {block.cite}</cite>}
            </blockquote>
          );
        }

        return (
          <div key={block.id || index}>
            {block.title && <h4 className="mb-2 font-bold text-slate-900">{block.title}</h4>}
            <p className="whitespace-pre-line">{content}</p>
          </div>
        );
      })}
    </div>
  );
}

function normalizePractice(practice, index) {
  if (typeof practice === 'string') {
    return { title: practice, description: '', id: `practice-${index}`, tags: [] };
  }

  if (!practice || typeof practice !== 'object') return null;
  return {
    ...practice,
    id: practice.id || practice.slug || `practice-${index}`,
    title: practice.title || practice.name || practice.label || `特色实践 ${index + 1}`,
    description: practice.description || practice.summary || practice.content || practice.body,
    tags: asArray(practice.tags).map(getLabel).filter(Boolean),
  };
}

function normalizeResource(resource, index) {
  if (typeof resource === 'string') {
    const isUrl = /^(https?:\/\/|\/)/.test(resource);
    return {
      id: `resource-${index}`,
      title: isUrl ? `相关资源 ${index + 1}` : resource,
      url: isUrl ? resource : '',
    };
  }

  if (!resource || typeof resource !== 'object') return null;
  return {
    ...resource,
    id: resource.id || resource.slug || `resource-${index}`,
    title: resource.title || resource.name || resource.label || `相关资源 ${index + 1}`,
    url: resource.url || resource.href || resource.src || '',
    description: resource.description || resource.summary,
    type: resource.type || resource.format || resource.kind,
  };
}

export default function SchoolDetail({ school, onBack }) {
  if (!school) return null;

  const visit = school.visit || {};
  const name = school.name || school.title || '学校调研';
  const summary = school.summary || school.intro || school.description;
  const stage = visit.stage || school.stage;
  const dateValue = visit.date || school.date;
  const date = visit.displayDate || school.displayDate || dateValue;
  const dateTime = visit.isoDate || (/^\d{4}-\d{2}-\d{2}/.test(dateValue || '') ? dateValue : undefined);
  const location = visit.location || school.location;
  const philosophyTags = asArray(school.philosophyTags || school.philosophies || school.tags)
    .map(getLabel)
    .filter(Boolean);
  const practices = asArray(school.practices || school.featuredPractices || school.highlights)
    .map(normalizePractice)
    .filter(Boolean);
  const sections = asArray(school.sections || school.contentSections || school.fieldNotes)
    .filter(Boolean);
  const resources = asArray(school.resources)
    .map(normalizeResource)
    .filter(Boolean);
  const gallery = school.gallery || school.photos || school.media?.gallery || [];
  const videos = school.videos || school.video || school.media?.videos || [];
  const interviews = school.interviews || [];
  const bannerImage = school.bannerImage || school.media?.banner;
  const hasBanner = hasImageSource(bannerImage);
  const focus = asArray(visit.focus || visit.focuses).map(getLabel).filter(Boolean);
  const contextualTags = [...new Set([...philosophyTags, ...focus])];

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

            {summary && <div className={`mt-5 text-base leading-8 sm:text-lg ${hasBanner ? 'text-white' : 'text-[#49645b]'}`}><ProseBlocks value={summary} /></div>}

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
        <section aria-labelledby="featured-practices-title">
          <div className="mb-7 flex items-center gap-3">
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-100 text-amber-700" aria-hidden="true">
              <Sparkles size={20} />
            </span>
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.14em] text-amber-700">教育现场</p>
              <h2 id="featured-practices-title" className="text-2xl font-bold text-slate-900">特色实践</h2>
            </div>
          </div>

          {practices.length > 0 ? (
            <ol className="grid gap-5 md:grid-cols-2">
              {practices.map((practice, index) => (
                <li key={practice.id} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
                  <div className="mb-4 flex items-start gap-3">
                    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-emerald-100 text-sm font-black text-emerald-800" aria-hidden="true">
                      {index + 1}
                    </span>
                    <h3 className="pt-1 text-lg font-bold text-slate-900">{practice.title}</h3>
                  </div>
                  {practice.description ? <ProseBlocks value={practice.description} /> : <p className="text-sm text-slate-600">具体实践记录正在补充。</p>}
                  {practice.tags.length > 0 && (
                    <ul className="mt-5 flex flex-wrap gap-2" aria-label={`${practice.title}标签`}>
                      {practice.tags.map((tag) => <li key={tag} className="rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-semibold text-emerald-800">{tag}</li>)}
                    </ul>
                  )}
                </li>
              ))}
            </ol>
          ) : (
            <div className="media-empty-state">
              <BookOpen aria-hidden="true" className="mx-auto text-emerald-700" size={34} strokeWidth={1.5} />
              <p className="mt-4 font-semibold text-slate-700">特色实践案例正在整理</p>
              <p className="mt-2 text-sm text-slate-600">课程观察与教师访谈完成核对后将在这里分主题呈现。</p>
            </div>
          )}
        </section>

        {sections.map((section, index) => {
          const title = section.title || section.name || `调研记录 ${index + 1}`;
          const sectionId = `school-content-section-${index}`;
          const content = section.content || section.body || section.paragraphs || section.description;
          const highlights = asArray(section.highlights).map(getLabel).filter(Boolean);

          return (
            <section key={section.id || section.slug || title} aria-labelledby={sectionId} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-8">
              <div className="mb-5 flex items-start gap-3">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-emerald-100 text-emerald-700" aria-hidden="true">
                  <Layers3 size={20} />
                </span>
                <div>
                  {section.eyebrow && <p className="mb-1 text-xs font-bold uppercase tracking-[0.14em] text-emerald-700">{section.eyebrow}</p>}
                  <h2 id={sectionId} className="text-2xl font-bold text-slate-900">{title}</h2>
                </div>
              </div>
              <ProseBlocks value={content} />
              {section.quote && (
                <blockquote className="mt-6 rounded-xl border-l-4 border-amber-400 bg-amber-50 px-5 py-4 text-slate-800">
                  <Quote aria-hidden="true" className="mb-2 text-amber-700" size={20} />
                  <p>{section.quote}</p>
                  {section.cite && <cite className="mt-2 block text-sm not-italic text-slate-600">—— {section.cite}</cite>}
                </blockquote>
              )}
              {highlights.length > 0 && (
                <ul className="mt-6 grid gap-3 sm:grid-cols-2" aria-label={`${title}要点`}>
                  {highlights.map((item) => <li key={item} className="rounded-xl bg-emerald-50 px-4 py-3 text-sm font-medium text-emerald-900">{item}</li>)}
                </ul>
              )}
            </section>
          );
        })}

        <PhotoWall
          photos={gallery}
          schoolName={name}
          description="画面会自动向左流动；也可左右滑动、点击按钮或使用方向键切换。"
          autoPlay
          showCredit={false}
        />
        <VideoPlayer videos={videos} />
        <InterviewAccordion interviews={interviews} />

        <section aria-labelledby="school-resources-title">
          <div className="mb-6 flex flex-wrap items-center gap-3">
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-100 text-emerald-700" aria-hidden="true">
              <FileDown size={20} />
            </span>
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.14em] text-emerald-700">延伸阅读</p>
              <h2 id="school-resources-title" className="text-2xl font-bold text-slate-900">相关资源</h2>
            </div>
            {resources.length > 0 && <span className="ml-auto rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-600">{resources.length} 项</span>}
          </div>

          {resources.length > 0 ? (
            <ul className="grid gap-4 sm:grid-cols-2">
              {resources.map((resource) => (
                <li key={resource.id}>
                  {resource.url ? (
                    <a
                      href={resource.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      download={resource.download || undefined}
                      className="group flex h-full items-start justify-between gap-4 rounded-2xl border border-slate-200 bg-white p-5 transition hover:border-emerald-400 hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-600"
                      aria-label={`${resource.title}（在新窗口打开）`}
                    >
                      <span>
                        {resource.type && <span className="mb-2 block text-xs font-bold uppercase tracking-wide text-amber-700">{resource.type}</span>}
                        <span className="block font-bold text-slate-900 group-hover:text-emerald-800">{resource.title}</span>
                        {resource.description && <span className="mt-2 block text-sm leading-6 text-slate-600">{resource.description}</span>}
                      </span>
                      <ExternalLink aria-hidden="true" className="mt-1 shrink-0 text-emerald-700" size={18} />
                    </a>
                  ) : (
                    <div className="h-full rounded-2xl border border-slate-200 bg-slate-50 p-5" aria-disabled="true">
                      <p className="font-bold text-slate-700">{resource.title}</p>
                      <p className="mt-2 text-sm text-slate-600">链接整理中</p>
                    </div>
                  )}
                </li>
              ))}
            </ul>
          ) : (
            <div className="media-empty-state">
              <FileDown aria-hidden="true" className="mx-auto text-emerald-700" size={34} strokeWidth={1.5} />
              <p className="mt-4 font-semibold text-slate-700">相关资料即将开放</p>
              <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-slate-600">采访稿、调研报告与公开素材完成校对后会集中发布。</p>
            </div>
          )}
        </section>
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
