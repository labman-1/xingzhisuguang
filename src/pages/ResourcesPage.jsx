import { ExternalLink, FileText } from 'lucide-react';
import { getVisibleResources } from '../content';

function ResourceCard({ resource }) {
  const description = [resource.summary, resource.description, resource.excerpt, resource.body]
    .find((value) => typeof value === 'string' && value.trim());
  const sourceLinks = Array.isArray(resource.sourceLinks)
    ? resource.sourceLinks.filter((source) => source?.url && source?.label)
    : [];

  return (
    <article className="h-full rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
      <div className="flex items-start justify-between gap-4">
        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-emerald-100 text-emerald-700" aria-hidden="true">
          <FileText size={20} />
        </span>
        <span className="rounded-full bg-amber-50 px-3 py-1 text-xs font-semibold text-amber-800">
          行知思想育人实践专题报道
        </span>
      </div>
      {resource.type && <p className="mt-5 text-xs font-bold uppercase tracking-wide text-amber-700">{resource.type}</p>}
      <h2 className="mt-2 text-xl font-bold leading-8 text-slate-900">{resource.title}</h2>
      {description && <p className="mt-3 text-sm leading-7 text-slate-600">{description}</p>}
      {sourceLinks.length > 0 && (
        <div className="mt-7 border-t border-slate-100 pt-6">
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
    </article>
  );
}

export default function ResourcesPage() {
  const publishedResources = getVisibleResources();

  return (
    <div className="mx-auto max-w-4xl px-4 py-12 md:py-16">
      <header className="mb-12 text-center">
        <p className="mb-3 text-sm font-semibold tracking-wider text-emerald-700">成果展示</p>
        <h1
          data-page-heading
          tabIndex={-1}
          className="mb-4 text-3xl font-bold text-slate-900 focus:outline-none"
        >
          实践成果
        </h1>
        <p className="mx-auto max-w-2xl leading-7 text-slate-600">
          团队调研成果以一篇完整文章呈现，并由两个公众号分别推送。
        </p>
      </header>

      {publishedResources.length > 0 ? (
        <ul className="grid grid-cols-1 gap-6">
          {publishedResources.map((resource) => (
            <li key={resource.id}>
              <ResourceCard resource={resource} />
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-center text-sm text-slate-600">暂无公开成果。</p>
      )}
    </div>
  );
}
