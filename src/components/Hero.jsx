export default function Hero() {
  const philosophies = [
    {
      title: '生活即教育',
      subtitle: 'Life is Education',
      desc: '教育源于生活，归于生活。陶行知主张打破学校围墙，将教育融入日常生活的每一个细节，让学习在真实情境中自然发生。',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
            d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
        </svg>
      ),
    },
    {
      title: '社会即学校',
      subtitle: 'Society is School',
      desc: '整个社会都是教育的场域。陶行知认为学校不应是封闭的象牙塔，而应与广阔的社会生活紧密相连，让学生在社会实践中获得真知。',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
            d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      ),
    },
    {
      title: '教学做合一',
      subtitle: 'Unity of Teaching, Learning & Doing',
      desc: '教的方法要根据学的方法，学的方法要根据做的方法。陶行知强调"做"是教与学的中心，理论与实践必须紧密结合，在手脑并用中培养完整的人。',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
            d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
        </svg>
      ),
    },
  ];

  return (
    <section className="bg-gradient-to-br from-emerald-700 via-emerald-800 to-teal-900 text-white">
      <div className="max-w-4xl mx-auto px-4 py-16 md:py-24">
        {/* Badge */}
        <div className="text-center mb-8">
          <span className="inline-block bg-white/15 text-emerald-100 text-xs font-semibold px-4 py-1.5 rounded-full uppercase tracking-wider backdrop-blur-sm border border-white/10">
            南京大学 · 行知溯光社会实践团队
          </span>
        </div>

        {/* Main Heading */}
        <h1 className="text-3xl md:text-5xl font-bold tracking-tight text-center mb-6">
          追寻
          <span className="text-amber-400">陶行知</span>
          教育思想的当代足迹
        </h1>

        <p className="text-center text-emerald-100 text-base md:text-lg max-w-3xl mx-auto leading-relaxed mb-12">
          陶行知（1891–1946），中国近代伟大的教育家、思想家。他以"捧着一颗心来，不带半根草去"的赤子情怀，
          创立了以"生活即教育""社会即学校""教学做合一"为核心理念的生活教育理论体系。
          2026年暑期，南京大学"行知溯光"社会实践团队循着行知先生的足迹，走进六所学校，
          用镜头与文字记录下当代教育一线对行知精神的传承与创新。
        </p>

        {/* Three Philosophies */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {philosophies.map((p) => (
            <div
              key={p.title}
              className="group bg-white/10 backdrop-blur-sm border border-white/15 rounded-2xl p-6 hover:bg-white/20 transition-all duration-300 hover:-translate-y-1"
            >
              <div className="w-10 h-10 bg-amber-500/20 text-amber-300 rounded-xl flex items-center justify-center mb-4 group-hover:bg-amber-500/30 transition-colors">
                {p.icon}
              </div>
              <h3 className="text-lg font-bold mb-1">{p.title}</h3>
              <p className="text-xs text-emerald-300 mb-3 font-medium uppercase tracking-wide">{p.subtitle}</p>
              <p className="text-sm text-emerald-100 leading-relaxed">{p.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
