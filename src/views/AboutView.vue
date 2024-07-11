<template>
  <div class="about">
    <section><img src="../../src/assets/about.jpg" width="100%" /></section>
    <section class="second">
      <Carousel :value="products" :numVisible="3" :numScroll="1" :circular="true" :responsiveOptions="responsiveOptions">
        <template #item="slotProps">
          <BoaiCard :title="slotProps.data.title" :subtitle="slotProps.data.subtitle" :image-url="slotProps.data.image"></BoaiCard>
        </template>
      </Carousel>
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { CardItem } from '../interfaces/interface';
import BoaiCard from '../components/card/BoaiCard.vue';
const products = ref<CardItem[]>([
  {
    title: '我支持．台灣無毒 ',
    image: '../../src/assets/boardgame.jpg',
    subtitle: '讓台灣成為無毒家園，反毒教育從小做起'
  },
  {
    title: '運算思維聯盟',
    image: '../../src/assets/little_scientist1.jpeg',
    subtitle: '建立孩子解決問題的能力，從運算思維開始'
  },
  {
    title: '就是市集 All Hands',
    image: '../../src/assets/book.jpg',
    subtitle: '由大量的閱讀，建立良好的思維'
  },
    {
    title: '青銀共煮',
    image: '../../src/assets/cook.jpeg',
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
])
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
  background: linear-gradient(to left, rgba(253, 208, 0, 1) 40%, rgba(253, 208, 0, 0) 70%);
}

</style>
