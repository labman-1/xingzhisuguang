import { BookOpen, ExternalLink } from 'lucide-react';
import ResponsiveImage from '../components/ResponsiveImage';
import {
  academyHeritageSource,
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

      <section aria-labelledby="academy-heading" className="overflow-hidden rounded-3xl border border-emerald-950/10 bg-[#f2ead8] px-5 py-8 shadow-sm sm:px-8 md:px-10 md:py-10">
        <div className="mb-9 flex flex-col gap-5 border-b border-emerald-950/10 pb-7 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <div className="mb-4 flex items-center gap-3">
              <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-emerald-950 text-amber-200 shadow-sm" aria-hidden="true">
                <BookOpen size={21} />
              </span>
              <div>
                <p className="text-xs font-bold tracking-[0.22em] text-amber-700">往届行知实践</p>
                <h2 id="academy-heading" className="mt-1 text-2xl font-bold text-emerald-950">书院传承</h2>
              </div>
            </div>
            <p className="max-w-2xl text-sm leading-7 text-slate-600">
              沿着上一届“行知溯光”的寻访路线，重温亲历者与后人的讲述，让一段段个人记忆汇入不断延展的行知文脉。
            </p>
          </div>
          <a
            href={academyHeritageSource.url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-h-11 shrink-0 items-center gap-2 self-start rounded-xl border border-emerald-900/20 bg-white/60 px-4 text-sm font-bold text-emerald-900 transition hover:border-emerald-800 hover:bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-700 sm:self-auto"
            aria-label={`${academyHeritageSource.title}公众号专题（在新窗口打开）`}
          >
            查看专题
            <ExternalLink size={15} aria-hidden="true" />
          </a>
        </div>

        {publishedEntries.length > 0 ? (
          <ol className="relative space-y-8 before:absolute before:bottom-4 before:left-4 before:top-4 before:w-px before:bg-amber-700/35 md:space-y-10 md:before:left-[9rem]">
            {[...publishedEntries]
              .sort((a, b) => (a.sequence ?? 0) - (b.sequence ?? 0))
              .map((entry, index) => {
              const summary = getPlainSummary(entry);
              const url = entry.url || entry.href || entry.sourceUrl;
              return (
                <li key={entry.id} className="relative pl-12 md:grid md:grid-cols-[7rem_2rem_minmax(0,1fr)] md:gap-4 md:pl-0">
                  <div className="mb-3 md:mb-0 md:pt-2 md:text-right">
                    <p className="font-serif text-2xl font-black leading-none text-emerald-950">{entry.year}</p>
                    {entry.period && <p className="mt-2 text-xs font-semibold leading-5 text-amber-800">{entry.period}</p>}
                  </div>

                  <div className="absolute left-0 top-0 z-10 flex h-8 w-8 items-center justify-center rounded-full border-4 border-[#f2ead8] bg-emerald-900 text-[0.65rem] font-black tracking-tight text-amber-100 shadow-sm md:static">
                    {String(index + 1).padStart(2, '0')}
                  </div>

                  <article className="overflow-hidden rounded-2xl border border-emerald-950/10 bg-[#fffdf7] shadow-[0_16px_40px_rgba(37,61,50,0.08)] lg:grid lg:grid-cols-[minmax(14rem,0.78fr)_minmax(0,1.22fr)]">
                    {entry.image?.src && (
                      <figure className="relative min-h-60 overflow-hidden bg-emerald-950/5 lg:min-h-72">
                        <ResponsiveImage
                          media={entry.image}
                          className="absolute inset-0 h-full w-full object-cover transition duration-500 hover:scale-[1.02]"
                          pictureClassName="block h-full"
                        />
                        {entry.image.credit && (
                          <figcaption className="absolute bottom-3 left-3 rounded-full bg-emerald-950/80 px-3 py-1 text-[0.68rem] font-medium text-amber-50 backdrop-blur-sm">
                            图片来源：{entry.image.credit}
                          </figcaption>
                        )}
                      </figure>
                    )}

                    <div className="flex flex-col justify-center p-6 sm:p-7">
                      {entry.category && <p className="mb-3 text-xs font-bold tracking-[0.18em] text-amber-700">{entry.category}</p>}
                      <h3 className="text-xl font-bold leading-8 text-emerald-950 sm:text-2xl">{entry.title}</h3>
                      {summary && <p className="mt-4 text-sm leading-7 text-slate-600">{summary}</p>}
                      {url && (
                        <a
                          href={url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="mt-5 inline-flex min-h-11 items-center gap-2 self-start rounded-lg font-bold text-emerald-800 transition hover:text-amber-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-600"
                          aria-label={`${entry.title}原文（在新窗口打开）`}
                        >
                          阅读公众号原文
                          <ExternalLink size={16} aria-hidden="true" />
                        </a>
                      )}
                      {entry.sourceLabel && <p className="mt-2 text-xs text-slate-400">资料来源：{entry.sourceLabel}</p>}
                    </div>
                  </article>
                </li>
              );
            })}
          </ol>
        ) : (
          <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-8 text-center">
            <p className="text-sm text-slate-600">书院传承资料待核验补充。</p>
          </div>
        )}
      </section>
    </div>
  );
}
