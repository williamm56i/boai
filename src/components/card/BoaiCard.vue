<template>
    <Card>
        <template #header>
            <h2>{{ title }}</h2>
            <div v-show="!title" style="padding: 1.25rem;">
                <Skeleton width="100%" height="2rem"></Skeleton>
            </div>
        </template>
        <template #subtitle>
            {{ subtitle }}
            <Skeleton v-show="!subtitle" width="100%" height="2rem"></Skeleton>
        </template>
        <template #content>
            <img :src="imageUrl" width="100%" @load="handleImageLoading" v-show="isImageLoaded"/>
            <Skeleton v-show="!isImageLoaded" width="100%" height="10rem"></Skeleton>
        </template>
    </Card>
</template>
<script setup lang="ts">
import { ref } from 'vue';
defineProps<{
    title: string,
    subtitle: string,
    imageUrl: string | undefined
}>();
const isImageLoaded = ref(false);
const handleImageLoading = () => {
    isImageLoaded.value = true;
}
</script>
<style scoped>
.p-card {
  border-radius: 20px;
  margin: 20px 20px 20px 20px;
  padding-top: 10px;
}
.p-card:hover {
    transform: translate(-5px, -5px);
}
</style>