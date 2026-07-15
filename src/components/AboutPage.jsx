export default function AboutPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12 md:py-16">
      {/* Page Header */}
      <div className="text-center mb-12">
        <div className="flex items-center justify-center gap-2 mb-3">
          <div className="h-px w-6 bg-emerald-300" />
          <span className="text-emerald-600 text-sm font-semibold uppercase tracking-wider">
            关于我们
          </span>
          <div className="h-px w-6 bg-emerald-300" />
        </div>
        <h1 className="text-2xl md:text-3xl font-bold text-slate-900 mb-4">行知溯光 · 团队介绍</h1>
        <p className="text-slate-500 max-w-2xl mx-auto leading-relaxed">
          我们是南京大学 2026 年暑期社会实践团队，以"循行知足迹，溯教育之光"为使命，
          走进基层学校，用镜头与文字记录当代教育一线对陶行知思想的传承与创新。
        </p>
      </div>

      {/* Content Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
        {/* Mission Card */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6 md:p-8">
          <div className="w-10 h-10 bg-emerald-100 text-emerald-600 rounded-xl flex items-center justify-center mb-4">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          </div>
          <h2 className="text-lg font-bold text-slate-900 mb-3">我们的使命</h2>
          <p className="text-sm text-slate-600 leading-relaxed">
            通过实地走访南京市六所学校，我们深入了解陶行知教育思想在基层教育一线的实践现状。
            从幼儿园到九年一贯制学校，从"小先生制"到"教学做合一"，我们以访谈、拍摄、
            文字记录等方式，力求呈现一幅当代行知教育的真实画卷。
          </p>
        </div>

        {/* Team Card */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6 md:p-8">
          <div className="w-10 h-10 bg-amber-100 text-amber-600 rounded-xl flex items-center justify-center mb-4">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
          </div>
          <h2 className="text-lg font-bold text-slate-900 mb-3">团队成员</h2>
          <p className="text-sm text-slate-600 leading-relaxed">
            团队由南京大学工科试验班大一新生组成，分为线上组与线下组。
            线下组负责实地走访、拍摄与访谈；线上组负责资料整理、网站开发与成果展示。
            成员信息将后续更新。
          </p>
        </div>
      </div>

      {/* Timeline Summary */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6 md:p-8">
        <div className="w-10 h-10 bg-blue-100 text-blue-600 rounded-xl flex items-center justify-center mb-4">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
              d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        <h2 className="text-lg font-bold text-slate-900 mb-3">实践日程</h2>

        <div className="space-y-4">
          {[
            { date: '6.29', school: '五塘小学', stage: '第一站' },
            { date: '7.1', school: '燕子矶幼儿园', stage: '第二站' },
            { date: '7.2', school: '晓庄小学', stage: '第三站' },
            { date: '7.2', school: '小市中心小学', stage: '第四站' },
            { date: '7.3', school: '南京晓庄实验学校', stage: '第五站' },
            { date: '7.3', school: '晓庄附属小学', stage: '第六站' },
          ].map((item, index) => (
            <div key={index} className="flex items-center gap-4 pl-4 border-l-2 border-emerald-100 hover:border-emerald-400 transition-colors">
              <div className="min-w-0">
                <span className="text-xs text-emerald-600 font-semibold">{item.stage}</span>
                <span className="text-xs text-slate-400 mx-2">|</span>
                <span className="text-xs text-slate-500">{item.date}</span>
                <span className="text-sm font-medium text-slate-800 ml-2">{item.school}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
