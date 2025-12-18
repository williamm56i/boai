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
                <Button v-tooltip.top="'查詢'" icon="pi pi-search" @click="handleSearch" />
                <Button v-tooltip.top="'新增'" icon="pi pi-plus" @click="openCreateDialog" />
                <Button v-tooltip.top="'修改活動'" icon="pi pi-pen-to-square" @click="openModifyDialog" />
                <Button v-tooltip.top="'報名清單'" icon="pi pi-list" @click="openApplyListDialog" />
                <Button v-tooltip.top="'刪除'" icon="pi pi-trash" @click="removeConfirm" />
            </div>
            <BoaiTable :size="tableSize" :data="data" :columns="columns" :totalCount="totalCount" :loading="loading"
                :tableHeight="'222px'" :selectionMode="'single'" @selected-row="handleSelectedRow">
            </BoaiTable>
        </Panel>

        <Dialog v-model:visible="display" modal :header="dialogType === 'C' ? '新增' : '維護'" :style="{ width: '50%' }"
            :breakpoints="{ '1200px': '70%', '800px': '100%' }">
            <div for="title">主題</div>
            <InputText id="title" v-model="activityInfo.title" placeholder="範例：小小科學家"/>
            <div for="subtitle">活動資訊</div>
            <InputText id="subtitle" v-model="activityInfo.subtitle" placeholder="範例：2026.01.01 (四) 00:00-00:00 活動地點"/>
            <div for="activityGroup">活動分類</div>
            <InputText id="activityGroup" v-model="activityInfo.activityGroup" maxlength="4" placeholder="範例：2026"/>
            <div for="activityDate">活動日</div>
            <td>
                <DatePicker id="datepicker" placeholder="yyyy/MM/dd" v-model="activityInfo.activityDate"
                    date-format="yy/mm/dd" showIcon :showOnFocus="false" fluid />
            </td>
            <div for="content">內文</div>
            <BoaiEditor v-model="activityInfo.content" editorStyle="height: 150px" />
            <table>
                <tr>
                    <td>
                        <div for="applyStartDate">報名起日</div>
                    </td>
                    <td>
                        <div for="applyEndDate">報名迄日</div>
                    </td>
                </tr>
                <tr>
                    <td>
                        <DatePicker id="datepicker-24h" placeholder="yyyy/MM/dd HH:mm"
                            v-model="activityInfo.applyStartDate" showTime hourFormat="24" date-format="yy/mm/dd"
                            showIcon :showOnFocus="false" fluid />
                    </td>
                    <td>
                        <DatePicker id="datepicker-24h" placeholder="yyyy/MM/dd HH:mm"
                            v-model="activityInfo.applyEndDate" showTime hourFormat="24" date-format="yy/mm/dd" showIcon
                            :showOnFocus="false" fluid />
                    </td>
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
        <Dialog v-model:visible="applyListDisplay" modal :header="applyListHeader" :style="{ width: '80%' }"
            :breakpoints="{ '1200px': '90%', '800px': '100%' }">
            <BoaiTable :size="tableSize" :data="applyListData" :columns="applyListColumns" :totalCount="totalCount"
                :loading="loading" :tableHeight="'222px'">
            </BoaiTable>
        </Dialog>
    </div>
</template>
<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { useToast } from "primevue/usetoast";
import { useConfirm } from "primevue/useconfirm";
import { ActivityInfo, ApplyForm, CardItem, ColumnItem } from '../../interfaces/interface';
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
const applyListHeader = ref('報名清單');
const applyListDisplay = ref(false);
const dialogType = ref('');
const data = ref<CardItem[]>([]);
const applyListData = ref<ApplyForm[]>([]);
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
    activityDate: null,
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
const applyListColumns = ref<ColumnItem[]>([
    {
        field: 'id',
        header: 'ID',
        sortable: true
    },
    {
        field: 'applyName',
        header: '姓名'
    },
    {
        field: 'applyDate',
        header: '報名日期',
        sortable: true
    },
    {
        field: 'applySex',
        header: '性別'
    },
    {
        field: 'applyPhone',
        header: '聯絡電話'
    },
    {
        field: 'applyEmail',
        header: 'Email'
    },
    {
        field: 'applyResidence',
        header: '居住地'
    },
    {
        field: 'infoFrom',
        header: '如何得知本活動'
    },
    {
        field: 'introducerName',
        header: '介紹人'
    },
])
const handleSearch = async () => {
    loading.value = true;
    await apiClient.post('/api/activityInfo/getActivityInfo', {
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
        await apiClient.get('/api/activityInfo/getActivityInfoDetail/' + id)
            .then(res => {
                res.data.applyStartDate = res.data.applyStartDate ? dayjs(res.data.applyStartDate, 'YYYY/MM/DD HH:mm:ss').toDate() : null;
                res.data.applyEndDate = res.data.applyEndDate ? dayjs(res.data.applyEndDate, 'YYYY/MM/DD HH:mm:ss').toDate() : null;
                res.data.activityDate = res.data.activityDate ? dayjs(res.data.activityDate, 'YYYY/MM/DD').toDate() : null;
                activityInfo.value = res.data;
                display.value = true;
            }).catch(err => {
                console.error(err);
                toast.add({ severity: 'error', summary: 'Error', detail: err.response.data, life: 3000 });
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
            activityGroup: activityInfo.value.activityGroup,
            activityDate: activityInfo.value.activityDate
        }).then(res => {
            toast.add({ severity: 'success', summary: 'Success', detail: res.data, life: 3000 });
            display.value = false;
            handleSearch();
        }).catch(err => {
            console.log(err);
            toast.add({ severity: 'error', summary: 'Error', detail: err.response.data, life: 3000 });
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
            activityGroup: activityInfo.value.activityGroup,
            activityDate: activityInfo.value.activityDate
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
const openApplyListDialog = async () => {
    if (!selectedRow.value) {
        toast.add({ severity: 'info', summary: 'Info', detail: '請選擇一筆', life: 3000 });
    } else {
        applyListHeader.value = selectedRow.value.title + ' - 報名清單';
        await apiClient.post('/api/applyInfo/getActivityApplyInfo/' + selectedRow.value.id)
            .then(res => {
                applyListData.value = res.data;
                applyListData.value.forEach((data: ApplyForm) => {
                    const sex = data.applySex;
                    switch (sex) {
                        case 'male':
                            data.applySex = '男';
                            break;
                        case 'female':
                            data.applySex = '女';
                            break;
                        case 'none':
                            data.applySex = '其他';
                            break;
                        default:
                            data.applySex = '';
                            break;
                    }
                    const infoFrom = data.infoFrom;
                    switch (infoFrom) {
                        case 'fb':
                            data.infoFrom = 'Facebook';
                            break;
                        case 'line':
                            data.infoFrom = 'LINE文宣';
                            break;
                        case 'friend':
                            data.infoFrom = '親友介紹';
                            break;
                        case 'other':
                            data.infoFrom = '其他';
                            break;
                        default:
                            data.infoFrom = '';
                            break;
                    }
                })
                applyListDisplay.value = true;
            }).catch(err => {
                console.error(err);
                toast.add({ severity: 'error', summary: 'Error', detail: err.response.data, life: 3000 });
            });
    }
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
            selectedRow.value = null;
            handleSearch();
        }).catch(err => {
            console.error(err);
            toast.add({ severity: 'error', summary: 'Error', detail: err.response.data, life: 3000 });
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
        activityDate: null,
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