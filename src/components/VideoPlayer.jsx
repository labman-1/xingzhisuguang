import { ExternalLink, PlayCircle, Video } from 'lucide-react';

const VIDEO_FILE_PATTERN = /\.(mp4|webm|ogg)(?:$|[?#])/i;

function normalizeTrack(track, index) {
  if (typeof track === 'string') {
    return {
      src: track,
      label: '中文字幕',
      srcLang: 'zh-CN',
      kind: 'subtitles',
      default: index === 0,
    };
  }

  if (!track || typeof track !== 'object' || !track.src) return null;
  return {
    kind: track.kind || 'subtitles',
    src: track.src,
    srcLang: track.srcLang || track.lang || 'zh-CN',
    label: track.label || '中文字幕',
    default: Boolean(track.default),
  };
}

function normalizeVideo(video, index) {
  if (typeof video === 'string') {
    return {
      type: VIDEO_FILE_PATTERN.test(video) ? 'file' : 'external',
      src: video,
      title: `实践视频 ${index + 1}`,
      subtitles: [],
    };
  }

  if (!video || typeof video !== 'object') return null;

  const src = video.embedUrl
    || video.fileUrl
    || video.externalUrl
    || video.src
    || video.url
    || video.href
    || video.placeholder;
  const inferredType = video.embedUrl || video.placeholder
    ? 'embed'
    : video.fileUrl || VIDEO_FILE_PATTERN.test(src || '')
      ? 'file'
      : 'external';
  const rawTracks = video.subtitles || video.tracks || (video.subtitle ? [video.subtitle] : []);

  return {
    ...video,
    type: ['embed', 'file', 'external'].includes(video.type) ? video.type : inferredType,
    src,
    title: video.title || video.name || `实践视频 ${index + 1}`,
    description: video.description || video.caption,
    subtitles: (Array.isArray(rawTracks) ? rawTracks : [rawTracks])
      .map(normalizeTrack)
      .filter(Boolean),
  };
}

function PendingVideo({ video }) {
  return (
    <div className="media-empty-state min-h-56">
      <PlayCircle aria-hidden="true" className="mx-auto text-emerald-700" size={40} strokeWidth={1.5} />
      <h3 className="mt-4 font-semibold text-slate-700">{video.title}</h3>
      <p className="mt-2 text-sm text-slate-600">视频正在剪辑、配字幕或等待发布授权。</p>
    </div>
  );
}

function VideoItem({ video }) {
  if (!video.src) return <PendingVideo video={video} />;

  if (video.type === 'embed') {
    return (
      <div className="overflow-hidden rounded-2xl border border-slate-200 bg-slate-950 shadow-sm">
        <div className="aspect-video">
          <iframe
            src={video.src}
            title={video.title}
            className="h-full w-full border-0"
            loading="lazy"
            referrerPolicy="strict-origin-when-cross-origin"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
          />
        </div>
      </div>
    );
  }

  if (video.type === 'file') {
    return (
      <div className="overflow-hidden rounded-2xl border border-slate-200 bg-slate-950 shadow-sm">
        <video
          className="aspect-video h-auto w-full"
          controls
          playsInline
          preload="metadata"
          poster={video.poster || undefined}
          aria-label={video.title}
        >
          <source src={video.src} type={video.mimeType || video.mime || undefined} />
          {video.subtitles.map((track) => (
            <track
              key={`${track.src}-${track.srcLang}`}
              kind={track.kind}
              src={track.src}
              srcLang={track.srcLang}
              label={track.label}
              default={track.default}
            />
          ))}
          您的浏览器暂不支持 HTML5 视频，可使用下方链接打开视频。
        </video>
        <p className="bg-slate-900 px-4 py-3 text-center text-sm text-slate-200">
          无法播放？
          <a className="ml-1 font-semibold text-amber-300 underline underline-offset-4 hover:text-amber-200" href={video.src}>
            直接打开视频文件
          </a>
        </p>
      </div>
    );
  }

  return (
    <a
      href={video.src}
      target="_blank"
      rel="noopener noreferrer"
      className="group flex min-h-48 flex-col items-center justify-center rounded-2xl border border-emerald-200 bg-emerald-50 px-6 py-10 text-center transition hover:border-emerald-400 hover:bg-emerald-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-600"
      aria-label={`${video.title}（在新窗口打开）`}
    >
      <span className="flex h-14 w-14 items-center justify-center rounded-full bg-white text-emerald-700 shadow-sm transition group-hover:scale-105" aria-hidden="true">
        <ExternalLink size={24} />
      </span>
      <span className="mt-4 font-bold text-emerald-900">前往外部平台观看</span>
      <span className="mt-2 text-sm text-emerald-800">将在新窗口打开视频页面</span>
    </a>
  );
}

export default function VideoPlayer({ videos, video }) {
  const rawVideos = videos ?? video;
  const candidates = Array.isArray(rawVideos) ? rawVideos : rawVideos ? [rawVideos] : [];
  const normalizedVideos = candidates.map(normalizeVideo).filter(Boolean);
  const headingId = 'school-video-player-title';

  return (
    <section aria-labelledby={headingId}>
      <div className="mb-6 flex flex-wrap items-center gap-3">
        <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-100 text-amber-700" aria-hidden="true">
          <Video size={20} />
        </span>
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.14em] text-amber-700">动态记录</p>
          <h2 id={headingId} className="text-2xl font-bold text-slate-900">实践视频</h2>
        </div>
        {normalizedVideos.length > 0 && (
          <span className="ml-auto rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-600">
            {normalizedVideos.length} 则
          </span>
        )}
      </div>

      {normalizedVideos.length > 0 ? (
        <ul className="space-y-7" aria-label="实践视频列表">
          {normalizedVideos.map((item, index) => (
            <li key={`${item.title}-${item.src || 'pending'}-${index}`}>
              <article aria-labelledby={`video-item-${index}-title`}>
                <VideoItem video={item} />
                <div className="mt-4 px-1">
                  <h3 id={`video-item-${index}-title`} className="font-bold text-slate-900">{item.title}</h3>
                  {item.description && <p className="mt-1 text-sm leading-6 text-slate-600">{item.description}</p>}
                </div>
              </article>
            </li>
          ))}
        </ul>
      ) : (
        <div className="media-empty-state">
          <PlayCircle aria-hidden="true" className="mx-auto text-amber-700" size={38} strokeWidth={1.5} />
          <p className="mt-4 font-semibold text-slate-700">视频素材正在制作</p>
          <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-slate-600">
            访谈视频将完成剪辑、字幕校对与授权确认后上线。
          </p>
        </div>
      )}
    </section>
  );
}
