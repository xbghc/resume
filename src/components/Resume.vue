<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { useResumeStore } from '@/stores/resume'

const { t } = useI18n()
const store = useResumeStore()
</script>

<template>
  <div class="a4-page flex">
    <!-- 左侧边栏 -->
    <aside class="w-1/3 bg-gray-100 p-6">
      <!-- 头像占位 -->
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
      <p class="text-gray-600 text-sm mb-4">{{ store.data.title }}</p>

      <!-- 联系方式 -->
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

      <!-- 社交链接 -->
      <section v-if="store.data.profiles?.length" class="mb-4">
        <h2 class="text-sm font-semibold text-gray-800 border-b border-gray-300 pb-1 mb-2">
          {{ t('resume.profiles') }}
        </h2>
        <div v-for="profile in store.data.profiles" :key="profile.network" class="mb-1.5 text-xs">
          <p class="font-medium">{{ profile.username }}</p>
          <p class="text-gray-500">{{ profile.network }}</p>
        </div>
      </section>

      <!-- 技能 -->
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

      <!-- 证书 -->
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
    </aside>

    <!-- 右侧主内容 -->
    <main class="w-2/3 bg-white p-6">
      <!-- 个人简介 -->
      <section v-if="store.data.summary" class="mb-4 p-3 bg-gray-100 text-xs leading-relaxed">
        {{ store.data.summary }}
      </section>

      <!-- 工作经历 -->
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

      <!-- 教育背景 -->
      <section v-if="store.data.education?.length" class="mb-4">
        <h2 class="text-sm font-semibold text-gray-800 border-b border-cyan-600 pb-1 mb-3">
          {{ t('resume.education') }}
        </h2>
        <div v-for="edu in store.data.education" :key="edu.school" class="mb-2">
          <div class="flex justify-between items-start">
            <div>
              <p class="font-semibold text-sm">{{ edu.school }}</p>
              <p v-if="edu.location" class="text-gray-500 text-xs">{{ edu.location }}</p>
            </div>
            <div class="text-right text-xs">
              <p class="font-medium">{{ edu.period }}</p>
              <p class="text-gray-600">{{ edu.degree }}</p>
            </div>
          </div>
        </div>
      </section>

      <!-- 项目经历 -->
      <section v-if="store.data.projects?.length" class="mb-4">
        <h2 class="text-sm font-semibold text-gray-800 border-b border-cyan-600 pb-1 mb-3">
          {{ t('resume.projects') }}
        </h2>
        <div v-for="project in store.data.projects" :key="project.name" class="mb-2">
          <p class="font-semibold text-sm">{{ project.name }}</p>
          <p v-if="project.role" class="text-gray-500 text-xs">{{ project.role }}</p>
          <p class="text-xs mt-0.5">{{ project.description }}</p>
        </div>
      </section>
    </main>
  </div>
</template>
