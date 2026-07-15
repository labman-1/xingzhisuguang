import { CalendarDays, Users, Zap } from 'lucide-react';
import { getVisitSchedule, projectProfile } from '../content';

const infoCards = [
  {
    id: 'mission',
    title: '我们的使命',
    textKey: 'practiceSummary',
    Icon: Zap,
    iconClassName: 'bg-emerald-100 text-emerald-700',
  },
  {
    id: 'team',
    title: '团队成员',
    textKey: 'teamSummary',
    Icon: Users,
    iconClassName: 'bg-amber-100 text-amber-700',
  },
];

export default function AboutPage() {
  const schedule = getVisitSchedule();

  return (
    <div className="mx-auto max-w-4xl px-4 py-12 md:py-16">
      <header className="mb-12 text-center">
        <div className="mb-3 flex items-center justify-center gap-2" aria-hidden="true">
          <span className="h-px w-6 bg-emerald-300" />
          <span className="text-sm font-semibold uppercase tracking-wider text-emerald-700">关于我们</span>
          <span className="h-px w-6 bg-emerald-300" />
        </div>
        <h1
          data-page-heading
          tabIndex={-1}
          className="mb-4 text-2xl font-bold text-slate-900 focus:outline-none md:text-3xl"
        >
          行知溯光 · 团队介绍
        </h1>
        <p className="mx-auto max-w-2xl leading-8 text-slate-600">{projectProfile.mission}</p>
      </header>

      <div className="mb-12 grid grid-cols-1 gap-6 md:grid-cols-2">
        {infoCards.map(({ id, title, textKey, Icon, iconClassName }) => (
          <article key={id} className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm md:p-8">
            <span className={`mb-4 flex h-10 w-10 items-center justify-center rounded-xl ${iconClassName}`} aria-hidden="true">
              <Icon size={20} />
            </span>
            <h2 className="mb-3 text-lg font-bold text-slate-900">{title}</h2>
            <p className="text-sm leading-7 text-slate-600">{projectProfile[textKey]}</p>
          </article>
        ))}
      </div>

      <section aria-labelledby="schedule-title" className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm md:p-8">
        <span className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl bg-sky-100 text-sky-700" aria-hidden="true">
          <CalendarDays size={20} />
        </span>
        <h2 id="schedule-title" className="mb-5 text-lg font-bold text-slate-900">实践日程</h2>

        {schedule.length > 0 ? (
          <ol className="space-y-4">
            {schedule.map((item) => (
              <li key={item.siteId} className="border-l-2 border-emerald-200 pl-4 transition-colors hover:border-emerald-500">
                <p className="flex flex-wrap items-baseline gap-x-2 gap-y-1">
                  <span className="text-xs font-semibold text-emerald-700">{item.stage}</span>
                  <time dateTime={item.date} className="text-xs text-slate-500">{item.displayDate || item.date}</time>
                  <span className="text-sm font-medium text-slate-800">{item.siteName}</span>
                </p>
              </li>
            ))}
          </ol>
        ) : (
          <p className="text-sm text-slate-600">实践日程正在整理。</p>
        )}
      </section>
    </div>
  );
}
