<script setup lang="ts">
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { useResumeStore } from '@/stores/resume'

const { t, locale } = useI18n()
const store = useResumeStore()
const fileInput = ref<HTMLInputElement>()

function triggerImport() {
  fileInput.value?.click()
}

async function handleFileChange(e: Event) {
  const file = (e.target as HTMLInputElement).files?.[0]
  if (file) {
    await store.importFromFile(file)
  }
}
</script>

<template>
  <div class="max-w-4xl mx-auto my-8 shadow-lg">
    <!-- 工具栏 -->
    <div class="flex gap-2.5 p-4 bg-white border-b print:hidden">
      <button
        class="px-4 py-2 border border-gray-300 rounded bg-white cursor-pointer hover:bg-gray-100"
        @click="triggerImport"
      >
        {{ t('action.import') }}
      </button>
      <button
        class="px-4 py-2 border border-gray-300 rounded bg-white cursor-pointer hover:bg-gray-100"
        @click="store.loadTemplate(locale)"
      >
        {{ t('action.loadTemplate') }}
      </button>
      <button
        class="px-4 py-2 border border-gray-300 rounded bg-white cursor-pointer hover:bg-gray-100"
        @click="store.clear()"
      >
        {{ t('action.clear') }}
      </button>
      <input
        ref="fileInput"
        type="file"
        accept=".json"
        class="hidden"
        @change="handleFileChange"
      />
    </div>

    <div class="flex">
      <!-- 左侧边栏 -->
      <aside class="w-1/3 bg-gray-100 p-6">
        <!-- 头像占位 -->
        <div class="w-32 h-32 mx-auto mb-6 bg-gray-300 rounded overflow-hidden">
          <img
            v-if="store.data.avatar"
            :src="store.data.avatar"
            :alt="store.data.name"
            class="w-full h-full object-cover"
          />
        </div>

        <!-- 姓名和职位 -->
        <h1 class="text-2xl font-bold text-cyan-600 mb-1">{{ store.data.name }}</h1>
        <p class="text-gray-600 mb-6">{{ store.data.title }}</p>

        <!-- 联系方式 -->
        <div class="mb-6 text-sm space-y-1.5">
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
        <section v-if="store.data.profiles?.length" class="mb-6">
          <h2 class="text-base font-semibold text-gray-800 border-b border-gray-300 pb-1 mb-3">
            {{ t('resume.profiles') }}
          </h2>
          <div v-for="profile in store.data.profiles" :key="profile.network" class="mb-2 text-sm">
            <p class="font-medium">{{ profile.username }}</p>
            <p class="text-gray-500">{{ profile.network }}</p>
          </div>
        </section>

        <!-- 技能 -->
        <section v-if="store.data.skills?.length" class="mb-6">
          <h2 class="text-base font-semibold text-gray-800 border-b border-gray-300 pb-1 mb-3">
            {{ t('resume.skills') }}
          </h2>
          <div v-for="group in store.data.skills" :key="group.name" class="mb-3 text-sm">
            <p class="font-semibold">{{ group.name }}</p>
            <p v-if="group.level" class="text-gray-500">{{ group.level }}</p>
            <p class="text-gray-600">{{ group.keywords.join(', ') }}</p>
          </div>
        </section>

        <!-- 证书 -->
        <section v-if="store.data.certifications?.length" class="mb-6">
          <h2 class="text-base font-semibold text-gray-800 border-b border-gray-300 pb-1 mb-3">
            {{ t('resume.certifications') }}
          </h2>
          <div
            v-for="cert in store.data.certifications"
            :key="cert.name"
            class="mb-3 text-sm"
          >
            <p class="font-semibold">{{ cert.name }}</p>
            <p class="text-gray-500">{{ cert.issuer }}</p>
            <p class="text-gray-500">{{ cert.year }}</p>
          </div>
        </section>
      </aside>

      <!-- 右侧主内容 -->
      <main class="w-2/3 bg-white p-6">
        <!-- 个人简介 -->
        <section v-if="store.data.summary" class="mb-6 p-4 bg-gray-100 text-sm leading-relaxed">
          {{ store.data.summary }}
        </section>

        <!-- 工作经历 -->
        <section v-if="store.data.experience?.length" class="mb-6">
          <h2 class="text-base font-semibold text-gray-800 border-b border-cyan-600 pb-1 mb-4">
            {{ t('resume.experience') }}
          </h2>
          <div v-for="job in store.data.experience" :key="job.company" class="mb-5">
            <div class="flex justify-between items-start">
              <div>
                <p class="font-semibold">{{ job.company }}</p>
                <p class="text-gray-600">{{ job.position }}</p>
                <p v-if="job.url" class="text-cyan-600 text-sm">
                  <a :href="job.url" class="hover:underline">{{ job.url }}</a>
                </p>
              </div>
              <div class="text-right text-sm">
                <p class="font-medium">{{ job.period }}</p>
                <p v-if="job.location" class="text-gray-500">{{ job.location }}</p>
              </div>
            </div>
            <ul class="mt-2 list-disc pl-5 text-sm space-y-1">
              <li v-for="(highlight, index) in job.highlights" :key="index">
                {{ highlight }}
              </li>
            </ul>
          </div>
        </section>

        <!-- 教育背景 -->
        <section v-if="store.data.education?.length" class="mb-6">
          <h2 class="text-base font-semibold text-gray-800 border-b border-cyan-600 pb-1 mb-4">
            {{ t('resume.education') }}
          </h2>
          <div v-for="edu in store.data.education" :key="edu.school" class="mb-4">
            <div class="flex justify-between items-start">
              <div>
                <p class="font-semibold">{{ edu.school }}</p>
                <p v-if="edu.location" class="text-gray-500 text-sm">{{ edu.location }}</p>
              </div>
              <div class="text-right text-sm">
                <p class="font-medium">{{ edu.period }}</p>
                <p class="text-gray-600">{{ edu.degree }}</p>
              </div>
            </div>
          </div>
        </section>

        <!-- 项目经历 -->
        <section v-if="store.data.projects?.length" class="mb-6">
          <h2 class="text-base font-semibold text-gray-800 border-b border-cyan-600 pb-1 mb-4">
            {{ t('resume.projects') }}
          </h2>
          <div v-for="project in store.data.projects" :key="project.name" class="mb-4">
            <p class="font-semibold">{{ project.name }}</p>
            <p v-if="project.role" class="text-gray-500 text-sm">{{ project.role }}</p>
            <p class="text-sm mt-1">{{ project.description }}</p>
          </div>
        </section>
      </main>
    </div>
  </div>
</template>
