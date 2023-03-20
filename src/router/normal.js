import RecruitMainView from '../views/recruit/RecruitMainView.vue';
import BoardMainView from '../views/board/BoardMainView.vue';
import RecruitDetailView from '../views/recruit/RecruitDetailView.vue';
import CompanyProfile from '../views/recruit/CompanyProfile.vue';
import NotifyNomalView from '../views/notify/NotifyNomalView.vue';
import MyPageView from '../views/member/MyPageView.vue';
import BoardDetailView from '../views/board/BoardDetailView.vue';
import BoardInsertView from '../views/board/BoardInsertView.vue';
import BoardModfiyView from  '../views/board/BoardModifyView.vue';

export default [
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
        path: '/recruit/company/:id',
        name: 'companyProfile',
        component: CompanyProfile,
        meta: { requiresAuth: true }
      },
      {
        path: '/board/article',
        name: 'board',
        component: BoardMainView,
        meta: { requiresAuth: true }
      },
      {
        path: '/notify/nomal',
        name: 'notify/nomal',
        component: NotifyNomalView,
        meta: { requiresAuth: true }
      },
      {
        path: '/board/article',
        name: 'boardInsert',
        component: BoardInsertView,
        meta: { requiresAuth: true }
      },
      {
        path: '/board/article/:id',
        name: 'boardDetail',
        component : BoardDetailView,
        meta : {requiresAuth: true }
      },
      {
        path: '/member/:id',
        name: 'myPage',
        component: MyPageView,
        meta: { requiresAuth: true }
      },

      {
        path: '/board/article/:id',
        name: 'BoardModify',
        component: BoardModfiyView,
        meta: {requiresAuth: true}
      }

]