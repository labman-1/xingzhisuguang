import { ArrowDown, BookOpen, Lightbulb, Users } from 'lucide-react';
import { Link } from 'react-router-dom';
import { hasImageSource } from '../utils/mediaImage';
import MediaBackdrop from './MediaBackdrop';

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
  const primaryText = hasHeroImage ? 'text-white' : 'text-[#173c32]';
  const secondaryText = hasHeroImage ? 'text-[#f7f0df]' : 'text-[#49645b]';
  const cardClass = hasHeroImage
    ? 'border-white/20 bg-[#071d18]/70 text-white'
    : 'border-[#d8c9a8] bg-white/75 text-[#173c32]';

  return (
    <section
      className={`relative isolate min-h-[calc(100svh-4rem)] overflow-hidden ${primaryText}`}
      aria-labelledby="hero-title"
      data-has-hero-image={hasHeroImage ? 'true' : 'false'}
    >
      <MediaBackdrop
        media={heroImage}
        className="absolute inset-0 -z-10"
        overlayClassName="bg-[#061b17]/80"
        loading="eager"
        fetchPriority="high"
      />

      <div className="mx-auto flex min-h-[calc(100svh-4rem)] max-w-7xl flex-col justify-center px-4 py-12 sm:px-6 md:py-16">
        <div className="max-w-4xl">
          <p className={`mb-5 text-xs font-bold tracking-[0.18em] sm:text-sm ${hasHeroImage ? 'text-amber-200' : 'text-[#8a651d]'}`}>
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
            追寻<span className={`mx-2 ${hasHeroImage ? 'text-amber-300' : 'text-[#9a6d16]'}`}>{profileName}</span>
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
              className={`inline-flex min-h-12 items-center justify-center rounded-xl border px-6 py-3 text-sm font-semibold transition focus-visible:outline-none focus-visible:ring-2 ${hasHeroImage ? 'border-white/45 bg-[#071d18]/55 text-white hover:bg-[#0f342a]' : 'border-[#b89a5c] bg-[#fffaf0]/80 text-[#173c32] hover:bg-white'}`}
            >
              了解行知文脉
            </Link>
          </div>
        </div>

        <ul className="mt-10 grid grid-cols-1 gap-3 md:grid-cols-3" aria-label="陶行知生活教育三大理念">
          {visibleIdeas.map((idea, index) => {
            const Icon = idea.Icon || ideaIcons[index % ideaIcons.length];
            const description = [idea.summary, idea.desc, idea.description, idea.content, idea.body]
              .find((value) => typeof value === 'string' && value.trim());

            return (
              <li key={idea.id || idea.title || index} className="h-full">
                <article className={`philosophy-card h-full rounded-2xl border p-5 shadow-sm backdrop-blur-sm ${cardClass}`}>
                  <div className="flex items-start gap-4">
                    <span className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${hasHeroImage ? 'bg-amber-300/20 text-amber-200' : 'bg-[#f3e4bd] text-[#795612]'}`} aria-hidden="true">
                      <Icon size={21} strokeWidth={1.8} />
                    </span>
                    <div>
                      <p className={`text-xs font-bold tracking-[0.15em] ${hasHeroImage ? 'text-amber-200' : 'text-[#8a651d]'}`}>0{index + 1}</p>
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
