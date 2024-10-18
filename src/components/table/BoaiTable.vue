<template>
    <Card>
        <template #content>
            <DataTable paginator :size="size" :rows="pageSize" :totalRecords="totalCount" :rowsPerPageOptions="pageNumList" removableSort :value="data"
                :selectionMode="selectionMode" v-model:selection="selectionRow" :loading="loading" @click="handleClick">
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
    totalCount?: number;
    loading: boolean;
    selectionMode?: any | undefined;
}>();
const pageSize = ref(5);
const pageNumList = ref([5, 10, 15, 20, 50, 100]);
let selectionRow = ref({});

const emit = defineEmits<{
  (e: 'selectedRow', value: object): void;
}>();

const handleClick = () => {
    emit('selectedRow', selectionRow.value);
}
</script>
<style scoped>

</style>