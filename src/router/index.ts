import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import { useHead } from '@vueuse/head';
import LayoutComponent from '../components/layout/LayoutComponent.vue'
import apiClient from '../request/request';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Main',
    component: LayoutComponent,
    children: [
      {
        path: '',
        name: '',
        component: () => import('../views/AboutView.vue'),
        meta: {title: '中華民國推動博愛關懷協會', description: '中華民國推動博愛關懷協會-首頁，博愛無限、關懷永續。Association to Promote Univeral Love and Care'}
      },
      {
        path: '/about',
        name: '關於我們',
        component: () => import('../views/AboutView.vue'),
        meta: {title: '關於我們', description: '中華民國推動博愛關懷協會-關於我們，博愛無限、關懷永續。Association to Promote Univeral Love and Care'}
      },
      {
        path: '/manager',
        name: '經營團隊',
        component: () => import('../views/ManagerView.vue'),
        meta: {title: '經營團隊', description: '中華民國推動博愛關懷協會-經營團隊，榮譽理事長：張誠'}
      },
      {
        path: '/activity',
        name: '活動資訊',
        component: () => import('../views/ActivityView.vue'),
        meta: {title: '活動資訊', description: '中華民國推動博愛關懷協會-活動資訊，北極星共享空間'}
      },
      {
        path: '/activityDetail/:id',
        name: '活動明細',
        component: () => import('../views/ActivityDetailView.vue'),
        meta: {title: '活動明細', description: '中華民國推動博愛關懷協會-活動資訊，北極星共享空間'}
      },
      {
        path: '/admin',
        name: '後台管理',
        component: () => import('../views/AdminView.vue'),
        meta: {title: '後台管理', description: '中華民國推動博愛關懷協會'}
      }
    ]
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('../views/LoginView.vue'),
    meta: {title: 'Login', description: 'Login'}
  }
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
});

router.beforeEach(async (to, _from, next) => {
  if (to.path !== '/login') {
    if (!localStorage.getItem('jwt')) {
      await apiClient.post('/api/system/generateToken', {
        account: 'GUEST'
      }).then(res => {
        localStorage.setItem('jwt', res.data);
        addHeader(to);
        next();
      }).catch(err => {
        console.error(err);
        addHeader(to);
        next(); // temp
      })
    } else {
      addHeader(to);
      next();
    }
  } else {
    addHeader(to);
    next();
  }
});

const addHeader = (to: any) => {
  useHead({
    title: to.meta.title as string,
    meta:[
      {
        name: 'description',
        content: to.meta.description as string
      }
    ]
  })
}
export default router