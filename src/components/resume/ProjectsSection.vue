<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { useResumeStore } from '@/stores/resume'
import { marked } from 'marked'

const { t } = useI18n()
const store = useResumeStore()

marked.setOptions({ breaks: true })

function renderMarkdown(text: string) {
  return marked.parse(text) as string
}
</script>

<template>
  <section v-if="store.visibleProjects.length" class="mb-4">
    <h2 class="text-sm font-semibold text-gray-800 border-b border-cyan-600 pb-1 mb-3">
      {{ t('resume.projects') }}
    </h2>
    <div v-for="project in store.visibleProjects" :key="project.name" class="mb-2">
      <p class="font-semibold text-sm">{{ project.name }}</p>
      <p v-if="project.role" class="text-gray-500 text-xs">{{ project.role }}</p>
      <div class="text-xs mt-0.5 markdown-content" v-html="renderMarkdown(project.description)"></div>
    </div>
  </section>
</template>
