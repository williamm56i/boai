<template>
    <div class="news">
        <BoaiTable :size="'small'" :data="data" :columns="columns" :totalCount="totalCount"
            :loading="loading" :tableHeight="'222px'" :selectionMode="'single'" @selected-row="handleSelectedRow"
            class=bulletinBoard></BoaiTable>
    </div>
</template>
<script setup lang="ts">
import { ColumnItem, BulletinBoardItem } from '../interfaces/interface';
import { onMounted, onUnmounted, ref } from 'vue';
import BoaiTable from '../components/table/BoaiTable.vue';
import { useRouter } from 'vue-router';
import apiClient from '../request/request';

const router = useRouter();
const loading = ref(false);
const totalCount = ref<number>(0);
const data = ref<BulletinBoardItem[]>([]);
const columns = ref<ColumnItem[]>([
    {
        field: 'announceDate',
        header: '公告日期'
    },
    {
        field: 'subject',
        header: '最新消息'
    }
]);
const getBulletinBoard = async () => {
  loading.value = true;
  await apiClient.get('/api/bulletinBoard/getAll').then(res => {
    data.value = res.data;
  }).catch(err => console.error(err))
    .finally(() => loading.value = false);
}
const handleSelectedRow = (row: any) => {
    router.push('/newsDetail/' + row.id);
}
const updateScreenSize = () => {
    const width = window.innerWidth;
    if (width < 800) {

    } else if (width < 1200) {

    } else {

    }
}

onMounted(async () => {
    await getBulletinBoard();
    updateScreenSize();
    window.addEventListener('resize', updateScreenSize);
});
onUnmounted(() => {
    window.removeEventListener('resize', updateScreenSize);
})
</script>
<style scoped>
.news {
    display: flex;
    justify-content: center;
    background: linear-gradient(to left, rgb(238, 226, 171) 40%, rgba(253, 208, 0, 0) 70%);
}

.person {
    flex: 0 0 33.33%;
}

.bulletinBoard {
    width: 80%;
}

@media (max-width: 1200px) {
    .person {
        flex: 0 0 50%;
    }
}

@media (max-width: 800px) {
    .person {
        flex: 0 0 100%;
    }

    .bulletinBoard {
        width: 98%;
    }
}
</style>