<template>
    <div v-if="position === 'left'" class="mgr-info">
        <img :src="imageUrl" class="photo" width="30%" />
        <div class="info-left">
            <h2>{{ title }} - {{ name }}</h2>
            <div>{{ description }}</div>
            <div> {{ description2 }}</div>
        </div>
    </div>
    <div v-if="position === 'right'" class="mgr-info">
        <div class="info-right">
            <h2>{{ title }} - {{ name }}</h2>
            <div>{{ description }} </div>
            <div> {{ description2 }}</div>
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
.mgr-info > .info-left {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
}
.mgr-info > .info-right {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-end;
}
</style>