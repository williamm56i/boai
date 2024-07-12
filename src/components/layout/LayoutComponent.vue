<template>
  <div class="container">
    <AppHeader />
    <AppContent />
    <AppFooter />
  </div>
</template>

<script setup lang="ts">
import AppHeader from './AppHeader.vue';
import AppContent from './AppContent.vue';
import AppFooter from './AppFooter.vue';
import { onMounted } from 'vue';
import { useRouter } from 'vue-router';
const router = useRouter();
onMounted(() => {
  router.push('/');
});
// 在 <script setup> 中，组件自动注册
</script>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
}
</style>