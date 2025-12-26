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
// import { useRouter } from 'vue-router';
// const router = useRouter();
onMounted(() => {
  // router.push('/');
});
</script>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
}
</style>