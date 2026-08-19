import { useRef } from 'react';
import { REGION } from '../content';

const REGION_TABS = [
  { value: REGION.NANJING, label: '金陵筑梦 · 晓庄星火' },
  { value: REGION.NATIONAL, label: '万里溯光 · 乡土弘毅' },
];

export default function RegionTabs({
  activeRegion,
  onChange,
  ariaLabel = '实践区域',
  className = '',
}) {
  const tabListRef = useRef(null);

  const moveFocus = (direction) => {
    const currentIndex = REGION_TABS.findIndex((tab) => tab.value === activeRegion);
    const nextIndex = (currentIndex + direction + REGION_TABS.length) % REGION_TABS.length;
    const nextRegion = REGION_TABS[nextIndex].value;
    onChange(nextRegion);
    tabListRef.current?.querySelector(`[data-region="${nextRegion}"]`)?.focus();
  };

  const handleKeyDown = (event) => {
    if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
      event.preventDefault();
      moveFocus(event.key === 'ArrowRight' ? 1 : -1);
    }
    if (event.key === 'Home' || event.key === 'End') {
      event.preventDefault();
      const nextRegion = event.key === 'Home'
        ? REGION_TABS[0].value
        : REGION_TABS[REGION_TABS.length - 1].value;
      onChange(nextRegion);
      tabListRef.current?.querySelector(`[data-region="${nextRegion}"]`)?.focus();
    }
  };

  return (
    <div
      ref={tabListRef}
      role="tablist"
      aria-label={ariaLabel}
      onKeyDown={handleKeyDown}
      className={`mx-auto flex w-full max-w-xl rounded-2xl border border-emerald-100 bg-white/70 p-1.5 shadow-sm backdrop-blur ${className}`}
    >
      {REGION_TABS.map((tab) => {
        const isActive = activeRegion === tab.value;
        return (
          <button
            key={tab.value}
            role="tab"
            type="button"
            data-region={tab.value}
            aria-selected={isActive}
            tabIndex={isActive ? 0 : -1}
            onClick={() => onChange(tab.value)}
            className={`relative flex-1 rounded-xl px-3 py-3 text-sm font-bold transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 sm:px-4 ${
              isActive
                ? 'bg-emerald-700 text-white shadow-md shadow-emerald-900/10'
                : 'text-emerald-800 hover:bg-emerald-50'
            }`}
          >
            {tab.label}
          </button>
        );
      })}
    </div>
  );
}
