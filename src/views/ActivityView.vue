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
const acts2024  = ref<CardItem[]>([
    {
        id: 1,
        title: '',
        subtitle: '',
        image: ''
    },
    {
        id: 2,
        title: '',
        subtitle: '',
        image: ''
    },
    {
        id: 3,
        title: '',
        subtitle: '',
        image: ''
    }
]);
const acts2023 = ref<CardItem[]>([]);
const actsOther = ref<CardItem[]>([]);
const handleCardClick = (id: number) => {
    router.push('/activityDetail/' + id);
}
const getActivityInfo = async () => {

    const res = await apiClient.get('/api/activityInfo/getAll')
        acts2024.value = [];
        acts2023.value = [];
        actsOther.value = [];
        for (const act of res.data) {
            if (act.activityGroup === '2024') {
                acts2024.value.push(act);
            } else if (act.activityGroup === '2023') {
                acts2023.value.push(act);
            } else {
                actsOther.value.push(act);
            }
        };
    fetchActivityInfoImage(acts2024.value);
    fetchActivityInfoImage(acts2023.value);
    fetchActivityInfoImage(actsOther.value);
}
const fetchActivityInfoImage = async (acts: Array<CardItem>) => {
    for (const act of acts) {
        act.image = await getImage(act.id);
    }
}
const getImage = async (id: number): Promise<string> => {
  return await apiClient.get('/api/activityInfo/getImage/' + id)
    .then(res => {
      return res.data;
    }).catch(err => console.log(err));
}
onMounted(async () => {
    await getActivityInfo();
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