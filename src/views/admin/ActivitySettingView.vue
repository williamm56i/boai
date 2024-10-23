<template>
    <div>
        <Toast />
        <Panel header="活動資訊 - 管理">
            <div style="display: flex; flex-direction: row;">
                <FloatLabel variant="on">
                    <label for="title">主題</label>
                    <InputText id="title" v-model="title" />
                </FloatLabel>
                <ConfirmPopup />
                <Button icon="pi pi-search" @click="handleSearch" />
                <Button icon="pi pi-plus" @click="openCreateDialog" />
                <Button icon="pi pi-pen-to-square" @click="openModifyDialog" />
                <Button icon="pi pi-trash" @click="removeConfirm" />
            </div>
            <BoaiTable :size="tableSize" :data="data" :columns="columns" :totalCount="totalCount" :loading="loading" :tableHeight="'222px'"
                :selectionMode="'single'" @selected-row="handleSelectedRow">
            </BoaiTable>
        </Panel>

        <Dialog v-model:visible="display" modal :header="dialogType === 'C' ? '新增' : '維護'" :style="{ width: '50%' }"
            :breakpoints="{ '1200px': '70%', '800px': '100%' }">
            <div for="title">主題</div>
            <InputText id="title" v-model="activityInfo.title" />
            <div for="subtitle">活動資訊</div>
            <InputText id="subtitle" v-model="activityInfo.subtitle" />
            <div for="activityGroup">活動分類</div>
            <InputText id="activityGroup" v-model="activityInfo.activityGroup" maxlength="4"/>
            <div for="content">內文</div>
            <Textarea id="content" v-model="activityInfo.content" rows="3" style="width: 100%;" />
            <table>
                <tr>
                    <td><div for="applyStartDate">報名起日</div></td>
                    <td><div for="applyEndDate">報名迄日</div></td>
                </tr>
                <tr>
                    <td><DatePicker id="datepicker-24h" placeholder="yyyy/MM/dd HH:mm" v-model="activityInfo.applyStartDate" showTime hourFormat="24" date-format="yy/mm/dd" showIcon :showOnFocus="false" fluid /></td>
                    <td><DatePicker id="datepicker-24h" placeholder="yyyy/MM/dd HH:mm" v-model="activityInfo.applyEndDate" showTime hourFormat="24" date-format="yy/mm/dd" showIcon :showOnFocus="false" fluid /></td>
                </tr>
            </table>
            <div for="image">圖片</div>
            <div class="about-photo">
                <img :src="activityInfo.image" width="300px" height="auto" />
            </div>
            <FileUpload ref="fileupload" mode="basic" name="aboutPhoto[]" accept="image/*" :maxFileSize="1000000"
                :customUpload="true" chooseLabel="選擇圖片" @select="onSelectFile" />
            <table class="edit-info">
                <tr>
                    <td>建立人員：{{ activityInfo.createId }}</td>
                    <td>建立日期：{{ activityInfo.createDate }}</td>
                </tr>
                <tr>
                    <td>異動人員：{{ activityInfo.updateId }}</td>
                    <td>異動日期：{{ activityInfo.updateDate }}</td>
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
import { ActivityInfo, CardItem, ColumnItem } from '../../interfaces/interface';
import apiClient from '../../request/request';
import BoaiTable from '../../components/table/BoaiTable.vue';
import dayjs from 'dayjs';

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
const activityInfo = ref<ActivityInfo>({
    id: null,
    title: '',
    subtitle: '',
    applyStartDate: null,
    applyEndDate: null,
    content: '',
    image: '',
    activityGroup: '',
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
        header: '活動資訊'
    }
])

const handleSearch = async () => {
    loading.value = true;
    await apiClient.post('/api/activityInfo/getActivityInfo', {
        title: title.value
    }).then(res => {
        data.value = res.data;
    }).catch(err => {
        toast.add({ severity: 'error', summary: 'Error', detail: err.message, life: 3000 });
        console.error(err);
    }).finally(() => loading.value = false);
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
        await apiClient.get('/api/activityInfo/getActivityInfoDetail/' + id)
            .then(res => {
                res.data.applyStartDate = res.data.applyStartDate ? dayjs(res.data.applyStartDate, 'YYYY/MM/DD HH:mm:ss').toDate() : null;
                res.data.applyEndDate = res.data.applyEndDate ? dayjs(res.data.applyEndDate, 'YYYY/MM/DD HH:mm:ss').toDate() : null;
                activityInfo.value = res.data;
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
        activityInfo.value.image = base64String?.toString()
    };
    reader.readAsDataURL(file);

    return false;
}
const ok = async () => {
    if (dialogType.value === 'C') {
        await apiClient.post('/api/activityInfo/createActivityInfo', {
            title: activityInfo.value.title,
            subtitle: activityInfo.value.subtitle,
            content: activityInfo.value.content,
            image: activityInfo.value.image,
            applyStartDate: activityInfo.value.applyStartDate,
            applyEndDate: activityInfo.value.applyEndDate,
            activityGroup: activityInfo.value.activityGroup
        }).then(res => {
            toast.add({ severity: 'success', summary: 'Success', detail: res.data, life: 3000 });
            display.value = false;
            handleSearch();
        }).catch(err => {
            console.log(err);
            toast.add({ severity: 'error', summary: 'Error', detail: err.message, life: 3000 });
        })
    } else {
        await apiClient.put('/api/activityInfo/modifyActivityInfo', {
            id: activityInfo.value.id,
            title: activityInfo.value.title,
            subtitle: activityInfo.value.subtitle,
            content: activityInfo.value.content,
            image: activityInfo.value.image,
            applyStartDate: activityInfo.value.applyStartDate,
            applyEndDate: activityInfo.value.applyEndDate,
            activityGroup: activityInfo.value.activityGroup
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
    await apiClient.delete('/api/activityInfo/removeActivityInfo/' + id)
        .then(res => {
            toast.add({ severity: 'success', summary: 'Success', detail: res.data, life: 3000 });
            handleSearch();
        }).catch(err => {
            console.error(err);
            toast.add({ severity: 'error', summary: 'Error', detail: err.data, life: 3000 });
        });
}
const resetDialog = () => {
    activityInfo.value = {
        id: null,
        title: '',
        subtitle: '',
        content: '',
        applyStartDate: null,
        applyEndDate: null,
        image: '',
        activityGroup: '',
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

.about-photo {
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