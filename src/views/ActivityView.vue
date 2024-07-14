<template>
    <Fieldset legend="2024" :toggleable="true">
        <div class="act-container">
            <div class="act" v-for="act in acts">
                <ActCard :title="act.title" :image-url="act.image" :subtitle="act.subtitle" @click="handleCardClick(act.id)"></ActCard>
            </div>
        </div>
    </Fieldset>
    <Fieldset legend="2023" :toggleable="true">
        
    </Fieldset>
</template>
<script setup lang="ts">
import ActCard from '../components/card/ActCard.vue';
import { ref } from 'vue';
import { CardItem } from '../interfaces/interface';
import { useRouter } from 'vue-router';
const router = useRouter();
const acts = ref<CardItem[]>([
    {
        id: '1',
        image: '/act_chatgpt.jpg',
        subtitle: '2024.07.21(日) 10:00 - 11:30',
        title: 'ChatGPT來襲！人人都要具備的運算思維！'
    },
    {
        id: '2',
        image: '/act_fluid.jpg',
        subtitle: '2024.07.13(日) 14:00 - 15:30',
        title: '心靈流體畫｜DIY小宇宙杯墊+流體熊吊飾'
    },
    {
        id: '3',
        image: '/act_read1.jpg',
        subtitle: '2024.07.17(三) 19:30 - 21:00',
        title: '聚說-說書會｜食療聖經，終極瘦身'
    },
    {
        id: '4',
        image: '/act_read2.png',
        subtitle: '2024.06.19(日) 19:30 - 21:00',
        title: '聚說-說書會｜影響力'
    },
    {
        id: '5',
        image: '/act_chatgpt.jpg',
        subtitle: '2024.07.21(日) 10:00 - 11:30',
        title: 'ChatGPT來襲！人人都要具備的運算思維！'
    },
]);
const handleCardClick = (id: string) => {
    router.push('/activityDetail/' + id);
}
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