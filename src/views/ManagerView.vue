<template>
    <div class="mgr">
        <div class="person" v-for="mgr in managers">
            <MgrInfo :position="mgr.position" :image-url="mgr.image" :title="mgr.title" :name="mgr.name"
                :description="mgr.description1" :description2="mgr.description2"></MgrInfo>
        </div>
    </div>
</template>
<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue';
import MgrInfo from '../components/mgrInfo/MgrInfo.vue';
import { MgrItem } from '../interfaces/interface';
import apiClient from '../request/request';
const managers = ref<MgrItem[]>([
    {
        id: 1,
        position: 'left',
        image: '/man_chang.jpg',
        title: '榮譽理事長',
        name: '張誠',
        description1: '伊利諾大學香檳校區電腦科學 博士',
        description2: '前雄三飛彈專案總工程師'
    },
    {
        id: 2,
        position: 'left',
        image: '/chairman.jpg',
        title: '理事長',
        name: '陳郁婷',
        description1: '台灣大學資訊管理研究所 碩士'
    },
    {
        id: 3,
        position: 'left',
        image: '/man_andy.jpg',
        title: '財務長',
        name: '莊淵智',
        description1: '中正理工學院資訊工程研究所 碩士',
        description2: '中山科學研究院 中校'
    },
    {
        id: 4,
        position: 'left',
        image: '/man_cathy.jpg',
        title: '執行秘書',
        name: '李凱西',
        description1: '個人資訊第一行',
        description2: '個人資訊第二行'
    },
    {
        id: 5,
        position: 'left',
        image: '/man_youn.jpg',
        title: '公關長',
        name: '李永昌',
        description1: '個人資訊第一行',
        description2: '個人資訊第二行'
    },
    {
        id: 6,
        position: 'left',
        image: '/man_fren.jpg',
        title: '設計總監',
        name: 'Fren Fan',
        description1: '個人資訊第一行',
        description2: '個人資訊第二行'
    },
    {
        id: 7,
        position: 'left',
        image: '/audit.jpg',
        title: '監察人',
        name: '陳妍希',
        description1: '昌福托嬰中心 陶釉班',
        description2: '昌福托嬰中心 琉璃班'
    }
]);
const getManagerInfo = async () => {
    await apiClient.get('/api/managerInfo/getAll')
        .then(res => {
            managers.value = res.data;
            console.log('done ' + new Date());
        }).catch(err => console.error(err))
}
const updateScreenSize = () => {
    const width = window.innerWidth;
    if (width < 800) {
        managers.value.forEach( async (mgr, index) => {
            mgr.position = index % 2 === 0 ? 'left' : 'right';
            mgr.image = await getImage(mgr.id)
        });
    } else if (width < 1200) {
        let count = 2;
        let p = 'left';
        managers.value.forEach(async mgr => {
            if (count != 0) {
                mgr.position = p;
                count--;
            } else {
                count = 1;
                p = p === 'left' ? 'right' : 'left';
                mgr.position = p;
            }
            mgr.image = await getImage(mgr.id);
        });
    } else {
        let count = 3;
        let p = 'left';
        managers.value.forEach(async mgr => {
            if (count != 0) {
                mgr.position = p;
                count--;
            } else {
                count = 2;
                p = p === 'left' ? 'right' : 'left';
                mgr.position = p;
            }
            mgr.image = await getImage(mgr.id);
        });
    }
}
const getImage = async (id: number): Promise<string> => {
    return apiClient.get('/api/managerInfo/getImage/' + id)
        .then(res => {
            return res.data;
        }).catch(err => console.log(err));
}
onMounted(async () => {
    await getManagerInfo();
    updateScreenSize();
    window.addEventListener('resize', updateScreenSize);
});
onUnmounted(() => {
    window.removeEventListener('resize', updateScreenSize);
})
</script>
<style scoped>
.mgr {
    display: flex;
    flex-wrap: wrap;
    background: linear-gradient(to left, rgb(161, 221, 239) 40%, rgba(23, 187, 239, 0) 70%);
}

.person {
    flex: 0 0 33.33%;
}

@media (max-width: 1200px) {
    .person {
        flex: 0 0 50%;
    }
}

@media (max-width: 800px) {
    .person {
        flex: 0 0 100%;
    }
}
</style>