export const PUBLISH_STATUS = Object.freeze({
  DRAFT: 'draft',
  PUBLISHED: 'published',
  ARCHIVED: 'archived',
});

export const SITE_TYPE = Object.freeze({
  PRIMARY_SCHOOL: 'primary-school',
  KINDERGARTEN: 'kindergarten',
  NINE_YEAR_SCHOOL: 'nine-year-school',
});

const published = PUBLISH_STATUS.PUBLISHED;
const draft = PUBLISH_STATUS.DRAFT;

export const practiceSites = [
  {
    id: 'wutang',
    name: '五塘小学',
    type: SITE_TYPE.PRIMARY_SCHOOL,
    logoPlaceholder: '五',
    visit: { date: '2026-06-29', displayDate: '6.29', sequence: 1, stage: '第一站' },
    summary:
      '五塘小学是本次"行知溯光"社会实践的第一站。学校秉承陶行知先生的教育理念，在课程改革与学生综合素质培养方面进行了积极探索。团队成员在此开展了初步的校园参观与教师访谈，为后续调研奠定了基础。',
    philosophyTags: [],
    practices: [
      { id: 'wutang-curriculum', title: '课程改革与学生综合素质培养', publishStatus: draft },
    ],
    gallery: [],
    videos: [{ id: 'wutang-video', title: '五塘小学实践纪实', embedUrl: '', publishStatus: draft }],
    interviews: [],
    resources: [],
    publishStatus: published,
  },
  {
    id: 'yanziyou',
    name: '燕子矶幼儿园',
    type: SITE_TYPE.KINDERGARTEN,
    logoPlaceholder: '燕',
    visit: { date: '2026-07-01', displayDate: '7.1', sequence: 2, stage: '第二站' },
    summary:
      '燕子矶幼儿园是本次调研中唯一一所学前教育机构。园所以陶行知"生活教育"理念为指导，构建了独具特色的"三力课程体系"，并在日常教学中推行"小先生制"，让幼儿在互教互学中成长。本次访谈深入探讨了课程落地的具体实践、一线教师面临的困难与挑战，以及"小先生制"在学前教育阶段的创新应用。',
    philosophyTags: ['生活即教育', '小先生制'],
    practices: [
      { id: 'yanziyou-sanli', title: '三力课程体系', publishStatus: draft },
      { id: 'yanziyou-little-teacher', title: '小先生制', publishStatus: draft },
    ],
    gallery: [],
    videos: [
      {
        id: 'yanziyou-video',
        title: '燕子矶幼儿园 · 三力课程与小先生制访谈',
        embedUrl: '',
        publishStatus: draft,
      },
    ],
    interviews: [
      {
        id: 'yanziyou-shanli',
        topic: '三力课程体系',
        content:
          '（访谈内容待补充）\n\n燕子矶幼儿园的"三力课程体系"是本次调研的重点主题之一。该体系围绕"生命力、思维力、创造力"三个维度构建课程框架，将陶行知"生活即教育"理念融入日常教学。具体内容将在访谈录音整理后更新。',
        publishStatus: draft,
      },
      {
        id: 'yanziyou-opening',
        topic: '开场白',
        content:
          '（访谈内容待补充）\n\n本段记录访谈的开场介绍，包括团队成员自我介绍、调研目的说明以及园方接待教师的背景介绍。详细内容将在访谈录音整理后更新。',
        publishStatus: draft,
      },
      {
        id: 'yanziyou-challenges',
        topic: '困难和挑战',
        content:
          '（访谈内容待补充）\n\n本段聚焦一线教师在践行陶行知教育理念过程中遇到的实际困难与挑战，涵盖师资培训、课程资源、家校协同等方面。详细内容将在访谈录音整理后更新。',
        publishStatus: draft,
      },
      {
        id: 'yanziyou-littleteacher',
        topic: '小先生制',
        content:
          '（访谈内容待补充）\n\n"小先生制"是陶行知教育思想的重要组成部分，燕子矶幼儿园在学前教育阶段对这一制度进行了创新性实践。本段记录园方在推行"小先生制"过程中的经验、成效与反思。详细内容将在访谈录音整理后更新。',
        publishStatus: draft,
      },
    ],
    resources: [],
    publishStatus: published,
  },
  {
    id: 'xiaozhuang',
    name: '晓庄小学',
    type: SITE_TYPE.PRIMARY_SCHOOL,
    logoPlaceholder: '晓',
    visit: { date: '2026-07-02', displayDate: '7.2', sequence: 3, stage: '第三站' },
    summary:
      '晓庄小学与陶行知先生有着深厚的历史渊源。作为晓庄地区的代表性小学，学校在传承行知精神、开展劳动教育与生活实践方面积累了丰富经验。团队成员在此围绕"教学做合一"理念在小学课堂中的落地展开了深入调研。',
    philosophyTags: ['教学做合一'],
    practices: [
      { id: 'xiaozhuang-labour', title: '劳动教育与生活实践', publishStatus: draft },
    ],
    gallery: [],
    videos: [{ id: 'xiaozhuang-video', title: '晓庄小学调研记录', embedUrl: '', publishStatus: draft }],
    interviews: [],
    resources: [],
    publishStatus: published,
  },
  {
    id: 'xiaoshi',
    name: '小市中心小学',
    type: SITE_TYPE.PRIMARY_SCHOOL,
    logoPlaceholder: '市',
    visit: { date: '2026-07-02', displayDate: '7.2', sequence: 4, stage: '第四站' },
    summary:
      '小市中心小学位于南京城区，在素质教育与课程创新方面持续探索。学校将陶行知教育思想与现代教育技术相结合，形成了独具特色的校本课程体系。团队在此重点调研了城市小学如何在新时期背景下践行行知理念。',
    philosophyTags: [],
    practices: [{ id: 'xiaoshi-curriculum', title: '校本课程体系', publishStatus: draft }],
    gallery: [],
    videos: [{ id: 'xiaoshi-video', title: '小市中心小学实践纪实', embedUrl: '', publishStatus: draft }],
    interviews: [],
    resources: [],
    publishStatus: published,
  },
  {
    id: 'xiaozhuangshiyan',
    name: '南京晓庄实验学校',
    type: SITE_TYPE.NINE_YEAR_SCHOOL,
    logoPlaceholder: '实',
    visit: { date: '2026-07-03', displayDate: '7.3', sequence: 5, stage: '第五站' },
    summary:
      '南京晓庄实验学校是一所九年一贯制学校，在晓庄教育体系中承担着重要的实验与示范功能。学校在课程整合、跨学科教学以及学生自主学习能力培养方面进行了大量创新实践，为团队提供了丰富的调研素材。',
    philosophyTags: [],
    practices: [
      { id: 'xiaozhuangshiyan-integration', title: '课程整合、跨学科教学与自主学习', publishStatus: draft },
    ],
    gallery: [],
    videos: [
      { id: 'xiaozhuangshiyan-video', title: '南京晓庄实验学校调研记录', embedUrl: '', publishStatus: draft },
    ],
    interviews: [],
    resources: [],
    publishStatus: published,
  },
  {
    id: 'xiaozhuangfushu',
    name: '晓庄附属小学',
    type: SITE_TYPE.PRIMARY_SCHOOL,
    logoPlaceholder: '附',
    visit: { date: '2026-07-03', displayDate: '7.3', sequence: 6, stage: '第六站' },
    summary:
      '晓庄附属小学是本次社会实践的最后一站。学校依托晓庄教育集团的资源优势，在教师专业发展与校本教研方面形成了鲜明特色。团队在此对为期五天的调研进行了总结性访谈与资料收集，为后续成果整理积累了宝贵的一手素材。',
    philosophyTags: [],
    practices: [
      { id: 'xiaozhuangfushu-teachers', title: '教师专业发展与校本教研', publishStatus: draft },
    ],
    gallery: [],
    videos: [{ id: 'xiaozhuangfushu-video', title: '晓庄附属小学实践纪实', embedUrl: '', publishStatus: draft }],
    interviews: [],
    resources: [],
    publishStatus: published,
  },
];

export const taoXingzhiProfiles = [
  {
    id: 'tao-xingzhi',
    name: '陶行知',
    lifespan: '1891–1946',
    role: '中国近代伟大的教育家、思想家',
    summary:
      '他以"捧着一颗心来，不带半根草去"的赤子情怀，创立了以"生活即教育""社会即学校""教学做合一"为核心理念的生活教育理论体系。',
    publishStatus: published,
  },
];

export const educationalIdeas = [
  {
    id: 'life-is-education',
    title: '生活即教育',
    subtitle: 'Life is Education',
    summary:
      '教育源于生活，归于生活。陶行知主张打破学校围墙，将教育融入日常生活的每一个细节，让学习在真实情境中自然发生。',
    publishStatus: published,
  },
  {
    id: 'society-is-school',
    title: '社会即学校',
    subtitle: 'Society is School',
    summary:
      '整个社会都是教育的场域。陶行知认为学校不应是封闭的象牙塔，而应与广阔的社会生活紧密相连，让学生在社会实践中获得真知。',
    publishStatus: published,
  },
  {
    id: 'unity-of-teaching-learning-doing',
    title: '教学做合一',
    subtitle: 'Unity of Teaching, Learning & Doing',
    summary:
      '教的方法要根据学的方法，学的方法要根据做的方法。陶行知强调"做"是教与学的中心，理论与实践必须紧密结合，在手脑并用中培养完整的人。',
    publishStatus: published,
  },
];

// 书院资料与成果素材尚未核验；先保留独立集合，后续可直接追加条目。
export const academyHeritageEntries = [];
export const achievementResources = [];

export const projectProfile = {
  name: '行知溯光',
  organization: '南京大学 2026 年暑期社会实践团队',
  mission:
    '我们是南京大学 2026 年暑期社会实践团队，以"循行知足迹，溯教育之光"为使命，走进基层学校，用镜头与文字记录当代教育一线对陶行知思想的传承与创新。',
  practiceSummary:
    '通过实地走访南京市五所学校和一所幼儿园，我们深入了解陶行知教育思想在基层教育一线的实践现状。从幼儿园到九年一贯制学校，从"小先生制"到"教学做合一"，我们以访谈、拍摄、文字记录等方式，力求呈现一幅当代行知教育的真实画卷。',
  teamSummary:
    '团队由南京大学工科试验班大一新生组成，分为线上组与线下组。线下组负责实地走访、拍摄与访谈；线上组负责资料整理、网站开发与成果展示。成员信息将后续更新。',
  publishStatus: published,
};

function isVisibleItem(item, includeDrafts) {
  return item?.publishStatus === PUBLISH_STATUS.PUBLISHED ||
    (includeDrafts && item?.publishStatus === PUBLISH_STATUS.DRAFT);
}

export function selectVisibleItems(items, { includeDrafts = false } = {}) {
  if (!Array.isArray(items)) return [];
  return items.filter((item) => isVisibleItem(item, includeDrafts));
}

export function getVisibleProfiles(options = {}) {
  return selectVisibleItems(taoXingzhiProfiles, options);
}

export function getVisibleEducationalIdeas(options = {}) {
  return selectVisibleItems(educationalIdeas, options);
}

export function getVisibleHeritageEntries(options = {}) {
  return selectVisibleItems(academyHeritageEntries, options);
}

export function getVisibleResources(options = {}) {
  return selectVisibleItems(achievementResources, options);
}

function hydrateSite(site, includeDrafts) {
  if (!site || !isVisibleItem(site, includeDrafts)) return null;

  const explicitResources = site.resources.flatMap((resourceId) => {
    if (typeof resourceId !== 'string') return [];
    const match = achievementResources.find((item) => item.id === resourceId);
    return match ? [match] : [];
  });
  const linkedResources = achievementResources.filter((resource) =>
    resource.siteIds?.includes(site.id),
  );
  const resources = [...explicitResources, ...linkedResources]
    .filter((resource) => isVisibleItem(resource, includeDrafts))
    .filter((resource, index, items) => items.findIndex((item) => item.id === resource.id) === index);

  return {
    ...site,
    practices: site.practices.filter((item) => isVisibleItem(item, includeDrafts)),
    gallery: site.gallery.filter((item) => isVisibleItem(item, includeDrafts)),
    videos: site.videos.filter((item) => isVisibleItem(item, includeDrafts)),
    interviews: site.interviews.filter((item) => isVisibleItem(item, includeDrafts)),
    resources,
  };
}

export function getSiteById(id, { includeDrafts = false } = {}) {
  return hydrateSite(practiceSites.find((site) => site.id === id), includeDrafts);
}

export function getVisiblePracticeSites({ includeDrafts = false } = {}) {
  return selectVisibleItems(practiceSites, { includeDrafts })
    .map((site) => hydrateSite(site, includeDrafts));
}

export function getVisitSchedule({ includeDrafts = false } = {}) {
  return getVisiblePracticeSites({ includeDrafts })
    .map(({ id, name, type, visit, publishStatus }) => ({
      siteId: id,
      siteName: name,
      type,
      publishStatus,
      ...visit,
    }))
    .sort((a, b) => a.sequence - b.sequence);
}

export function getResourceById(id, { includeDrafts = false } = {}) {
  const resource = achievementResources.find((item) => item.id === id) ?? null;
  return resource && isVisibleItem(resource, includeDrafts) ? resource : null;
}

export function getResourcesBySiteId(siteId, { includeDrafts = false } = {}) {
  return getVisibleResources({ includeDrafts }).filter(
    (resource) => resource.siteIds?.includes(siteId),
  );
}

export function getHeritageEntryById(id, { includeDrafts = false } = {}) {
  const entry = academyHeritageEntries.find((item) => item.id === id) ?? null;
  return entry && isVisibleItem(entry, includeDrafts) ? entry : null;
}

const allowedStatuses = new Set(Object.values(PUBLISH_STATUS));
const allowedSiteTypes = new Set(Object.values(SITE_TYPE));
const allowedVideoTypes = new Set(['embed', 'file', 'external']);
const requiredSiteArrays = [
  'philosophyTags',
  'practices',
  'gallery',
  'videos',
  'interviews',
  'resources',
];
const videoSourceFields = [
  'embedUrl',
  'fileUrl',
  'externalUrl',
  'src',
  'url',
  'href',
  'placeholder',
];
const knownUrlFields = new Set([
  ...videoSourceFields,
  'downloadUrl',
  'poster',
  'sourceUrl',
  'thumbnail',
  'thumbnailUrl',
]);

function issue(path, message, code = 'invalid') {
  return { path, message, code };
}

function isRecord(value) {
  return Boolean(value) && typeof value === 'object' && !Array.isArray(value);
}

function isNonEmptyString(value) {
  return typeof value === 'string' && value.trim().length > 0;
}

function isValidIsoDate(value) {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value ?? '')) return false;

  const parsed = new Date(`${value}T00:00:00.000Z`);
  return !Number.isNaN(parsed.getTime()) && parsed.toISOString().slice(0, 10) === value;
}

function hasMeaningfulContent(value, seen = new WeakSet()) {
  if (isNonEmptyString(value)) return true;
  if (Array.isArray(value)) return value.some((item) => hasMeaningfulContent(item, seen));
  if (!isRecord(value) || seen.has(value)) return false;

  seen.add(value);
  const contentFields = [
    'answer',
    'text',
    'content',
    'body',
    'summary',
    'description',
    'paragraphs',
    'transcript',
    'sections',
    'blocks',
    'items',
  ];
  return contentFields.some((field) => hasMeaningfulContent(value[field], seen));
}

function isSafeContentUrl(value, { embed = false } = {}) {
  if (!isNonEmptyString(value)) return false;
  for (let index = 0; index < value.length; index += 1) {
    const code = value.charCodeAt(index);
    if (code <= 0x20 || code === 0x7f) return false;
  }
  if (value.startsWith('//') || value.startsWith('\\')) return false;

  const protocolMatch = value.match(/^([a-z][a-z\d+.-]*):/i);
  if (!protocolMatch) return true;

  const protocol = protocolMatch[1].toLowerCase();
  if (embed && protocol !== 'https') return false;
  if (!embed && protocol !== 'http' && protocol !== 'https') return false;

  try {
    const parsed = new URL(value);
    return Boolean(parsed.hostname);
  } catch {
    return false;
  }
}

function validateKnownUrls(value, path, errors, seen = new WeakSet()) {
  if (Array.isArray(value)) {
    value.forEach((item, index) => validateKnownUrls(item, `${path}[${index}]`, errors, seen));
    return;
  }
  if (!isRecord(value) || seen.has(value)) return;

  seen.add(value);
  Object.entries(value).forEach(([field, fieldValue]) => {
    const fieldPath = `${path}.${field}`;
    if (knownUrlFields.has(field)) {
      if (fieldValue == null || fieldValue === '') return;
      const isEmbedUrl = field === 'embedUrl' || field === 'placeholder' ||
        (value.type === 'embed' && videoSourceFields.includes(field));
      if (!isNonEmptyString(fieldValue)) {
        errors.push(issue(fieldPath, 'URL 必须是非空字符串', 'invalid_type'));
      } else if (!isSafeContentUrl(fieldValue, { embed: isEmbedUrl })) {
        errors.push(issue(
          fieldPath,
          isEmbedUrl ? '嵌入地址必须使用 HTTPS 或站内路径' : 'URL 协议或格式不安全',
          'unsafe_url',
        ));
      }
      return;
    }

    validateKnownUrls(fieldValue, fieldPath, errors, seen);
  });
}

function validateIdentifiedCollection(items, path) {
  const errors = [];
  const ids = new Set();

  if (!Array.isArray(items)) return [issue(path, '必须是数组', 'invalid_type')];

  items.forEach((item, index) => {
    const itemPath = `${path}[${index}]`;
    if (!isRecord(item)) {
      errors.push(issue(itemPath, '必须是对象', 'invalid_type'));
      return;
    }
    if (!isNonEmptyString(item.id)) {
      errors.push(issue(`${itemPath}.id`, '必须是非空字符串', 'required'));
    } else if (ids.has(item.id)) {
      errors.push(issue(`${itemPath}.id`, `重复 id：${item.id}`, 'duplicate'));
    } else {
      ids.add(item.id);
    }
    if (!allowedStatuses.has(item.publishStatus)) {
      errors.push(issue(`${itemPath}.publishStatus`, '发布状态无效'));
    }
  });

  return errors;
}

function validatePublishedPractices(items, path) {
  const errors = [];
  if (!Array.isArray(items)) return errors;

  items.forEach((item, index) => {
    if (!isRecord(item) || item.publishStatus !== PUBLISH_STATUS.PUBLISHED) return;
    if (!isNonEmptyString(item.title)) {
      errors.push(issue(`${path}[${index}].title`, '已发布实践必须填写标题', 'required'));
    }
  });
  return errors;
}

function validatePublishedGallery(items, path) {
  const errors = [];
  if (!Array.isArray(items)) return errors;

  items.forEach((item, index) => {
    if (!isRecord(item) || item.publishStatus !== PUBLISH_STATUS.PUBLISHED) return;
    const itemPath = `${path}[${index}]`;
    if (!isNonEmptyString(item.src)) {
      errors.push(issue(`${itemPath}.src`, '已发布照片必须填写 src', 'required'));
    }
    if (!isNonEmptyString(item.alt)) {
      errors.push(issue(`${itemPath}.alt`, '已发布照片必须填写替代文本', 'required'));
    }
  });
  return errors;
}

function validateVideos(items, path) {
  const errors = [];
  if (!Array.isArray(items)) return errors;

  items.forEach((item, index) => {
    if (!isRecord(item)) return;
    const itemPath = `${path}[${index}]`;
    const isPublished = item.publishStatus === PUBLISH_STATUS.PUBLISHED;

    if (item.type != null && !allowedVideoTypes.has(item.type)) {
      errors.push(issue(`${itemPath}.type`, '视频类型必须是 embed、file 或 external'));
    } else if (isPublished && !allowedVideoTypes.has(item.type)) {
      errors.push(issue(`${itemPath}.type`, '已发布视频必须填写有效类型', 'required'));
    }
    if (isPublished && !isNonEmptyString(item.title)) {
      errors.push(issue(`${itemPath}.title`, '已发布视频必须填写标题', 'required'));
    }
    if (isPublished && !videoSourceFields.some((field) => isNonEmptyString(item[field]))) {
      errors.push(issue(`${itemPath}.source`, '已发布视频必须填写播放或外部来源', 'required'));
    }

    const rawTracks = item.subtitles || item.tracks || (item.subtitle ? [item.subtitle] : []);
    const tracks = Array.isArray(rawTracks) ? rawTracks : [rawTracks];
    tracks.forEach((track, trackIndex) => {
      if (typeof track !== 'string' || track === '') return;
      if (!isSafeContentUrl(track)) {
        errors.push(issue(
          `${itemPath}.subtitles[${trackIndex}]`,
          '字幕 URL 协议或格式不安全',
          'unsafe_url',
        ));
      }
    });
  });
  return errors;
}

function validatePublishedInterviews(items, path) {
  const errors = [];
  if (!Array.isArray(items)) return errors;

  items.forEach((item, index) => {
    if (!isRecord(item) || item.publishStatus !== PUBLISH_STATUS.PUBLISHED) return;
    const itemPath = `${path}[${index}]`;
    if (!isNonEmptyString(item.topic) && !isNonEmptyString(item.title)) {
      errors.push(issue(`${itemPath}.topic`, '已发布访谈必须填写主题或标题', 'required'));
    }
    const contentFields = ['paragraphs', 'transcript', 'content', 'body', 'summary'];
    if (!contentFields.some((field) => hasMeaningfulContent(item[field]))) {
      errors.push(issue(`${itemPath}.content`, '已发布访谈必须包含正文或结构化问答', 'required'));
    }
  });
  return errors;
}

function validateEditorialCollection(items, path, {
  titleFields,
  titlePath,
  contentFields,
  contentPath = 'summary',
  urlFields = [],
}) {
  const errors = [];
  if (!Array.isArray(items)) return errors;

  items.forEach((item, index) => {
    if (!isRecord(item)) return;
    const itemPath = `${path}[${index}]`;
    validateKnownUrls(item, itemPath, errors);
    if (item.publishStatus !== PUBLISH_STATUS.PUBLISHED) return;

    if (!titleFields.some((field) => isNonEmptyString(item[field]))) {
      errors.push(issue(`${itemPath}.${titlePath}`, '已发布内容必须填写标题', 'required'));
    }
    const hasContent = contentFields.some((field) => hasMeaningfulContent(item[field]));
    const hasSafeUrl = urlFields.some((field) => isSafeContentUrl(item[field]));
    if (!hasContent && !hasSafeUrl) {
      errors.push(issue(`${itemPath}.${contentPath}`, '已发布内容必须填写摘要或正文', 'required'));
    }
  });
  return errors;
}

export function validatePracticeSite(site, index = 0) {
  const path = `practiceSites[${index}]`;
  const errors = [];

  if (!isRecord(site)) return [issue(path, '必须是对象', 'invalid_type')];
  if (!isNonEmptyString(site.id)) errors.push(issue(`${path}.id`, '必须是非空字符串', 'required'));
  if (!isNonEmptyString(site.name)) errors.push(issue(`${path}.name`, '必须是非空字符串', 'required'));
  if (!allowedSiteTypes.has(site.type)) errors.push(issue(`${path}.type`, '实践点类型无效'));
  if (!isNonEmptyString(site.summary)) errors.push(issue(`${path}.summary`, '必须是非空字符串', 'required'));
  if (!allowedStatuses.has(site.publishStatus)) errors.push(issue(`${path}.publishStatus`, '发布状态无效'));

  if (!isRecord(site.visit)) {
    errors.push(issue(`${path}.visit`, '必须是对象', 'required'));
  } else {
    if (!isValidIsoDate(site.visit.date)) {
      errors.push(issue(`${path}.visit.date`, '必须是有效的 YYYY-MM-DD 日期'));
    }
    if (!Number.isInteger(site.visit.sequence) || site.visit.sequence < 1) errors.push(issue(`${path}.visit.sequence`, '必须是正整数'));
    if (!isNonEmptyString(site.visit.stage)) errors.push(issue(`${path}.visit.stage`, '不能为空', 'required'));
  }

  requiredSiteArrays.forEach((field) => {
    if (!Array.isArray(site[field])) errors.push(issue(`${path}.${field}`, '必须是数组', 'invalid_type'));
  });

  ['practices', 'gallery', 'videos', 'interviews'].forEach((field) => {
    if (Array.isArray(site[field])) errors.push(...validateIdentifiedCollection(site[field], `${path}.${field}`));
  });

  if (Array.isArray(site.philosophyTags)) {
    site.philosophyTags.forEach((tag, tagIndex) => {
      if (!isNonEmptyString(tag)) {
        errors.push(issue(`${path}.philosophyTags[${tagIndex}]`, '理念标签必须是非空字符串', 'invalid_type'));
      }
    });
  }

  validateKnownUrls(site, path, errors);
  errors.push(...validatePublishedPractices(site.practices, `${path}.practices`));
  errors.push(...validatePublishedGallery(site.gallery, `${path}.gallery`));
  errors.push(...validateVideos(site.videos, `${path}.videos`));
  errors.push(...validatePublishedInterviews(site.interviews, `${path}.interviews`));

  return errors;
}

export const contentCollections = {
  practiceSites,
  taoXingzhiProfiles,
  educationalIdeas,
  academyHeritageEntries,
  achievementResources,
  projectProfile,
};

export function validateContentCollections(collections = contentCollections) {
  if (!isRecord(collections)) {
    return [issue('contentCollections', '必须是对象', 'invalid_type')];
  }

  const errors = [];
  const sites = collections.practiceSites;
  const resources = collections.achievementResources;

  if (!Array.isArray(sites)) {
    errors.push(issue('practiceSites', '必须是数组', 'invalid_type'));
  } else {
    sites.forEach((site, index) => errors.push(...validatePracticeSite(site, index)));
    errors.push(...validateIdentifiedCollection(sites, 'practiceSites'));
    const resourceIds = Array.isArray(resources)
      ? new Set(resources.filter(isRecord).map((resource) => resource.id).filter(isNonEmptyString))
      : null;
    const sequences = new Map();

    sites.forEach((site, index) => {
      if (!isRecord(site)) return;
      const sequence = site?.visit?.sequence;
      if (Number.isInteger(sequence)) {
        if (sequences.has(sequence)) {
          errors.push(issue(
            `practiceSites[${index}].visit.sequence`,
            `与 practiceSites[${sequences.get(sequence)}] 的站次重复`,
            'duplicate',
          ));
        } else {
          sequences.set(sequence, index);
        }
      }

      if (!Array.isArray(site.resources) || resourceIds == null) return;
      const seenResourceIds = new Set();
      site.resources.forEach((resourceId, resourceIndex) => {
        const resourcePath = `practiceSites[${index}].resources[${resourceIndex}]`;
        if (!isNonEmptyString(resourceId)) {
          errors.push(issue(resourcePath, '必须使用成果资源 id', 'invalid_type'));
        } else if (!resourceIds.has(resourceId)) {
          errors.push(issue(resourcePath, `引用了不存在的成果资源：${resourceId}`, 'invalid_reference'));
        } else if (seenResourceIds.has(resourceId)) {
          errors.push(issue(resourcePath, `重复引用成果资源：${resourceId}`, 'duplicate'));
        } else {
          seenResourceIds.add(resourceId);
        }
      });
    });
  }

  if (Array.isArray(sites)) {
    sites.forEach((site, index) => {
      if (site?.id && !/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(site.id)) {
        errors.push(issue(`practiceSites[${index}].id`, '必须是可安全用于路由的小写英文、数字或连字符', 'invalid_route_id'));
      }
    });
  }

  if (Array.isArray(resources)) {
    const siteIds = Array.isArray(sites)
      ? new Set(sites.filter(isRecord).map((site) => site.id).filter(isNonEmptyString))
      : null;

    resources.forEach((resource, index) => {
      if (!isRecord(resource) || resource.siteIds == null) return;
      if (!Array.isArray(resource.siteIds)) {
        errors.push(issue(`achievementResources[${index}].siteIds`, '必须是数组', 'invalid_type'));
        return;
      }

      const seenSiteIds = new Set();
      resource.siteIds.forEach((siteId, siteIndex) => {
        const sitePath = `achievementResources[${index}].siteIds[${siteIndex}]`;
        if (!isNonEmptyString(siteId)) {
          errors.push(issue(sitePath, '实践点引用必须是非空字符串', 'invalid_type'));
        } else if (siteIds && !siteIds.has(siteId)) {
          errors.push(issue(sitePath, `引用了不存在的实践点：${siteId}`, 'invalid_reference'));
        } else if (seenSiteIds.has(siteId)) {
          errors.push(issue(sitePath, `重复引用实践点：${siteId}`, 'duplicate'));
        } else {
          seenSiteIds.add(siteId);
        }
      });
    });
  }

  const editorialCollections = [
    {
      name: 'taoXingzhiProfiles',
      titleFields: ['name'],
      titlePath: 'name',
      contentFields: ['summary', 'content', 'body'],
    },
    {
      name: 'educationalIdeas',
      titleFields: ['title'],
      titlePath: 'title',
      contentFields: ['summary', 'content', 'body'],
    },
    {
      name: 'academyHeritageEntries',
      titleFields: ['title'],
      titlePath: 'title',
      contentFields: ['summary', 'description', 'content', 'body'],
    },
    {
      name: 'achievementResources',
      titleFields: ['title'],
      titlePath: 'title',
      contentFields: ['summary', 'description', 'content', 'body'],
      urlFields: ['url', 'downloadUrl', 'href', 'src'],
    },
  ];

  editorialCollections.forEach((rule) => {
    const items = collections[rule.name];
    errors.push(...validateIdentifiedCollection(items, rule.name));
    errors.push(...validateEditorialCollection(items, rule.name, rule));
  });

  if (Array.isArray(resources)) {
    resources.forEach((resource, index) => {
      if (!isRecord(resource) || resource.publishStatus !== PUBLISH_STATUS.PUBLISHED) return;
      if (!isNonEmptyString(resource.type)) {
        errors.push(issue(
          `achievementResources[${index}].type`,
          '已发布成果必须填写资源类型',
          'required',
        ));
      }
    });
  }

  if (!isRecord(collections.projectProfile)) {
    errors.push(issue('projectProfile', '必须是对象', 'invalid_type'));
  } else {
    ['name', 'organization', 'mission', 'practiceSummary', 'teamSummary'].forEach((field) => {
      if (!isNonEmptyString(collections.projectProfile[field])) {
        errors.push(issue(`projectProfile.${field}`, '不能为空', 'required'));
      }
    });
    if (!allowedStatuses.has(collections.projectProfile.publishStatus)) {
      errors.push(issue('projectProfile.publishStatus', '发布状态无效'));
    }
    validateKnownUrls(collections.projectProfile, 'projectProfile', errors);
  }

  return errors;
}

export function assertValidContent(collections = contentCollections) {
  const errors = validateContentCollections(collections);
  if (errors.length > 0) {
    const details = errors.map((error) => `${error.path}: ${error.message}`).join('\n');
    throw new Error(`内容模型校验失败：\n${details}`);
  }
  return true;
}
