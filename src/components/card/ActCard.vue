<template>
    <Card>
        <template #header>
            <img :src="imageUrl" width="80%" @load="handleImageLoading" v-show="isImageLoaded" />
            <Skeleton v-show="!isImageLoaded" width="100%" height="10rem"></Skeleton>
        </template>
        <template #subtitle>
            {{ subtitle }}
        </template>
        <template #content>
            <b>{{ title }}</b>
        </template>
    </Card>
</template>
<script setup lang="ts">
import { ref } from 'vue';
defineProps<{
    title: string,
    subtitle: string,
    imageUrl: string
}>();
const isImageLoaded = ref(false);
const handleImageLoading = () => {
    isImageLoaded.value = true;
}
</script>
<style scoped>
.p-card {
    /* height: 300px; */
    border-radius: 20px;
    margin: 20px 20px 20px 20px;
}
.p-card:hover {
    transform: translate(-5px, -5px);
}
</style>