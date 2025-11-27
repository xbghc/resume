<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { useResumeStore } from '@/stores/resume'

const { t } = useI18n()
const store = useResumeStore()
</script>

<template>
  <section v-if="store.data.skills?.length" class="mb-4">
    <h2 class="text-sm font-semibold text-gray-800 border-b border-gray-300 pb-1 mb-2">
      {{ t('resume.skills') }}
    </h2>
    <div v-for="group in store.data.skills" :key="group.name" class="mb-2 text-xs">
      <p class="font-semibold">{{ group.name }}</p>
      <p v-if="group.level" class="text-gray-500">{{ group.level }}</p>
      <p class="text-gray-600">{{ group.keywords.join(', ') }}</p>
    </div>
  </section>
</template>
