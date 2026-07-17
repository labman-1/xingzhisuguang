import { useState } from 'react';
import { firstSrcFromSet, getFocalPoint, normalizeSrcSet } from '../utils/mediaImage';

export default function ResponsiveImage({
  media,
  alt,
  className = '',
  pictureClassName = '',
  loading = 'lazy',
  fetchPriority,
  sizes,
  onError,
}) {
  const [failedSource, setFailedSource] = useState('');
  const sources = Array.isArray(media?.sources) ? media.sources : [];
  const srcSet = normalizeSrcSet(media?.srcSet);
  const fallbackSrc = media?.src || firstSrcFromSet(media?.srcSet) ||
    sources.map((source) => firstSrcFromSet(source?.srcSet)).find(Boolean);

  const sourceKey = `${fallbackSrc}|${srcSet || ''}`;

  if (!fallbackSrc || failedSource === sourceKey) return null;

  const handleError = (event) => {
    setFailedSource(sourceKey);
    onError?.(event);
  };

  return (
    <picture className={pictureClassName}>
      {sources.map((source, index) => {
        const sourceSet = normalizeSrcSet(source?.srcSet);
        if (!sourceSet) return null;
        return (
          <source
            key={`${source.type || 'image'}-${source.media || 'all'}-${index}`}
            type={source.type || undefined}
            media={source.media || undefined}
            srcSet={sourceSet}
            sizes={source.sizes || sizes || media?.sizes || undefined}
          />
        );
      })}
      <img
        src={fallbackSrc}
        srcSet={srcSet}
        sizes={sizes || media?.sizes || undefined}
        alt={alt ?? media?.alt ?? ''}
        width={media?.width || undefined}
        height={media?.height || undefined}
        loading={loading}
        decoding="async"
        fetchpriority={fetchPriority}
        draggable="false"
        className={className}
        style={{ objectPosition: getFocalPoint(media) }}
        onError={handleError}
      />
    </picture>
  );
}
