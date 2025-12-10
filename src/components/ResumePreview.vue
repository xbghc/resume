<script setup lang="ts">
import AvatarSection from './resume/AvatarSection.vue'
import ContactSection from './resume/ContactSection.vue'
import ProfilesSection from './resume/ProfilesSection.vue'
import SkillsSection from './resume/SkillsSection.vue'
import CertificationsSection from './resume/CertificationsSection.vue'
import CampusSection from './resume/CampusSection.vue'
import SummarySection from './resume/SummarySection.vue'
import ExperienceSection from './resume/ExperienceSection.vue'
import EducationSection from './resume/EducationSection.vue'
import ProjectsSection from './resume/ProjectsSection.vue'
</script>

<template>
  <div class="a4-page flex">
    <!-- 左侧边栏 -->
    <aside class="w-1/3 bg-gray-100 p-6">
      <AvatarSection />
      <ContactSection />
      <ProfilesSection />
      <SkillsSection />
      <CertificationsSection />
      <CampusSection />
    </aside>

    <!-- 右侧主内容 -->
    <main class="w-2/3 bg-white p-6">
      <SummarySection />
      <ExperienceSection />
      <EducationSection />
      <ProjectsSection />
    </main>
  </div>
</template>
