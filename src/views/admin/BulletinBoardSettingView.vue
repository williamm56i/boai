<template>
    <div>
        <Toast />
        <Panel header="最新消息 - 管理">
            <div style="display: flex; flex-direction: row;">
                <FloatLabel variant="on">
                    <label for="title">標題</label>
                    <InputText id="title" v-model="title" />
                </FloatLabel>
                <ConfirmPopup />
                <Button v-tooltip.top="'查詢'" icon="pi pi-search" @click="handleSearch" />
                <Button v-tooltip.top="'新增'" icon="pi pi-plus" @click="openCreateDialog" />
                <Button v-tooltip.top="'修改'" icon="pi pi-pen-to-square" @click="openModifyDialog" />
                <Button v-tooltip.top="'刪除'" icon="pi pi-trash" @click="removeConfirm" />
            </div>
            <BoaiTable :size="tableSize" :data="data" :columns="columns" :totalCount="totalCount" :loading="loading"
                :tableHeight="'222px'" :selectionMode="'single'" @selected-row="handleSelectedRow">
            </BoaiTable>
        </Panel>

        <Dialog v-model:visible="display" modal :header="dialogType === 'C' ? '新增' : '維護'" :style="{ width: '50%' }"
            :breakpoints="{ '1200px': '70%', '800px': '100%' }">
            <div for="subject">標題</div>
            <InputText id="subject" v-model="bulletinBoard.subject" />
            <div for="subtitle">公告日</div>
            <DatePicker id="datepicker-24h" placeholder="yyyy/MM/dd HH:mm"
                            v-model="bulletinBoard.announceDate" showTime hourFormat="24" date-format="yy/mm/dd"
                            showIcon :showOnFocus="false" fluid />
            <div for="enable">生效</div>
            <Select id="enable" v-model="bulletinBoard.enable" :options="enableOptions" optionLabel="label"
                optionValue="value" />
            <div for="content">內文</div>
            <BoaiEditor v-model="bulletinBoard.contentData" editorStyle="height: 150px" />
            <table class="edit-info">
                <tr>
                    <td>建立人員：{{ bulletinBoard.createId }}</td>
                    <td>建立日期：{{ bulletinBoard.createDate }}</td>
                </tr>
                <tr>
                    <td>異動人員：{{ bulletinBoard.updateId }}</td>
                    <td>異動日期：{{ bulletinBoard.updateDate }}</td>
                </tr>
            </table>
            <div class="action-tool">
                <Button type="button" icon="pi pi-times" label="取消" severity="secondary" @click="cancel"></Button>
                <Button type="button" icon="pi pi-check" label="儲存" @click="ok"></Button>
            </div>
        </Dialog>
    </div>
</template>
<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { useToast } from "primevue/usetoast";
import { useConfirm } from "primevue/useconfirm";
import { BulletinBoard, CardItem, ColumnItem } from '../../interfaces/interface';
import apiClient from '../../request/request';
import BoaiTable from '../../components/table/BoaiTable.vue';
import dayjs from 'dayjs';
import BoaiEditor from '../../components/editor/BoaiEditor.vue';

const toast = useToast();
const confirm = useConfirm();
const tableSize = ref('small');
const loading = ref(false);
const title = ref('');
const display = ref(false);
const dialogType = ref('');
const data = ref<CardItem[]>([]);
const selectedRow = ref<any>();
const totalCount = ref<number>(0);
    const enableOptions = ref([
    { label: 'Y', value: 'Y' },
    { label: 'N', value: 'N' }
]);
const bulletinBoard = ref<BulletinBoard>({
    id: null,
    subject: '',
    announceDate: null,
    contentData: '',
    enable: 'Y',
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
        field: 'announceDate',
        header: '日期',
        sortable: true
    },
    {
        field: 'subject',
        header: '標題'
    },
    {
        field: 'enable',
        header: '生效',
        width: '80px',
        sortable: true
    }
])
const handleSearch = async () => {
    loading.value = true;
    await apiClient.post('/api/bulletinBoard/getBulletinBoard', {
        title: title.value
    }).then(res => {
        data.value = res.data;
    }).catch(err => {
        toast.add({ severity: 'error', summary: 'Error', detail: err.response.data, life: 3000 });
        console.error(err);
    }).finally(() => loading.value = false);
}
const handleSelectedRow = (row: object) => {
    selectedRow.value = row;
}
const openCreateDialog = () => {
    resetDialog();
    dialogType.value = 'C';
    display.value = true;
}
const openModifyDialog = async () => {
    dialogType.value = 'M';
    if (!selectedRow.value) {
        toast.add({ severity: 'info', summary: 'Info', detail: '請選擇一筆', life: 3000 });
    } else {
        const id = selectedRow.value.id;
        await apiClient.get('/api/bulletinBoard/getBulletinBoardDetail/' + id)
            .then(res => {
                res.data.announceDate = res.data.announceDate ? dayjs(res.data.announceDate, 'YYYY/MM/DD HH:mm').toDate() : null;
                bulletinBoard.value = res.data;
                display.value = true;
            }).catch(err => {
                console.error(err);
                toast.add({ severity: 'error', summary: 'Error', detail: err.response.data, life: 3000 });
            });
    }
}
const ok = async () => {
    if (dialogType.value === 'C') {
        await apiClient.post('/api/bulletinBoard/createBulletinBoard', {
            subject: bulletinBoard.value.subject,
            announceDate: bulletinBoard.value.announceDate,
            contentData: bulletinBoard.value.contentData,
            enable: bulletinBoard.value.enable
        }).then(res => {
            toast.add({ severity: 'success', summary: 'Success', detail: res.data, life: 3000 });
            display.value = false;
            handleSearch();
        }).catch(err => {
            console.log(err);
            toast.add({ severity: 'error', summary: 'Error', detail: err.response.data, life: 3000 });
        })
    } else {
        await apiClient.put('/api/bulletinBoard/modifyBulletinBoard', {
            id: bulletinBoard.value.id,
            subject: bulletinBoard.value.subject,
            announceDate: bulletinBoard.value.announceDate,
            contentData: bulletinBoard.value.contentData,
            enable: bulletinBoard.value.enable
        }).then(res => {
            toast.add({ severity: 'success', summary: 'Success', detail: res.data, life: 3000 });
            display.value = false;
            handleSearch();
        }).catch(err => {
            console.log(err);
            toast.add({ severity: 'error', summary: 'Error', detail: err.response.data, life: 3000 });
        })
    }
}
const cancel = () => {
    display.value = false;
}
const removeConfirm = (event: any) => {
    if (!selectedRow.value) {
        toast.add({ severity: 'info', summary: 'Info', detail: '請選擇一筆', life: 3000 });
    } else {
        confirm.require({
            target: event.currentTarget,
            message: 'ID:' + selectedRow.value.id + ' 確定刪除?',
            icon: 'pi pi-exclamation-triangle',
            rejectProps: {
                label: '取消',
                severity: 'secondary',
                outlined: true
            },
            acceptProps: {
                label: '確定'
            },
            accept: () => {
                remove();
            },
            reject: () => {
            }
        });
    }
}
const remove = async () => {
    const id = selectedRow.value.id;
    await apiClient.delete('/api/bulletinBoard/removeBulletinBoard/' + id)
        .then(res => {
            toast.add({ severity: 'success', summary: 'Success', detail: res.data, life: 3000 });
            selectedRow.value = null;
            handleSearch();
        }).catch(err => {
            console.error(err);
            toast.add({ severity: 'error', summary: 'Error', detail: err.response.data, life: 3000 });
        });
}
const resetDialog = () => {
    bulletinBoard.value = {
        id: null,
        subject: '',
        announceDate: null,
        contentData: '',
        enable: 'Y',
        createId: '',
        createDate: '',
        updateId: '',
        updateDate: ''
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

.p-select {
    width: 100%;
}

table {
    width: 100%;
    table-layout: fixed;
    border-collapse: collapse;
}

.edit-info {
    width: 100%;
    table-layout: fixed;
    border-collapse: collapse;
    margin-top: 20px;
}

td {
    width: 50%;
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