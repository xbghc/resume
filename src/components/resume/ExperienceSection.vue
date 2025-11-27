<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { useResumeStore } from '@/stores/resume'

const { t } = useI18n()
const store = useResumeStore()
</script>

<template>
  <section v-if="store.data.experience?.length" class="mb-4">
    <h2 class="text-sm font-semibold text-gray-800 border-b border-cyan-600 pb-1 mb-3">
      {{ t('resume.experience') }}
    </h2>
    <div v-for="job in store.data.experience" :key="job.company" class="mb-3">
      <div class="flex justify-between items-start">
        <div>
          <p class="font-semibold text-sm">{{ job.company }}</p>
          <p class="text-gray-600 text-xs">{{ job.position }}</p>
          <p v-if="job.url" class="text-cyan-600 text-xs">
            <a :href="job.url" class="hover:underline">{{ job.url }}</a>
          </p>
        </div>
        <div class="text-right text-xs">
          <p class="font-medium">{{ job.period }}</p>
          <p v-if="job.location" class="text-gray-500">{{ job.location }}</p>
        </div>
      </div>
      <ul class="mt-1 list-disc pl-4 text-xs space-y-0.5">
        <li v-for="(highlight, index) in job.highlights" :key="index">
          {{ highlight }}
        </li>
      </ul>
    </div>
  </section>
</template>
