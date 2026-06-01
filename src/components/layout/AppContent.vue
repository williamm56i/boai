<template>
  <div class="main">
    <!-- main/content area content -->
    <keep-alive>
      <router-view />
    </keep-alive>
  </div>
</template>

<script setup lang="ts">

</script>

<style>
.main {
  display: flex;
  flex-direction: column;
  flex: 1 0 auto;
  min-height: 100%;
  background: #ffffff;
  text-align: center;
}

.main > * {
  flex: 1 0 auto;
}
</style>
