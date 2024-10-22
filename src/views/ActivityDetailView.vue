<template>
    <div class="act-detail">
        <Panel>
            <template #header>
                <p>
                    <h3>{{ title }}</h3>
                    <div class="align-left">{{ subtitle }}</div>
                </p>
            </template>
            <img :src="image" width="80%" @load="handleImageLoading" v-show="isImageLoaded" />
            <Skeleton v-show="!isImageLoaded" width="100%" height="10rem"></Skeleton>
            <div class="align-left" style="margin-top: 30px">
                {{ content }}
                {{ id }}
            </div>
            <template #footer>
                <Button label="報名" icon="pi pi-send" />
            </template>
        </Panel>
    </div>
</template>
<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';
import apiClient from '../request/request';
const router = useRoute();
const id = router.params.id;
const title = ref('');
const subtitle = ref('');
const content = ref('');
const image = ref('');
const isImageLoaded = ref(false);
const handleImageLoading = () => {
    isImageLoaded.value = true;
}
onMounted(async () => {
    await apiClient.get('/api/activityInfo/getActivityInfoDetail/' + id).then(res => {
        title.value = res.data.title;
        subtitle.value = res.data.subtitle;
        content.value = res.data.content;
        image.value = res.data.image;
    })
});
</script>
<style scoped>
.act-detail {
    display: flex;
    justify-content: center;
}
.align-left {
    text-align: left;
}
.p-panel {
    width: 60%;
}
</style>