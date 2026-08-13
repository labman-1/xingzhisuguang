function asArray(value) {
  if (value == null) return [];
  return Array.isArray(value) ? value : [value];
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

            return (
              <article
                key={record.id || recordIndex}
                className="rounded-3xl border border-[#ddd2ba] bg-white px-6 py-7 shadow-sm sm:px-8"
              >
                <h3 className="text-2xl font-black text-emerald-900">
                  {record.topic || record.title || `采访记录 ${recordIndex + 1}`}
                </h3>
                {(record.interviewee || record.date) && (
                  <p className="mt-2 text-sm text-slate-500">
                    {[record.interviewee, record.date].filter(Boolean).join(' · ')}
                  </p>
                )}
                <div className="mt-6 space-y-4 leading-8 text-slate-700">
                  {contentParagraphs.map((paragraph, index) => <p key={index}>{paragraph}</p>)}
                  {structuredParagraphs.map(renderStructuredParagraph)}
                </div>
              </article>
            );
          })}
        </div>
      )}
    </section>
  );
}
