<template>
    <div class="act-detail">
        <Toast />
        <Panel>
            <template #header>
                <p class="align-left">
                <h3>{{ title }}</h3>
                <div>{{ subtitle }}</div>
                </p>
            </template>
            <img :src="image" width="80%" @load="handleImageLoading" v-show="isImageLoaded" />
            <Skeleton v-show="!isImageLoaded" width="100%" height="10rem"></Skeleton>
            <div v-html="content" class="align-left" style="margin-top: 30px"></div>
            <template #footer>
                <Button label="我要報名" icon="pi pi-send" @click="openApplyForm" :disabled="disabledFlag" />
                <Button label="報名查詢" icon="pi pi-search" @click="openSearchForm" severity="secondary"/>
            </template>
        </Panel>
        <Dialog v-model:visible="display" modal :header="dialogTitle" :style="{ width: '50%' }"
            :breakpoints="{ '1200px': '70%', '800px': '100%' }">
            <div v-if="dialogType === 'S'">
                <div for="searchName">姓名</div>
                <InputText id="searchName" v-model="searchName" />
                <Button label="查詢" icon="pi pi-search" @click="getApplyInfo" style="margin: 7px 0px;width: 100%;"></Button>
                <hr style="margin-top: 15px; color: grey"/>
            </div>
            <div for="applyName"><span style="color: red;">*</span> 姓名</div>
            <InputText id="applyName" v-model="applyForm.applyName" :disabled="dialogType === 'S'"/>
            <div for="applySex"><span style="color: red;">*</span> 性別</div>
            <div style="height: 37px; display: flex;align-items: center;">
                <RadioButton v-model="applyForm.applySex" inputId="male" name="male" value="male" :disabled="dialogType === 'S'"></RadioButton>
                <label for="male" style="margin-left: 10px">男</label>
                <RadioButton v-model="applyForm.applySex" inputId="female" name="female" value="female" :disabled="dialogType === 'S'"></RadioButton>
                <label for="female" style="margin-left: 10px">女</label>
                <RadioButton v-model="applyForm.applySex" inputId="none" name="none" value="none" :disabled="dialogType === 'S'"></RadioButton>
                <label for="none" style="margin-left: 10px">其他</label>
            </div>
            <div for="applyPhone"><span style="color: red;">*</span> 聯絡電話</div>
            <InputText id="applyPhone" v-model="applyForm.applyPhone" :disabled="dialogType === 'S'"/>
            <div for="applyEmail"><span style="color: red;">*</span> Email</div>
            <InputText id="applyEmail" v-model="applyForm.applyEmail" :disabled="dialogType === 'S'"/>
            <div for="applyResidence">居住地</div>
            <InputText id="applyResidence" v-model="applyForm.applyResidence" :disabled="dialogType === 'S'"/>
            <div for="infoFrom">如何得知本活動</div>
            <div style="height: 37px; display: flex;align-items: center;">
                <RadioButton v-model="applyForm.infoFrom" inputId="fb" name="fb" value="fb" :disabled="dialogType === 'S'"></RadioButton>
                <label for="fb" style="margin-left: 10px">Facebook</label>
                <RadioButton v-model="applyForm.infoFrom" inputId="line" name="line" value="line" :disabled="dialogType === 'S'"></RadioButton>
                <label for="line" style="margin-left: 10px">LINE文宣</label>
                <RadioButton v-model="applyForm.infoFrom" inputId="friend" name="friend" value="friend" :disabled="dialogType === 'S'"></RadioButton>
                <label for="friend" style="margin-left: 10px">親友介紹</label>
                <RadioButton v-model="applyForm.infoFrom" inputId="other" name="other" value="other" :disabled="dialogType === 'S'"></RadioButton>
                <label for="other" style="margin-left: 10px">其他</label>
            </div>
            <div for="introducerName">介紹人</div>
            <InputText id="introducerName" v-model="applyForm.introducerName" :disabled="dialogType === 'S'"/>
            <div class="action-tool">
                <Button type="button" icon="pi pi-times" label="關閉" severity="secondary" @click="cancel"></Button>
                <Button v-if="dialogType === 'A'" type="button" icon="pi pi-check" label="送出" @click="ok"></Button>
            </div>
        </Dialog>
    </div>
</template>
<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';
// import { useReCaptcha } from 'vue-recaptcha-v3';
import { useToast } from "primevue/usetoast";
import { ApplyForm } from '../interfaces/interface.ts';
import apiClient from '../request/request';
import dayjs from 'dayjs';

// const { executeRecaptcha } = useReCaptcha()!;
const toast = useToast();
const router = useRoute();
const display = ref(false);
const id = router.params.id;
const title = ref('');
const subtitle = ref('');
const content = ref('');
const image = ref('');
const applyStartDate = ref<Date>();
const applyEndDate = ref<Date>();
const disabledFlag = ref(false);
const dialogType = ref('');
const dialogTitle = ref('');
const applyForm = ref<ApplyForm>({
    applyName: '',
    applySex: null,
    applyPhone: '',
    applyEmail: null,
    applyResidence: null,
    infoFrom: '',
    introducerName: null
});
const searchName = ref('');
const isImageLoaded = ref(false);
const handleImageLoading = () => {
    isImageLoaded.value = true;
}
const openApplyForm = () => {
    resetDialog();
    dialogType.value = 'A';
    dialogTitle.value = '我要報名';
    display.value = true;
}
const openSearchForm = () => {
    resetDialog();
    dialogType.value = 'S';
    dialogTitle.value = '報名查詢';
    display.value = true;
}
const ok = async () => {
    // const token = await executeRecaptcha("submit_form");
    // const flag = await verifyRecaptcha(token);
    const flag = true;
    if (flag) {
        await apiClient.post('/api/activityInfo/apply', {
            activityId: id,
            applyName: applyForm.value.applyName,
            applySex: applyForm.value.applySex,
            applyPhone: applyForm.value.applyPhone,
            applyEmail: applyForm.value.applyEmail,
            applyResidence: applyForm.value.applyResidence,
            infoFrom: applyForm.value.infoFrom,
            introducerName: applyForm.value.introducerName
        }).then(res => {
            toast.add({ severity: 'success', summary: 'Success', detail: res.data, life: 3000 });
            display.value = false;
        }).catch(err => {
            console.error(err);
            toast.add({ severity: 'error', summary: 'Error', detail: '報名未成功', life: 3000 });
        });
    }

}
const cancel = () => {
    display.value = false;
}
const verifyRecaptcha = async (token: string) => {
    return await apiClient.post('/api/system/verifyRecaptcha?token=' + token, null)
        .then(res => {
            return res.data === 'SUCCESS' ? true : false;
        }).catch(err => {
            console.error(err);
            return false;
        });
}
const resetDialog = () => {
    applyForm.value = {
        applyName: '',
        applySex: null,
        applyPhone: '',
        applyEmail: null,
        applyResidence: null,
        infoFrom: '',
        introducerName: null
    }
    searchName.value = '';
}
const enableApplyButton = (start: Date | undefined, end: Date | undefined) => {
    const now = new Date(); // 取得當前系統時間
    if (start && end) {
        // 判斷當前時間是否在起始和結束日期之間
        disabledFlag.value = !(now >= start && now <= end);
    } else if (start) {
        // 如果只有開始日期，判斷當前時間是否在開始日期之後
        disabledFlag.value = !(now >= start);
    } else if (end) {
        // 如果只有結束日期，判斷當前時間是否在結束日期之前
        disabledFlag.value = !(now <= end);
    } else {
        // 如果沒有設置開始或結束日期，disabledFlag 默認為 true
        disabledFlag.value = true;
    }
}
const getActivityInfoDetail = async () => {
    await apiClient.get('/api/activityInfo/getActivityInfoDetail/' + id).then(res => {
        title.value = res.data.title;
        subtitle.value = res.data.subtitle;
        content.value = res.data.content;
        image.value = res.data.image;
        applyStartDate.value = res.data.applyStartDate ? dayjs(res.data.applyStartDate, 'YYYY/MM/DD HH:mm:ss').toDate() : undefined;
        applyEndDate.value = res.data.applyEndDate ? dayjs(res.data.applyEndDate, 'YYYY/MM/DD HH:mm:ss').toDate() : undefined;
        enableApplyButton(applyStartDate.value, applyEndDate.value);
    }).catch(err => console.error(err));
}
const getApplyInfo = async () => {
    await apiClient.post('/api/activityInfo/getApplyInfo', {
        activityId: id,
        applyName: searchName.value
    }).then(res => {
        if (res.data) {
            applyForm.value.applyName = res.data.applyName;
            applyForm.value.applySex = res.data.applySex;
            applyForm.value.applyPhone = res.data.applyPhone;
            applyForm.value.applyEmail = res.data.applyEmail;
            applyForm.value.applyResidence = res.data.applyResidence;
            applyForm.value.infoFrom = res.data.infoFrom;
            applyForm.value.introducerName = res.data.introducerName;
            toast.add({ severity: 'success', summary: 'Success', detail: '查詢成功', life: 3000 });
        } else {
            toast.add({ severity: 'warn', summary: 'Warning', detail: '查無資料', life: 3000 });
        }
    }).catch(err => console.log(err))
}
onMounted(async () => {
    getActivityInfoDetail();
});
</script>
<style scoped>
.act-detail {
    display: flex;
    justify-content: center;
}

.align-left {
    text-align: left;
}

.p-panel {
    width: 60%;
}

@media (max-width: 800px) {
    .p-panel {
        width: 95%;
    }
}

.p-radiobutton {
    margin-left: 20px;
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