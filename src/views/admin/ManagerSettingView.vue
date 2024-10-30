<template>
    <div>
        <Panel header="經營團隊 - 管理">
            <div style="display: flex; flex-direction: row;">
                <FloatLabel variant="on">
                    <label for="name">姓名</label>
                    <InputText id="name" v-model="name" />
                </FloatLabel>
                <ConfirmPopup />
                <Button v-tooltip.top="'查詢'" icon="pi pi-search" @click="handleSearch" />
                <Button v-tooltip.top="'新增'" icon="pi pi-plus" @click="openCreateDialog" />
                <Button v-tooltip.top="'修改'" icon="pi pi-pen-to-square" @click="openModifyDialog" />
                <Button v-tooltip.top="'刪除'" icon="pi pi-trash" @click="removeConfirm" />
            </div>
            <BoaiTable :size="tableSize" :data="data" :columns="columns" :totalCount="totalCount" :loading="loading" :tableHeight="'222px'"
                :selectionMode="'single'" @selected-row="handleSelectedRow">
            </BoaiTable>
        </Panel>

        <Dialog v-model:visible="display" modal :header="dialogType === 'C' ? '新增' : '維護'" :style="{ width: '50%' }"
            :breakpoints="{ '1200px': '70%', '800px': '100%' }">
            <div for="title">職稱</div>
            <InputText id="title" v-model="managerInfo.title" />
            <div for="subtitle">姓名</div>
            <InputText id="subtitle" v-model="managerInfo.name" />
            <div for="description1">經歷1</div>
            <InputText id="description1" v-model="managerInfo.description1" />
            <div for="description2">經歷2</div>
            <InputText id="description2" v-model="managerInfo.description2" />
            <div for="image">照片</div>
            <div class="manager-photo">
                <img :src="managerInfo.image" width="300px" height="auto" />
            </div>
            <FileUpload ref="fileupload" mode="basic" name="aboutPhoto[]" accept="image/*" :maxFileSize="1000000"
                :customUpload="true" chooseLabel="選擇圖片" @select="onSelectFile" />
            <table>
                <tr>
                    <td>建立人員：{{ managerInfo.createId }}</td>
                    <td>建立日期：{{ managerInfo.createDate }}</td>
                </tr>
                <tr>
                    <td>異動人員：{{ managerInfo.updateId }}</td>
                    <td>異動日期：{{ managerInfo.updateDate }}</td>
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
import { MgrItem, ColumnItem, ManagerInfo } from '../../interfaces/interface';
import apiClient from '../../request/request';
import BoaiTable from '../../components/table/BoaiTable.vue';

const toast = useToast();
const confirm = useConfirm();
const tableSize = ref('small');
const loading = ref(false);
const name = ref('');
const display = ref(false);
const dialogType = ref('');
const data = ref<MgrItem[]>([]);
const selectedRow = ref<any>();
const totalCount = ref<number>(0);
const managerInfo = ref<ManagerInfo>({
    id: null,
    title: '',
    name: '',
    description1: '',
    description2: '',
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
        header: '職稱'
    },
    {
        field: 'name',
        header: '姓名'
    }
])

const handleSearch = async () => {
    await apiClient.post('/api/managerInfo/getManagerInfo', {
        name: name.value
    }).then(res => {
        data.value = res.data;
    }).catch(err => {
        console.error(err);
    });
}
const handleSelectedRow = (row: object) => {
    selectedRow.value = row;
    console.log(selectedRow.value);
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
        await apiClient.get('/api/managerInfo/getManagerInfoDetail/' + id)
            .then(res => {
                managerInfo.value = res.data;
                display.value = true;
            }).catch(err => {
                console.error(err);
                toast.add({ severity: 'error', summary: 'Error', detail: err.data, life: 3000 });
            });
    }
}
const onSelectFile = (event: any) => {
    const file = event.files[0];
    if (!file.type.startsWith("image/")) {
        toast.add({ severity: 'error', summary: 'Error', detail: '僅提供圖片上傳', life: 3000 });
        return false;
    }
    const reader = new FileReader();
    reader.onload = () => {
        const base64String = reader.result;
        managerInfo.value.image = base64String?.toString()
    };
    reader.readAsDataURL(file);

    return false;
}
const ok = async () => {
    if (dialogType.value === 'C') {
        await apiClient.post('/api/managerInfo/createManagerInfo', {
            title: managerInfo.value.title,
            name: managerInfo.value.name,
            description1: managerInfo.value.description1,
            description2: managerInfo.value.description2,
            image: managerInfo.value.image
        }).then(res => {
            toast.add({ severity: 'success', summary: 'Success', detail: res.data, life: 3000 });
            display.value = false;
            handleSearch();
        }).catch(err => {
            console.log(err);
            toast.add({ severity: 'error', summary: 'Error', detail: err.message, life: 3000 });
        })
    } else {
        await apiClient.put('/api/managerInfo/modifyManagerInfo', {
            id: managerInfo.value.id,
            title: managerInfo.value.title,
            name: managerInfo.value.name,
            description1: managerInfo.value.description1,
            description2: managerInfo.value.description2,
            image: managerInfo.value.image
        }).then(res => {
            toast.add({ severity: 'success', summary: 'Success', detail: res.data, life: 3000 });
            display.value = false;
            handleSearch();
        }).catch(err => {
            console.log(err);
            toast.add({ severity: 'error', summary: 'Error', detail: err.message, life: 3000 });
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
    await apiClient.delete('/api/managerInfo/removeManagerInfo/' + id)
        .then(res => {
            toast.add({ severity: 'success', summary: 'Success', detail: res.data, life: 3000 });
            handleSearch();
        }).catch(err => {
            console.error(err);
            toast.add({ severity: 'error', summary: 'Error', detail: err.data, life: 3000 });
        });
}
const resetDialog = () => {
    managerInfo.value = {
        id: null,
        title: '',
        name: '',
        description1: '',
        description2: '',
        image: '',
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

.manager-photo {
    display: flex;
    justify-content: center;
    margin-top: 5px;
    margin-bottom: 5px;
}

.p-select {
    width: 100%;
}

table {
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