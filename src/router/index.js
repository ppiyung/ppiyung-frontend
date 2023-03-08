import Vue from 'vue';
import VueRouter from 'vue-router';
import MainView from '../views/home/MainView.vue';
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
