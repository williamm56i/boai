<template>
    <div>
        <Panel header="經營團隊 - 管理">
            <div style="display: flex; flex-direction: row;">
                <FloatLabel variant="on">
                    <label for="name">姓名</label>
                    <InputText id="name" v-model="name" />
                </FloatLabel>
                <Button icon="pi pi-search" @click="handleSearch" style="margin-left: 5px;" />
            </div>
            <BoaiTable :size="tableSize" :data="data" :columns="columns" :totalCount="totalCount">
            </BoaiTable>
        </Panel>
    </div>
</template>
<script setup lang="ts">
import { ref } from 'vue';
import { CardItem, ColumnItem, TablePage } from '../../interfaces/interface';
import apiClient from '../../request/request';
import BoaiTable from '../../components/table/BoaiTable.vue';
const tableSize = 'small';
let name = ref('');
let data = ref<CardItem[]>([]);
let totalCount = ref<number>(0);
let tablePage = ref<TablePage>({
    current: 1,
    pageSize: 10,
    sortBy: '',
    desc: false
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
    await apiClient.post('/api/Info/paginateInfo', {
        name: name.value,
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
</script>
<style scoped>
.p-panel {
    width: 100%;
}
</style>