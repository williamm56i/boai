<template>
    <div class="admin-panel">
        <AboutSettingView />
        <ManagerSettingView />
    </div>
</template>
<script setup lang="ts">
import AboutSettingView from './admin/AboutSettingView.vue';
import ManagerSettingView from './admin/ManagerSettingView.vue';

</script>
<style scoped>
.admin-panel {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
}

.admin-panel>* {
    flex: 1 1 50%;
    max-width: 50%;
}

@media (max-width: 800px) {
    .admin-panel>* {
        flex: 1 1 100%;
        max-width: 100%;
    }
}
</style>