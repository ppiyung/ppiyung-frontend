import Vue from 'vue';
import VueRouter from 'vue-router';
import MainView from '../views/home/MainView.vue';
import LoginView from '../views/member/LoginView.vue';
import LogoutView from '../views/member/LogoutView.vue';
import RegisterView from '../views/member/RegisterView.vue';
import RecruitMainView from '../views/recruit/RecruitMainView.vue';
import BoardMainView from '../views/board/BoardMainView.vue';
import RecruitDetailView from '../views/recruit/RecruitDetailView.vue';
import CompanyRecruitView from '../views/companyrecruit/CompanyRecruitMainView.vue';
import MyPageView from '../views/member/MyPageView.vue';
// eslint-disable-next-line
import store from '../store';

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
    path: '/member/logout',
    name: 'logout',
    component: LogoutView
  },
  {
    path: '/member/register',
    name: 'register',
    component: RegisterView
  },
  {
    path: '/member',
    name: 'mypage',
    component: MyPageView,
    meta: { requiresAuth: true }
  },
  {
    path: '/recruit',
    name: 'recruit',
    component: RecruitMainView,
    meta: { requiresAuth: true }
  },
  {
    path: '/recruit/:id',
    name: 'recruitDetail',
    component: RecruitDetailView,
    meta: { requiresAuth: true }
  },
  {
    path: '/board',
    name: 'board',
    component: BoardMainView,
    meta: { requiresAuth: true }
  },
  {
    path: '/company/recruit',
    name: 'company/recruit',
    component: CompanyRecruitView,
    meta: { requiresAuth: true }
  }
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
});

router.beforeEach(async (to, from, next) => {
  store.commit('common/setSuccess', null);
  if (to.matched.some((record) => record.meta.requiresAuth)) { // 인증 필요 경로
    if (!store.getters['auth/isLogin']) { // 로그인 정보가 없는 경우
      next({
        name: 'login'
      });
    } else { // 로그인 정보가 있는 경우
      next();
    }
  } else { // 인증 필요 없음
    next();
  }
});

export default router;
