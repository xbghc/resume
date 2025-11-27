<script setup lang="ts">
import { useResumeStore } from '@/stores/resume'

const store = useResumeStore()
</script>

<template>
  <div class="mb-4 text-xs space-y-1">
    <p v-if="store.data.contact.location">{{ store.data.contact.location }}</p>
    <p v-if="store.data.contact.phone">{{ store.data.contact.phone }}</p>
    <p v-if="store.data.contact.email">{{ store.data.contact.email }}</p>
    <p v-if="store.data.contact.website">
      <a :href="store.data.contact.website" class="text-cyan-600 hover:underline">
        {{ store.data.contact.website }}
      </a>
    </p>
  </div>
</template>
