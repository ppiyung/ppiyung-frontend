import RecruitMainView from '../views/recruit/RecruitMainView.vue';
import BoardMainView from '../views/board/BoardMainView.vue';
import RecruitDetailView from '../views/recruit/RecruitDetailView.vue';
import CompanyProfile from '../views/recruit/CompanyProfile.vue';

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
        path: '/board',
        name: 'board',
        component: BoardMainView,
        meta: { requiresAuth: true }
      }
    

]