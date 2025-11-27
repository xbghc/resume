<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { useResumeStore } from '@/stores/resume'

const { t } = useI18n()
const store = useResumeStore()
</script>

<template>
  <section v-if="store.data.education?.length" class="mb-4">
    <h2 class="text-sm font-semibold text-gray-800 border-b border-cyan-600 pb-1 mb-3">
      {{ t('resume.education') }}
    </h2>
    <div v-for="edu in store.data.education" :key="edu.school" class="mb-2">
      <div class="flex justify-between items-start">
        <div>
          <p class="font-semibold text-sm">{{ edu.school }}</p>
          <p v-if="edu.location" class="text-gray-500 text-xs">{{ edu.location }}</p>
        </div>
        <div class="text-right text-xs">
          <p class="font-medium">{{ edu.period }}</p>
          <p class="text-gray-600">{{ edu.degree }}</p>
        </div>
      </div>
    </div>
  </section>
</template>
