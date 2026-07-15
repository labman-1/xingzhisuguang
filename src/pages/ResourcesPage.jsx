import { ExternalLink, FileText } from 'lucide-react';
import { getVisibleResources } from '../content';

function getResourceUrl(resource) {
  return resource.url || resource.downloadUrl || resource.href || resource.src || '';
}

function ResourceCard({ resource }) {
  const url = getResourceUrl(resource);
  const description = [resource.summary, resource.description, resource.excerpt, resource.body]
    .find((value) => typeof value === 'string' && value.trim());
  const isExternal = /^https?:\/\//i.test(url);
  const cardContent = (
    <>
      <div className="flex items-start justify-between gap-4">
        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-emerald-100 text-emerald-700" aria-hidden="true">
          <FileText size={20} />
        </span>
        {url && <ExternalLink className="shrink-0 text-emerald-700" size={18} aria-hidden="true" />}
      </div>
      {resource.type && <p className="mt-5 text-xs font-bold uppercase tracking-wide text-amber-700">{resource.type}</p>}
      <h2 className="mt-2 text-lg font-bold text-slate-900">{resource.title}</h2>
      {description && <p className="mt-3 text-sm leading-7 text-slate-600">{description}</p>}
    </>
  );

  if (!url) {
    return <article className="h-full rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">{cardContent}</article>;
  }

  return (
    <a
      href={url}
      target={isExternal ? '_blank' : undefined}
      rel={isExternal ? 'noopener noreferrer' : undefined}
      download={resource.download || undefined}
      className="block h-full rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:border-emerald-400 hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-600"
      aria-label={`${resource.title}${isExternal ? '（在新窗口打开）' : ''}`}
    >
      {cardContent}
    </a>
  );
}

export default function ResourcesPage() {
  const publishedResources = getVisibleResources();

  return (
    <div className="mx-auto max-w-5xl px-4 py-12 md:py-16">
      <header className="mb-12 text-center">
        <p className="mb-3 text-sm font-semibold tracking-wider text-emerald-700">成果展示</p>
        <h1
          data-page-heading
          tabIndex={-1}
          className="mb-4 text-3xl font-bold text-slate-900 focus:outline-none"
        >
          实践成果资源
        </h1>
        <p className="mx-auto max-w-2xl text-slate-600">经核验后发布团队的图文、视频、访谈稿与公开资料。</p>
      </header>

      {publishedResources.length > 0 ? (
        <ul className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {publishedResources.map((resource) => (
            <li key={resource.id}>
              <ResourceCard resource={resource} />
            </li>
          ))}
        </ul>
      ) : (
        <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-12 text-center">
          <h2 className="mb-2 font-semibold text-slate-700">成果正在整理</h2>
          <p className="text-sm text-slate-600">当前没有已核验并公开的成果资源。</p>
        </div>
      )}
    </div>
  );
}
