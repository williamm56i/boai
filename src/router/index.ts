import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
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
        component: () => import('../views/AboutView.vue')
      },
      {
        path: '/about',
        name: '關於我們',
        component: () => import('../views/AboutView.vue')
      },
      {
        path: '/manager',
        name: '經營團隊',
        component: () => import('../views/ManagerView.vue')
      },
      {
        path: '/activity',
        name: '活動資訊',
        component: () => import('../views/ActivityView.vue')
      },
      {
        path: '/activityDetail/:id',
        name: '活動明細',
        component: () => import('../views/ActivityDetailView.vue')
      },
    ]
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('../views/LoginView.vue')
  }
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
});

router.beforeEach(async (to, from, next) => {
  if (to.path !== '/login') {
    if (!localStorage.getItem('jwt')) {
      await apiClient.get('/api/system/generateToken?account=GUEST').then(res => {
        localStorage.setItem('jwt', res.data);
        next();
      }).catch(err => {
        console.error(err);
        next(); // temp
      })
    } else {
      next();
    }
  } else {
    next();
  }
});
export default router