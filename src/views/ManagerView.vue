<template>
    <section class="mgr-right">
        <div class="person" v-for="mgr in managers">
            <MgrInfo :position="mgr.position" :image-url="mgr.imageUrl" :title="mgr.title" :name="mgr.name"
                :description="mgr.description" :description2="mgr.description2"></MgrInfo>
        </div>
    </section>
</template>
<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue';
import MgrInfo from '../components/mgrInfo/MgrInfo.vue';
import { MgrItem } from '../interfaces/interface';
const managers = ref<MgrItem[]>([
    {
        position: 'left',
        imageUrl: '../../src/assets/honorChairman.jpg',
        title: '榮譽理事長',
        name: '張誠',
        description: '伊利諾大學香檳校區電腦科學 博士',
        description2: '前雄三飛彈專案總工程師'
    },
    {
        position: 'left',
        imageUrl: '../../src/assets/chairman.jpeg',
        title: '理事長',
        name: '陳郁婷',
        description: '台灣大學資訊管理研究所 碩士'
    },
    {
        position: 'left',
        imageUrl: '../../src/assets/secretary.jpeg',
        title: '執行秘書',
        name: '李凱西',
        description: '政治大學企業管理研究所 碩士'
    },
    {
        position: 'left',
        imageUrl: '../../src/assets/pr.jpeg',
        title: '公關長',
        name: '李永昌',
        description: '台灣大學電機工程研究所 碩士'
    },
    {
        position: 'left',
        imageUrl: '../../src/assets/finance.jpeg',
        title: '財務長',
        name: '莊淵智',
        description: '中正理工學院機械工程系 學士',
        description2: '中山科學研究院 中校'
    },
    {
        position: 'left',
        imageUrl: '../../src/assets/audit.jpeg',
        title: '監察人',
        name: '蔡宗良',
        description: '交通大學資訊工程研究所 博士',
    },
    {
        position: 'left',
        imageUrl: '../../src/assets/honorChairman.jpg',
        title: '榮譽理事長',
        name: '張誠',
        description: '伊利諾大學香檳校區電腦科學 博士',
        description2: '前雄三飛彈專案總工程師'
    },
    {
        position: 'left',
        imageUrl: '../../src/assets/chairman.jpeg',
        title: '理事長',
        name: '陳郁婷',
        description: '台灣大學資訊管理研究所 碩士'
    },
    {
        position: 'left',
        imageUrl: '../../src/assets/secretary.jpeg',
        title: '執行秘書',
        name: '李凱西',
        description: '政治大學企業管理研究所 碩士'
    }
]);
const updateScreenSize = () => {
    const width = window.innerWidth;
      if (width < 800) {
        managers.value.forEach( (mgr, index) => {
            mgr.position = index % 2 === 0 ? 'left' : 'right';
        });
      } else if (width < 1200) {
        let count = 2;
        let p = 'left';
        managers.value.forEach( mgr => {
            if (count != 0) {
                mgr.position = p;
                count--;
            } else {
                count = 1;
                p = p === 'left' ? 'right' : 'left';
                mgr.position = p;
            }
        });
      } else {
        let count = 3;
        let p = 'left';
        managers.value.forEach( mgr => {
            if (count != 0) {
                mgr.position = p;
                count--;
            } else {
                count = 2;
                p = p === 'left' ? 'right' : 'left';
                mgr.position = p;
            }
        });
      }
};
onMounted(() => {
    updateScreenSize();
    window.addEventListener('resize', updateScreenSize);
});
onUnmounted(() => {
    window.removeEventListener('resize', updateScreenSize);
})
</script>
<style scoped>
.mgr-left {
    display: flex;
    flex-direction: row;
    background: linear-gradient(to right, rgba(23, 187, 239, 1) 40%, rgba(23, 187, 239, 0) 70%);
}

.mgr-right {
    display: flex;
    flex-wrap: wrap;
    background: linear-gradient(to left, rgba(23, 187, 239, 1) 40%, rgba(23, 187, 239, 0) 70%);
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