import Vue from 'vue';
import VueRouter from 'vue-router';
import MainView from '../views/main/MainView.vue';
import LoginView from '../views/member/LoginView.vue';
import RecruitMainView from '../views/recruit/RecruitMainView.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'main',
    component: MainView
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  },
  {
    path: '/member/login',
    name: 'login',
    component: LoginView
  },
  {
    path: '/recruit',
    name: 'recruit',
    component: RecruitMainView
  }
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
});

export default router;
