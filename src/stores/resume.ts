import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { templates, emptyData } from '@/data/templates'

export interface ProjectData {
  _uid: string
  name: string
  role: string
  description: string
  hidden: boolean
}

export interface ResumeData {
  name: string
  title: string
  avatar?: string
  contact: {
    email: string
    phone: string
    location: string
    website?: string
  }
  profiles?: {
    network: string
    username: string
    url?: string
  }[]
  summary: string
  skills: {
    name: string
    level?: string
    keywords: string[]
  }[]
  experience: {
    company: string
    position: string
    location?: string
    period: string
    url?: string
    highlights: string[]
  }[]
  education: {
    school: string
    degree: string
    location?: string
    period: string
  }[]
  projects: ProjectData[]
  certifications?: {
    name: string
    issuer: string
    year: string
  }[]
}

export const useResumeStore = defineStore('resume', () => {
  const data = ref<ResumeData>({ ...templates.zh! })

  const visibleProjects = computed(() => {
    return data.value.projects?.filter(p => !p.hidden) ?? []
  })

  function clear() {
    data.value = { ...emptyData }
  }

  function loadTemplate(locale: string = 'zh') {
    const template = templates[locale] ?? templates.zh!
    data.value = { ...template }
  }

  async function importFromFile(file: File) {
    const text = await file.text()
    data.value = JSON.parse(text) as ResumeData
  }

  function newProject(): ProjectData {
    const p = {
      _uid: crypto.randomUUID(),
      name: '',
      role: '',
      description: '',
      hidden: false,
    };
    data.value.projects?.push(p);
    return p;
  }

  return { data, visibleProjects, clear, loadTemplate, importFromFile, newProject }
}, {
  persist: true,
})
