<template>
  <div class="about">
    <section>
      <img src="/about.jpg" width="100%" @load="handleImageLoading" v-show="isImageLoaded" />
      <Skeleton v-show="!isImageLoaded" width="100%" height="30rem"></Skeleton>
    </section>
    <section class="second">
      <Carousel :value="products" :numVisible="3" :numScroll="1" :circular="true" :autoplayInterval="5000" :responsiveOptions="responsiveOptions">
        <template #item="slotProps">
          <BoaiCard :title="slotProps.data.title" :subtitle="slotProps.data.subtitle" :image-url="slotProps.data.image" @click="handleCardClick(slotProps.data)"></BoaiCard>
        </template>
      </Carousel>
    </section>
  </div>
  <Dialog v-model:visible="dialogVisible" modal :header="dialogInfo.header" :style="{width: '50%'}" :breakpoints="{ '1200px': '60%', '800px': '80%'}">
    <img :src="dialogInfo.imageUrl" width="100%"/>
    <p>{{ dialogInfo.content }}</p>
  </Dialog>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { CardItem, DialogItem } from '../interfaces/interface';
import BoaiCard from '../components/card/BoaiCard.vue';
const dialogVisible = ref(false);
const products = ref<CardItem[]>([
  {
    title: '我支持．台灣無毒 ',
    image: '/boardgame.jpg',
    subtitle: '讓台灣成為無毒家園，反毒教育從小做起'
  },
  {
    title: '運算思維聯盟',
    image: 'little_scientist1.jpg',
    subtitle: '建立孩子解決問題的能力，從運算思維開始'
  },
  {
    title: '就是市集 All Hands',
    image: '/book.jpg',
    subtitle: '由大量的閱讀，建立良好的思維'
  },
    {
    title: '青銀共煮',
    image: '/cook.jpg',
    subtitle: '惜食，福利，跨世代共煮交流。'
  }
]);
const responsiveOptions = ref([
  {
    breakpoint: '1200px',
    numVisible: 2,
    numScroll: 1
  },
  {
    breakpoint: '800px',
    numVisible: 1,
    numScroll: 1
  },
]);
const isImageLoaded = ref(false);
const handleImageLoading = () => {
    isImageLoaded.value = true;
}
let dialogInfo = ref<DialogItem>({
  header: '',
  content: ''
})
const handleCardClick = (data: CardItem) => {
  dialogInfo.value.header = data.title;
  dialogInfo.value.imageUrl = data.image;
  dialogInfo.value.content = data.subtitle + data.subtitle + data.subtitle + data.subtitle + data.subtitle;
  dialogVisible.value = true;
}
</script>

<style scoped>
/* 样式 */
.about {
  position: relative;
  flex-grow: 1;
  text-align: center;

}

.bg {
  /* font-size: 50px;  */
  color: #ffffff;
  text-align: left;
  background: linear-gradient(to right, rgba(23, 187, 239, 1) 40%, rgba(23, 187, 239, 0) 70%);
  position: absolute;
  height: 63vh;
  width: 200vh;
  z-index: 1;
}

.second {
  background: linear-gradient(to left, rgb(238, 226, 171) 40%, rgba(253, 208, 0, 0) 70%);
}

</style>
