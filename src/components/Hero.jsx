import { ArrowDown, BookOpen, Lightbulb, Users } from 'lucide-react';
import { Link } from 'react-router-dom';

const defaultIdeas = [
  {
    title: '生活即教育',
    subtitle: 'Life is Education',
    summary: '教育源于生活，也回到生活。学习在真实情境中发生，在日常经验中生长。',
    Icon: BookOpen,
  },
  {
    title: '社会即学校',
    subtitle: 'Society is School',
    summary: '整个社会都是教育的场域。走出围墙，在社会实践与共同生活中获得真知。',
    Icon: Users,
  },
  {
    title: '教学做合一',
    subtitle: 'Teaching, Learning & Doing',
    summary: '以“做”为教与学的中心，让理论和行动彼此印证，在手脑并用中成长。',
    Icon: Lightbulb,
  },
];

const ideaIcons = [BookOpen, Users, Lightbulb];

export default function Hero({
  ideas = defaultIdeas,
  profile,
  project,
  siteCount = 0,
  practiceYear,
}) {
  const visibleIdeas = Array.isArray(ideas) ? ideas : defaultIdeas;
  const profileName = profile?.name || '陶行知';
  const organization = project?.organization || '南京大学“行知溯光”社会实践团队';
  const introduction = project?.mission ||
    '循行知足迹，溯教育之光。以访谈、影像与田野记录观察行知教育思想如何在今天继续生长。';
  const resolvedYear = practiceYear || '2026';

  return (
    <section
      className="relative overflow-hidden bg-gradient-to-br from-emerald-800 via-emerald-900 to-teal-950 text-white"
      aria-labelledby="hero-title"
    >
      <div className="hero-orb hero-orb--amber" aria-hidden="true" />
      <div className="hero-orb hero-orb--emerald" aria-hidden="true" />

      <div className="relative mx-auto max-w-7xl px-4 py-16 sm:px-6 md:py-24 lg:py-28">
        <div className="mx-auto max-w-4xl text-center">
          <p className="mb-6 inline-flex items-center rounded-full border border-emerald-300/30 bg-emerald-800/70 px-4 py-2 text-xs font-semibold tracking-[0.16em] text-emerald-50 shadow-sm backdrop-blur sm:text-sm">
            {organization}
          </p>

          <h1
            id="hero-title"
            data-page-heading
            tabIndex={-1}
            className="text-balance text-4xl font-black leading-tight tracking-tight focus:outline-none sm:text-5xl md:text-6xl"
          >
            追寻<span className="mx-2 text-amber-300">{profileName}</span>
            <span className="block sm:mt-2">教育思想的当代足迹</span>
          </h1>

          <p className="mx-auto mt-7 max-w-3xl text-pretty text-base leading-8 text-emerald-50 sm:text-lg">
            {introduction}
          </p>

          <div className="mt-9 flex flex-col items-stretch justify-center gap-3 sm:flex-row sm:items-center">
            <Link
              to="/#school-list"
              className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-amber-400 px-6 py-3 text-sm font-bold text-emerald-950 shadow-lg shadow-emerald-950/20 transition hover:bg-amber-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-200 focus-visible:ring-offset-2 focus-visible:ring-offset-emerald-900"
            >
              查看实践足迹
              <ArrowDown aria-hidden="true" size={18} />
            </Link>
            <Link
              to="/heritage"
              className="inline-flex min-h-12 items-center justify-center rounded-xl border border-emerald-200/50 bg-emerald-800/60 px-6 py-3 text-sm font-semibold text-white transition hover:border-emerald-100 hover:bg-emerald-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-200 focus-visible:ring-offset-2 focus-visible:ring-offset-emerald-900"
            >
              了解行知文脉
            </Link>
          </div>
        </div>

        <ul className="mx-auto mt-14 grid max-w-6xl grid-cols-1 gap-4 md:grid-cols-3" aria-label="陶行知生活教育三大理念">
          {visibleIdeas.map((idea, index) => {
            const Icon = idea.Icon || ideaIcons[index % ideaIcons.length];
            const description = [idea.summary, idea.desc, idea.description, idea.content, idea.body]
              .find((value) => typeof value === 'string' && value.trim());

            return (
              <li key={idea.id || idea.title || index} className="h-full">
                <article className="philosophy-card h-full rounded-2xl border border-white/15 bg-white/10 p-6 text-left shadow-sm backdrop-blur-sm">
                  <div className="mb-5 flex items-start justify-between gap-4">
                    <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-amber-300/20 text-amber-200" aria-hidden="true">
                      <Icon size={22} strokeWidth={1.8} />
                    </span>
                    <span className="text-sm font-bold tracking-widest text-emerald-200" aria-hidden="true">
                      0{index + 1}
                    </span>
                  </div>
                  <h2 className="text-xl font-bold text-white">{idea.title}</h2>
                  {idea.subtitle && <p className="mt-1 text-xs font-semibold uppercase tracking-wide text-amber-200">{idea.subtitle}</p>}
                  {description && <p className="mt-4 text-sm leading-7 text-emerald-50">{description}</p>}
                </article>
              </li>
            );
          })}
        </ul>

        <dl className="mx-auto mt-10 grid max-w-3xl grid-cols-3 divide-x divide-emerald-500/40 rounded-2xl border border-emerald-400/20 bg-emerald-950/30 px-2 py-5 text-center backdrop-blur-sm sm:px-6">
          <div className="px-2">
            <dt className="text-xs text-emerald-100 sm:text-sm">实践点</dt>
            <dd className="mt-1 text-xl font-black text-amber-300 sm:text-2xl">{siteCount} 个</dd>
          </div>
          <div className="px-2">
            <dt className="text-xs text-emerald-100 sm:text-sm">实践年份</dt>
            <dd className="mt-1 text-xl font-black text-amber-300 sm:text-2xl">{resolvedYear}</dd>
          </div>
          <div className="px-2">
            <dt className="text-xs text-emerald-100 sm:text-sm">记录方式</dt>
            <dd className="mt-1 text-base font-black text-amber-300 sm:text-xl">访谈 · 影像</dd>
          </div>
        </dl>
      </div>
    </section>
  );
}
