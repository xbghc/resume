<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { useResumeStore } from '@/stores/resume'

const { t, locale } = useI18n()
const store = useResumeStore()
</script>

<template>
  <section v-if="store.data.summary" class="mb-4">
    <h3 class="text-sm font-bold text-gray-800 mb-2 border-b border-gray-300 pb-1">
      {{ t('resume.summary') }}
    </h3>
    <p class="text-xs leading-relaxed" :class="{ 'indent-[2em]': locale === 'zh' }">
      {{ store.data.summary }}
    </p>
  </section>
</template>
