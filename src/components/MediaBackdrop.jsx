import { useState } from 'react';
import { hasImageSource } from '../utils/mediaImage';
import ResponsiveImage from './ResponsiveImage';

export default function MediaBackdrop({
  media,
  className = '',
  imageClassName = '',
  overlayClassName = '',
  loading = 'lazy',
  fetchPriority,
  showCredit = true,
}) {
  const [failedMedia, setFailedMedia] = useState(null);
  const configured = hasImageSource(media);
  const hasVisual = configured && failedMedia !== media;

  return (
    <div className={`media-backdrop ${className}`} data-has-image={hasVisual ? 'true' : 'false'}>
      <div className="media-backdrop__fallback" aria-hidden="true">
        <span>{media?.fallbackLabel || '影像待授权后发布'}</span>
      </div>

      {configured && (
        <ResponsiveImage
          media={media}
          alt=""
          loading={loading}
          fetchPriority={fetchPriority}
          pictureClassName="absolute inset-0"
          className={`h-full w-full object-cover ${imageClassName}`}
          onError={() => setFailedMedia(media)}
        />
      )}

      {configured && overlayClassName && (
        <div className={`absolute inset-0 ${overlayClassName}`} aria-hidden="true" />
      )}

      {hasVisual && showCredit && media?.credit && (
        <p className="media-backdrop__credit">
          {media.sourceUrl ? (
            <a href={media.sourceUrl} target="_blank" rel="noopener noreferrer">
              图片：{media.credit}
            </a>
          ) : (
            <>图片：{media.credit}</>
          )}
        </p>
      )}
    </div>
  );
}
