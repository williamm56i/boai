<template>
    <div class="admin-panel">
        <Panel header="關於我們 - 管理">
            <div style="display: flex; flex-direction: row;">
                <FloatLabel variant="on">
                    <label for="title">主題</label>
                    <InputText id="title" v-model="title"/>
                </FloatLabel>
                <Button icon="pi pi-search" @click="handleSearch" style="margin-left: 5px;"/>
            </div>
            <BoaiTable :size="tableSize" :data="aboutData" :columns="aboutColumns" :totalCount="aboutTotalCount"></BoaiTable>
        </Panel>
        <Panel header="經營團隊 - 管理">

        </Panel>
    </div>
</template>
<script setup lang="ts">
import { ref } from 'vue';
import { CardItem, ColumnItem, TablePage } from '../interfaces/interface';
import apiClient from '../request/request';
import BoaiTable from '../components/table/BoaiTable.vue';
const tableSize = 'small';
let title = ref('');
let aboutData = ref<CardItem[]>([]);
let aboutTotalCount = ref<number>(0);
let aboutTablePage = ref<TablePage>({
    current: 1,
    pageSize: 10,
    sortBy: '',
    desc: false
});
const aboutColumns = ref<ColumnItem[]>([
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
        pageNum: aboutTablePage.value.current,
        pageSize: aboutTablePage.value.pageSize,
        sortBy: aboutTablePage.value.sortBy,
        desc: aboutTablePage.value.desc
    }).then(res => {
        aboutData.value = res.data.list;
        aboutTotalCount = res.data.total;
    }).catch(err => {
        console.error(err);
    });
}
</script>
<style scoped>
.admin-panel {
    display: flex;
    flex-direction: row;
}

.p-panel {
    width: 100%;
}

</style>