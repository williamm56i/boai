<template>
    <Card>
        <template #header>
            <h2>{{ title }}</h2>
        </template>
        <template #subtitle>
            {{ subtitle }}
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
    imageUrl: string
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

</style>