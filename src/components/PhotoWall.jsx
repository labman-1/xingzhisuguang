import { Camera, ChevronLeft, ChevronRight, Expand, Image as ImageIcon, X } from 'lucide-react';
import { useEffect, useId, useRef, useState } from 'react';
import ResponsiveImage from './ResponsiveImage';

function normalizePhoto(photo, index, schoolName) {
  if (typeof photo === 'string') {
    return {
      id: `photo-${index}`,
      src: photo,
      alt: `${schoolName || '学校'}实践照片 ${index + 1}`,
    };
  }

  if (!photo || typeof photo !== 'object') return null;

  return {
    ...photo,
    id: photo.id || `photo-${index}`,
    src: photo.src || photo.url,
    alt: photo.alt ?? `${schoolName || '学校'}实践照片 ${index + 1}`,
    caption: photo.caption || photo.description,
    credit: photo.credit || photo.photographer,
    thumbnailSrc: photo.thumbnailSrc || photo.thumbnailUrl,
    lightboxSrc: photo.lightboxSrc || photo.originalSrc,
  };
}

function prefersReducedMotion() {
  return window.matchMedia?.('(prefers-reduced-motion: reduce)').matches ?? false;
}

export default function PhotoWall({ photos = [], schoolName = '' }) {
  const normalizedPhotos = (Array.isArray(photos) ? photos : [])
    .map((photo, index) => normalizePhoto(photo, index, schoolName))
    .filter((photo) => photo?.src);
  const headingId = useId();
  const dialogTitleId = useId();
  const railRef = useRef(null);
  const dialogRef = useRef(null);
  const closeButtonRef = useRef(null);
  const returnFocusRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(null);
  const [canScrollBack, setCanScrollBack] = useState(false);
  const [canScrollForward, setCanScrollForward] = useState(false);
  const activePhoto = activeIndex == null ? null : normalizedPhotos[activeIndex];

  useEffect(() => {
    const rail = railRef.current;
    if (!rail) return undefined;

    const updateControls = () => {
      setCanScrollBack(rail.scrollLeft > 4);
      setCanScrollForward(rail.scrollLeft + rail.clientWidth < rail.scrollWidth - 4);
    };

    updateControls();
    rail.addEventListener('scroll', updateControls, { passive: true });
    window.addEventListener('resize', updateControls);
    return () => {
      rail.removeEventListener('scroll', updateControls);
      window.removeEventListener('resize', updateControls);
    };
  }, [normalizedPhotos.length]);

  useEffect(() => {
    if (activeIndex == null) return undefined;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    closeButtonRef.current?.focus();

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') setActiveIndex(null);
      if (event.key === 'ArrowLeft') {
        event.preventDefault();
        setActiveIndex((index) => (index - 1 + normalizedPhotos.length) % normalizedPhotos.length);
      }
      if (event.key === 'ArrowRight') {
        event.preventDefault();
        setActiveIndex((index) => (index + 1) % normalizedPhotos.length);
      }
      if (event.key === 'Tab') {
        const focusable = dialogRef.current?.querySelectorAll(
          'button:not([disabled]), a[href], video[controls], [tabindex]:not([tabindex="-1"])',
        );
        if (!focusable?.length) return;
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault();
          last.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault();
          first.focus();
        }
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener('keydown', handleKeyDown);
      returnFocusRef.current?.focus();
    };
  }, [activeIndex, normalizedPhotos.length]);

  const scrollRail = (direction) => {
    const rail = railRef.current;
    if (!rail) return;
    const distance = Math.max(rail.clientWidth * 0.82, 280) * direction;
    if (typeof rail.scrollBy === 'function') {
      rail.scrollBy({ left: distance, behavior: prefersReducedMotion() ? 'auto' : 'smooth' });
    } else {
      rail.scrollLeft += distance;
    }
  };

  const handleRailKeyDown = (event) => {
    if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
      event.preventDefault();
      scrollRail(event.key === 'ArrowLeft' ? -1 : 1);
    }
    if (event.key === 'Home' || event.key === 'End') {
      event.preventDefault();
      const rail = railRef.current;
      if (rail) rail.scrollLeft = event.key === 'Home' ? 0 : rail.scrollWidth;
    }
  };

  const openLightbox = (index, trigger) => {
    returnFocusRef.current = trigger;
    setActiveIndex(index);
  };

  return (
    <section aria-labelledby={headingId}>
      <div className="mb-6 flex flex-wrap items-center gap-3">
        <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-100 text-emerald-700" aria-hidden="true">
          <Camera size={20} />
        </span>
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.14em] text-emerald-700">现场影像</p>
          <h2 id={headingId} className="text-2xl font-bold text-[#173c32]">影像纪实</h2>
        </div>
        <span className="ml-auto rounded-full bg-[#eee5d3] px-3 py-1 text-xs font-semibold text-[#5c6b64]">
          {normalizedPhotos.length > 0 ? `${normalizedPhotos.length} 张` : '整理中'}
        </span>
      </div>

      {normalizedPhotos.length > 0 ? (
        <div className="relative">
          <div className="mb-4 flex items-center justify-between gap-4">
            <p className="text-sm text-[#617068]">左右滑动浏览；聚焦图片区后可使用方向键。</p>
            <div className="flex shrink-0 gap-2">
              <button
                type="button"
                onClick={() => scrollRail(-1)}
                disabled={!canScrollBack}
                className="media-rail-button"
                aria-label="浏览上一组照片"
              >
                <ChevronLeft aria-hidden="true" size={20} />
              </button>
              <button
                type="button"
                onClick={() => scrollRail(1)}
                disabled={!canScrollForward}
                className="media-rail-button"
                aria-label="浏览下一组照片"
              >
                <ChevronRight aria-hidden="true" size={20} />
              </button>
            </div>
          </div>

          <ul
            ref={railRef}
            className="media-rail"
            aria-label={`${schoolName || '学校'}影像记录，可横向滚动`}
            tabIndex={0}
            onKeyDown={handleRailKeyDown}
          >
            {normalizedPhotos.map((photo, index) => {
              const thumbnailMedia = photo.thumbnailSrc
                ? { ...photo, src: photo.thumbnailSrc, srcSet: photo.thumbnailSrcSet || [] }
                : photo;
              return (
                <li key={photo.id} className="media-rail__item">
                  <figure className="h-full overflow-hidden rounded-2xl border border-[#ddd2ba] bg-[#fffdf8] shadow-sm">
                    <button
                      type="button"
                      className="group relative block aspect-[4/3] w-full overflow-hidden bg-[#f3ecdc] text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-emerald-700"
                      onClick={(event) => openLightbox(index, event.currentTarget)}
                      aria-label={`查看大图：${photo.caption || photo.alt}`}
                    >
                      <ResponsiveImage
                        media={thumbnailMedia}
                        className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.025]"
                      />
                      <span className="absolute bottom-3 right-3 inline-flex items-center gap-1.5 rounded-full bg-[#071d18]/80 px-3 py-1.5 text-xs font-semibold text-white backdrop-blur-sm">
                        <Expand aria-hidden="true" size={14} />
                        查看大图
                      </span>
                    </button>
                    <figcaption className="min-h-24 space-y-1 px-4 py-3 text-sm leading-6 text-[#41564e]">
                      <p>{photo.caption || photo.alt}</p>
                      {photo.credit && (
                        <p className="text-xs text-[#69766f]">
                          {photo.sourceUrl ? (
                            <a className="underline underline-offset-2 hover:text-emerald-800" href={photo.sourceUrl} target="_blank" rel="noopener noreferrer">
                              图片：{photo.credit}
                            </a>
                          ) : (
                            <>图片：{photo.credit}</>
                          )}
                        </p>
                      )}
                    </figcaption>
                  </figure>
                </li>
              );
            })}
          </ul>
        </div>
      ) : (
        <div className="media-empty-state">
          <ImageIcon aria-hidden="true" className="mx-auto text-emerald-700" size={34} strokeWidth={1.6} />
          <p className="mt-4 font-semibold text-[#31483f]">影像素材正在整理</p>
          <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-[#617068]">
            校园环境、课堂观察与访谈现场照片将在完成授权和图注核对后发布。
          </p>
        </div>
      )}

      {activePhoto && (
        <div
          className="fixed inset-0 z-[80] flex items-center justify-center bg-[#03100d]/95 p-3 sm:p-6"
          role="dialog"
          aria-modal="true"
          aria-labelledby={dialogTitleId}
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) setActiveIndex(null);
          }}
        >
          <div ref={dialogRef} className="relative flex max-h-full w-full max-w-6xl flex-col overflow-hidden rounded-2xl border border-white/15 bg-[#071d18] text-white shadow-2xl">
            <div className="flex items-center justify-between gap-4 border-b border-white/15 px-4 py-3 sm:px-5">
              <div>
                <h3 id={dialogTitleId} className="font-bold">{activePhoto.caption || activePhoto.alt}</h3>
                <p className="mt-0.5 text-xs text-emerald-100" aria-live="polite">
                  第 {activeIndex + 1} 张，共 {normalizedPhotos.length} 张
                </p>
              </div>
              <button
                ref={closeButtonRef}
                type="button"
                className="inline-flex min-h-11 min-w-11 items-center justify-center rounded-xl bg-white/10 text-white hover:bg-white/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-300"
                onClick={() => setActiveIndex(null)}
                aria-label="关闭大图"
              >
                <X aria-hidden="true" size={22} />
              </button>
            </div>

            <div className="relative flex min-h-0 flex-1 items-center justify-center bg-black/35">
              <ResponsiveImage
                media={{
                  ...activePhoto,
                  src: activePhoto.lightboxSrc || activePhoto.src,
                  srcSet: activePhoto.lightboxSrcSet || activePhoto.srcSet,
                }}
                loading="eager"
                className="max-h-[72vh] w-auto object-contain"
              />
              {normalizedPhotos.length > 1 && (
                <>
                  <button
                    type="button"
                    className="lightbox-nav left-3"
                    onClick={() => setActiveIndex((activeIndex - 1 + normalizedPhotos.length) % normalizedPhotos.length)}
                    aria-label="查看上一张大图"
                  >
                    <ChevronLeft aria-hidden="true" size={26} />
                  </button>
                  <button
                    type="button"
                    className="lightbox-nav right-3"
                    onClick={() => setActiveIndex((activeIndex + 1) % normalizedPhotos.length)}
                    aria-label="查看下一张大图"
                  >
                    <ChevronRight aria-hidden="true" size={26} />
                  </button>
                </>
              )}
            </div>

            {activePhoto.credit && (
              <p className="border-t border-white/15 px-4 py-3 text-xs text-emerald-100 sm:px-5">
                图片：{activePhoto.credit}
              </p>
            )}
          </div>
        </div>
      )}
    </section>
  );
}
