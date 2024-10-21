<template>
    <div>
        <Toast />
        <Panel header="關於我們 - 管理">
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
            <InputText id="title" v-model="aboutInfo.title" />
            <div for="subtitle">標語</div>
            <InputText id="subtitle" v-model="aboutInfo.subtitle" />
            <div for="content">內文</div>
            <Textarea id="content" v-model="aboutInfo.content" rows="3" style="width: 100%;" />
            <div for="enable">生效</div>
            <Select id="enable" v-model="aboutInfo.enable" :options="enableOptions" optionLabel="label"
                optionValue="value" />
            <div for="image">圖片</div>
            <div class="about-photo">
                <img :src="aboutInfo.image" width="300px" height="auto" />
            </div>
            <FileUpload ref="fileupload" mode="basic" name="aboutPhoto[]" accept="image/*" :maxFileSize="1000000"
                :customUpload="true" chooseLabel="選擇圖片" @select="onSelectFile" />
            <table>
                <tr>
                    <td>建立人員：{{ aboutInfo.createId }}</td>
                    <td>建立日期：{{ aboutInfo.createDate }}</td>
                </tr>
                <tr>
                    <td>異動人員：{{ aboutInfo.updateId }}</td>
                    <td>異動日期：{{ aboutInfo.updateDate }}</td>
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
import { AboutInfo, CardItem, ColumnItem } from '../../interfaces/interface';
import apiClient from '../../request/request';
import BoaiTable from '../../components/table/BoaiTable.vue';

const toast = useToast();
const confirm = useConfirm();
const tableSize = ref('small');
let loading = ref(false);
let title = ref('');
let display = ref(false);
let dialogType = ref('');
const enableOptions = ref([
    { label: 'Y', value: 'Y' },
    { label: 'N', value: 'N' }
]);
let data = ref<CardItem[]>([]);
let selectedRow = ref<any>();
let totalCount = ref<number>(0);
let aboutInfo = ref<AboutInfo>({
    id: null,
    title: '',
    subtitle: '',
    enable: 'Y',
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
        header: '生效',
        sortable: true
    }
])

const handleSearch = async () => {
    loading.value = true;
    await apiClient.post('/api/aboutInfo/getAboutInfo', {
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
        await apiClient.get('/api/aboutInfo/getAboutInfoDetail?id=' + id)
            .then(res => {
                aboutInfo.value = res.data;
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
        aboutInfo.value.image = base64String?.toString()
    };
    reader.readAsDataURL(file);

    return false;
}
const ok = async () => {
    if (dialogType.value === 'C') {
        await apiClient.post('/api/aboutInfo/createAboutInfo', {
            title: aboutInfo.value.title,
            subtitle: aboutInfo.value.subtitle,
            content: aboutInfo.value.content,
            image: aboutInfo.value.image,
            enable: aboutInfo.value.enable
        }).then(res => {
            toast.add({ severity: 'success', summary: 'Success', detail: res.data, life: 3000 });
            display.value = false;
            handleSearch();
        }).catch(err => {
            console.log(err);
            toast.add({ severity: 'error', summary: 'Error', detail: err.message, life: 3000 });
        })
    } else {
        await apiClient.put('/api/aboutInfo/modifyAboutInfo', {
            id: aboutInfo.value.id,
            title: aboutInfo.value.title,
            subtitle: aboutInfo.value.subtitle,
            content: aboutInfo.value.content,
            image: aboutInfo.value.image,
            enable: aboutInfo.value.enable
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
    await apiClient.delete('/api/aboutInfo/removeAboutInfo/' + id)
        .then(res => {
            toast.add({ severity: 'success', summary: 'Success', detail: res.data, life: 3000 });
            handleSearch();
        }).catch(err => {
            console.error(err);
            toast.add({ severity: 'error', summary: 'Error', detail: err.data, life: 3000 });
        });
}
const resetDialog = () => {
    aboutInfo.value = {
        id: null,
        title: '',
        subtitle: '',
        enable: 'Y',
        content: '',
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