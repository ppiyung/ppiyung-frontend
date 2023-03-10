import Vue from 'vue';
import VueRouter from 'vue-router';
import MainView from '../views/home/MainView.vue';
import LoginView from '../views/member/LoginView.vue';
import RecruitMainView from '../views/recruit/RecruitMainView.vue';
import BoardMainView from '../views/board/BoardMainView.vue';
import store from '../store';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'main',
    component: MainView,
    meta: { requiresAuth: true }
  },
  {
    path: '/member/login',
    name: 'login',
    component: LoginView
  },
  {
    path: '/recruit',
    name: 'recruit',
    component: RecruitMainView,
    meta: { requiresAuth: true }
  },
  {
    path: '/board',
    name: 'board',
    component: BoardMainView,
    meta: { requiresAuth: true }
  }
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
});

router.beforeEach((to, from, next) => {
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    if (!store.getters.isLogin) {
      next({
        name: 'login'
      });
    } else {
      next();
    }
  } else {
    next();
  }
});

export default router;
