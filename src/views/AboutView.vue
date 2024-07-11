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
    title: '反毒桌遊',
    image: '../../src/assets/boardgame.jpg',
    subtitle: '遠離哈門陷阱'
  },
  {
    title: '青銀共煮',
    image: '../../src/assets/cook.jpeg',
    subtitle: '咱兜灶跤的古早味計畫'
  },
  {
    title: '小小科學家',
    image: '../../src/assets/little_scientist1.jpeg',
    subtitle: '問題拆解．抽象歸納'
  },
  {
    title: '好書交換',
    image: '../../src/assets/book.jpg',
    subtitle: '書中自有黃金屋'
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
