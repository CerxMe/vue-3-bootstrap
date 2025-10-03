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
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "match" */ './PageViews/TestCharts.vue')
  }
]

export const router = createRouter({
  history: createWebHistory(),
  routes,
})
export default router;
