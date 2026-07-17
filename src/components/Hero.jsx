import { ArrowDown, BookOpen, Lightbulb, Users } from 'lucide-react';
import { Link } from 'react-router-dom';
import { hasImageSource } from '../utils/mediaImage';
import ResponsiveImage from './ResponsiveImage';

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
  const heroImage = project?.heroImage;
  const hasHeroImage = hasImageSource(heroImage);
  const secondaryText = 'text-[#49645b]';

  return (
    <section
      className="relative isolate min-h-[calc(100svh-4rem)] overflow-hidden bg-[#f7f3e9] text-[#173c32]"
      aria-labelledby="hero-title"
      data-has-hero-image={hasHeroImage ? 'true' : 'false'}
    >
      <div className="mx-auto flex min-h-[calc(100svh-4rem)] max-w-7xl flex-col justify-center px-4 py-12 sm:px-6 md:py-16">
        <div className="grid items-center gap-10 lg:grid-cols-[minmax(0,1.5fr)_minmax(17rem,0.62fr)] lg:gap-14">
          <div className="max-w-4xl">
            <p className="mb-5 text-xs font-bold tracking-[0.18em] text-[#8a651d] sm:text-sm">
              {organization}
            </p>

            <p className={`mb-3 text-sm font-semibold sm:text-base ${secondaryText}`}>
              {profile?.lifespan && `${profile.lifespan} · `}{profile?.role || '中国近代伟大的教育家、思想家'}
            </p>

            <h1
              id="hero-title"
              data-page-heading
              tabIndex={-1}
              className="text-balance text-4xl font-black leading-[1.12] tracking-tight focus:outline-none sm:text-5xl md:text-6xl lg:text-7xl"
            >
              追寻<span className="mx-2 text-[#9a6d16]">{profileName}</span>
              <span className="block sm:mt-2">教育思想的当代足迹</span>
            </h1>

            {profile?.summary && (
              <p className={`mt-6 max-w-3xl text-base font-medium leading-8 sm:text-lg ${secondaryText}`}>
                {profile.summary}
              </p>
            )}
            <p className={`mt-3 max-w-3xl text-sm leading-7 sm:text-base ${secondaryText}`}>
              {introduction}
            </p>

            <div className="mt-7 flex flex-col items-stretch gap-3 sm:flex-row sm:items-center">
              <Link
                to="/#school-list"
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-amber-400 px-6 py-3 text-sm font-bold text-emerald-950 shadow-lg shadow-emerald-950/15 transition hover:bg-amber-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-200 focus-visible:ring-offset-2 focus-visible:ring-offset-emerald-950"
              >
                查看实践足迹
                <ArrowDown aria-hidden="true" size={18} />
              </Link>
              <Link
                to="/heritage"
                className="inline-flex min-h-12 items-center justify-center rounded-xl border border-[#b89a5c] bg-[#fffaf0]/80 px-6 py-3 text-sm font-semibold text-[#173c32] transition hover:bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-700"
              >
                了解行知文脉
              </Link>
            </div>
          </div>

          {hasHeroImage && (
            <div className="relative mx-auto w-full max-w-[19rem] sm:max-w-[21rem] lg:mx-0 lg:max-w-[22rem] lg:justify-self-end">
              <div className="absolute -inset-5 -z-10 rounded-[2.5rem] bg-amber-200/35 blur-3xl" aria-hidden="true" />
              <figure className="relative aspect-[4/5] overflow-hidden rounded-[2rem] border border-[#c9aa68] bg-[#e8dfcc] p-3 shadow-[0_24px_70px_rgba(61,46,21,0.20)] sm:p-4">
                <div className="pointer-events-none absolute inset-3 rounded-[1.5rem] border border-white/55 sm:inset-4" aria-hidden="true" />
                <ResponsiveImage
                  media={heroImage}
                  alt={heroImage.alt}
                  loading="eager"
                  fetchPriority="high"
                  pictureClassName="block h-full w-full overflow-hidden rounded-[1.45rem]"
                  className="h-full w-full object-cover grayscale-[12%] sepia-[10%]"
                />
              </figure>
            </div>
          )}
        </div>

        <ul className="mt-10 grid grid-cols-1 gap-3 md:grid-cols-3" aria-label="陶行知生活教育三大理念">
          {visibleIdeas.map((idea, index) => {
            const Icon = idea.Icon || ideaIcons[index % ideaIcons.length];
            const description = [idea.summary, idea.desc, idea.description, idea.content, idea.body]
              .find((value) => typeof value === 'string' && value.trim());

            return (
              <li key={idea.id || idea.title || index} className="h-full">
                <article className="philosophy-card h-full rounded-2xl border border-[#d8c9a8] bg-white/75 p-5 text-[#173c32] shadow-sm backdrop-blur-sm">
                  <div className="flex items-start gap-4">
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#f3e4bd] text-[#795612]" aria-hidden="true">
                      <Icon size={21} strokeWidth={1.8} />
                    </span>
                    <div>
                      <p className="text-xs font-bold tracking-[0.15em] text-[#8a651d]">0{index + 1}</p>
                      <h2 className="mt-1 text-lg font-bold">{idea.title}</h2>
                    </div>
                  </div>
                  {description && <p className={`mt-4 text-sm leading-6 ${secondaryText}`}>{description}</p>}
                </article>
              </li>
            );
          })}
        </ul>

        <p className={`mt-7 text-xs font-semibold tracking-wide ${secondaryText}`}>
          {siteCount} 个实践点 · {resolvedYear} 年 · 访谈与影像记录
        </p>
      </div>
    </section>
  );
}
