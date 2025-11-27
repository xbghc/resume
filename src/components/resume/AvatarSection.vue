<script setup lang="ts">
import { useResumeStore } from '@/stores/resume'

const store = useResumeStore()
</script>

<template>
  <div class="mb-4">
    <!-- 头像 -->
    <div class="w-28 h-28 mx-auto mb-4 bg-gray-300 rounded overflow-hidden">
      <img
        v-if="store.data.avatar"
        :src="store.data.avatar"
        :alt="store.data.name"
        class="w-full h-full object-cover"
      />
    </div>

    <!-- 姓名和职位 -->
    <h1 class="text-xl font-bold text-cyan-600 mb-1">{{ store.data.name }}</h1>
    <p class="text-gray-600 text-sm">{{ store.data.title }}</p>
  </div>
</template>
