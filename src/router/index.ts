import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import LayoutComponent from '../components/layout/LayoutComponent.vue'

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
      }
    ]
  }
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
});

export default router