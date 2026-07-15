export default function VideoPlayer({ video }) {
  const hasVideo = video && video.placeholder;

  return (
    <section>
      {/* Section Heading */}
      <div className="flex items-center gap-3 mb-6">
        <div className="w-8 h-8 bg-amber-100 text-amber-600 rounded-lg flex items-center justify-center">
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
          </svg>
        </div>
        <h2 className="text-xl font-bold text-slate-900">实践视频</h2>
      </div>

      {hasVideo ? (
        /* Real Video Embed */
        <div className="aspect-video rounded-xl overflow-hidden bg-black">
          <iframe
            src={video.placeholder}
            title={video.title}
            className="w-full h-full"
            allowFullScreen
            allow="autoplay; encrypted-media"
          />
        </div>
      ) : (
        /* Placeholder */
        <div className="relative aspect-video rounded-xl bg-slate-100 border-2 border-dashed border-slate-300 flex flex-col items-center justify-center
                        hover:border-emerald-300 hover:bg-slate-50 transition-colors group">
          {/* Play Button */}
          <div className="w-16 h-16 bg-white rounded-full shadow-md flex items-center justify-center mb-4
                          group-hover:scale-110 group-hover:shadow-lg transition-all duration-300">
            <svg className="w-6 h-6 text-emerald-600 ml-1" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
            </svg>
          </div>

          {/* Video Title */}
          <h3 className="text-sm font-medium text-slate-600 mb-1">
            {video?.title || '访谈视频'}
          </h3>

          {/* Hint */}
          <p className="text-xs text-slate-400">
            视频素材正在剪辑制作中，敬请期待
          </p>
        </div>
      )}

      {/* Video Title displayed below */}
      {video?.title && (
        <p className="mt-3 text-sm text-slate-500 text-center">{video.title}</p>
      )}
    </section>
  );
}
