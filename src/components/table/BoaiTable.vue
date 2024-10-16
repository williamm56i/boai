<template>
    <Card>
        <template #content>
            <DataTable paginator :size="size" :rows="pageSize" :totalRecords="totalCount" :rowsPerPageOptions="pageNumList" removableSort :value="data">
                <template #empty> No Data. </template>
                <Column v-for="col in columns" :key="col.field" :field="col.field" :header="col.header" :sortable="col.sortable"></Column>
            </DataTable>
        </template>
    </Card>
</template>
<script setup lang="ts">
import { ref } from 'vue';
import { ColumnItem } from '../../interfaces/interface';
defineProps<{
    data: Array<any>;
    columns: Array<ColumnItem>;
    size: any;
    totalCount: number;
}>();
const pageSize = ref(10);
const pageNumList = ref([5, 10, 15, 20, 50, 100]);
</script>
<style scoped>

</style>