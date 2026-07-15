import { Camera, Image as ImageIcon } from 'lucide-react';

function normalizeSrcSet(srcSet) {
  if (!srcSet) return undefined;
  if (typeof srcSet === 'string') return srcSet;
  if (Array.isArray(srcSet)) return srcSet.join(', ');
  if (typeof srcSet === 'object') {
    return Object.entries(srcSet)
      .map(([descriptor, src]) => `${src} ${descriptor}`)
      .join(', ');
  }
  return undefined;
}

function normalizePhoto(photo, index, schoolName) {
  if (typeof photo === 'string') {
    return {
      src: photo,
      alt: `${schoolName || '学校'}实践照片 ${index + 1}`,
    };
  }

  if (!photo || typeof photo !== 'object') return null;

  return {
    ...photo,
    src: photo.src || photo.url,
    alt: photo.alt ?? `${schoolName || '学校'}实践照片 ${index + 1}`,
    caption: photo.caption || photo.description,
    credit: photo.credit || photo.photographer,
    srcSet: normalizeSrcSet(photo.srcSet),
  };
}

export default function PhotoWall({ photos = [], schoolName = '' }) {
  const normalizedPhotos = (Array.isArray(photos) ? photos : [])
    .map((photo, index) => normalizePhoto(photo, index, schoolName))
    .filter((photo) => photo?.src);
  const headingId = 'school-photo-wall-title';

  return (
    <section aria-labelledby={headingId}>
      <div className="mb-6 flex flex-wrap items-center gap-3">
        <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-100 text-emerald-700" aria-hidden="true">
          <Camera size={20} />
        </span>
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.14em] text-emerald-700">现场影像</p>
          <h2 id={headingId} className="text-2xl font-bold text-slate-900">影像纪实</h2>
        </div>
        <span className="ml-auto rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-600">
          {normalizedPhotos.length > 0 ? `${normalizedPhotos.length} 张` : '整理中'}
        </span>
      </div>

      {normalizedPhotos.length > 0 ? (
        <ul className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3" aria-label={`${schoolName || '学校'}影像记录`}>
          {normalizedPhotos.map((photo, index) => (
            <li key={`${photo.src}-${index}`}>
              <figure className="group h-full overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
                <div className="aspect-[4/3] overflow-hidden bg-slate-100">
                  <img
                    src={photo.src}
                    srcSet={photo.srcSet}
                    sizes={photo.srcSet ? '(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw' : undefined}
                    alt={photo.alt}
                    width={photo.width || undefined}
                    height={photo.height || undefined}
                    loading="lazy"
                    decoding="async"
                    className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.03]"
                  />
                </div>
                {(photo.caption || photo.credit) && (
                  <figcaption className="space-y-1 px-4 py-3 text-sm leading-6 text-slate-700">
                    {photo.caption && <p>{photo.caption}</p>}
                    {photo.credit && <p className="text-xs text-slate-500">摄影：{photo.credit}</p>}
                  </figcaption>
                )}
              </figure>
            </li>
          ))}
        </ul>
      ) : (
        <div className="media-empty-state">
          <ImageIcon aria-hidden="true" className="mx-auto text-emerald-700" size={34} strokeWidth={1.6} />
          <p className="mt-4 font-semibold text-slate-700">影像素材正在整理</p>
          <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-slate-600">
            校园环境、课堂观察与访谈现场照片将在完成授权和图注核对后发布。
          </p>
        </div>
      )}
    </section>
  );
}
