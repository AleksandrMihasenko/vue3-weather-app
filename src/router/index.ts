import { createRouter, createWebHashHistory } from 'vue-router';
import Home from '@/views/Home.vue';
import CityView from '@/views/CityView.vue';

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/weather/:state/:city',
    name: 'CityView',
    component: CityView
  }
];

const router = createRouter({
  history: createWebHashHistory(),
  routes
});

export default router;
