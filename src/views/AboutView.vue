<template>
  <div class="about">
    <Toast />
    <section>
      <img src="/about.jpg" width="100%" class="large-about" @load="handleImageLoading" v-show="isImageLoaded" />
      <img src="/about_small.jpg" width="100%" class="small-about" @load="handleImageLoading" v-show="isImageLoaded" />
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
      <div>
        <h2>最新活動</h2>
      </div>
      <Carousel :value="latestActivities" :numVisible="numVisible" :numScroll="1"
        :responsiveOptions="responsiveOptions">
        <template #item="slotProps">
          <ActCard :title="slotProps.data.title" :subtitle="slotProps.data.subtitle" :image-url="slotProps.data.image"
            @click="handleActClick(slotProps.data.id)"></ActCard>
        </template>
      </Carousel>
    </section>
  </div>
  <Dialog v-model:visible="dialogVisible" modal :header="dialogInfo.header" :style="{ width: '50%' }"
    :breakpoints="{ '1200px': '60%', '800px': '80%' }">
    <img :src="dialogInfo.imageUrl" width="100%" />
    <Skeleton v-show="!dialogInfo.imageUrl" width="100%" height="15rem"></Skeleton>
    <p>{{ dialogInfo.content }}</p>
    <Skeleton v-show="!dialogInfo.imageUrl" width="100%"></Skeleton>
  </Dialog>
  <Dialog v-model:visible="msgDetailVisible" modal :header="dialogInfo.header" :style="{ width: '50%' }"
    :breakpoints="{ '1200px': '60%', '800px': '80%' }">
    <p>{{ dialogInfo.date }}</p>
    <Skeleton v-show="!dialogInfo.content" width="30%"></Skeleton>
    <p class="msgWidth" v-html="dialogInfo.content"></p>
    <Skeleton v-show="!dialogInfo.content" width="100%" height="15rem"></Skeleton>
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
import ActCard from '../components/card/ActCard.vue';

const router = useRouter();
const toast = useToast();
const dialogVisible = ref(false);
const msgDetailVisible = ref(false);
const loading = ref(false);
const totalCount = ref<number>(0);
const latestActivities = ref<CardItem[]>([]);
const columns = ref<ColumnItem[]>([
  {
    field: 'announceDate',
    header: '公告日期'
  },
  {
    field: 'subject',
    header: '最新消息'
  }
]);
const data = ref<BulletinBoardItem[]>([]);
const products = ref<CardItem[]>([]);
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
  imageUrl: undefined,
  content: ''
})
const handleCardClick = (data: CardItem) => {
  resetDialogInfo();
  dialogVisible.value = true;
  apiClient.get('/api/aboutInfo/getAboutInfoDetail/' + data.id).then(res => {
    dialogInfo.value.header = res.data.title;
    dialogInfo.value.imageUrl = res.data.image;
    dialogInfo.value.content = res.data.content;
  }).catch(err => console.log(err));
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
    product.image = await getAboutInfoImage(product.id)
  })
}
const getAboutInfoImage = async (id: number): Promise<string> => {
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
const handleSelectedRow = (row: any) => {
  resetDialogInfo();
  msgDetailVisible.value = true;
  apiClient.get('/api/bulletinBoard/getBulletinBoardDetail/' + row.id).then(res => {
    dialogInfo.value.header = res.data.subject;
    dialogInfo.value.date = res.data.announceDate;
    dialogInfo.value.content = res.data.contentData;
  }).catch(err => console.error(err));
}
const resetDialogInfo = () => {
  dialogInfo.value.content = '';
  dialogInfo.value.date = undefined;
  dialogInfo.value.imageUrl = undefined;
  dialogInfo.value.header = '';
}
const getLatestActivities = async () => {
  await apiClient.get('/api/activityInfo/getLatestActivities/3').then(async res => {
    latestActivities.value = res.data;
    await fetchActivityInfoImage();
  });
}
const fetchActivityInfoImage = async () => {
  latestActivities.value.forEach(async product => {
    product.image = await getActivityInfoImage(product.id)
  })
}
const getActivityInfoImage = async (id: number): Promise<string> => {
  return apiClient.get('/api/activityInfo/getImage/' + id)
    .then(res => {
      return res.data;
    }).catch(err => console.log(err));
}
const handleActClick = (id: number) => {
  router.push('/activityDetail/' + id);
}
onMounted(async () => {
  const message = router.currentRoute.value.query.message;
  if (message) {
    toast.add(JSON.parse(message.toString()));
  }

  await getAboutInfo();
  initCarouselNumVisible();
  await getBulletinBoard();
  await getLatestActivities();
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

.msgWidth * {
  max-width: 100%;
}

@media (max-width: 800px) {
  .bulletinBoard {
    width: 98%;
  }
}


.large-about {
  display: block;
}

.small-about {
  display: none;
}

@media (max-width: 800px) {
  .large-about {
    display: none;
  }

  .small-about {
    display: block;
  }
}
</style>
