<template>
    <Card>
        <template #header>
            <h2>{{ title }}</h2>
        </template>
        <template #subtitle>
            {{ subtitle }}
        </template>
        <template #content>
            <img :src="imageUrl" width="100%" />
        </template>
    </Card>
</template>
<script setup lang="ts">
defineProps<{
    title: string,
    subtitle: string,
    imageUrl: string
}>();
</script>
<style scoped>
.p-card {
  border-radius: 20px;
  margin: 20px 20px 20px 20px;
}
</style>