<script setup lang="ts">
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { useResumeStore } from '@/stores/resume'
import ProjectsSection from './ProjectsSection.vue'

const { t, locale } = useI18n()
const store = useResumeStore()
const fileInput = ref<HTMLInputElement>()
const avatarInput = ref<HTMLInputElement>()

const expandedSections = ref<Record<string, boolean>>({
  basicInfo: true,
  contact: false,
  profiles: false,
  summary: false,
  skills: false,
  experience: false,
  education: false,
  certifications: false,
})

function toggleSection(section: string) {
  expandedSections.value[section] = !expandedSections.value[section]
}

function triggerImport() {
  fileInput.value?.click()
}

async function handleFileChange(e: Event) {
  const file = (e.target as HTMLInputElement).files?.[0]
  if (file) {
    await store.importFromFile(file)
  }
}

function handleAvatarChange(e: Event) {
  const file = (e.target as HTMLInputElement).files?.[0]
  if (file) {
    const reader = new FileReader()
    reader.onload = () => {
      store.data.avatar = reader.result as string
    }
    reader.readAsDataURL(file)
  }
}

function exportPDF() {
  window.print()
}

function exportJSON() {
  const json = JSON.stringify(store.data, null, 2)
  const blob = new Blob([json], { type: 'application/json' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = `${store.data.name || 'resume'}.json`
  a.click()
  URL.revokeObjectURL(url)
}

function addExperience() {
  store.data.experience.push({
    company: '',
    position: '',
    period: '',
    highlights: [],
  })
}

function removeExperience(index: number) {
  store.data.experience.splice(index, 1)
}

function addHighlight(expIndex: number) {
  store.data.experience[expIndex]?.highlights.push('')
}

function removeHighlight(expIndex: number, hlIndex: number) {
  store.data.experience[expIndex]?.highlights.splice(hlIndex, 1)
}

function addEducation() {
  store.data.education.push({
    school: '',
    degree: '',
    period: '',
  })
}

function removeEducation(index: number) {
  store.data.education.splice(index, 1)
}

function addSkill() {
  store.data.skills.push({
    name: '',
    level: '',
    keywords: [],
  })
}

function removeSkill(index: number) {
  store.data.skills.splice(index, 1)
}


function addProfile() {
  if (!store.data.profiles) store.data.profiles = []
  store.data.profiles.push({
    network: '',
    username: '',
  })
}

function removeProfile(index: number) {
  store.data.profiles?.splice(index, 1)
}

function addCertification() {
  if (!store.data.certifications) store.data.certifications = []
  store.data.certifications.push({
    name: '',
    issuer: '',
    year: '',
  })
}

function removeCertification(index: number) {
  store.data.certifications?.splice(index, 1)
}
</script>

<template>
  <div class="h-full overflow-y-scroll bg-white">
    <!-- 工具栏 -->
    <div class="sticky top-0 bg-white border-b p-3 flex flex-wrap gap-2 z-10 *:whitespace-nowrap">
      <button
        class="w-12 py-1.5 text-sm border border-gray-300 rounded hover:bg-gray-100"
        @click="locale = locale === 'zh' ? 'en' : 'zh'"
      >
        {{ locale === 'zh' ? 'EN' : '中' }}
      </button>
      <button
        class="px-3 py-1.5 text-sm border border-gray-300 rounded hover:bg-gray-100"
        @click="triggerImport"
      >
        {{ t('action.import') }}
      </button>
      <button
        class="px-3 py-1.5 text-sm border border-gray-300 rounded hover:bg-gray-100"
        @click="store.loadTemplate(locale)"
      >
        {{ t('action.loadTemplate') }}
      </button>
      <button
        class="px-3 py-1.5 text-sm border border-gray-300 rounded hover:bg-gray-100"
        @click="store.clear()"
      >
        {{ t('action.clear') }}
      </button>
      <button
        class="px-3 py-1.5 text-sm bg-cyan-600 text-white rounded hover:bg-cyan-700"
        @click="exportPDF"
      >
        {{ t('action.export') }}
      </button>
      <button
        class="px-3 py-1.5 text-sm border border-gray-300 rounded hover:bg-gray-100"
        @click="exportJSON"
      >
        {{ t('action.exportJSON') }}
      </button>
      <input ref="fileInput" type="file" accept=".json" class="hidden" @change="handleFileChange" />
    </div>

    <div class="p-4 space-y-2">
      <!-- 基本信息 -->
      <div class="border rounded">
        <button
          class="w-full px-4 py-2 text-left font-medium bg-gray-50 hover:bg-gray-100 flex justify-between items-center"
          @click="toggleSection('basicInfo')"
        >
          {{ t('resume.basicInfo') }}
          <span>{{ expandedSections.basicInfo ? '−' : '+' }}</span>
        </button>
        <div v-if="expandedSections.basicInfo" class="p-4 space-y-3">
          <div>
            <label class="block text-sm text-gray-600 mb-1">{{ t('field.avatar') }}</label>
            <div class="flex items-center gap-3">
              <div
                class="w-16 h-16 bg-gray-200 rounded overflow-hidden cursor-pointer"
                @click="avatarInput?.click()"
              >
                <img
                  v-if="store.data.avatar"
                  :src="store.data.avatar"
                  class="w-full h-full object-cover"
                />
              </div>
              <div class="flex gap-2">
                <button
                  class="px-3 py-1.5 text-sm border border-gray-300 rounded hover:bg-gray-100"
                  @click="avatarInput?.click()"
                >
                  {{ t('action.upload') }}
                </button>
                <button
                  v-if="store.data.avatar"
                  class="px-3 py-1.5 text-sm text-red-500 border border-gray-300 rounded hover:bg-gray-100"
                  @click="store.data.avatar = ''"
                >
                  {{ t('action.delete') }}
                </button>
              </div>
              <input
                ref="avatarInput"
                type="file"
                accept="image/*"
                class="hidden"
                @change="handleAvatarChange"
              />
            </div>
          </div>
          <div>
            <label class="block text-sm text-gray-600 mb-1">{{ t('field.name') }}</label>
            <input v-model="store.data.name" class="w-full px-3 py-2 border rounded" />
          </div>
          <div>
            <label class="block text-sm text-gray-600 mb-1">{{ t('field.title') }}</label>
            <input v-model="store.data.title" class="w-full px-3 py-2 border rounded" />
          </div>
        </div>
      </div>

      <!-- 联系方式 -->
      <div class="border rounded">
        <button
          class="w-full px-4 py-2 text-left font-medium bg-gray-50 hover:bg-gray-100 flex justify-between items-center"
          @click="toggleSection('contact')"
        >
          {{ t('resume.contact') }}
          <span>{{ expandedSections.contact ? '−' : '+' }}</span>
        </button>
        <div v-if="expandedSections.contact" class="p-4 space-y-3">
          <div>
            <label class="block text-sm text-gray-600 mb-1">{{ t('field.email') }}</label>
            <input v-model="store.data.contact.email" class="w-full px-3 py-2 border rounded" />
          </div>
          <div>
            <label class="block text-sm text-gray-600 mb-1">{{ t('field.phone') }}</label>
            <input v-model="store.data.contact.phone" class="w-full px-3 py-2 border rounded" />
          </div>
          <div>
            <label class="block text-sm text-gray-600 mb-1">{{ t('field.location') }}</label>
            <input v-model="store.data.contact.location" class="w-full px-3 py-2 border rounded" />
          </div>
          <div>
            <label class="block text-sm text-gray-600 mb-1">{{ t('field.website') }}</label>
            <input v-model="store.data.contact.website" class="w-full px-3 py-2 border rounded" />
          </div>
        </div>
      </div>

      <!-- 个人简介 -->
      <div class="border rounded">
        <button
          class="w-full px-4 py-2 text-left font-medium bg-gray-50 hover:bg-gray-100 flex justify-between items-center"
          @click="toggleSection('summary')"
        >
          {{ t('resume.summary') }}
          <span>{{ expandedSections.summary ? '−' : '+' }}</span>
        </button>
        <div v-if="expandedSections.summary" class="p-4">
          <textarea
            v-model="store.data.summary"
            rows="4"
            class="w-full px-3 py-2 border rounded"
          ></textarea>
        </div>
      </div>

      <!-- 社交主页 -->
      <div class="border rounded">
        <button
          class="w-full px-4 py-2 text-left font-medium bg-gray-50 hover:bg-gray-100 flex justify-between items-center"
          @click="toggleSection('profiles')"
        >
          {{ t('resume.profiles') }}
          <span>{{ expandedSections.profiles ? '−' : '+' }}</span>
        </button>
        <div v-if="expandedSections.profiles" class="p-4 space-y-3">
          <div
            v-for="(profile, index) in store.data.profiles"
            :key="index"
            class="p-3 bg-gray-50 rounded space-y-2"
          >
            <div class="flex justify-between">
              <span class="text-sm font-medium">{{ profile.network || `#${index + 1}` }}</span>
              <button class="text-red-500 text-sm" @click="removeProfile(index)">
                {{ t('action.delete') }}
              </button>
            </div>
            <input
              v-model="profile.network"
              :placeholder="t('field.network')"
              class="w-full px-3 py-2 border rounded text-sm"
            />
            <input
              v-model="profile.username"
              :placeholder="t('field.username')"
              class="w-full px-3 py-2 border rounded text-sm"
            />
          </div>
          <button
            class="w-full py-2 border border-dashed border-gray-300 rounded text-gray-500 hover:bg-gray-50"
            @click="addProfile"
          >
            + {{ t('action.add') }}
          </button>
        </div>
      </div>

      <!-- 技能 -->
      <div class="border rounded">
        <button
          class="w-full px-4 py-2 text-left font-medium bg-gray-50 hover:bg-gray-100 flex justify-between items-center"
          @click="toggleSection('skills')"
        >
          {{ t('resume.skills') }}
          <span>{{ expandedSections.skills ? '−' : '+' }}</span>
        </button>
        <div v-if="expandedSections.skills" class="p-4 space-y-3">
          <div
            v-for="(skill, index) in store.data.skills"
            :key="index"
            class="p-3 bg-gray-50 rounded space-y-2"
          >
            <div class="flex justify-between">
              <span class="text-sm font-medium">{{ skill.name || `#${index + 1}` }}</span>
              <button class="text-red-500 text-sm" @click="removeSkill(index)">
                {{ t('action.delete') }}
              </button>
            </div>
            <input
              v-model="skill.name"
              :placeholder="t('field.skillName')"
              class="w-full px-3 py-2 border rounded text-sm"
            />
            <input
              v-model="skill.level"
              :placeholder="t('field.level')"
              class="w-full px-3 py-2 border rounded text-sm"
            />
            <input
              :placeholder="t('field.keywords')"
              class="w-full px-3 py-2 border rounded text-sm"
              @keyup.enter="
                (e) => {
                  const input = e.target as HTMLInputElement
                  const val = input.value.trim()
                  if (val) {
                    skill.keywords.push(val)
                    input.value = ''
                  }
                }
              "
            />
            <div v-if="skill.keywords.length" class="flex flex-wrap gap-1 mt-1">
              <span
                v-for="(keyword, kIndex) in skill.keywords"
                :key="kIndex"
                class="px-2 py-0.5 bg-gray-200 text-gray-700 text-xs rounded cursor-pointer hover:bg-red-100 hover:text-red-600"
                @click="skill.keywords.splice(kIndex, 1)"
              >
                {{ keyword }} ×
              </span>
            </div>
          </div>
          <button
            class="w-full py-2 border border-dashed border-gray-300 rounded text-gray-500 hover:bg-gray-50"
            @click="addSkill"
          >
            + {{ t('action.add') }}
          </button>
        </div>
      </div>

      <!-- 工作经历 -->
      <div class="border rounded">
        <button
          class="w-full px-4 py-2 text-left font-medium bg-gray-50 hover:bg-gray-100 flex justify-between items-center"
          @click="toggleSection('experience')"
        >
          {{ t('resume.experience') }}
          <span>{{ expandedSections.experience ? '−' : '+' }}</span>
        </button>
        <div v-if="expandedSections.experience" class="p-4 space-y-3">
          <div
            v-for="(exp, expIndex) in store.data.experience"
            :key="expIndex"
            class="p-3 bg-gray-50 rounded space-y-2"
          >
            <div class="flex justify-between">
              <span class="text-sm font-medium">{{ exp.company || `#${expIndex + 1}` }}</span>
              <button class="text-red-500 text-sm" @click="removeExperience(expIndex)">
                {{ t('action.delete') }}
              </button>
            </div>
            <input
              v-model="exp.company"
              :placeholder="t('field.company')"
              class="w-full px-3 py-2 border rounded text-sm"
            />
            <input
              v-model="exp.position"
              :placeholder="t('field.position')"
              class="w-full px-3 py-2 border rounded text-sm"
            />
            <input
              v-model="exp.period"
              :placeholder="t('field.period')"
              class="w-full px-3 py-2 border rounded text-sm"
            />
            <input
              v-model="exp.location"
              :placeholder="t('field.location')"
              class="w-full px-3 py-2 border rounded text-sm"
            />
            <div class="space-y-1">
              <label class="text-xs text-gray-500">{{ t('field.highlights') }}</label>
              <div v-for="(hl, hlIndex) in exp.highlights" :key="hlIndex" class="flex gap-2">
                <input
                  v-model="exp.highlights[hlIndex]"
                  class="flex-1 px-3 py-1.5 border rounded text-sm"
                />
                <button
                  class="px-2 text-red-500 text-sm"
                  @click="removeHighlight(expIndex, hlIndex)"
                >
                  ×
                </button>
              </div>
              <button class="text-sm text-cyan-600 hover:underline" @click="addHighlight(expIndex)">
                + {{ t('action.add') }}
              </button>
            </div>
          </div>
          <button
            class="w-full py-2 border border-dashed border-gray-300 rounded text-gray-500 hover:bg-gray-50"
            @click="addExperience"
          >
            + {{ t('action.add') }}
          </button>
        </div>
      </div>

      <!-- 教育背景 -->
      <div class="border rounded">
        <button
          class="w-full px-4 py-2 text-left font-medium bg-gray-50 hover:bg-gray-100 flex justify-between items-center"
          @click="toggleSection('education')"
        >
          {{ t('resume.education') }}
          <span>{{ expandedSections.education ? '−' : '+' }}</span>
        </button>
        <div v-if="expandedSections.education" class="p-4 space-y-3">
          <div
            v-for="(edu, index) in store.data.education"
            :key="index"
            class="p-3 bg-gray-50 rounded space-y-2"
          >
            <div class="flex justify-between">
              <span class="text-sm font-medium">{{ edu.school || `#${index + 1}` }}</span>
              <button class="text-red-500 text-sm" @click="removeEducation(index)">
                {{ t('action.delete') }}
              </button>
            </div>
            <input
              v-model="edu.school"
              :placeholder="t('field.school')"
              class="w-full px-3 py-2 border rounded text-sm"
            />
            <input
              v-model="edu.degree"
              :placeholder="t('field.degree')"
              class="w-full px-3 py-2 border rounded text-sm"
            />
            <input
              v-model="edu.period"
              :placeholder="t('field.period')"
              class="w-full px-3 py-2 border rounded text-sm"
            />
            <input
              v-model="edu.location"
              :placeholder="t('field.location')"
              class="w-full px-3 py-2 border rounded text-sm"
            />
          </div>
          <button
            class="w-full py-2 border border-dashed border-gray-300 rounded text-gray-500 hover:bg-gray-50"
            @click="addEducation"
          >
            + {{ t('action.add') }}
          </button>
        </div>
      </div>

      <!-- 项目经历 -->
      <ProjectsSection />

      <!-- 证书 -->
      <div class="border rounded">
        <button
          class="w-full px-4 py-2 text-left font-medium bg-gray-50 hover:bg-gray-100 flex justify-between items-center"
          @click="toggleSection('certifications')"
        >
          {{ t('resume.certifications') }}
          <span>{{ expandedSections.certifications ? '−' : '+' }}</span>
        </button>
        <div v-if="expandedSections.certifications" class="p-4 space-y-3">
          <div
            v-for="(cert, index) in store.data.certifications"
            :key="index"
            class="p-3 bg-gray-50 rounded space-y-2"
          >
            <div class="flex justify-between">
              <span class="text-sm font-medium">{{ cert.name || `#${index + 1}` }}</span>
              <button class="text-red-500 text-sm" @click="removeCertification(index)">
                {{ t('action.delete') }}
              </button>
            </div>
            <input
              v-model="cert.name"
              :placeholder="t('field.certName')"
              class="w-full px-3 py-2 border rounded text-sm"
            />
            <input
              v-model="cert.issuer"
              :placeholder="t('field.issuer')"
              class="w-full px-3 py-2 border rounded text-sm"
            />
            <input
              v-model="cert.year"
              :placeholder="t('field.year')"
              class="w-full px-3 py-2 border rounded text-sm"
            />
          </div>
          <button
            class="w-full py-2 border border-dashed border-gray-300 rounded text-gray-500 hover:bg-gray-50"
            @click="addCertification"
          >
            + {{ t('action.add') }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
