<template>
    <div>
        <Panel header="關於我們 - 管理">
            <div style="display: flex; flex-direction: row;">
                <FloatLabel variant="on">
                    <label for="title">主題</label>
                    <InputText id="title" v-model="title" />
                </FloatLabel>
                <Button icon="pi pi-search" @click="handleSearch" style="margin-left: 5px;" />
                <Button icon="pi pi-plus" style="margin-left: 5px" />
                <Button icon="pi pi-pen-to-square" style="margin-left: 5px" @click="openDetailDialog" />
                <Button icon="pi pi-trash" style="margin-left: 5px" />
            </div>
            <BoaiTable :size="tableSize" :data="data" :columns="columns" :totalCount="totalCount"
                :selectionMode="'single'" @selected-row="handleSelectedRow">
            </BoaiTable>
        </Panel>
        <Dialog v-model:visible="display" modal header="維護">
            <label for="title" >主題</label>
            <InputText id="title" v-model="aboutInfo.title" />
            <label for="subtitle" >標語</label>
            <InputText id="subtitle" v-model="aboutInfo.subtitle" />
            <label for="content" >內文</label>
            <InputText id="content" v-model="aboutInfo.content" />
            <label for="image" >圖片</label>
        </Dialog>
    </div>
</template>
<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { AboutInfo, CardItem, ColumnItem, TablePage } from '../../interfaces/interface';
import apiClient from '../../request/request';
import BoaiTable from '../../components/table/BoaiTable.vue';
const tableSize = ref('small');
let display = ref(false);
let title = ref('');
let data = ref<CardItem[]>([]);
let selectedRow = ref<any>();
let totalCount = ref<number>(0);
let tablePage = ref<TablePage>({
    current: 1,
    pageSize: 5,
    sortBy: '',
    desc: false
});
let aboutInfo = ref<AboutInfo>({
    id: '',
    title: '',
    subtitle: '',
    enable: '',
    content: '',
    image: '',
    createId: '',
    createDate: '',
    updateId: '',
    updateDate: '' 
});
const columns = ref<ColumnItem[]>([
    {
        field: 'id',
        header: 'ID',
        sortable: true
    },
    {
        field: 'title',
        header: '主題'
    },
    {
        field: 'subtitle',
        header: '標語'
    },
    {
        field: 'enable',
        header: '生效'
    }
])

const handleSearch = async () => {
    await apiClient.post('/api/aboutInfo/paginateAboutInfo', {
        title: title.value,
        pageNum: tablePage.value.current,
        pageSize: tablePage.value.pageSize,
        sortBy: tablePage.value.sortBy,
        desc: tablePage.value.desc
    }).then(res => {
        data.value = res.data.list;
        totalCount = res.data.total;
    }).catch(err => {
        console.error(err);
    });
}
const handleSelectedRow = (row: object) => {
    selectedRow.value = row;
    console.log(selectedRow.value);
}
const openDetailDialog = () => {
    if (!selectedRow.value) {
        alert('請選擇一筆');
    } else {
        display.value = true;
        aboutInfo.value.title = selectedRow.value.title;
    }
}
onMounted(() => {
    handleSearch();
})
</script>
<style scoped>
.p-panel {
    width: 100%;
}
</style>