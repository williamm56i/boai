<template>
    <Toolbar>
        <template #end>
            <!-- <Button v-tooltip.bottom="'使用者維護'" icon="pi pi-user-edit" severity="secondary" text /> -->
            <Button v-tooltip.bottom="'登出'" icon="pi pi-sign-out" severity="secondary" text @click="logout" />
        </template>
    </Toolbar>
    <div class="admin-panel">
        <AboutSettingView />
        <ManagerSettingView />
        <ActivitySettingView />
        <BulletinBoardSettingView />
    </div>
</template>
<script setup lang="ts">
import AboutSettingView from './admin/AboutSettingView.vue';
import ActivitySettingView from './admin/ActivitySettingView.vue';
import BulletinBoardSettingView from './admin/BulletinBoardSettingView.vue';
import ManagerSettingView from './admin/ManagerSettingView.vue';
import { useRouter } from 'vue-router';

const router = useRouter();

const logout = () => {
    localStorage.removeItem('jwt');
    router.push('/');
};
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