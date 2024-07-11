<template>
    <div v-if="position === 'left'" class="mgr-info">
        <img :src="imageUrl" class="photo" width="30%" />
        <div class="info">
            <h2>{{ title }} - {{ name }}</h2>
            <h4>{{ description }} <br /> {{ description2 }}</h4>
        </div>
    </div>
    <div v-if="position === 'right'" class="mgr-info">
        <div class="info">
            <h2>{{ title }} - {{ name }}</h2>
            <h4>{{ description }} <br /> {{ description2 }}</h4>
        </div>
        <img :src="imageUrl" class="photo" width="30%" />
    </div>
</template>
<script setup lang="ts">
defineProps<{
    position: string,
    imageUrl: string,
    title: string,
    name: string,
    description: string,
    description2?: string
}>();
</script>
<style scoped>
.mgr-info {
    display: flex;
    flex-direction: row;
    justify-content: space-evenly;
}
.mgr-info > .photo {
    padding: 10px 10px 10px 10px;
    border-radius: 5px;
}
.mgr-info > .info {
    display: flex;
    flex-direction: column;
    justify-content: center;
}
</style>