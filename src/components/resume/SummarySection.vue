<script setup lang="ts">
import { useResumeStore } from '@/stores/resume'

const store = useResumeStore()
</script>

<template>
  <section v-if="store.data.summary" class="mb-4 p-3 bg-gray-100 text-xs leading-relaxed">
    {{ store.data.summary }}
  </section>
</template>
