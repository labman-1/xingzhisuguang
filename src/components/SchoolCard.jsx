export default function SchoolCard({ school, onClick }) {
  const hasInterviews = school.interviews && school.interviews.length > 0;

  return (
    <article
      onClick={onClick}
      className="group cursor-pointer bg-white rounded-2xl shadow-sm border border-slate-100 p-6
                 hover:shadow-lg hover:-translate-y-1.5 transition-all duration-300
                 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onClick();
        }
      }}
    >
      {/* Card Header: Logo Placeholder + Stage Badge */}
      <div className="flex items-start justify-between mb-4">
        {/* Logo Placeholder Circle */}
        <div className="w-12 h-12 bg-emerald-100 text-emerald-700 rounded-xl flex items-center justify-center text-lg font-bold
                        group-hover:bg-emerald-600 group-hover:text-white transition-colors duration-300">
          {school.logoPlaceholder}
        </div>

        {/* Stage Badge */}
        <span className="inline-flex items-center gap-1 bg-emerald-50 text-emerald-700 text-xs font-semibold px-2.5 py-1 rounded-full
                         border border-emerald-100 group-hover:bg-emerald-100 transition-colors">
          <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
          </svg>
          {school.stage}
        </span>
      </div>

      {/* School Name */}
      <h3 className="text-lg font-bold text-slate-900 mb-2 group-hover:text-emerald-700 transition-colors">
        {school.name}
      </h3>

      {/* Date */}
      <div className="flex items-center gap-1.5 text-sm text-slate-500 mb-3">
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
            d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
        <span>{school.date}</span>
      </div>

      {/* Intro Teaser */}
      <p className="text-sm text-slate-600 leading-relaxed line-clamp-2 mb-4">
        {school.intro}
      </p>

      {/* Footer: Interview Count + CTA */}
      <div className="flex items-center justify-between pt-3 border-t border-slate-50">
        {hasInterviews ? (
          <span className="text-xs text-amber-600 bg-amber-50 px-2 py-0.5 rounded-full font-medium">
            {school.interviews.length} 篇访谈记录
          </span>
        ) : (
          <span className="text-xs text-slate-400">内容整理中</span>
        )}
        <span className="text-xs text-emerald-600 font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center gap-1">
          查看详情
          <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </span>
      </div>
    </article>
  );
}
