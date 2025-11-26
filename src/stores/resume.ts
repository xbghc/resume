import { ref } from 'vue'
import { defineStore } from 'pinia'
import { templates, emptyData } from '@/data/templates'

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
  projects?: {
    name: string
    role?: string
    description: string
  }[]
  certifications?: {
    name: string
    issuer: string
    year: string
  }[]
}

const STORAGE_KEY = 'resume-data'

export const useResumeStore = defineStore('resume', () => {
  const data = ref<ResumeData>({ ...templates.zh! })

  function load() {
    const cached = localStorage.getItem(STORAGE_KEY)
    if (cached) {
      data.value = JSON.parse(cached)
    }
  }

  function save(newData: ResumeData) {
    data.value = newData
    localStorage.setItem(STORAGE_KEY, JSON.stringify(newData))
  }

  function clear() {
    data.value = { ...emptyData }
    localStorage.setItem(STORAGE_KEY, JSON.stringify(emptyData))
  }

  function loadTemplate(locale: string = 'zh') {
    const template = templates[locale] ?? templates.zh!
    data.value = { ...template }
    localStorage.setItem(STORAGE_KEY, JSON.stringify(template))
  }

  async function importFromFile(file: File) {
    const text = await file.text()
    const parsed = JSON.parse(text) as ResumeData
    save(parsed)
  }

  load()

  return { data, load, save, clear, loadTemplate, importFromFile }
})
