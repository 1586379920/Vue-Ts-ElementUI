import Vue from 'vue';
import VueRouter, { RouteConfig } from 'vue-router';
import Home from '../views/Home.vue';
import SystemMain from '../views/SystemMain.vue';
import TableData from '../views/TableData.vue';

Vue.use(VueRouter);

const routes: RouteConfig[] = [
  { path: '/', redirect: '/home' },
  {
    path: '/home',
    name: 'Home',
    component: Home,
    children: [
      { path: '/', redirect: '/home/system-main' },
      { path: '/home/system-main', component: SystemMain },
      { path: '/home/table-data', component: TableData },
    ],
  },
];

const router = new VueRouter({
  routes,
});

export default router;
