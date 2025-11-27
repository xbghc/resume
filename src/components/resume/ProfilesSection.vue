<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { useResumeStore } from '@/stores/resume'

const { t } = useI18n()
const store = useResumeStore()
</script>

<template>
  <section v-if="store.data.profiles?.length" class="mb-4">
    <h2 class="text-sm font-semibold text-gray-800 border-b border-gray-300 pb-1 mb-2">
      {{ t('resume.profiles') }}
    </h2>
    <div v-for="profile in store.data.profiles" :key="profile.network" class="mb-1.5 text-xs">
      <p class="font-medium">{{ profile.username }}</p>
      <p class="text-gray-500">{{ profile.network }}</p>
    </div>
  </section>
</template>
