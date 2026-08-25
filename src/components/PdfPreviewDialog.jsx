import { ExternalLink, LoaderCircle, X } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

function getViewerUrl(src) {
  if (!src) return '';
  return `${src}#toolbar=0&navpanes=0&view=FitH`;
}

export default function PdfPreviewDialog({ resource, onClose }) {
  const [loaded, setLoaded] = useState(false);
  const closeButtonRef = useRef(null);

  useEffect(() => {
    if (!resource) return undefined;

    const previousOverflow = document.body.style.overflow;
    const handleKeyDown = (event) => {
      if (event.key === 'Escape') onClose?.();
    };

    document.body.style.overflow = 'hidden';
    document.addEventListener('keydown', handleKeyDown);
    closeButtonRef.current?.focus();

    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [onClose, resource]);

  if (!resource?.src) return null;

  const titleId = `pdf-preview-${resource.id}-title`;
  const viewerUrl = getViewerUrl(resource.src);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#061b17]/85 p-3 backdrop-blur-sm sm:p-6">
      <section
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        className="flex h-[94vh] w-full max-w-6xl flex-col overflow-hidden rounded-2xl bg-[#f8f3e8] shadow-2xl sm:h-[92vh] sm:rounded-3xl"
      >
        <header className="flex items-center gap-4 border-b border-[#ddd2ba] px-4 py-3 sm:px-6 sm:py-4">
          <div className="min-w-0 flex-1">
            <p className="text-xs font-bold uppercase tracking-[0.14em] text-amber-700">PDF 在线预览</p>
            <h2 id={titleId} className="truncate text-base font-bold text-[#173c32] sm:text-lg">
              {resource.title}
            </h2>
          </div>
          <a
            href={viewerUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden min-h-11 items-center gap-2 rounded-xl px-3 text-sm font-bold text-emerald-800 hover:bg-emerald-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-600 sm:inline-flex"
          >
            新窗口查看
            <ExternalLink aria-hidden="true" size={16} />
          </a>
          <button
            ref={closeButtonRef}
            type="button"
            onClick={onClose}
            className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-emerald-900 text-white transition hover:bg-emerald-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-600 focus-visible:ring-offset-2"
            aria-label="关闭 PDF 预览"
          >
            <X aria-hidden="true" size={20} />
          </button>
        </header>

        <div className="relative min-h-0 flex-1 bg-[#d8d3c8]" aria-busy={!loaded}>
          {!loaded && (
            <div className="absolute inset-0 z-10 flex flex-col items-center justify-center bg-[#f8f3e8] text-center text-[#49645b]">
              <LoaderCircle aria-hidden="true" className="animate-spin text-amber-600" size={36} />
              <p className="mt-4 font-semibold">正在加载 PDF 画面…</p>
            </div>
          )}
          <iframe
            src={viewerUrl}
            title={`${resource.title} PDF 预览`}
            className="h-full w-full border-0"
            loading="lazy"
            onLoad={() => setLoaded(true)}
          />
        </div>

        <footer className="flex items-center justify-between gap-3 border-t border-[#ddd2ba] px-4 py-3 text-xs text-[#617068] sm:px-6">
          <span>{resource.pageCount} 页 · {resource.fileSize}</span>
          <a
            href={viewerUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="font-bold text-emerald-800 underline underline-offset-4 sm:hidden"
          >
            无法显示？新窗口查看
          </a>
          <span className="hidden sm:inline">可使用浏览器内置控件翻页和缩放</span>
        </footer>
      </section>
    </div>
  );
}
