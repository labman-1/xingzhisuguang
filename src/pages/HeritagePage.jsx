import { BookOpen, ExternalLink } from 'lucide-react';
import {
  getVisibleEducationalIdeas,
  getVisibleHeritageEntries,
  getVisibleProfiles,
} from '../content';

function getPlainSummary(item) {
  return [item.summary, item.description, item.excerpt, item.content, item.body]
    .find((value) => typeof value === 'string' && value.trim());
}

export default function HeritagePage() {
  const publishedProfiles = getVisibleProfiles();
  const publishedIdeas = getVisibleEducationalIdeas();
  const publishedEntries = getVisibleHeritageEntries();

  return (
    <div className="mx-auto max-w-5xl px-4 py-12 md:py-16">
      <header className="mb-12 text-center">
        <p className="mb-3 text-sm font-semibold tracking-wider text-emerald-700">人物与理念</p>
        <h1
          data-page-heading
          tabIndex={-1}
          className="mb-4 text-3xl font-bold text-slate-900 focus:outline-none"
        >
          行知精神与书院传承
        </h1>
        <p className="mx-auto max-w-2xl leading-7 text-slate-600">
          从人物思想到书院实践，集中呈现经过核验的行知教育文脉资料。
        </p>
      </header>

      <section aria-labelledby="profile-heading" className="mb-10 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm md:p-8">
        <h2 id="profile-heading" className="sr-only">陶行知人物志</h2>
        {publishedProfiles.length > 0 ? (
          publishedProfiles.map((profile) => (
            <article key={profile.id}>
              {profile.lifespan && <p className="mb-2 text-xs font-semibold text-emerald-700">{profile.lifespan}</p>}
              <h3 className="mb-2 text-2xl font-bold text-slate-900">{profile.name}</h3>
              {profile.role && <p className="mb-4 text-sm text-slate-600">{profile.role}</p>}
              {getPlainSummary(profile) && <p className="leading-8 text-slate-700">{getPlainSummary(profile)}</p>}
            </article>
          ))
        ) : (
          <p className="text-sm text-slate-600">人物资料正在核验。</p>
        )}
      </section>

      <section aria-labelledby="ideas-heading" className="mb-12">
        <h2 id="ideas-heading" className="mb-5 text-xl font-bold text-slate-900">生活教育理念</h2>
        <ul className="grid grid-cols-1 gap-5 md:grid-cols-3">
          {publishedIdeas.map((idea) => (
            <li key={idea.id}>
              <article className="h-full rounded-2xl border border-slate-200 bg-white p-6">
                <h3 className="mb-1 font-bold text-slate-900">{idea.title}</h3>
                {idea.subtitle && <p className="mb-3 text-xs text-emerald-700">{idea.subtitle}</p>}
                {getPlainSummary(idea) && <p className="text-sm leading-7 text-slate-600">{getPlainSummary(idea)}</p>}
              </article>
            </li>
          ))}
        </ul>
      </section>

      <section aria-labelledby="academy-heading">
        <div className="mb-5 flex items-center gap-3">
          <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-100 text-amber-700" aria-hidden="true">
            <BookOpen size={20} />
          </span>
          <h2 id="academy-heading" className="text-xl font-bold text-slate-900">书院传承</h2>
        </div>

        {publishedEntries.length > 0 ? (
          <ul className="space-y-4">
            {publishedEntries.map((entry) => {
              const summary = getPlainSummary(entry);
              const url = entry.url || entry.href || entry.sourceUrl;
              return (
                <li key={entry.id}>
                  <article className="rounded-2xl border border-slate-200 bg-white p-6">
                    <h3 className="font-bold text-slate-900">{entry.title}</h3>
                    {summary && <p className="mt-2 text-sm leading-7 text-slate-600">{summary}</p>}
                    {url && (
                      <a
                        href={url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-4 inline-flex min-h-11 items-center gap-2 rounded-lg font-semibold text-emerald-700 hover:text-emerald-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-600"
                        aria-label={`${entry.title}公开资料（在新窗口打开）`}
                      >
                        查看公开资料
                        <ExternalLink size={16} aria-hidden="true" />
                      </a>
                    )}
                  </article>
                </li>
              );
            })}
          </ul>
        ) : (
          <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-8 text-center">
            <p className="text-sm text-slate-600">书院传承资料待核验补充。</p>
          </div>
        )}
      </section>
    </div>
  );
}
