import type { ResumeData } from '@/stores/resume'

export const templates: Record<string, ResumeData> = {
  zh: {
    name: '张三',
    title: '创意前端开发工程师',
    contact: {
      email: 'zhangsan@example.com',
      phone: '138-0000-0000',
      location: '北京市朝阳区',
      website: 'https://zhangsan.me/',
    },
    profiles: [
      { network: 'LinkedIn', username: 'zhangsan', url: 'https://linkedin.com/in/zhangsan' },
      { network: 'GitHub', username: 'zhangsan', url: 'https://github.com/zhangsan' },
    ],
    summary:
      '拥有5年前端开发经验，专注于构建用户友好的网站和应用。擅长前端技术，热衷于现代Web标准和前沿开发技术。有丰富的项目从概念到部署的成功经验。',
    skills: [
      {
        name: 'Web 技术',
        level: '高级',
        keywords: ['HTML5', 'JavaScript', 'TypeScript', 'CSS3'],
      },
      {
        name: 'Web 框架',
        level: '高级',
        keywords: ['Vue.js', 'React', 'Angular', 'Nuxt.js'],
      },
      {
        name: '工具',
        level: '中级',
        keywords: ['Webpack', 'Vite', 'Git', 'Docker'],
      },
    ],
    experience: [
      {
        company: 'ABC科技有限公司',
        position: '高级前端工程师',
        location: '北京',
        period: '2021年1月 - 至今',
        url: 'https://abc-tech.com/',
        highlights: [
          '主导公司核心产品网站重构，用户参与度提升40%',
          '开发并实施新的响应式框架，提升跨设备兼容性',
          '指导4名初级开发人员，培养技术卓越文化',
        ],
      },
      {
        company: 'XYZ互联网公司',
        position: '前端工程师',
        location: '上海',
        period: '2019年6月 - 2021年12月',
        url: 'https://xyz-internet.com/',
        highlights: [
          '使用 React 和 Node.js 开发高质量 Web 应用',
          '负责 Stripe 支付和短信服务等第三方集成',
          '优化应用性能，加载时间减少30%',
        ],
      },
    ],
    education: [
      {
        school: '北京大学',
        degree: '计算机科学与技术 本科',
        location: '北京',
        period: '2015年8月 - 2019年5月',
      },
    ],
    projects: [
      {
        name: '电商平台',
        role: '项目负责人',
        description: '主导开发全栈电商平台，销售转化率提升25%。',
      },
      {
        name: '数据可视化仪表板',
        role: '前端开发',
        description: '为 SaaS 应用创建交互式分析仪表板，提升客户数据可视化体验。',
      },
    ],
    certifications: [
      { name: '全栈 Web 开发', issuer: 'Udemy', year: '2020' },
      { name: 'AWS 认证开发者', issuer: 'Amazon Web Services', year: '2019' },
    ],
  },
  en: {
    name: 'John Doe',
    title: 'Creative and Innovative Web Developer',
    contact: {
      email: 'john.doe@gmail.com',
      phone: '(555) 123-4567',
      location: 'Pleasantville, CA 94588',
      website: 'https://johndoe.me/',
    },
    profiles: [
      { network: 'LinkedIn', username: 'johndoe', url: 'https://linkedin.com/in/johndoe' },
      { network: 'GitHub', username: 'johndoe', url: 'https://github.com/johndoe' },
    ],
    summary:
      'Innovative Web Developer with 5 years of experience in building impactful and user-friendly websites and applications. Specializes in front-end technologies and passionate about modern web standards and cutting-edge development techniques. Proven track record of leading successful projects from concept to deployment.',
    skills: [
      {
        name: 'Web Technologies',
        level: 'Advanced',
        keywords: ['HTML5', 'JavaScript', 'PHP', 'Python'],
      },
      {
        name: 'Web Frameworks',
        level: 'Intermediate',
        keywords: ['React.js', 'Angular', 'Vue.js', 'Laravel', 'Django'],
      },
      {
        name: 'Tools',
        level: 'Intermediate',
        keywords: ['Webpack', 'Git', 'Jenkins', 'Docker', 'JIRA'],
      },
    ],
    experience: [
      {
        company: 'Creative Solutions Inc.',
        position: 'Senior Web Developer',
        location: 'San Francisco, CA',
        period: 'January 2019 to Present',
        url: 'https://creativesolutions.inc/',
        highlights: [
          'Spearheaded the redesign of the main product website, resulting in a 40% increase in user engagement.',
          'Developed and implemented a new responsive framework, improving cross-device compatibility.',
          'Mentored a team of four junior developers, fostering a culture of technical excellence.',
        ],
      },
      {
        company: 'TechAdvancers',
        position: 'Web Developer',
        location: 'San Jose, CA',
        period: 'June 2016 to December 2018',
        url: 'https://techadvancers.com/',
        highlights: [
          'Collaborated in a team of 10 to develop high-quality web applications using React.js and Node.js.',
          'Managed the integration of third-party services such as Stripe for payments and Twilio for SMS services.',
          'Optimized application performance, achieving a 30% reduction in load times.',
        ],
      },
    ],
    education: [
      {
        school: 'University of California',
        degree: "Bachelor's in Computer Science",
        location: 'Berkeley, CA',
        period: 'August 2012 to May 2016',
      },
    ],
    projects: [
      {
        name: 'E-Commerce Platform',
        role: 'Project Lead',
        description:
          'Led the development of a full-stack e-commerce platform, improving sales conversion by 25%.',
      },
      {
        name: 'Interactive Dashboard',
        role: 'Frontend Developer',
        description:
          'Created an interactive analytics dashboard for a SaaS application, enhancing data visualization for clients.',
      },
    ],
    certifications: [
      { name: 'Full-Stack Web Development', issuer: 'CodeAcademy', year: '2020' },
      { name: 'AWS Certified Developer', issuer: 'Amazon Web Services', year: '2019' },
    ],
  },
}

export const emptyData: ResumeData = {
  name: '',
  title: '',
  contact: { email: '', phone: '', location: '' },
  summary: '',
  skills: [],
  experience: [],
  education: [],
}
