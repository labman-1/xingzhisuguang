import { useRef } from 'react';
import { REGION } from '../content';

const GALLERY_REGIONS = [
  { value: REGION.NANJING, label: '南京市内' },
  { value: REGION.NATIONAL, label: '南京市外' },
];

export default function GalleryRegionToggle({ activeRegion, onChange }) {
  const tabListRef = useRef(null);

  const selectRegion = (region) => {
    onChange(region);
    tabListRef.current?.querySelector(`[data-region="${region}"]`)?.focus();
  };

  const handleKeyDown = (event) => {
    const currentIndex = GALLERY_REGIONS.findIndex((item) => item.value === activeRegion);
    let nextIndex = null;

    if (event.key === 'ArrowLeft') nextIndex = currentIndex - 1;
    if (event.key === 'ArrowRight') nextIndex = currentIndex + 1;
    if (event.key === 'Home') nextIndex = 0;
    if (event.key === 'End') nextIndex = GALLERY_REGIONS.length - 1;
    if (nextIndex == null) return;

    event.preventDefault();
    const normalizedIndex = (nextIndex + GALLERY_REGIONS.length) % GALLERY_REGIONS.length;
    selectRegion(GALLERY_REGIONS[normalizedIndex].value);
  };

  return (
    <div
      ref={tabListRef}
      role="tablist"
      aria-label="实践影像区域"
      onKeyDown={handleKeyDown}
      className="inline-flex shrink-0 items-center rounded-full border border-[#d9c9a6] bg-[#f7f1e5] p-1"
    >
      {GALLERY_REGIONS.map((region) => {
        const isActive = activeRegion === region.value;
        return (
          <button
            key={region.value}
            role="tab"
            type="button"
            data-region={region.value}
            aria-selected={isActive}
            tabIndex={isActive ? 0 : -1}
            onClick={() => onChange(region.value)}
            className={`rounded-full px-3 py-2 text-xs font-bold leading-none transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-600 focus-visible:ring-offset-1 ${
              isActive
                ? 'bg-emerald-700 text-white shadow-sm'
                : 'text-[#55675f] hover:bg-white/80 hover:text-emerald-800'
            }`}
          >
            {region.label}
          </button>
        );
      })}
    </div>
  );
}
