import { describe, expect, it } from 'vitest';
import {
  academyHeritageEntries,
  achievementResources,
  assertValidContent,
  contentCollections,
  educationalIdeas,
  getHeritageEntryById,
  getResourceById,
  getResourcesBySiteId,
  getSiteById,
  getVisibleEducationalIdeas,
  getVisibleHeritageEntries,
  getVisiblePracticeSites,
  getVisibleProfiles,
  getVisibleResources,
  getVisitSchedule,
  mediaServices,
  PUBLISH_STATUS,
  practiceSites,
  projectProfile,
  selectVisibleItems,
  taoXingzhiProfiles,
  validateContentCollections,
} from '../src/content/index';

describe('content model', () => {
  it('passes the shared collection validator', () => {
    expect(validateContentCollections()).toEqual([]);
    expect(assertValidContent()).toBe(true);
  });

  it('reports invalid editorial data before it reaches a page', () => {
    const invalidCollections = {
      ...contentCollections,
      practiceSites: [
        {
          ...practiceSites[0],
          id: 'Unsafe ID',
          visit: { ...practiceSites[0].visit, date: '6.29' },
        },
      ],
      achievementResources: [
        {
          id: 'broken-resource',
          title: '错误引用示例',
          siteIds: ['missing-site'],
          publishStatus: PUBLISH_STATUS.PUBLISHED,
        },
      ],
    };

    const issues = validateContentCollections(invalidCollections);
    expect(issues).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ path: 'practiceSites[0].id' }),
        expect.objectContaining({ path: 'practiceSites[0].visit.date' }),
        expect.objectContaining({ path: 'achievementResources[0].siteIds[0]' }),
      ]),
    );
    expect(() => assertValidContent(invalidCollections)).toThrow('内容模型校验失败');
  });

  it.each(['2026-02-30', '2026-13-01', '2026-00-10'])(
    'rejects the impossible calendar date %s',
    (date) => {
      const issues = validateContentCollections({
        ...contentCollections,
        practiceSites: [
          {
            ...practiceSites[0],
            visit: { ...practiceSites[0].visit, date },
          },
        ],
      });

      expect(issues).toEqual(
        expect.arrayContaining([
          expect.objectContaining({ path: 'practiceSites[0].visit.date' }),
        ]),
      );
    },
  );

  it('rejects duplicate visit sequences', () => {
    const issues = validateContentCollections({
      ...contentCollections,
      practiceSites: [
        practiceSites[0],
        {
          ...practiceSites[1],
          visit: {
            ...practiceSites[1].visit,
            sequence: practiceSites[0].visit.sequence,
          },
        },
      ],
    });

    expect(issues).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ path: 'practiceSites[1].visit.sequence', code: 'duplicate' }),
      ]),
    );
  });

  it('returns structured issues instead of throwing for malformed collections and fields', () => {
    const invalidCollections = {
      ...contentCollections,
      practiceSites: [{ ...practiceSites[0], resources: 'not-an-array' }],
      achievementResources: {},
    };
    let issues;

    expect(() => {
      issues = validateContentCollections(invalidCollections);
    }).not.toThrow();
    expect(issues).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ path: 'practiceSites[0].resources', code: 'invalid_type' }),
        expect.objectContaining({ path: 'achievementResources', code: 'invalid_type' }),
      ]),
    );
    expect(validateContentCollections(null)).toEqual([
      expect.objectContaining({ path: 'contentCollections', code: 'invalid_type' }),
    ]);
  });

  it('validates published nested content and rejects unsafe URLs', () => {
    const invalidSite = {
      ...practiceSites[0],
      practices: [
        { id: 'practice-without-title', title: '', publishStatus: PUBLISH_STATUS.PUBLISHED },
      ],
      gallery: [
        {
          id: 'unsafe-photo',
          src: 'javascript:alert(1)',
          srcSet: ['javascript:alert(2) 640w'],
          alt: '',
          publishStatus: PUBLISH_STATUS.PUBLISHED,
        },
      ],
      videos: [
        {
          id: 'video-without-source',
          title: '',
          publishStatus: PUBLISH_STATUS.PUBLISHED,
        },
        {
          id: 'insecure-embed',
          title: '不安全嵌入',
          type: 'embed',
          embedUrl: 'http://example.com/embed',
          publishStatus: PUBLISH_STATUS.PUBLISHED,
        },
        {
          id: 'invalid-bilibili',
          title: '无效 BV 号',
          type: 'bilibili',
          bvid: 'BVbad',
          publishStatus: PUBLISH_STATUS.PUBLISHED,
        },
        {
          id: 'invalid-nju-box',
          title: '无效南大 Box 路径',
          type: 'nju-box',
          shareUrl: 'https://box.nju.edu.cn/d/a01c5df833674b2c91c5/',
          filePath: '/not-a-video.txt',
          publishStatus: PUBLISH_STATUS.PUBLISHED,
        },
      ],
      interviews: [
        {
          id: 'empty-interview',
          topic: '',
          content: '',
          publishStatus: PUBLISH_STATUS.PUBLISHED,
        },
      ],
      resources: [],
    };
    const issues = validateContentCollections({
      ...contentCollections,
      practiceSites: [invalidSite],
      taoXingzhiProfiles: [
        { id: 'empty-profile', name: '', summary: '', publishStatus: PUBLISH_STATUS.PUBLISHED },
      ],
      educationalIdeas: [
        { id: 'empty-idea', title: '', body: '', publishStatus: PUBLISH_STATUS.PUBLISHED },
      ],
      academyHeritageEntries: [
        {
          id: 'empty-heritage',
          title: '',
          summary: '',
          href: 'javascript:alert(1)',
          publishStatus: PUBLISH_STATUS.PUBLISHED,
        },
      ],
      achievementResources: [
        {
          id: 'unsafe-resource',
          title: '',
          summary: '',
          url: 'data:text/html,<script>alert(1)</script>',
          siteIds: [invalidSite.id],
          publishStatus: PUBLISH_STATUS.PUBLISHED,
        },
      ],
    });
    const paths = issues.map((item) => item.path);

    expect(paths).toEqual(expect.arrayContaining([
      'practiceSites[0].practices[0].title',
      'practiceSites[0].gallery[0].src',
      'practiceSites[0].gallery[0].srcSet[0]',
      'practiceSites[0].gallery[0].alt',
      'practiceSites[0].gallery[0].credit',
      'practiceSites[0].videos[0].type',
      'practiceSites[0].videos[0].title',
      'practiceSites[0].videos[0].source',
      'practiceSites[0].videos[1].embedUrl',
      'practiceSites[0].videos[2].bvid',
      'practiceSites[0].videos[3].filePath',
      'practiceSites[0].interviews[0].topic',
      'practiceSites[0].interviews[0].content',
      'taoXingzhiProfiles[0].name',
      'taoXingzhiProfiles[0].summary',
      'educationalIdeas[0].title',
      'educationalIdeas[0].summary',
      'academyHeritageEntries[0].title',
      'academyHeritageEntries[0].summary',
      'academyHeritageEntries[0].href',
      'achievementResources[0].title',
      'achievementResources[0].type',
      'achievementResources[0].summary',
      'achievementResources[0].url',
    ]));
  });

  it('accepts canonical published media with HTTPS or site-local URLs', () => {
    const site = {
      ...practiceSites[0],
      practices: [
        { id: 'valid-practice', title: '课程观察', publishStatus: PUBLISH_STATUS.PUBLISHED },
      ],
      gallery: [
        {
          id: 'valid-photo',
          src: '/media/photo.webp',
          srcSet: ['/media/photo-640.webp 640w', '/media/photo-1280.webp 1280w'],
          sources: [{ type: 'image/avif', srcSet: ['/media/photo-640.avif 640w'] }],
          alt: '课堂观察现场',
          credit: '实践团队',
          publishStatus: PUBLISH_STATUS.PUBLISHED,
        },
      ],
      videos: [
        {
          id: 'valid-video',
          title: '访谈视频',
          type: 'embed',
          embedUrl: 'https://example.com/embed/video',
          publishStatus: PUBLISH_STATUS.PUBLISHED,
        },
        {
          id: 'valid-nju-box-video',
          title: '南大云盘采访视频',
          type: 'nju-box',
          shareUrl: mediaServices.njuBox.shareUrl,
          filePath: '/6.29五塘/采访视频.mp4',
          publishStatus: PUBLISH_STATUS.PUBLISHED,
        },
        {
          id: 'valid-bilibili-video',
          title: '哔哩哔哩公开视频',
          type: 'bilibili',
          bvid: 'BV1xx411c7mD',
          publishStatus: PUBLISH_STATUS.PUBLISHED,
        },
      ],
      interviews: [
        {
          id: 'valid-interview',
          topic: '课程如何落地',
          paragraphs: [{ question: '如何开展？', answer: '从真实生活问题出发。' }],
          publishStatus: PUBLISH_STATUS.PUBLISHED,
        },
      ],
      resources: [],
    };

    const issues = validateContentCollections({
      ...contentCollections,
      practiceSites: [site],
      achievementResources: [
        {
          id: 'valid-resource',
          title: '公开成果链接',
          type: 'article',
          url: 'https://example.com/resource',
          siteIds: [site.id],
          publishStatus: PUBLISH_STATUS.PUBLISHED,
        },
      ],
    });
    expect(issues).toEqual([]);
  });

  it('contains the complete six-site practice footprint with route-safe ids', () => {
    expect(practiceSites).toHaveLength(6);

    const ids = practiceSites.map((site) => site.id);
    expect(new Set(ids).size).toBe(ids.length);
    expect(ids.every((id) => /^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(id))).toBe(true);

    for (const site of practiceSites) {
      expect(site.bannerImage).toEqual(expect.objectContaining({
        src: expect.stringMatching(new RegExp(`^media/${site.id}/`)),
        sources: expect.any(Array),
        focalPoint: expect.any(String),
        credit: '行知溯光实践团队',
      }));
      expect(getSiteById(site.id)).toEqual(
        expect.objectContaining({ id: site.id, name: site.name }),
      );
    }

    expect(getSiteById('missing-site')).toBeNull();
  });

  it('keeps public queries and visit schedule aligned with source content', () => {
    const visibleSites = getVisiblePracticeSites();
    const schedule = getVisitSchedule();

    expect(visibleSites.length).toBeGreaterThan(0);
    const sourceIds = new Set(practiceSites.map((site) => site.id));
    expect(visibleSites.every((site) => sourceIds.has(site.id))).toBe(true);
    expect(schedule).toHaveLength(visibleSites.length);
  });

  it('hides draft child content unless editorial preview is explicit', () => {
    const publicSite = getSiteById('yanziyou');
    const previewSite = getSiteById('yanziyou', { includeDrafts: true });

    expect(publicSite.practices).toEqual([]);
    expect(publicSite.videos.length).toBeGreaterThan(0);
    expect(publicSite.interviews).toEqual([]);
    expect(previewSite.practices.length).toBeGreaterThan(0);
    expect(previewSite.videos.length).toBeGreaterThan(0);
    expect(previewSite.interviews.length).toBeGreaterThan(0);
  });

  it('keeps archived entries private across all public editorial selectors', () => {
    const fixtures = [
      { id: 'selector-published', publishStatus: PUBLISH_STATUS.PUBLISHED },
      { id: 'selector-draft', publishStatus: PUBLISH_STATUS.DRAFT },
      { id: 'selector-archived', publishStatus: PUBLISH_STATUS.ARCHIVED },
    ];

    expect(selectVisibleItems(fixtures).map((item) => item.id)).toEqual(['selector-published']);
    expect(
      selectVisibleItems(fixtures, { includeDrafts: true }).map((item) => item.id),
    ).toEqual(['selector-published', 'selector-draft']);

    const selectorCases = [
      [taoXingzhiProfiles, getVisibleProfiles, 'profile'],
      [educationalIdeas, getVisibleEducationalIdeas, 'idea'],
      [academyHeritageEntries, getVisibleHeritageEntries, 'heritage'],
      [achievementResources, getVisibleResources, 'resource'],
    ];

    selectorCases.forEach(([collection, selector, prefix]) => {
      const originalLength = collection.length;
      const entries = fixtures.map((item) => ({ ...item, id: `${prefix}-${item.id}` }));
      collection.push(...entries);
      try {
        const publicIds = selector().map((item) => item.id);
        const previewIds = selector({ includeDrafts: true }).map((item) => item.id);
        expect(publicIds).toContain(`${prefix}-selector-published`);
        expect(publicIds).not.toContain(`${prefix}-selector-draft`);
        expect(publicIds).not.toContain(`${prefix}-selector-archived`);
        expect(previewIds).toContain(`${prefix}-selector-published`);
        expect(previewIds).toContain(`${prefix}-selector-draft`);
        expect(previewIds).not.toContain(`${prefix}-selector-archived`);
      } finally {
        collection.length = originalLength;
      }
    });
  });

  it('resolves resource and heritage references through query helpers', () => {
    for (const resource of achievementResources) {
      expect(getResourceById(resource.id)).toBe(resource);
    }

    for (const entry of academyHeritageEntries) {
      expect(getHeritageEntryById(entry.id)).toBe(entry);
    }

    for (const site of practiceSites) {
      const resources = getResourcesBySiteId(site.id);
      expect(Array.isArray(resources)).toBe(true);
      expect(resources.every((resource) => achievementResources.includes(resource))).toBe(true);
    }
  });

  it('exposes the supporting editorial collections', () => {
    expect(taoXingzhiProfiles.length).toBeGreaterThan(0);
    expect(educationalIdeas).toHaveLength(3);
    expect(academyHeritageEntries).toHaveLength(2);
    expect(academyHeritageEntries.map((entry) => entry.sequence)).toEqual([1, 2]);
    expect(academyHeritageEntries.every((entry) => entry.image?.src.startsWith('media/heritage/'))).toBe(true);
    expect(projectProfile).toEqual(
      expect.objectContaining({
        name: expect.any(String),
        mission: expect.any(String),
      }),
    );
  });
});
