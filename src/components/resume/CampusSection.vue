<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { useResumeStore } from '@/stores/resume'

const { t } = useI18n()
const store = useResumeStore()
</script>

<template>
  <section v-if="store.data.campus?.length" class="mb-4">
    <h2 class="text-sm font-semibold text-gray-800 border-b border-gray-300 pb-1 mb-2">
      {{ t('resume.campus') }}
    </h2>
    <div v-for="item in store.data.campus" :key="item.name" class="mb-2 text-xs">
      <p class="font-semibold">{{ item.name }}</p>
      <p class="text-gray-500">{{ item.role }}</p>
      <p class="text-gray-500">{{ item.period }}</p>
    </div>
  </section>
</template>
