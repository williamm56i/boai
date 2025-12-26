<template>
    <div class="news-detail">
        <Toast />
        <Panel>
            <template #header>
                <p class="align-left">
                <h3>{{ subject }}</h3>
                <div>公告日期：{{ announceDate }}</div>
                </p>
            </template>
            <div v-html="contentData" class="align-left" style="margin-top: 30px"></div>
        </Panel>
    </div>
</template>
<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import apiClient from '../request/request.ts';

const route = useRoute();
const router = useRouter();
const id = route.params.id;
const subject = ref('');
const announceDate = ref('');
const contentData = ref('');
const getBulletinBoardDetail = async () => {
    await apiClient.get('/api/bulletinBoard/getBulletinBoardDetail/' + id).then(res => {
        if (!res.data) {
            router.push('/news');
        } else {
            subject.value = res.data.subject;
            announceDate.value = res.data.announceDate;
            contentData.value = res.data.contentData;
        }
    }).catch(err => console.error(err));
}   
onMounted(async () => {
    getBulletinBoardDetail();
});
</script>
<style scoped>
.news-detail {
    display: flex;
    justify-content: center;
}

.align-left {
    text-align: left;
}

.align-left :deep(img) {
    max-width: 100% ;
    width: 100% ;
    height: auto ;
    display: block;
}

.p-panel {
    width: 60%;
}

@media (max-width: 800px) {
    .p-panel {
        width: 95%;
    }
}

.p-radiobutton {
    margin-left: 20px;
}

.action-tool {
    display: flex;
    justify-content: flex-end;
    margin-top: 10px
}

.p-button {
    margin-left: 10px;
}
</style>