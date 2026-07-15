/**
 * 行知溯光 — 6 所学校调研数据
 *
 * 数据结构：
 * - id:               唯一标识（用于路由查找）
 * - name:             学校名称
 * - date:             访问日期（月.日）
 * - stage:            站次标签（如"第二站"）
 * - logoPlaceholder:  校徽占位符（单字，在无真实 logo 时渲染为圆形头像）
 * - intro:            学校简介 / 调研概述
 * - photos:           校园环境照片 URL 数组（目前为空，后续由线下组补充）
 * - videos:           { title, placeholder } — 访谈视频信息（placeholder 为 B站/优酷 iframe 链接或空字符串）
 * - interviews:       [{ id, topic, content }] — 深度访谈主题及内容（content 为占位符，待后续填充）
 */

export const schools = [
  // ==================== 第一站 ====================
  {
    id: 'wutang',
    name: '五塘小学',
    date: '6.29',
    stage: '第一站',
    logoPlaceholder: '五',
    intro:
      '五塘小学是本次"行知溯光"社会实践的第一站。学校秉承陶行知先生的教育理念，在课程改革与学生综合素质培养方面进行了积极探索。团队成员在此开展了初步的校园参观与教师访谈，为后续调研奠定了基础。',
    photos: [],
    videos: {
      title: '五塘小学实践纪实',
      placeholder: '',
    },
    interviews: [],
  },

  // ==================== 第二站 ====================
  {
    id: 'yanziyou',
    name: '燕子矶幼儿园',
    date: '7.1',
    stage: '第二站',
    logoPlaceholder: '燕',
    intro:
      '燕子矶幼儿园是本次调研中唯一一所学前教育机构。园所以陶行知"生活教育"理念为指导，构建了独具特色的"三力课程体系"，并在日常教学中推行"小先生制"，让幼儿在互教互学中成长。本次访谈深入探讨了课程落地的具体实践、一线教师面临的困难与挑战，以及"小先生制"在学前教育阶段的创新应用。',
    photos: [],
    videos: {
      title: '燕子矶幼儿园 · 三力课程与小先生制访谈',
      placeholder: '',
    },
    interviews: [
      {
        id: 'yanziyou-shanli',
        topic: '三力课程体系',
        content:
          '（访谈内容待补充）\n\n燕子矶幼儿园的"三力课程体系"是本次调研的重点主题之一。该体系围绕"生命力、思维力、创造力"三个维度构建课程框架，将陶行知"生活即教育"理念融入日常教学。具体内容将在访谈录音整理后更新。',
      },
      {
        id: 'yanziyou-opening',
        topic: '开场白',
        content:
          '（访谈内容待补充）\n\n本段记录访谈的开场介绍，包括团队成员自我介绍、调研目的说明以及园方接待教师的背景介绍。详细内容将在访谈录音整理后更新。',
      },
      {
        id: 'yanziyou-challenges',
        topic: '困难和挑战',
        content:
          '（访谈内容待补充）\n\n本段聚焦一线教师在践行陶行知教育理念过程中遇到的实际困难与挑战，涵盖师资培训、课程资源、家校协同等方面。详细内容将在访谈录音整理后更新。',
      },
      {
        id: 'yanziyou-littleteacher',
        topic: '小先生制',
        content:
          '（访谈内容待补充）\n\n"小先生制"是陶行知教育思想的重要组成部分，燕子矶幼儿园在学前教育阶段对这一制度进行了创新性实践。本段记录园方在推行"小先生制"过程中的经验、成效与反思。详细内容将在访谈录音整理后更新。',
      },
    ],
  },

  // ==================== 第三站 ====================
  {
    id: 'xiaozhuang',
    name: '晓庄小学',
    date: '7.2',
    stage: '第三站',
    logoPlaceholder: '晓',
    intro:
      '晓庄小学与陶行知先生有着深厚的历史渊源。作为晓庄地区的代表性小学，学校在传承行知精神、开展劳动教育与生活实践方面积累了丰富经验。团队成员在此围绕"教学做合一"理念在小学课堂中的落地展开了深入调研。',
    photos: [],
    videos: {
      title: '晓庄小学调研记录',
      placeholder: '',
    },
    interviews: [],
  },

  // ==================== 第四站 ====================
  {
    id: 'xiaoshi',
    name: '小市中心小学',
    date: '7.2',
    stage: '第四站',
    logoPlaceholder: '市',
    intro:
      '小市中心小学位于南京城区，在素质教育与课程创新方面持续探索。学校将陶行知教育思想与现代教育技术相结合，形成了独具特色的校本课程体系。团队在此重点调研了城市小学如何在新时期背景下践行行知理念。',
    photos: [],
    videos: {
      title: '小市中心小学实践纪实',
      placeholder: '',
    },
    interviews: [],
  },

  // ==================== 第五站 ====================
  {
    id: 'xiaozhuangshiyan',
    name: '南京晓庄实验学校',
    date: '7.3',
    stage: '第五站',
    logoPlaceholder: '实',
    intro:
      '南京晓庄实验学校是一所九年一贯制学校，在晓庄教育体系中承担着重要的实验与示范功能。学校在课程整合、跨学科教学以及学生自主学习能力培养方面进行了大量创新实践，为团队提供了丰富的调研素材。',
    photos: [],
    videos: {
      title: '南京晓庄实验学校调研记录',
      placeholder: '',
    },
    interviews: [],
  },

  // ==================== 第六站 ====================
  {
    id: 'xiaozhuangfushu',
    name: '晓庄附属小学',
    date: '7.3',
    stage: '第六站',
    logoPlaceholder: '附',
    intro:
      '晓庄附属小学是本次社会实践的最后一站。学校依托晓庄教育集团的资源优势，在教师专业发展与校本教研方面形成了鲜明特色。团队在此对为期五天的调研进行了总结性访谈与资料收集，为后续成果整理积累了宝贵的一手素材。',
    photos: [],
    videos: {
      title: '晓庄附属小学实践纪实',
      placeholder: '',
    },
    interviews: [],
  },
];

/**
 * 工具函数：根据 id 查找学校
 */
export function getSchoolById(id) {
  return schools.find((s) => s.id === id) || null;
}

/**
 * 按日期排序的学校列表（用于需要按时间顺序展示的场景）
 */
export const schoolsByDate = [...schools].sort((a, b) => {
  const [am, ad] = a.date.split('.').map(Number);
  const [bm, bd] = b.date.split('.').map(Number);
  return am !== bm ? am - bm : ad - bd;
});
