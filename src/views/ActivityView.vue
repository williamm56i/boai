<template>
    <Fieldset legend="2024" :toggleable="true">
        <div class="act-container">
            <div class="act" v-for="act in acts2024 ">
                <ActCard :title="act.title" :image-url="act.image" :subtitle="act.subtitle" @click="handleCardClick(act.id)"></ActCard>
            </div>
        </div>
    </Fieldset>
    <Fieldset legend="2023" :toggleable="true" :collapsed="true">
        <div class="act-container">
            <div class="act" v-for="act in acts2023 ">
                <ActCard :title="act.title" :image-url="act.image" :subtitle="act.subtitle" @click="handleCardClick(act.id)"></ActCard>
            </div>
        </div>
    </Fieldset>
    <Fieldset legend="其他" :toggleable="true" :collapsed="true">
        <div class="act-container">
            <div class="act" v-for="act in actsOther ">
                <ActCard :title="act.title" :image-url="act.image" :subtitle="act.subtitle" @click="handleCardClick(act.id)"></ActCard>
            </div>
        </div>
    </Fieldset>
</template>
<script setup lang="ts">
import ActCard from '../components/card/ActCard.vue';
import { onMounted, ref } from 'vue';
import { CardItem } from '../interfaces/interface';
import { useRouter } from 'vue-router';
import apiClient from '../request/request';
const router = useRouter();
const acts2024  = ref<CardItem[]>([]);
const acts2023 = ref<CardItem[]>([]);
const actsOther = ref<CardItem[]>([]);
const handleCardClick = (id: number) => {
    router.push('/activityDetail/' + id);
}
const getActivityInfo = async () => {

    await apiClient.get('/api/activityInfo/getAll').then(res => {
        acts2024.value = [];
        acts2023.value = [];
        actsOther.value = [];
        res.data.forEach( (act: any) => {
            if (act.activityGroup === '2024') {
                acts2024.value.push(act);
            } else if (act.activityGroup === '2023') {
                acts2023.value.push(act);
            } else {
                actsOther.value.push(act);
            }
        });
    }).catch(err => console.error(err));
}
onMounted(() => {
    getActivityInfo();
})
</script>
<style scoped>
.act-container {
    display: flex;
    flex-wrap: wrap;
}
.act {
    flex: 0 0 33.33%
}
@media (max-width: 1200px) {
    .act {
        flex: 0 0 50%;
    }
}

@media (max-width: 800px) {
    .act {
        flex: 0 0 100%;
    }
}
</style>