import { ExternalLink, Eye, FileText, Presentation } from 'lucide-react';
import { useState } from 'react';
import PdfPreviewDialog from '../components/PdfPreviewDialog';
import ResponsiveImage from '../components/ResponsiveImage';
import { getVisibleResources } from '../content';

function ResourceCard({ resource, onPreview }) {
  const isPresentation = resource.kind === 'presentation';
  const description = [resource.summary, resource.description, resource.excerpt, resource.body]
    .find((value) => typeof value === 'string' && value.trim());
  const sourceLinks = Array.isArray(resource.sourceLinks)
    ? resource.sourceLinks.filter((source) => source?.url && source?.label)
    : [];
  const Icon = isPresentation ? Presentation : FileText;

  return (
    <article
      id={resource.id}
      className="flex h-full scroll-mt-28 flex-col overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-emerald-950/10"
    >
      {isPresentation && resource.cover && (
        <div className="relative aspect-video overflow-hidden bg-[#eee5d3]">
          <ResponsiveImage
            media={resource.cover}
            className="h-full w-full object-cover transition duration-500 hover:scale-[1.02]"
            pictureClassName="block h-full"
          />
          <span className="absolute left-4 top-4 rounded-full border border-white/30 bg-[#071d18]/80 px-3 py-1 text-xs font-bold text-white backdrop-blur-sm">
            PDF · {resource.pageCount} 页
          </span>
        </div>
      )}

      <div className="flex flex-1 flex-col p-6 sm:p-7">
        <div className="flex items-start justify-between gap-4">
          <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-emerald-100 text-emerald-700" aria-hidden="true">
            <Icon size={20} />
          </span>
          <span className="rounded-full bg-amber-50 px-3 py-1 text-xs font-semibold text-amber-800">
            {resource.type}
          </span>
        </div>

        <h3 className="mt-5 text-xl font-bold leading-8 text-slate-900">{resource.title}</h3>
        {description && <p className="mt-3 text-sm leading-7 text-slate-600">{description}</p>}

        {isPresentation && (
          <div className="mt-auto pt-6">
            <p className="mb-4 text-xs font-semibold text-slate-500">
              {resource.pageCount} 页 · {resource.fileSize} · 点击后加载
            </p>
            <button
              type="button"
              onClick={() => onPreview(resource)}
              className="inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-xl bg-emerald-800 px-5 py-3 text-sm font-bold text-white transition hover:bg-emerald-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-600 focus-visible:ring-offset-2"
              aria-label={`在线预览《${resource.title}》`}
            >
              <Eye aria-hidden="true" size={18} />
              在线预览
            </button>
          </div>
        )}

        {!isPresentation && sourceLinks.length > 0 && (
          <div className="mt-auto border-t border-slate-100 pt-6">
            <p className="mb-3 text-sm font-semibold text-slate-700">选择公众号阅读原文</p>
            <ul className="flex flex-col gap-3 sm:flex-row">
              {sourceLinks.map((source) => (
                <li key={source.url}>
                  <a
                    href={source.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-xl bg-emerald-800 px-4 py-2.5 text-sm font-bold text-white transition hover:bg-emerald-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-600 focus-visible:ring-offset-2 sm:w-auto"
                    aria-label={`在${source.label}阅读原文（新窗口打开）`}
                  >
                    {source.label}
                    <ExternalLink size={16} aria-hidden="true" />
                  </a>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </article>
  );
}

export default function ResourcesPage() {
  const [activePresentation, setActivePresentation] = useState(null);
  const publishedResources = getVisibleResources();
  const presentations = publishedResources.filter((resource) => resource.kind === 'presentation');
  const articles = publishedResources.filter((resource) => resource.kind !== 'presentation');

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 md:py-16">
      <header className="mx-auto mb-14 max-w-3xl text-center">
        <p className="mb-3 text-sm font-semibold tracking-wider text-emerald-700">成果展示</p>
        <h1
          data-page-heading
          tabIndex={-1}
          className="mb-4 text-3xl font-bold text-slate-900 focus:outline-none"
        >
          实践成果
        </h1>
        <p className="mx-auto max-w-2xl leading-7 text-slate-600">
          通过专题汇报与深度报道，回望行知教育思想在不同地域、场馆与学校中的当代实践。
        </p>
      </header>

      {presentations.length > 0 && (
        <section aria-labelledby="presentation-resources-heading" className="mb-16">
          <div className="mb-7 flex flex-wrap items-end justify-between gap-3">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.14em] text-amber-700">画面汇报</p>
              <h2 id="presentation-resources-heading" className="mt-1 text-2xl font-bold text-[#173c32]">PDF 成果展</h2>
            </div>
            <p className="text-sm text-slate-500">共 {presentations.length} 份 · 点击卡片后按需加载</p>
          </div>
          <ul className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
            {presentations.map((resource) => (
              <li key={resource.id} className="h-full">
                <ResourceCard resource={resource} onPreview={setActivePresentation} />
              </li>
            ))}
          </ul>
        </section>
      )}

      {articles.length > 0 && (
        <section aria-labelledby="article-resources-heading">
          <div className="mb-7">
            <p className="text-xs font-bold uppercase tracking-[0.14em] text-amber-700">文字记录</p>
            <h2 id="article-resources-heading" className="mt-1 text-2xl font-bold text-[#173c32]">专题报道</h2>
          </div>
          <ul className="grid grid-cols-1 gap-6">
            {articles.map((resource) => (
              <li key={resource.id}>
                <ResourceCard resource={resource} onPreview={setActivePresentation} />
              </li>
            ))}
          </ul>
        </section>
      )}

      {publishedResources.length === 0 && (
        <p className="text-center text-sm text-slate-600">暂无公开成果。</p>
      )}

      {activePresentation && (
        <PdfPreviewDialog
          resource={activePresentation}
          onClose={() => setActivePresentation(null)}
        />
      )}
    </div>
  );
}
