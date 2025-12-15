<script setup lang="ts">
import { computed } from 'vue'
import { useResumeStore } from '@/stores/resume'

const store = useResumeStore()

const birthDateText = computed(() => {
  const birthDate = store.data.contact.birthDate
  if (!birthDate) return ''

  const display = store.data.contact.birthDateDisplay || 'age'
  if (display === 'date') {
    return birthDate.replace(/-/g, '/')
  }

  const birth = new Date(birthDate)
  const today = new Date()
  let age = today.getFullYear() - birth.getFullYear()
  const monthDiff = today.getMonth() - birth.getMonth()
  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
    age--
  }
  return `${age}岁`
})
</script>

<template>
  <div class="mb-4 text-xs space-y-1">
    <p v-if="birthDateText">{{ birthDateText }}</p>
    <p v-if="store.data.contact.address">{{ store.data.contact.address }}</p>
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
