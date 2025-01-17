<template>
    <Card>
        <template #header>
            <div class="image-container">
                <img :src="imageUrl" @load="handleImageLoading" v-show="isImageLoaded" />
                <Skeleton v-show="!isImageLoaded" width="100%" height="14rem"></Skeleton>
            </div>
        </template>
        <template #subtitle>
            {{ subtitle }}
            <Skeleton v-show="!title" width="100%" height="2rem"></Skeleton>
        </template>
        <template #content>
            <b>{{ title }}</b>
            <Skeleton v-show="!title" width="100%" height="2rem"></Skeleton>
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
    /* height: 300px; */
    border-radius: 20px;
    margin: 20px 20px 20px 20px;
}
.p-card:hover {
    transform: translate(-5px, -5px);
}
.image-container {
    width: 80%;
    height: 200px;
    overflow: hidden;
}

.image-container img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: top;
}
</style>