import { ExternalLink, LoaderCircle, PlayCircle, Video } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

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
  const inferredType = video.shareUrl && video.filePath
    ? 'nju-box'
    : video.bvid
      ? 'bilibili'
      : video.embedUrl || video.placeholder
        ? 'embed'
        : video.fileUrl || VIDEO_FILE_PATTERN.test(src || '')
          ? 'file'
          : 'external';
  const rawTracks = video.subtitles || video.tracks || (video.subtitle ? [video.subtitle] : []);

  return {
    ...video,
    type: ['nju-box', 'bilibili', 'embed', 'file', 'external'].includes(video.type)
      ? video.type
      : inferredType,
    src,
    title: video.title || video.name || `实践视频 ${index + 1}`,
    description: video.description || video.caption,
    subtitles: (Array.isArray(rawTracks) ? rawTracks : [rawTracks])
      .map(normalizeTrack)
      .filter(Boolean),
  };
}

function buildNjuBoxPreviewUrl(video) {
  try {
    const url = new URL('files/', video.shareUrl);
    if (url.protocol !== 'https:' || url.hostname !== 'box.nju.edu.cn') return '';
    url.searchParams.set('p', video.filePath);
    return url.toString();
  } catch {
    return '';
  }
}

function extractNjuBoxRawPath(html) {
  const match = html.match(/\brawPath:\s*'([^']+)'/);
  if (!match?.[1]) return '';
  const decoded = match[1]
    .replace(/\\u([0-9a-fA-F]{4})/g, (_, code) => String.fromCharCode(Number.parseInt(code, 16)))
    .replace(/\\\//g, '/');
  try {
    const url = new URL(decoded);
    return url.protocol === 'https:' && url.hostname === 'box.nju.edu.cn' &&
      url.pathname.startsWith('/seafhttp/files/')
      ? url.toString()
      : '';
  } catch {
    return '';
  }
}

function SourceLink({ href, children, label }) {
  if (!href) return null;
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex min-h-11 items-center gap-2 rounded-lg px-2 font-semibold text-amber-300 underline decoration-amber-300/60 underline-offset-4 hover:text-amber-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-300"
      aria-label={label}
    >
      {children}
      <ExternalLink aria-hidden="true" size={15} />
    </a>
  );
}

function NjuBoxVideo({ video }) {
  const previewUrl = buildNjuBoxPreviewUrl(video);
  const [status, setStatus] = useState('idle');
  const [rawPath, setRawPath] = useState('');
  const requestRef = useRef(null);

  useEffect(() => () => requestRef.current?.abort(), []);

  const loadVideo = async () => {
    if (!previewUrl || status === 'loading') return;
    requestRef.current?.abort();
    const controller = new AbortController();
    requestRef.current = controller;
    setStatus('loading');

    try {
      const response = await fetch(previewUrl, {
        credentials: 'omit',
        headers: { Accept: 'text/html' },
        signal: controller.signal,
      });
      if (!response.ok) throw new Error(`NJU Box preview returned ${response.status}`);
      const resolvedPath = extractNjuBoxRawPath(await response.text());
      if (!resolvedPath) throw new Error('NJU Box raw media path was not found');
      setRawPath(resolvedPath);
      setStatus('ready');
    } catch (error) {
      if (error.name !== 'AbortError') setStatus('fallback');
    }
  };

  return (
    <div className="overflow-hidden rounded-2xl border border-[#2c4a40] bg-[#071d18] shadow-sm">
      {status === 'ready' ? (
        <video
          className="aspect-video h-auto w-full bg-black"
          controls
          playsInline
          preload="metadata"
          poster={video.poster || undefined}
          aria-label={video.title}
        >
          <source src={rawPath} type={video.mimeType || 'video/mp4'} />
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
          您的浏览器暂不支持 HTML5 视频，可使用下方链接前往南大 Box 观看。
        </video>
      ) : status === 'fallback' ? (
        <div className="aspect-video">
          <iframe
            src={previewUrl}
            title={`${video.title} · 南大 Box 播放器`}
            className="h-full w-full border-0 bg-white"
            loading="lazy"
            referrerPolicy="strict-origin-when-cross-origin"
            allow="fullscreen; picture-in-picture"
            allowFullScreen
          />
        </div>
      ) : (
        <div className="flex aspect-video flex-col items-center justify-center bg-[#0b2a22] px-6 text-center text-white">
          {status === 'loading' ? (
            <LoaderCircle aria-hidden="true" className="animate-spin text-amber-300" size={38} />
          ) : (
            <PlayCircle aria-hidden="true" className="text-amber-300" size={44} strokeWidth={1.5} />
          )}
          <p className="mt-4 font-bold">{status === 'loading' ? '正在获取安全播放地址' : '从南大 Box 加载视频'}</p>
          <p className="mt-2 max-w-lg text-sm leading-6 text-emerald-100">
            播放时会连接南京大学 Box；视频文件不会存入本站仓库。
          </p>
          <button
            type="button"
            onClick={loadVideo}
            disabled={status === 'loading'}
            className="mt-5 inline-flex min-h-12 items-center justify-center rounded-xl bg-amber-400 px-6 py-3 text-sm font-bold text-emerald-950 hover:bg-amber-300 disabled:cursor-wait disabled:opacity-70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-200"
          >
            {status === 'loading' ? '加载中…' : '加载并播放'}
          </button>
        </div>
      )}

      <div className="flex flex-wrap items-center justify-between gap-2 border-t border-white/10 px-4 py-2 text-sm text-emerald-100">
        <span>来源：南京大学 Box</span>
        <SourceLink href={previewUrl} label={`${video.title}（在南大 Box 新窗口打开）`}>
          查看原视频
        </SourceLink>
      </div>
    </div>
  );
}

function BilibiliVideo({ video }) {
  const embedUrl = `https://player.bilibili.com/player.html?bvid=${encodeURIComponent(video.bvid)}&page=1&high_quality=1&danmaku=0`;
  const originalUrl = video.externalUrl || `https://www.bilibili.com/video/${encodeURIComponent(video.bvid)}`;

  return (
    <div className="overflow-hidden rounded-2xl border border-[#2c4a40] bg-[#071d18] shadow-sm">
      <div className="aspect-video">
        <iframe
          src={embedUrl}
          title={video.title}
          className="h-full w-full border-0"
          loading="lazy"
          referrerPolicy="strict-origin-when-cross-origin"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
        />
      </div>
      <div className="flex justify-end border-t border-white/10 px-4 py-2 text-sm">
        <SourceLink href={originalUrl} label={`${video.title}（在哔哩哔哩新窗口打开）`}>
          在哔哩哔哩查看原视频
        </SourceLink>
      </div>
    </div>
  );
}

function PendingVideo({ video }) {
  return (
    <div className="media-empty-state min-h-56">
      <PlayCircle aria-hidden="true" className="mx-auto text-emerald-700" size={40} strokeWidth={1.5} />
      <h3 className="mt-4 font-semibold text-[#31483f]">{video.title}</h3>
      <p className="mt-2 text-sm text-[#617068]">视频正在剪辑、配字幕或等待发布授权。</p>
    </div>
  );
}

function VideoItem({ video }) {
  if (video.type === 'nju-box') return <NjuBoxVideo video={video} />;
  if (video.type === 'bilibili' && video.bvid) return <BilibiliVideo video={video} />;
  if (!video.src) return <PendingVideo video={video} />;

  if (video.type === 'embed') {
    return (
      <div className="overflow-hidden rounded-2xl border border-[#2c4a40] bg-[#071d18] shadow-sm">
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
      <div className="overflow-hidden rounded-2xl border border-[#2c4a40] bg-[#071d18] shadow-sm">
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
        <p className="bg-[#071d18] px-4 py-3 text-center text-sm text-emerald-100">
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
          <h2 id={headingId} className="text-2xl font-bold text-[#173c32]">实践视频</h2>
        </div>
        {normalizedVideos.length > 0 && (
          <span className="ml-auto rounded-full bg-[#eee5d3] px-3 py-1 text-xs font-semibold text-[#5c6b64]">
            {normalizedVideos.length} 则
          </span>
        )}
      </div>

      {normalizedVideos.length > 0 ? (
        <ul className="space-y-7" aria-label="实践视频列表">
          {normalizedVideos.map((item, index) => (
            <li key={item.id || `${item.title}-${item.src || item.filePath || item.bvid || 'pending'}-${index}`}>
              <article aria-labelledby={`video-item-${index}-title`}>
                <VideoItem video={item} />
                <div className="mt-4 px-1">
                  <h3 id={`video-item-${index}-title`} className="font-bold text-[#173c32]">{item.title}</h3>
                  {item.description && <p className="mt-1 text-sm leading-6 text-[#617068]">{item.description}</p>}
                </div>
              </article>
            </li>
          ))}
        </ul>
      ) : (
        <div className="media-empty-state">
          <PlayCircle aria-hidden="true" className="mx-auto text-amber-700" size={38} strokeWidth={1.5} />
          <p className="mt-4 font-semibold text-[#31483f]">视频素材正在制作</p>
          <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-[#617068]">
            访谈视频将完成剪辑、字幕校对与授权确认后上线。
          </p>
        </div>
      )}
    </section>
  );
}
