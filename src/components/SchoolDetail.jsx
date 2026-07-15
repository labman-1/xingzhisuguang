import PhotoWall from './PhotoWall';
import VideoPlayer from './VideoPlayer';
import InterviewAccordion from './InterviewAccordion';

export default function SchoolDetail({ school, onBack }) {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8 md:py-12">
      {/* Back Button */}
      <button
        onClick={onBack}
        className="inline-flex items-center gap-2 text-sm font-medium text-emerald-700 hover:text-emerald-500
                   bg-emerald-50 hover:bg-emerald-100 px-4 py-2 rounded-xl transition-colors mb-8"
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
        返回实践足迹
      </button>

      {/* School Header */}
      <header className="mb-12">
        <div className="flex flex-wrap items-center gap-3 mb-4">
          {/* Stage Badge */}
          <span className="inline-flex items-center gap-1 bg-emerald-100 text-emerald-700 text-sm font-semibold px-3 py-1 rounded-full">
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
            </svg>
            {school.stage}
          </span>

          {/* Date Badge */}
          <span className="inline-flex items-center gap-1 bg-slate-100 text-slate-600 text-sm px-3 py-1 rounded-full">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            {school.date}
          </span>
        </div>

        {/* School Name + Logo */}
        <div className="flex items-center gap-4 mb-6">
          <div className="w-16 h-16 bg-emerald-600 text-white rounded-2xl flex items-center justify-center text-2xl font-bold shadow-md flex-shrink-0">
            {school.logoPlaceholder}
          </div>
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-slate-900">{school.name}</h1>
          </div>
        </div>

        {/* Intro */}
        <p className="text-slate-600 leading-relaxed text-base md:text-lg">
          {school.intro}
        </p>
      </header>

      {/* Content Sections */}
      <div className="space-y-12">
        {/* Photo Wall */}
        <PhotoWall photos={school.photos} schoolName={school.name} />

        {/* Video Player */}
        <VideoPlayer video={school.videos} />

        {/* Interview Accordion */}
        <InterviewAccordion interviews={school.interviews} />
      </div>

      {/* Bottom Back Button */}
      <div className="mt-16 text-center">
        <button
          onClick={onBack}
          className="inline-flex items-center gap-2 text-sm font-medium text-white bg-emerald-700 hover:bg-emerald-800
                     px-6 py-3 rounded-xl transition-colors shadow-sm"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          返回实践足迹
        </button>
      </div>
    </div>
  );
}
