export function normalizeSrcSet(value) {
  if (!value) return undefined;
  if (typeof value === 'string') return value;
  if (Array.isArray(value)) return value.filter(Boolean).join(', ');
  if (typeof value === 'object') {
    return Object.entries(value)
      .map(([descriptor, src]) => `${src} ${descriptor}`)
      .join(', ');
  }
  return undefined;
}

export function firstSrcFromSet(value) {
  const normalized = normalizeSrcSet(value);
  return normalized?.split(',')[0]?.trim().split(/\s+/)[0] || '';
}

export function hasImageSource(media) {
  if (!media || typeof media !== 'object') return false;
  if (typeof media.src === 'string' && media.src.trim()) return true;
  if (firstSrcFromSet(media.srcSet)) return true;
  return Array.isArray(media.sources) && media.sources.some((source) => firstSrcFromSet(source?.srcSet));
}

export function getFocalPoint(media) {
  const focalPoint = media?.focalPoint;
  if (typeof focalPoint === 'string' && focalPoint.trim()) return focalPoint;
  if (focalPoint && typeof focalPoint === 'object') {
    const x = typeof focalPoint.x === 'number' ? `${focalPoint.x}%` : focalPoint.x;
    const y = typeof focalPoint.y === 'number' ? `${focalPoint.y}%` : focalPoint.y;
    if (x && y) return `${x} ${y}`;
  }
  return '50% 50%';
}
