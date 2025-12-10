<script setup lang="ts">
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { useResumeStore } from '@/stores/resume'

const { t } = useI18n()
const store = useResumeStore()

const expanded = ref(false)
const collapsedItems = ref<Record<number, boolean>>({})

function removeProject(index: number) {
  store.data.projects?.splice(index, 1)
}
</script>

<template>
  <div class="border rounded">
    <button
      class="w-full px-4 py-2 text-left font-medium bg-gray-50 hover:bg-gray-100 flex justify-between items-center"
      @click="expanded = !expanded"
    >
      {{ t('resume.projects') }}
      <span>{{ expanded ? '−' : '+' }}</span>
    </button>
    <div v-if="expanded && store.data.projects" class="p-4 space-y-3">
      <div
        v-for="(project, index) in store.data.projects"
        :key="project._uid"
        class="p-3 bg-gray-50 rounded space-y-2"
      >
        <div class="flex justify-between items-center">
          <span class="text-sm font-medium" :class="{ 'text-gray-400': project.hidden }">
            {{ project.name || `#${index + 1}` }}
          </span>
          <div class="flex items-center gap-2">
            <button
              class="text-sm px-2 text-gray-500"
              @click="collapsedItems[index] = !collapsedItems[index]"
              :title="collapsedItems[index] ? t('action.expand') : t('action.collapse')"
            >
              {{ collapsedItems[index] ? '+' : '−' }}
            </button>
            <button
              class="text-sm px-2"
              :class="project.hidden ? 'text-gray-400' : 'text-cyan-600'"
              @click="project.hidden = !project.hidden"
              :title="project.hidden ? t('action.show') : t('action.hide')"
            >
              {{ project.hidden ? '○' : '●' }}
            </button>
            <button class="text-red-500 text-sm" @click="removeProject(index)">
              {{ t('action.delete') }}
            </button>
          </div>
        </div>
        <template v-if="!collapsedItems[index]">
          <input
            v-model="project.name"
            :placeholder="t('field.projectName')"
            class="w-full px-3 py-2 border rounded text-sm"
          />
          <input
            v-model="project.role"
            :placeholder="t('field.role')"
            class="w-full px-3 py-2 border rounded text-sm"
          />
          <textarea
            v-model="project.description"
            :placeholder="t('field.description')"
            rows="2"
            class="w-full px-3 py-2 border rounded text-sm"
          ></textarea>
        </template>
      </div>
      <button
        class="w-full py-2 border border-dashed border-gray-300 rounded text-gray-500 hover:bg-gray-50"
        @click="store.newProject()"
      >
        + {{ t('action.add') }}
      </button>
    </div>
  </div>
</template>
