import { useId, useState } from 'react';
import { ChevronDown, FileText, MessagesSquare } from 'lucide-react';

function getInterviewKey(interview, index) {
  return String(interview?.id || interview?.slug || `interview-${index + 1}`);
}

function splitParagraphs(value) {
  if (value == null) return [];
  if (Array.isArray(value)) return value.flatMap(splitParagraphs);
  if (typeof value === 'object') return [value];

  return String(value)
    .split(/\n\s*\n/g)
    .map((paragraph) => paragraph.trim())
    .filter(Boolean);
}

function InterviewContent({ interview }) {
  const content = interview.paragraphs
    || interview.transcript
    || interview.content
    || interview.body
    || interview.summary;
  const blocks = splitParagraphs(content);

  if (blocks.length === 0) {
    return <p className="text-sm text-slate-600">该主题的访谈文字正在校对整理中。</p>;
  }

  return (
    <div className="content-flow">
      {blocks.map((block, index) => {
        if (typeof block === 'string') {
          return <p key={index} className="whitespace-pre-line">{block}</p>;
        }

        if (block.question || block.answer) {
          return (
            <div key={block.id || index} className="rounded-xl bg-slate-50 p-4 sm:p-5">
              {block.question && <p className="font-bold text-emerald-900">问：{block.question}</p>}
              {block.answer && <p className="mt-3 whitespace-pre-line text-slate-700">答：{block.answer}</p>}
            </div>
          );
        }

        const text = block.text || block.content || block.body || '';
        if (!text) return null;

        return (
          <p key={block.id || index} className="whitespace-pre-line">
            {block.speaker && <strong className="mr-1 text-slate-900">{block.speaker}：</strong>}
            {text}
          </p>
        );
      })}
    </div>
  );
}

export default function InterviewAccordion({ interviews = [] }) {
  const items = Array.isArray(interviews) ? interviews : [];
  const instanceId = useId().replace(/:/g, '');
  const [activeId, setActiveId] = useState(
    items.length > 0 ? getInterviewKey(items[0], 0) : null,
  );
  const resolvedActiveId = activeId === null || items.some(
    (item, index) => getInterviewKey(item, index) === activeId,
  )
    ? activeId
    : (items.length > 0 ? getInterviewKey(items[0], 0) : null);

  const headingId = `interviews-${instanceId}-title`;

  if (items.length === 0) {
    return (
      <section aria-labelledby={headingId}>
        <div className="mb-6 flex items-center gap-3">
          <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-100 text-emerald-700" aria-hidden="true">
            <FileText size={20} />
          </span>
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.14em] text-emerald-700">口述记录</p>
            <h2 id={headingId} className="text-2xl font-bold text-slate-900">访谈记录</h2>
          </div>
        </div>
        <div className="media-empty-state">
          <MessagesSquare aria-hidden="true" className="mx-auto text-emerald-700" size={36} strokeWidth={1.5} />
          <p className="mt-4 font-semibold text-slate-700">访谈文字正在整理</p>
          <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-slate-600">
            录音转写、受访者确认和文字校对完成后，将按主题分节发布。
          </p>
        </div>
      </section>
    );
  }

  return (
    <section aria-labelledby={headingId}>
      <div className="mb-6 flex flex-wrap items-center gap-3">
        <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-100 text-emerald-700" aria-hidden="true">
          <FileText size={20} />
        </span>
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.14em] text-emerald-700">口述记录</p>
          <h2 id={headingId} className="text-2xl font-bold text-slate-900">访谈记录</h2>
        </div>
        <span className="ml-auto rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-600">
          {items.length} 个主题
        </span>
      </div>

      <div className="space-y-3">
        {items.map((interview, index) => {
          const interviewId = getInterviewKey(interview, index);
          const isActive = resolvedActiveId === interviewId;
          const triggerId = `interview-${instanceId}-${index}-trigger`;
          const panelId = `interview-${instanceId}-${index}-panel`;
          const topic = interview.topic || interview.title || interview.question || `访谈主题 ${index + 1}`;

          return (
            <article key={interviewId} className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
              <h3>
                <button
                  type="button"
                  id={triggerId}
                  className="flex min-h-14 w-full items-center justify-between gap-4 px-4 py-4 text-left transition-colors hover:bg-slate-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-emerald-600 sm:px-6"
                  onClick={() => setActiveId(isActive ? null : interviewId)}
                  aria-expanded={isActive}
                  aria-controls={panelId}
                >
                  <span className="flex min-w-0 items-center gap-3">
                    <span className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-xs font-black ${isActive ? 'bg-emerald-700 text-white' : 'bg-slate-100 text-slate-600'}`} aria-hidden="true">
                      {index + 1}
                    </span>
                    <span className={`font-bold leading-6 ${isActive ? 'text-emerald-800' : 'text-slate-800'}`}>
                      {topic}
                    </span>
                  </span>
                  <ChevronDown
                    aria-hidden="true"
                    size={20}
                    className={`shrink-0 text-slate-500 transition-transform ${isActive ? 'rotate-180' : ''}`}
                  />
                </button>
              </h3>

              <div
                id={panelId}
                role="region"
                aria-labelledby={triggerId}
                hidden={!isActive}
                className="border-t border-slate-100 px-4 py-6 sm:px-6 sm:py-7"
              >
                {(interview.interviewee || interview.speaker || interview.role) && (
                  <p className="mb-5 text-sm text-slate-600">
                    {interview.interviewee || interview.speaker}
                    {(interview.interviewee || interview.speaker) && interview.role ? ' · ' : ''}
                    {interview.role}
                  </p>
                )}
                <InterviewContent interview={interview} />
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}
