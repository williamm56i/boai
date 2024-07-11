<template>
  <div class="container">
    <AppHeader />
    <AppContent />
  </div>
</template>

<script setup lang="ts">
import AppHeader from './AppHeader.vue';
import AppContent from './AppContent.vue';

// 在 <script setup> 中，组件自动注册
</script>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
}
</style>