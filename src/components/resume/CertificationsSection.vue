<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { useResumeStore } from '@/stores/resume'

const { t } = useI18n()
const store = useResumeStore()
</script>

<template>
  <section v-if="store.data.certifications?.length" class="mb-4">
    <h2 class="text-sm font-semibold text-gray-800 border-b border-gray-300 pb-1 mb-2">
      {{ t('resume.certifications') }}
    </h2>
    <div v-for="cert in store.data.certifications" :key="cert.name" class="mb-2 text-xs">
      <p class="font-semibold">{{ cert.name }}</p>
      <p class="text-gray-500">{{ cert.issuer }}</p>
      <p class="text-gray-500">{{ cert.year }}</p>
    </div>
  </section>
</template>
