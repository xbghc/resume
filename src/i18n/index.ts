import { createI18n } from 'vue-i18n'

const messages = {
  zh: {
    resume: {
      contact: '联系方式',
      profiles: '社交主页',
      summary: '个人简介',
      experience: '工作经历',
      education: '教育背景',
      skills: '技能',
      projects: '项目经历',
      certifications: '证书',
    },
    action: {
      import: '导入数据',
      loadTemplate: '填入模板',
      clear: '清空',
    },
  },
  en: {
    resume: {
      contact: 'Contact',
      profiles: 'Profiles',
      summary: 'Summary',
      experience: 'Experience',
      education: 'Education',
      skills: 'Skills',
      projects: 'Projects',
      certifications: 'Certifications',
    },
    action: {
      import: 'Import',
      loadTemplate: 'Load Template',
      clear: 'Clear',
    },
  },
}

export const i18n = createI18n({
  legacy: false,
  locale: 'zh',
  fallbackLocale: 'en',
  messages,
})
