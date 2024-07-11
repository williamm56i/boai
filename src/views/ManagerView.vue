<template>
    <section class="mgr-left">
        <MgrInfo :position="honorChairman.position" :image-url="honorChairman.imageUrl" :title="honorChairman.title" :name="honorChairman.name"
            :description="honorChairman.description" :description2="honorChairman.description2"></MgrInfo>
    </section>
    <section class="mgr-right">
        <MgrInfo :position="chairman.position" :image-url="chairman.imageUrl" :title="chairman.title" :name="chairman.name"
            :description="chairman.description"></MgrInfo>
    </section>
    <section class="mgr-left">
        監察人
    </section>
</template>
<script setup lang="ts">
import { ref } from 'vue';
import MgrInfo from '../components/mgrInfo/MgrInfo.vue';
import { MgrItem } from '../interfaces/interface';
const honorChairman = ref<MgrItem>({
    position: 'left',
    imageUrl: '../../src/assets/honorChairman.jpg',
    title: '榮譽理事長',
    name: '張誠',
    description: '伊利諾大學香檳校區電腦科學 博士',
    description2: '前雄三飛彈專案總工程師'
});
const chairman = ref<MgrItem>({
    position: 'right',
    imageUrl: '../../src/assets/chairman.jpeg',
    title: '理事長',
    name: '陳郁婷',
    description: '台灣大學資訊管理研究所 碩士'
});
</script>
<style scoped>
.mgr-left {
    background: linear-gradient(to right, rgba(23, 187, 239, 1) 40%, rgba(23, 187, 239, 0) 70%);
}

.mgr-right {
    background: linear-gradient(to left, rgba(253, 208, 0, 1) 40%, rgba(253, 208, 0, 0) 70%);
}
</style>