<script setup lang="ts">
import Resume from '@/components/ResumePreview.vue'
import ResumeEditor from '@/components/ResumeEditor.vue'
</script>

<template>
  <div class="flex h-screen">
    <!-- 左侧编辑器 -->
    <div class="w-[480px] h-full border-r no-print">
      <ResumeEditor />
    </div>

    <!-- 右侧预览 -->
    <div class="flex-1 h-full overflow-auto p-8 flex justify-center">
      <Resume />
    </div>
  </div>
</template>
