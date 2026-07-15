export default function PhotoWall({ photos, schoolName }) {
  // If we have real photos, render them
  const hasPhotos = photos && photos.length > 0;

  return (
    <section>
      {/* Section Heading */}
      <div className="flex items-center gap-3 mb-6">
        <div className="w-8 h-8 bg-emerald-100 text-emerald-600 rounded-lg flex items-center justify-center">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
              d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
        </div>
        <h2 className="text-xl font-bold text-slate-900">影像纪实</h2>
        <span className="text-xs text-slate-400 bg-slate-100 px-2 py-0.5 rounded-full">
          {hasPhotos ? `${photos.length} 张` : '待补充'}
        </span>
      </div>

      {hasPhotos ? (
        /* Real Photo Grid */
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {photos.map((url, index) => (
            <div key={index} className="aspect-square rounded-xl overflow-hidden bg-slate-100 group">
              <img
                src={url}
                alt={`${schoolName} 照片 ${index + 1}`}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                loading="lazy"
              />
            </div>
          ))}
        </div>
      ) : (
        /* Skeleton Loader Grid */
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {Array.from({ length: 8 }).map((_, i) => (
            <div
              key={i}
              className="aspect-square rounded-xl bg-slate-100 animate-pulse flex items-center justify-center"
              style={{ animationDelay: `${i * 100}ms` }}
            >
              <svg
                className="w-8 h-8 text-slate-300"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
            </div>
          ))}
        </div>
      )}

      {!hasPhotos && (
        <p className="text-center text-xs text-slate-400 mt-4">
          校园环境照片正在整理中，敬请期待
        </p>
      )}
    </section>
  );
}
