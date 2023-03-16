import RecruitMainView from '../views/recruit/RecruitMainView.vue';
import BoardMainView from '../views/board/BoardMainView.vue';
import RecruitDetailView from '../views/recruit/RecruitDetailView.vue';
import CompanyProfile from '../views/recruit/CompanyProfile.vue';
import BoardDetailView from '../views/board/BoardDetailView.vue';
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
        path: '/board/aticle/:id',
        name: 'boardDetail',
        component : BoardDetailView,
        meta : {requiresAuth: true }
      }
]