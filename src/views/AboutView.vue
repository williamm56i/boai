<template>
  <div class="about">
    <Toast />
    <section>
      <img src="/about.jpg" width="100%" @load="handleImageLoading" v-show="isImageLoaded" />
      <Skeleton v-show="!isImageLoaded" width="100%" height="30rem"></Skeleton>
    </section>
    <section class="second">
      <Carousel :value="products" :numVisible="numVisible" :numScroll="1" :circular="true" :autoplayInterval="5000"
        :responsiveOptions="responsiveOptions">
        <template #item="slotProps">
          <BoaiCard :title="slotProps.data.title" :subtitle="slotProps.data.subtitle" :image-url="slotProps.data.image"
            @click="handleCardClick(slotProps.data)"></BoaiCard>
        </template>
      </Carousel>
      <div style="display: flex; justify-content: center">
        <BoaiTable :size="'small'" :paginator="false" :data="data" :columns="columns" :totalCount="totalCount"
          :loading="loading" :tableHeight="'222px'" :selectionMode="'single'" @selected-row="handleSelectedRow"
          class=bulletinBoard></BoaiTable>
      </div>
    </section>
  </div>
  <Dialog v-model:visible="dialogVisible" modal :header="dialogInfo.header" :style="{ width: '50%' }"
    :breakpoints="{ '1200px': '60%', '800px': '80%' }">
    <img :src="dialogInfo.imageUrl" width="100%" />
    <p>{{ dialogInfo.content }}</p>
  </Dialog>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { BulletinBoardItem, CardItem, ColumnItem, DialogItem } from '../interfaces/interface';
import BoaiCard from '../components/card/BoaiCard.vue';
import BoaiTable from '../components/table/BoaiTable.vue';
import apiClient from '../request/request';
import { useRouter } from 'vue-router';
import { useToast } from "primevue/usetoast";

const router = useRouter();
const toast = useToast();
const dialogVisible = ref(false);
const loading = ref(false);
const totalCount = ref<number>(0);
const selectedRow = ref<any>();
const columns = ref<ColumnItem[]>([
  {
    field: 'announceDate',
    header: '日期'
  },
  {
    field: 'subject',
    header: '最新消息'
  }
]);
const data = ref<BulletinBoardItem[]>([]);
const products = ref<CardItem[]>([
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
const numVisible = ref(3);
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
  imageUrl: '',
  content: ''
})
const handleCardClick = (data: CardItem) => {
  dialogInfo.value.header = data.title;
  dialogInfo.value.imageUrl = data.image;
  dialogInfo.value.content = data.content;
  dialogVisible.value = true;
}
const getAboutInfo = async () => {
  await apiClient.get('/api/aboutInfo/getAll').then(async res => {
    products.value = res.data;
    await fetchAboutInfoImage();
  }).catch(err => {
    console.error(err);
  });
}
const fetchAboutInfoImage = async () => {
  products.value.forEach(async product => {
    product.image = await getImage(product.id)
  })
}
const getImage = async (id: number): Promise<string> => {
  return apiClient.get('/api/aboutInfo/getImage/' + id)
    .then(res => {
      return res.data;
    }).catch(err => console.log(err));
}
const initCarouselNumVisible = () => {
  const width = window.innerWidth;
  if (width <= 800) {
    numVisible.value = 1;
  } else if (width <= 1200) {
    numVisible.value = 2;
  } else {
    numVisible.value = 3;
  }
}
const getBulletinBoard = async () => {
  loading.value = true;
  await apiClient.get('/api/bulletinBoard/getAll').then(res => {
    data.value = res.data;
  }).catch(err => console.error(err))
    .finally(() => loading.value = false);
}
const handleSelectedRow = (row: object) => {
  selectedRow.value = row;
  console.log(selectedRow.value);
}
onMounted(async () => {
  const message = router.currentRoute.value.query.message;
  if (message) {
    toast.add(JSON.parse(message.toString()));
  }

  await getAboutInfo();
  initCarouselNumVisible();
  await getBulletinBoard();
})
</script>

<style scoped>
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

.bulletinBoard {
  width: 80%;
}

@media (max-width: 800px) {
  .bulletboard {
    width: 98%;
  }
}
</style>
