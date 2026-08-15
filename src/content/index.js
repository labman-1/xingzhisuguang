import { getInterviewArticle } from './interviewArticles.js';

export const PUBLISH_STATUS = Object.freeze({
  DRAFT: 'draft',
  PUBLISHED: 'published',
  ARCHIVED: 'archived',
});

export const SITE_TYPE = Object.freeze({
  PRIMARY_SCHOOL: 'primary-school',
  KINDERGARTEN: 'kindergarten',
  NINE_YEAR_SCHOOL: 'nine-year-school',
  SECONDARY_SCHOOL: 'secondary-school',
  HERITAGE_SITE: 'heritage-site',
  VOCATIONAL_COLLEGE: 'vocational-college',
});

export const REGION = Object.freeze({
  NANJING: 'nanjing',
  NATIONAL: 'national',
});

const published = PUBLISH_STATUS.PUBLISHED;

function createImageSlot({ directory, alt, fallbackLabel, focalPoint = '50% 50%' }) {
  return {
    src: '',
    srcSet: [],
    sources: [],
    sizes: '100vw',
    alt,
    caption: '',
    credit: '',
    sourceUrl: '',
    focalPoint,
    assetDirectory: directory,
    fallbackLabel,
  };
}

function createTeamBanner({ src, alt, caption, width, height, focalPoint = '50% 50%' }) {
  return {
    src,
    srcSet: [],
    sources: [],
    sizes: '(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw',
    alt,
    caption,
    credit: '行知溯光实践团队',
    sourceUrl: '',
    focalPoint,
    width,
    height,
  };
}

export const sharedMedia = {
  homeHero: {
    ...createImageSlot({
      directory: 'media/shared/',
      alt: '陶行知先生身穿中式长衫、佩戴圆框眼镜的黑白纪念肖像',
      fallbackLabel: '',
      focalPoint: '50% 50%',
    }),
    src: 'media/shared/tao-xingzhi-commemorative-portrait.webp',
    sizes: '(min-width: 1024px) 22rem, (min-width: 640px) 21rem, 76vw',
    width: 960,
    height: 1200,
    credit: '项目组 AI 生成纪念性视觉，以公有领域史料肖像为人物参考',
    sourceUrl: '',
  },
};

export const mediaServices = {
  njuBox: {
    shareUrl: 'https://box.nju.edu.cn/d/a01c5df833674b2c91c5/',
  },
};

function createNjuBoxVideo({ id, title, filePath, shareUrl }) {
  return {
    id,
    title,
    type: 'nju-box',
    shareUrl: shareUrl || mediaServices.njuBox.shareUrl,
    filePath,
    publishStatus: published,
  };
}

export const practiceSites = [
  {
    id: 'wutang',
    name: '五塘小学',
    region: REGION.NANJING,
    type: SITE_TYPE.PRIMARY_SCHOOL,
    logoPlaceholder: '五',
    visit: { date: '2026-06-29', displayDate: '6.29', sequence: 1, stage: '第一站' },
    summary:
      '五塘小学是本次"行知溯光"社会实践的第一站。学校秉承陶行知先生的教育理念，在课程改革与学生综合素质培养方面进行了积极探索。团队成员在此开展了初步的校园参观与教师访谈，为后续调研奠定了基础。',
    bannerImage: createTeamBanner({
      src: 'media/wutang/photos/campus-01.webp',
      alt: '五塘小学教学楼与运动场',
      caption: '五塘小学校园',
      width: 1024,
      height: 769,
      focalPoint: '50% 52%',
    }),
    philosophyTags: ['生活即教育', '小先生制', '劳动教育', '快乐教育'],
    practices: [],
    gallery: [
      { id: 'wutang-campus-01', src: 'media/wutang/photos/campus-01.webp', alt: '五塘小学校园环境', caption: '校园环境', credit: '行知溯光实践团队', width: 1024, height: 769, publishStatus: published },
      { id: 'wutang-campus-02', src: 'media/wutang/photos/campus-02.webp', alt: '五塘小学学生手工作品', caption: '手工作品', credit: '行知溯光实践团队', width: 1024, height: 768, publishStatus: published },
      { id: 'wutang-campus-03', src: 'media/wutang/photos/campus-03.webp', alt: '五塘小学楼道', caption: '楼道', credit: '行知溯光实践团队', width: 1024, height: 768, publishStatus: published },
      { id: 'wutang-campus-04', src: 'media/wutang/photos/campus-04.webp', alt: '五塘小学走廊', caption: '介绍走廊', credit: '行知溯光实践团队', width: 1024, height: 768, publishStatus: published },
      { id: 'wutang-group-photo', src: 'media/wutang/photos/合照.webp', alt: '团队成员与五塘小学教师合影', caption: '团队与校方合影', credit: '行知溯光实践团队', width: 1024, height: 768, publishStatus: published },
      { id: 'wutang-interview-photo', src: 'media/wutang/photos/访谈.webp', alt: '五塘小学教师访谈现场', caption: '教师访谈', credit: '行知溯光实践团队', width: 768, height: 1024, publishStatus: published },
    ],
    videos: [createNjuBoxVideo({
      id: 'wutang-video',
      title: '五塘小学采访视频',
      filePath: '/6.29五塘/采访视频.mp4',
    })],
    interviews: [getInterviewArticle('wutang')],
    resources: [],
    publishStatus: published,
  },
  {
    id: 'yanziyou',
    name: '燕子矶幼儿园',
    region: REGION.NANJING,
    type: SITE_TYPE.KINDERGARTEN,
    logoPlaceholder: '燕',
    visit: { date: '2026-07-01', displayDate: '7.1', sequence: 2, stage: '第二站' },
    summary:
      '燕子矶幼儿园是本次调研中唯一一所学前教育机构。园所以陶行知"生活教育"理念为指导，构建了独具特色的"三力课程体系"，并在日常教学中推行"小先生制"，让幼儿在互教互学中成长。本次访谈深入探讨了课程落地的具体实践、一线教师面临的困难与挑战，以及"小先生制"在学前教育阶段的创新应用。',
    bannerImage: createTeamBanner({
      src: 'media/yanziyou/photos/campus-01.webp',
      alt: '团队成员走进燕子矶幼儿园校园',
      caption: '走进燕子矶幼儿园',
      width: 1600,
      height: 898,
      focalPoint: '50% 48%',
    }),
    philosophyTags: ['生活即教育', '小先生制'],
    practices: [],
    gallery: [
      { id: 'yanziyou-campus-01', src: 'media/yanziyou/photos/campus-01.webp', alt: '燕子矶幼儿园校园环境', caption: '校园环境', credit: '行知溯光实践团队', width: 1600, height: 898, publishStatus: published },
      { id: 'yanziyou-campus-02', src: 'media/yanziyou/photos/campus-02.webp', alt: '燕子矶幼儿园校园环境', caption: '校园环境', credit: '行知溯光实践团队', width: 1600, height: 743, publishStatus: published },
      { id: 'yanziyou-campus-03', src: 'media/yanziyou/photos/campus-03.webp', alt: '燕子矶幼儿园校园环境', caption: '校园环境', credit: '行知溯光实践团队', width: 1600, height: 830, publishStatus: published },
      { id: 'yanziyou-campus-04', src: 'media/yanziyou/photos/campus-04.webp', alt: '燕子矶幼儿园校园环境', caption: '校园环境', credit: '行知溯光实践团队', width: 1600, height: 900, publishStatus: published },
      { id: 'yanziyou-interview-photo', src: 'media/yanziyou/photos/采访.webp', alt: '燕子矶幼儿园教师访谈现场', caption: '教师访谈', credit: '行知溯光实践团队', width: 1600, height: 909, publishStatus: published },
    ],
    videos: [1, 2, 3, 4].map((part) => createNjuBoxVideo({
      id: `yanziyou-video-${part}`,
      title: `燕子矶幼儿园采访视频 ${part}`,
      filePath: `/7.1燕子矶幼儿园/${part}.mp4`,
    })),
    interviews: [getInterviewArticle('yanziyou')],
    resources: [],
    publishStatus: published,
  },
  {
    id: 'xiaozhuang',
    name: '晓庄小学',
    region: REGION.NANJING,
    type: SITE_TYPE.PRIMARY_SCHOOL,
    logoPlaceholder: '晓',
    visit: { date: '2026-07-02', displayDate: '7.2', sequence: 3, stage: '第三站' },
    summary:
      '晓庄小学与陶行知先生有着深厚的历史渊源。作为晓庄地区的代表性小学，学校在传承行知精神、开展劳动教育与生活实践方面积累了丰富经验。团队成员在此围绕"教学做合一"理念在小学课堂中的落地展开了深入调研。',
    bannerImage: createTeamBanner({
      src: 'media/xiaozhuang/photos/campus-05.webp',
      alt: '晓庄小学校园内的乐学棚与劳动实践区',
      caption: '晓庄小学乐学棚',
      width: 1600,
      height: 900,
      focalPoint: '50% 48%',
    }),
    philosophyTags: ['教学做合一'],
    practices: [],
    gallery: [
      { id: 'xiaozhuang-campus-01', src: 'media/xiaozhuang/photos/campus-01.webp', alt: '晓庄小学校园环境', caption: '校园环境', credit: '行知溯光实践团队', width: 1600, height: 900, publishStatus: published },
      { id: 'xiaozhuang-campus-02', src: 'media/xiaozhuang/photos/campus-02.webp', alt: '晓庄小学校园环境', caption: '校园环境', credit: '行知溯光实践团队', width: 1600, height: 1067, publishStatus: published },
      { id: 'xiaozhuang-campus-03', src: 'media/xiaozhuang/photos/campus-03.webp', alt: '晓庄小学校园环境', caption: '校园环境', credit: '行知溯光实践团队', width: 1600, height: 900, publishStatus: published },
      { id: 'xiaozhuang-campus-04', src: 'media/xiaozhuang/photos/campus-04.webp', alt: '晓庄小学校园环境', caption: '校园环境', credit: '行知溯光实践团队', width: 1600, height: 900, publishStatus: published },
      { id: 'xiaozhuang-campus-05', src: 'media/xiaozhuang/photos/campus-05.webp', alt: '晓庄小学乐学棚', caption: '乐学棚', credit: '行知溯光实践团队', width: 1600, height: 900, publishStatus: published },
      { id: 'xiaozhuang-campus-06', src: 'media/xiaozhuang/photos/campus-06.webp', alt: '晓庄小学菜地', caption: '菜地', credit: '行知溯光实践团队', width: 1600, height: 900, publishStatus: published },
      { id: 'xiaozhuang-group-photo', src: 'media/xiaozhuang/photos/合照.webp', alt: '团队成员与晓庄小学教师合影', caption: '团队与校方合影', credit: '行知溯光实践团队', width: 1600, height: 1067, publishStatus: published },
      { id: 'xiaozhuang-interview-photo', src: 'media/xiaozhuang/photos/访谈.webp', alt: '晓庄小学教师访谈现场', caption: '教师访谈', credit: '行知溯光实践团队', width: 1600, height: 900, publishStatus: published },
    ],
    // The source video stays unpublished until its external path is anonymized.
    videos: [],
    interviews: [getInterviewArticle('xiaozhuang')],
    resources: [],
    publishStatus: published,
  },
  {
    id: 'xiaoshi',
    name: '小市中心小学',
    region: REGION.NANJING,
    type: SITE_TYPE.PRIMARY_SCHOOL,
    logoPlaceholder: '市',
    visit: { date: '2026-07-02', displayDate: '7.2', sequence: 4, stage: '第四站' },
    summary:
      '小市中心小学位于南京城区，在素质教育与课程创新方面持续探索。学校将陶行知教育思想与现代教育技术相结合，形成了独具特色的校本课程体系。团队在此重点调研了城市小学如何在新时期背景下践行行知理念。',
    bannerImage: createTeamBanner({
      src: 'media/xiaoshi/photos/campus-02.webp',
      alt: '小市中心小学行知教育文化墙',
      caption: '小市中心小学行知文化墙',
      width: 1600,
      height: 1067,
      focalPoint: '50% 48%',
    }),
    philosophyTags: ['教学做合一', '劳动教育'],
    practices: [],
    gallery: [
      { id: 'xiaoshi-campus-01', src: 'media/xiaoshi/photos/campus-01.webp', alt: '小市中心小学校门', caption: '校门', credit: '行知溯光实践团队', width: 1067, height: 1600, publishStatus: published },
      { id: 'xiaoshi-campus-02', src: 'media/xiaoshi/photos/campus-02.webp', alt: '小市中心小学校园环境', caption: '校园环境', credit: '行知溯光实践团队', width: 1600, height: 1067, publishStatus: published },
      { id: 'xiaoshi-campus-03', src: 'media/xiaoshi/photos/campus-03.webp', alt: '小市中心小学校园环境', caption: '校园环境', credit: '行知溯光实践团队', width: 1600, height: 1067, publishStatus: published },
      { id: 'xiaoshi-campus-04', src: 'media/xiaoshi/photos/campus-04.webp', alt: '小市中心小学校园环境', caption: '校园环境', credit: '行知溯光实践团队', width: 1600, height: 1067, publishStatus: published },
      { id: 'xiaoshi-group-photo', src: 'media/xiaoshi/photos/合照.webp', alt: '团队成员与小市中心小学教师合影', caption: '团队与校方合影', credit: '行知溯光实践团队', width: 1600, height: 1200, publishStatus: published },
      { id: 'xiaoshi-interview-photo', src: 'media/xiaoshi/photos/访谈.webp', alt: '小市中心小学教师访谈现场', caption: '教师访谈', credit: '行知溯光实践团队', width: 1200, height: 1600, publishStatus: published },
    ],
    videos: [createNjuBoxVideo({
      id: 'xiaoshi-video',
      title: '小市中心小学采访视频',
      filePath: '/7.2小市中心小学/DSC_0564.MOV',
      shareUrl: 'https://box.nju.edu.cn/d/4431bc9f1bc64fc1ba11/',
    })],
    interviews: [getInterviewArticle('xiaoshi')],
    resources: [],
    publishStatus: published,
  },
  {
    id: 'xiaozhuangshiyan',
    name: '南京晓庄实验学校',
    region: REGION.NANJING,
    type: SITE_TYPE.NINE_YEAR_SCHOOL,
    logoPlaceholder: '实',
    visit: { date: '2026-07-03', displayDate: '7.3', sequence: 5, stage: '第五站' },
    summary:
      '南京晓庄实验学校是一所九年一贯制学校，在晓庄教育体系中承担着重要的实验与示范功能。学校在课程整合、跨学科教学以及学生自主学习能力培养方面进行了大量创新实践，为团队提供了丰富的调研素材。',
    bannerImage: createTeamBanner({
      src: 'media/xiaozhuangshiyan/photos/campus-02.webp',
      alt: '南京晓庄实验学校校史与校风展墙',
      caption: '南京晓庄实验学校文化展墙',
      width: 1600,
      height: 1200,
      focalPoint: '50% 46%',
    }),
    philosophyTags: ['小先生制', '教学做合一'],
    practices: [],
    gallery: [
      { id: 'xiaozhuangshiyan-campus-01', src: 'media/xiaozhuangshiyan/photos/campus-01.webp', alt: '南京晓庄实验学校校园环境', caption: '校园环境', credit: '行知溯光实践团队', width: 1600, height: 2133, publishStatus: published },
      { id: 'xiaozhuangshiyan-campus-02', src: 'media/xiaozhuangshiyan/photos/campus-02.webp', alt: '南京晓庄实验学校校园环境', caption: '校园环境', credit: '行知溯光实践团队', width: 1600, height: 1200, publishStatus: published },
      { id: 'xiaozhuangshiyan-group-photo', src: 'media/xiaozhuangshiyan/photos/合照.webp', alt: '团队成员与南京晓庄实验学校教师合影', caption: '团队与校方合影', credit: '行知溯光实践团队', width: 1600, height: 722, publishStatus: published },
      { id: 'xiaozhuangshiyan-interview-photo', src: 'media/xiaozhuangshiyan/photos/访谈.webp', alt: '南京晓庄实验学校教师访谈现场', caption: '教师访谈', credit: '行知溯光实践团队', width: 1600, height: 1200, publishStatus: published },
    ],
    videos: [createNjuBoxVideo({
      id: 'xiaozhuangshiyan-video',
      title: '南京晓庄实验学校采访视频',
      filePath: '/7.3南京晓庄实验学校/VID20260703093710.mp4',
    })],
    interviews: [getInterviewArticle('xiaozhuangshiyan')],
    resources: [],
    publishStatus: published,
  },
  {
    id: 'xiaozhuangfushu',
    name: '晓庄附属小学',
    region: REGION.NANJING,
    type: SITE_TYPE.PRIMARY_SCHOOL,
    logoPlaceholder: '附',
    visit: { date: '2026-07-03', displayDate: '7.3', sequence: 6, stage: '第六站' },
    summary:
      '晓庄附属小学是本次社会实践的最后一站。学校与陶行知创办的乡村师范同根同源，长期践行“教人求真”“学做真人”的育人理念。团队在此围绕“小先生制”、综合评价与家校协同开展访谈和影像记录，为六站寻访画下句点。',
    bannerImage: createTeamBanner({
      src: 'media/xiaozhuangfushu/photos/campus-02.webp',
      alt: '南京晓庄学院附属小学校门',
      caption: '晓庄附属小学校门',
      width: 1024,
      height: 768,
      focalPoint: '50% 45%',
    }),
    philosophyTags: ['小先生制', '教学做合一'],
    practices: [],
    gallery: [
      { id: 'xiaozhuangfushu-campus-01', src: 'media/xiaozhuangfushu/photos/campus-01.webp', alt: '晓庄附属小学书画作品展', caption: '书画作品展', credit: '行知溯光实践团队', width: 1024, height: 768, publishStatus: published },
      { id: 'xiaozhuangfushu-campus-02', src: 'media/xiaozhuangfushu/photos/campus-02.webp', alt: '晓庄附属小学校门', caption: '校门', credit: '行知溯光实践团队', width: 1024, height: 768, publishStatus: published },
      { id: 'xiaozhuangfushu-campus-03', src: 'media/xiaozhuangfushu/photos/campus-03.webp', alt: '晓庄附属小学历史栏', caption: '历史栏', credit: '行知溯光实践团队', width: 1024, height: 768, publishStatus: published },
      { id: 'xiaozhuangfushu-campus-04', src: 'media/xiaozhuangfushu/photos/campus-04.webp', alt: '晓庄附属小学校园环境', caption: '校园环境', credit: '行知溯光实践团队', width: 768, height: 1024, publishStatus: published },
      { id: 'xiaozhuangfushu-campus-05', src: 'media/xiaozhuangfushu/photos/campus-05.webp', alt: '晓庄附属小学校园环境', caption: '校园环境', credit: '行知溯光实践团队', width: 1024, height: 768, publishStatus: published },
      { id: 'xiaozhuangfushu-group-photo', src: 'media/xiaozhuangfushu/photos/合照.webp', alt: '团队成员与晓庄附属小学教师合影', caption: '团队与校方合影', credit: '行知溯光实践团队', width: 1024, height: 768, publishStatus: published },
    ],
    videos: [createNjuBoxVideo({
      id: 'xiaozhuangfushu-video',
      title: '晓庄附属小学采访视频',
      filePath: '/7.3晓庄附属小学/采访/IMG_9240.mov',
      shareUrl: 'https://box.nju.edu.cn/d/4431bc9f1bc64fc1ba11/',
    })],
    interviews: [getInterviewArticle('xiaozhuangfushu')],
    resources: [],
    publishStatus: published,
  },
  {
    id: 'chongqing-yucai',
    name: '重庆育才中学',
    region: REGION.NATIONAL,
    type: SITE_TYPE.SECONDARY_SCHOOL,
    logoPlaceholder: '育',
    visit: { date: '2026-07-10', displayDate: '7.10', sequence: 7, stage: '第七站' },
    summary:
      '重庆育才中学由陶行知先生于 1939 年创办，是生活教育理论的重要实践基地。团队从“求真”与“学做真人”出发，记录学校如何以多元评价、校园活动和家校协同延续育才精神。',
    bannerImage: createImageSlot({ directory: 'media/chongqing-yucai/backgrounds/', alt: '重庆育才中学校园走访影像', fallbackLabel: '重庆育才中学' }),
    philosophyTags: ['生活即教育', '教学做合一'],
    practices: [],
    gallery: [
      { id: 'chongqing-yucai-group-01', src: 'media/chongqing-yucai/photos/group-01.webp', alt: '团队成员与重庆育才中学教师合影', caption: '团队与校方合影', credit: '行知溯光实践团队', width: 1448, height: 1086, publishStatus: published },
    ],
    videos: [
      createNjuBoxVideo({
        id: 'chongqing-yucai-video-1',
        title: '重庆育才中学校园环境实录 1',
        filePath: '/7.10重庆育才中学+7.14育才旧址古圣寺/7.10重庆育才中学/育才1.mp4',
        shareUrl: 'https://box.nju.edu.cn/d/4431bc9f1bc64fc1ba11/',
      }),
      createNjuBoxVideo({
        id: 'chongqing-yucai-video-2',
        title: '重庆育才中学校园环境实录 2',
        filePath: '/7.10重庆育才中学+7.14育才旧址古圣寺/7.10重庆育才中学/育才2.mp4',
        shareUrl: 'https://box.nju.edu.cn/d/4431bc9f1bc64fc1ba11/',
      }),
      createNjuBoxVideo({
        id: 'chongqing-yucai-video-3',
        title: '重庆育才中学校园环境实录 3',
        filePath: '/7.10重庆育才中学+7.14育才旧址古圣寺/7.10重庆育才中学/育才3.mp4',
        shareUrl: 'https://box.nju.edu.cn/d/4431bc9f1bc64fc1ba11/',
      }),
      createNjuBoxVideo({
        id: 'chongqing-yucai-video-4',
        title: '重庆育才中学校园环境实录 4',
        filePath: '/7.10重庆育才中学+7.14育才旧址古圣寺/7.10重庆育才中学/育才4.mp4',
        shareUrl: 'https://box.nju.edu.cn/d/4431bc9f1bc64fc1ba11/',
      }),
    ],
    interviews: [getInterviewArticle('chongqing-yucai')],
    resources: [],
    publishStatus: published,
  },
  {
    id: 'gushengsi',
    name: '合川古圣寺旧址',
    region: REGION.NATIONAL,
    type: SITE_TYPE.HERITAGE_SITE,
    logoPlaceholder: '古',
    visit: { date: '2026-07-14', displayDate: '7.14', sequence: 8, stage: '第八站' },
    summary:
      '合川古圣寺旧址是重庆育才学校创办初期的校址所在地，见证了陶行知在抗战时期的教育探索。团队走进展馆与旧址，也记录今天守护、讲述这段教育历史的人。',
    bannerImage: createImageSlot({ directory: 'media/gushengsi/backgrounds/', alt: '合川古圣寺旧址走访影像', fallbackLabel: '合川古圣寺旧址' }),
    philosophyTags: ['生活即教育'],
    practices: [],
    gallery: [],
    videos: [],
    interviews: [getInterviewArticle('gushengsi')],
    resources: [],
    publishStatus: published,
  },
  {
    id: 'meizhou-baihou',
    name: '梅州百侯中学',
    region: REGION.NATIONAL,
    type: SITE_TYPE.SECONDARY_SCHOOL,
    logoPlaceholder: '百',
    visit: { date: '2026-07-28', displayDate: '7.28', sequence: 9, stage: '第九站' },
    summary:
      '梅州百侯中学地处客家地区。团队从化学课堂、校本课程与学校特色建设切入，观察生活教育如何回应城镇化背景下的乡村教育现实。',
    bannerImage: createImageSlot({ directory: 'media/meizhou-baihou/backgrounds/', alt: '梅州百侯中学走访影像', fallbackLabel: '梅州百侯中学' }),
    philosophyTags: ['生活即教育', '乡土教育'],
    practices: [],
    gallery: [],
    videos: [],
    interviews: [getInterviewArticle('meizhou-baihou')],
    resources: [],
    publishStatus: published,
  },
  {
    id: 'meizhou-dama',
    name: '梅州大麻中学',
    region: REGION.NATIONAL,
    type: SITE_TYPE.SECONDARY_SCHOOL,
    logoPlaceholder: '麻',
    visit: { date: '2026-07-28', displayDate: '7.28', sequence: 10, stage: '第十站' },
    summary:
      '梅州大麻中学地处客家地区。团队从历史课堂、劳动课程、客家山歌与寄宿生活切入，记录乡土文化和生活教育在校园里的传承。',
    bannerImage: createImageSlot({ directory: 'media/meizhou-dama/backgrounds/', alt: '梅州大麻中学走访影像', fallbackLabel: '梅州大麻中学' }),
    philosophyTags: ['生活即教育', '乡土教育'],
    practices: [],
    gallery: [],
    videos: [],
    interviews: [getInterviewArticle('meizhou-dama')],
    resources: [],
    publishStatus: published,
  },
  {
    id: 'huai-an-xin-an',
    name: '淮安新安小学',
    region: REGION.NATIONAL,
    type: SITE_TYPE.PRIMARY_SCHOOL,
    logoPlaceholder: '新',
    visit: { date: '2026-07-31', displayDate: '7.31', sequence: 11, stage: '第十一站' },
    summary:
      '淮安新安小学是新安旅行团的诞生地，承载着“生活即教育、社会即学校”的红色教育传统。团队围绕“小先生、小主人、小好汉”育人实践，记录德育如何发生在做事之中。',
    bannerImage: createImageSlot({ directory: 'media/huai-an-xin-an/backgrounds/', alt: '淮安新安小学走访影像', fallbackLabel: '淮安新安小学' }),
    philosophyTags: ['社会即学校', '红色教育'],
    practices: [],
    gallery: [
      { id: 'huai-an-xin-an-campus-01', src: 'media/huai-an-xin-an/photos/campus-01.webp', alt: '淮安新安小学校园环境', caption: '校园环境', credit: '行知溯光实践团队', width: 1600, height: 2844, publishStatus: published },
      { id: 'huai-an-xin-an-campus-02', src: 'media/huai-an-xin-an/photos/campus-02.webp', alt: '淮安新安小学校园环境', caption: '校园环境', credit: '行知溯光实践团队', width: 1600, height: 2844, publishStatus: published },
      { id: 'huai-an-xin-an-campus-03', src: 'media/huai-an-xin-an/photos/campus-03.webp', alt: '淮安新安小学校园环境', caption: '校园环境', credit: '行知溯光实践团队', width: 1600, height: 900, publishStatus: published },
      { id: 'huai-an-xin-an-campus-04', src: 'media/huai-an-xin-an/photos/campus-04.webp', alt: '淮安新安小学校园环境', caption: '校园环境', credit: '行知溯光实践团队', width: 1600, height: 900, publishStatus: published },
      { id: 'huai-an-xin-an-campus-05', src: 'media/huai-an-xin-an/photos/campus-05.webp', alt: '淮安新安小学校园环境', caption: '校园环境', credit: '行知溯光实践团队', width: 1600, height: 900, publishStatus: published },
      { id: 'huai-an-xin-an-interview-photo', src: 'media/huai-an-xin-an/photos/campus-06.webp', alt: '淮安新安小学教师访谈现场', caption: '教师访谈', credit: '行知溯光实践团队', width: 1600, height: 900, publishStatus: published },
    ],
    videos: [
      createNjuBoxVideo({
        id: 'huai-an-xin-an-video',
        title: '淮安新安小学采访视频',
        filePath: '/7.31 淮安新安小学/采访视频（剪辑版）.mp4',
        shareUrl: 'https://box.nju.edu.cn/d/4431bc9f1bc64fc1ba11/',
      }),
    ],
    interviews: [getInterviewArticle('huai-an-xin-an')],
    resources: [],
    publishStatus: published,
  },
  {
    id: 'hangzhou-xianghu',
    name: '杭州科技职业技术学院/湘湖师范',
    region: REGION.NATIONAL,
    type: SITE_TYPE.VOCATIONAL_COLLEGE,
    logoPlaceholder: '杭',
    visit: { date: '2026-08-01', displayDate: '8.1', sequence: 12, stage: '第十二站' },
    summary:
      '湘湖师范是杭州科技职业技术学院的重要办学渊源。团队从合唱教学、陶行知研究馆与社区音乐实践出发，记录乡村教育情怀和艺术传统的当代延续。',
    bannerImage: createImageSlot({ directory: 'media/hangzhou-xianghu/backgrounds/', alt: '杭州湘湖师范走访影像', fallbackLabel: '杭州科技职业技术学院/湘湖师范' }),
    philosophyTags: ['美育', '生活即教育'],
    practices: [],
    gallery: [],
    videos: [],
    interviews: [getInterviewArticle('hangzhou-xianghu')],
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

export const academyHeritageSource = {
  title: '熠熠来路忆行知',
  publisher: '南京大学行知书院',
  url: 'https://mp.weixin.qq.com/mp/homepage?__biz=Mzg5MjU1MjAyMA==&hid=4&sn=a585419ab6923454bd3bdaebadacc55f&scene=1',
};

export const academyHeritageEntries = [
  {
    id: '2025-zhang-chenghe-interview',
    year: '2025',
    period: '暑期实践 · 第一站',
    sequence: 1,
    category: '口述史寻访',
    title: '专访晓庄小学亲历者张成和',
    summary:
      '“行知溯光”实践团队走近晓庄小学亲历者张成和，以口述访谈回望他与晓庄教育的生命交集，记录行知精神如何在亲历者记忆与当代教育中延续。',
    image: {
      src: 'media/heritage/2025-zhang-chenghe-cover.jpg',
      alt: '晓庄小学亲历者张成和先生的访谈肖像',
      width: 373,
      height: 372,
      focalPoint: '50% 42%',
      credit: '南京大学行知书院微信公众号',
    },
    url: 'https://mp.weixin.qq.com/s?__biz=Mzg5MjU1MjAyMA==&mid=2247515541&idx=1&sn=03d317a2589f68fc5679cdc5cb49fd3f&scene=19#wechat_redirect',
    sourceLabel: '南京大学行知书院',
    publishStatus: published,
  },
  {
    id: '2025-tao-kan-interview',
    year: '2025',
    period: '暑期实践 · 第二站',
    sequence: 2,
    category: '家族记忆访谈',
    title: '专访陶行知后人陶侃',
    summary:
      '团队专访陶行知后人陶侃，从家族记忆与现实教育两个维度追寻陶行知先生的精神遗产，理解生活教育思想如何跨越时代、继续照亮今天的教育实践。',
    image: {
      src: 'media/heritage/2025-tao-kan-cover.jpg',
      alt: '陶行知后人陶侃先生接受访谈时的现场照片',
      width: 853,
      height: 853,
      focalPoint: '50% 46%',
      credit: '南京大学行知书院微信公众号',
    },
    url: 'https://mp.weixin.qq.com/s?__biz=Mzg5MjU1MjAyMA==&mid=2247515551&idx=1&sn=de5921fe49d7e53184d9cfb4e5d154fe&scene=19#wechat_redirect',
    sourceLabel: '南京大学行知书院',
    publishStatus: published,
  },
];
export const achievementResources = [
  {
    id: 'xingzhi-six-schools-feature',
    type: '公众号文章',
    title: '“行知溯光”实践团队专访南京六所学校：感悟行知思想育人价值',
    summary:
      '2026 年 7 月，团队走进南京六所与陶行知相关的学校，与一线教师、校长深入对话，记录“小先生制”、生活教育、长程作业与快乐教育等理念在当代基础教育中的实践。',
    sourceLinks: [
      {
        label: '南京大学行知书院',
        url: 'https://mp.weixin.qq.com/s/FVp84MdVOXNof18m4NqTGA',
        publishedAt: '2026-07-31',
      },
      {
        label: '南青实践',
        url: 'https://mp.weixin.qq.com/s/njxxsisg7SdfS_yGTaCeBw',
        publishedAt: '2026-08-06',
      },
    ],
    publishStatus: published,
  },
];

export const projectProfile = {
  name: '行知溯光',
  organization: '南京大学 2026 年暑期社会实践团队',
  mission:
    '我们是南京大学 2026 年暑期社会实践团队，以"循行知足迹，溯教育之光"为使命，走进基层学校，用镜头与文字记录当代教育一线对陶行知思想的传承与创新。',
  practiceSummary:
    '通过十二个实践站点的实地走访，我们从南京晓庄故地出发，行至重庆、梅州、淮安与杭州，记录陶行知教育思想在不同学段和地方教育中的当代实践。从“小先生制”到“教学做合一”，我们以访谈、拍摄与文字整理，呈现一幅仍在生长的行知教育图景。',
  teamSummary:
    '团队由南京大学工科试验班大一学生组成，成员协作完成实地走访、影像拍摄、教师访谈、资料整理与数字化成果展示。',
  heroImage: sharedMedia.homeHero,
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

export function getVisibleSitesByRegion(region, { includeDrafts = false } = {}) {
  return selectVisibleItems(
    practiceSites.filter((site) => site.region === region),
    { includeDrafts },
  ).map((site) => hydrateSite(site, includeDrafts));
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
const allowedRegions = new Set(Object.values(REGION));
const allowedVideoTypes = new Set(['nju-box', 'bilibili', 'embed', 'file', 'external']);
const requiredSiteArrays = [
  'philosophyTags',
  'practices',
  'gallery',
  'videos',
  'interviews',
  'resources',
];
const videoSourceFields = [
  'bvid',
  'shareUrl',
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
  'thumbnailSrc',
  'lightboxSrc',
]);

function issue(path, message, code = 'invalid') {
  return { path, message, code };
}

function isRecord(value) {
  return Boolean(value) && typeof value === 'object' && !Array.isArray(value);
}

function asArray(value) {
  if (value == null) return [];
  return Array.isArray(value) ? value : [value];
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

function getSrcSetUrls(value) {
  const entries = Array.isArray(value) ? value : isNonEmptyString(value) ? value.split(',') : [];
  return entries
    .map((entry) => typeof entry === 'string' ? entry.trim().split(/\s+/)[0] : '')
    .filter(Boolean);
}

function validateImageMedia(media, path, { published = false } = {}) {
  const errors = [];
  if (!isRecord(media)) return [issue(path, '必须是图片配置对象', 'invalid_type')];

  if (media.sources != null && !Array.isArray(media.sources)) {
    errors.push(issue(`${path}.sources`, '必须是数组', 'invalid_type'));
  }

  const srcSetUrls = getSrcSetUrls(media.srcSet);
  if (media.srcSet != null && !isNonEmptyString(media.srcSet) && !Array.isArray(media.srcSet)) {
    errors.push(issue(`${path}.srcSet`, '必须是字符串或字符串数组', 'invalid_type'));
  }

  asArray(media.sources).forEach((source, index) => {
    const sourcePath = `${path}.sources[${index}]`;
    if (!isRecord(source)) {
      errors.push(issue(sourcePath, '必须是响应式图片来源对象', 'invalid_type'));
      return;
    }
    if (!isNonEmptyString(source.type) || !/^image\/(avif|webp|jpeg|png)$/.test(source.type)) {
      errors.push(issue(`${sourcePath}.type`, '必须是受支持的图片 MIME 类型', 'invalid_type'));
    }
    const sourceUrls = getSrcSetUrls(source.srcSet);
    if (sourceUrls.length === 0) {
      errors.push(issue(`${sourcePath}.srcSet`, '必须配置至少一个响应式图片路径', 'required'));
    }
    sourceUrls.forEach((url, urlIndex) => {
      if (!isSafeContentUrl(url)) {
        errors.push(issue(`${sourcePath}.srcSet[${urlIndex}]`, '图片路径协议或格式不安全', 'unsafe_url'));
      }
    });
  });

  srcSetUrls.forEach((url, index) => {
    if (!isSafeContentUrl(url)) {
      errors.push(issue(`${path}.srcSet[${index}]`, '图片路径协议或格式不安全', 'unsafe_url'));
    }
  });

  const hasImage = isNonEmptyString(media.src) || srcSetUrls.length > 0 ||
    asArray(media.sources).some((source) => getSrcSetUrls(source?.srcSet).length > 0);
  if (hasImage && !isNonEmptyString(media.alt)) {
    errors.push(issue(`${path}.alt`, '已配置图片必须填写替代文本', 'required'));
  }
  if (hasImage && published && !isNonEmptyString(media.credit)) {
    errors.push(issue(`${path}.credit`, '已发布图片必须填写版权或摄影说明', 'required'));
  }

  validateKnownUrls(media, path, errors);
  return errors;
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
    errors.push(...validateImageMedia(item, itemPath, { published: true }));
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
      errors.push(issue(`${itemPath}.type`, '视频类型必须是 nju-box、bilibili、embed、file 或 external'));
    } else if (isPublished && !allowedVideoTypes.has(item.type)) {
      errors.push(issue(`${itemPath}.type`, '已发布视频必须填写有效类型', 'required'));
    }
    if (isPublished && !isNonEmptyString(item.title)) {
      errors.push(issue(`${itemPath}.title`, '已发布视频必须填写标题', 'required'));
    }
    const hasBilibiliSource = item.type === 'bilibili' && /^BV[0-9A-Za-z]{10}$/.test(item.bvid ?? '');
    const hasNjuBoxSource = item.type === 'nju-box' &&
      /^https:\/\/box\.nju\.edu\.cn\/d\/[a-z0-9]+\/$/i.test(item.shareUrl ?? '') &&
      /^\/[^?#]+\.(mp4|webm|ogg|mov)$/i.test(item.filePath ?? '');
    if (item.type === 'bilibili' && item.bvid != null && !/^BV[0-9A-Za-z]{10}$/.test(item.bvid)) {
      errors.push(issue(`${itemPath}.bvid`, 'BV 号格式无效，应为 BV 加 10 位字母或数字'));
    }
    if (item.type === 'nju-box' && !hasNjuBoxSource) {
      errors.push(issue(`${itemPath}.filePath`, '南大 Box 视频必须配置公开分享链接和有效视频文件路径'));
    }
    if (isPublished && !hasBilibiliSource && !hasNjuBoxSource &&
      !videoSourceFields.some((field) => !['bvid', 'shareUrl'].includes(field) && isNonEmptyString(item[field]))) {
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
    const contentFields = ['lead', 'sections', 'paragraphs', 'transcript', 'content', 'body', 'summary'];
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
  if (!allowedRegions.has(site.region)) errors.push(issue(`${path}.region`, '实践点区域无效'));
  if (!allowedSiteTypes.has(site.type)) errors.push(issue(`${path}.type`, '实践点类型无效'));
  if (!isNonEmptyString(site.summary)) errors.push(issue(`${path}.summary`, '必须是非空字符串', 'required'));
  if (!allowedStatuses.has(site.publishStatus)) errors.push(issue(`${path}.publishStatus`, '发布状态无效'));
  errors.push(...validateImageMedia(site.bannerImage, `${path}.bannerImage`, {
    published: site.publishStatus === PUBLISH_STATUS.PUBLISHED,
  }));

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
    errors.push(...validateImageMedia(collections.projectProfile.heroImage, 'projectProfile.heroImage', {
      published: collections.projectProfile.publishStatus === PUBLISH_STATUS.PUBLISHED,
    }));
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
