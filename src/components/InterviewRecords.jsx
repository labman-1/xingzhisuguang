import { CalendarDays, MapPin, ShieldCheck } from 'lucide-react';

function asArray(value) {
  if (value == null) return [];
  return Array.isArray(value) ? value : [value];
}

function formatDate(value) {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value || '')) return value;
  return new Intl.DateTimeFormat('zh-CN', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(new Date(`${value}T00:00:00+08:00`));
}

function getContentParagraphs(record) {
  if (typeof record?.content !== 'string') return [];
  return record.content
    .split(/\n\s*\n/)
    .map((paragraph) => paragraph.trim())
    .filter(Boolean);
}

function renderStructuredParagraph(paragraph, index) {
  if (typeof paragraph === 'string') {
    return <p key={index}>{paragraph}</p>;
  }

  if (!paragraph || typeof paragraph !== 'object') return null;

  if (paragraph.question || paragraph.answer) {
    return (
      <div key={paragraph.id || index} className="rounded-2xl border border-emerald-100 bg-emerald-50/55 p-5">
        {paragraph.question && <p className="font-bold text-emerald-900">问：{paragraph.question}</p>}
        {paragraph.answer && <p className="mt-3 leading-8 text-slate-700">答：{paragraph.answer}</p>}
      </div>
    );
  }

  const text = paragraph.text || paragraph.content || paragraph.body;
  return text ? <p key={paragraph.id || index}>{text}</p> : null;
}

export default function InterviewRecords({ interviews = [], schoolName = '' }) {
  const records = asArray(interviews).filter(Boolean);

  return (
    <section aria-labelledby="interview-records-title">
      <div className="mb-7">
        <p className="mb-2 text-sm font-bold tracking-[0.18em] text-[#9a7224]">ORAL HISTORY</p>
        <h2 id="interview-records-title" className="section-heading">采访记录</h2>
        <p className="mt-3 max-w-3xl leading-7 text-slate-600">
          记录受访者对行知教育理念、学校实践与育人经验的讲述。
        </p>
      </div>

      {records.length === 0 ? (
        <div className="rounded-3xl border border-dashed border-[#cdbb94] bg-[#fffaf0] px-6 py-10 text-center">
          <h3 className="text-lg font-bold text-emerald-900">采访记录整理中</h3>
          <p className="mx-auto mt-3 max-w-2xl leading-7 text-slate-600">
            {schoolName ? `${schoolName}的` : ''}原始采访总结稿将在完成核对、授权与编辑后发布。
          </p>
        </div>
      ) : (
        <div className="space-y-6">
          {records.map((record, recordIndex) => {
            const structuredParagraphs = asArray(record.paragraphs);
            const contentParagraphs = getContentParagraphs(record);
            const lead = asArray(record.lead).filter(Boolean);
            const sections = asArray(record.sections).filter(Boolean);
            const isArticle = lead.length > 0 || sections.length > 0;

            return (
              <article
                key={record.id || recordIndex}
                className="overflow-hidden rounded-3xl border border-[#ddd2ba] bg-white shadow-sm"
              >
                <header className="border-b border-[#eee5d3] bg-[#fffaf0] px-6 py-8 sm:px-10 sm:py-10">
                  <p className="text-sm font-bold tracking-[0.16em] text-[#8a651d]">
                    {record.format || '采访纪实'}
                  </p>
                  <h3 className="mt-3 text-balance text-2xl font-black leading-tight text-emerald-950 sm:text-3xl md:text-4xl">
                    {record.topic || record.title || `采访记录 ${recordIndex + 1}`}
                  </h3>
                  {(record.interviewee || record.date || record.location) && (
                    <div className="mt-5 flex flex-wrap gap-x-5 gap-y-2 text-sm text-slate-600">
                      {record.date && (
                        <span className="inline-flex items-center gap-1.5">
                          <CalendarDays aria-hidden="true" size={16} />
                          <time dateTime={record.date}>{formatDate(record.date)}</time>
                        </span>
                      )}
                      {record.location && (
                        <span className="inline-flex items-center gap-1.5">
                          <MapPin aria-hidden="true" size={16} />
                          {record.location}
                        </span>
                      )}
                      {record.interviewee && <span>{record.interviewee}</span>}
                    </div>
                  )}
                </header>

                <div className="px-6 py-8 sm:px-10 sm:py-10 md:px-14">
                  {record.privacy === 'anonymized' && (
                    <p className="mb-8 flex items-start gap-2 rounded-2xl border border-emerald-100 bg-emerald-50/60 px-4 py-3 text-sm leading-6 text-emerald-900">
                      <ShieldCheck aria-hidden="true" className="mt-0.5 shrink-0" size={17} />
                      为保护受访者及未成年人隐私，本文隐去私人姓名与可识别个人身份的细节，并在不改变原意的前提下进行编辑整理。
                    </p>
                  )}

                  {isArticle ? (
                    <div className="mx-auto max-w-3xl">
                      <div className="space-y-5 text-lg leading-9 text-[#314c42] first-letter:text-2xl">
                        {lead.map((paragraph, index) => <p key={index}>{paragraph}</p>)}
                      </div>

                      <div className="mt-10 space-y-10">
                        {sections.map((section, sectionIndex) => (
                          <section key={section.title || sectionIndex}>
                            <h4 className="text-xl font-black leading-8 text-emerald-900 sm:text-2xl">
                              {section.title}
                            </h4>
                            <div className="mt-4 space-y-4 leading-8 text-slate-700">
                              {asArray(section.paragraphs).map((paragraph, index) => (
                                <p key={index}>{paragraph}</p>
                              ))}
                            </div>
                          </section>
                        ))}
                      </div>

                      {record.closingQuote && (
                        <blockquote className="mt-10 border-l-4 border-amber-500 bg-[#fffaf0] px-5 py-4 font-serif text-lg font-bold leading-8 text-emerald-950 sm:text-xl">
                          {record.closingQuote}
                        </blockquote>
                      )}
                    </div>
                  ) : (
                    <div className="space-y-4 leading-8 text-slate-700">
                      {contentParagraphs.map((paragraph, index) => <p key={index}>{paragraph}</p>)}
                      {structuredParagraphs.map(renderStructuredParagraph)}
                    </div>
                  )}
                </div>
              </article>
            );
          })}
        </div>
      )}
    </section>
  );
}
