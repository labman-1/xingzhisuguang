import { useState } from 'react';

export default function InterviewAccordion({ interviews }) {
  // Default: first interview open
  const [activeId, setActiveId] = useState(
    interviews && interviews.length > 0 ? interviews[0].id : null
  );

  if (!interviews || interviews.length === 0) {
    return (
      <section>
        <div className="flex items-center gap-3 mb-6">
          <div className="w-8 h-8 bg-slate-100 text-slate-500 rounded-lg flex items-center justify-center">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          </div>
          <h2 className="text-xl font-bold text-slate-900">访谈记录</h2>
        </div>
        <div className="text-center py-12 bg-slate-50 rounded-xl border border-slate-100">
          <svg className="w-10 h-10 text-slate-300 mx-auto mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
              d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
          </svg>
          <p className="text-sm text-slate-500">暂无访谈记录</p>
          <p className="text-xs text-slate-400 mt-1">访谈内容正在整理中</p>
        </div>
      </section>
    );
  }

  const toggleInterview = (id) => {
    setActiveId(activeId === id ? null : id);
  };

  return (
    <section>
      {/* Section Heading */}
      <div className="flex items-center gap-3 mb-6">
        <div className="w-8 h-8 bg-blue-100 text-blue-600 rounded-lg flex items-center justify-center">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
              d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
        </div>
        <h2 className="text-xl font-bold text-slate-900">访谈记录</h2>
        <span className="text-xs text-slate-400 bg-slate-100 px-2 py-0.5 rounded-full">
          {interviews.length} 个主题
        </span>
      </div>

      {/* Accordion Panels */}
      <div className="space-y-3">
        {interviews.map((interview) => {
          const isActive = activeId === interview.id;

          return (
            <div
              key={interview.id}
              className="bg-white rounded-xl border border-slate-100 shadow-sm overflow-hidden
                         transition-all duration-300 hover:border-slate-200"
            >
              {/* Toggle Button */}
              <button
                onClick={() => toggleInterview(interview.id)}
                className="w-full flex items-center justify-between px-5 py-4 text-left
                           hover:bg-slate-50 transition-colors"
                aria-expanded={isActive}
              >
                <div className="flex items-center gap-3">
                  {/* Topic Number */}
                  <span className={`w-7 h-7 rounded-lg flex items-center justify-center text-xs font-bold transition-colors ${
                    isActive
                      ? 'bg-emerald-600 text-white'
                      : 'bg-slate-100 text-slate-500'
                  }`}>
                    {interviews.indexOf(interview) + 1}
                  </span>
                  <span className={`font-semibold transition-colors ${
                    isActive ? 'text-emerald-700' : 'text-slate-800'
                  }`}>
                    {interview.topic}
                  </span>
                </div>

                {/* Chevron */}
                <svg
                  className={`w-5 h-5 text-slate-400 transition-transform duration-300 ${
                    isActive ? 'rotate-180' : ''
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {/* Panel Content */}
              <div
                className={`overflow-hidden transition-all duration-300 ${
                  isActive ? 'max-h-[2000px] opacity-100' : 'max-h-0 opacity-0'
                }`}
              >
                <div className="px-5 pb-5 pt-1 border-t border-slate-50">
                  <div className="prose prose-sm max-w-none text-slate-600 leading-relaxed whitespace-pre-line">
                    {interview.content}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
