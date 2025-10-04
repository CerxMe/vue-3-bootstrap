import { createRouter, createWebHistory } from "vue-router";
import HomeView from "./PageViews/Home.vue";

const routes = [
  {
    path: '/',
    name: 'Home',
    component: HomeView
  },
  {
    path: '/test',
    name: 'About',
    component: () => import(/* webpackChunkName: "match" */ './PageViews/TestCharts.vue')
  },
  {
    path: '/tax',
    name: 'Tax',
    component: () => import(/* webpackChunkName: "tax" */ './PageViews/TaxCalculator.vue')
  }
]

export const router = createRouter({
  history: createWebHistory(),
  routes,
})
export default router;
