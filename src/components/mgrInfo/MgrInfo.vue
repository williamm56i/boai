<template>
    <div v-if="position === 'left'" class="mgr-info">
        <img :src="imageUrl" class="photo" width="40%" @load="handleImageLoading" v-show="isImageLoaded" />
        <Skeleton v-show="!isImageLoaded" width="10rem" height="13rem"></Skeleton>
        <div class="info-left">
            <h2 v-show="title">{{ title }} - {{ name }}</h2>
            <Skeleton v-show="!title" width="8rem" class="mb-2"></Skeleton>
            <span style="font-size: 12px;">
                <div v-show="title">{{ description }}</div>
                <Skeleton v-show="!title" width="10rem" class="mb-2"></Skeleton>
            </span>
            <span style="font-size:  12px;">
                <div v-show="title"> {{ description2 }}</div>
                <Skeleton v-show="!title" width="10rem" class="mb-2"></Skeleton>
            </span>
        </div>
    </div>
    <div v-if="position === 'right'" class="mgr-info">
        <div class="info-right">
            <h2 v-show="title">{{ title }} - {{ name }}</h2>
            <Skeleton v-show="!title" width="8rem" class="mb-2"></Skeleton>
            <span style="font-size: 12px;">
                <div v-show="title">{{ description }}</div>
                <Skeleton v-show="!title" width="10rem" class="mb-2"></Skeleton>
            </span>
            <span style="font-size: 12px;">
                <div v-show="title"> {{ description2 }}</div>
                <Skeleton v-show="!title" width="10rem" class="mb-2"></Skeleton>
            </span>
        </div>
        <img :src="imageUrl" class="photo" width="40%" @load="handleImageLoading" v-show="isImageLoaded" />
        <Skeleton v-show="!isImageLoaded" width="10rem" height="13rem"></Skeleton>
    </div>
</template>
<script setup lang="ts">
import { ref } from 'vue';
defineProps<{
    position: string | undefined,
    imageUrl: string | undefined,
    title: string,
    name: string,
    description: string,
    description2?: string
}>();
const isImageLoaded = ref(false);
const handleImageLoading = () => {
    isImageLoaded.value = true;
}
</script>
<style scoped>
.mgr-info {
    display: flex;
    flex-direction: row;
    justify-content: space-evenly;
}

.mgr-info>.photo {
    padding: 10px 10px 10px 10px;
    border-radius: 20px;
}

.mgr-info>.info-left {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
}

.mgr-info>.info-right {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-end;
}
</style>