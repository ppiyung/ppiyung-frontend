import CompanyRecruitView from '../views/company/CompanyRecruitMainView.vue';
import RecruitJobOfferView from '../views/company/RecruitJobOfferView.vue';
import CompanyRecruitDetailView from '../views/company/CompanyRecruitDetailView.vue';

export default [
    {
        path: '/company/recruit',
        name: 'company/recruit',
        component: CompanyRecruitView,
        meta: { requiresAuth: true }
    },
    {
        path: '/company/recruit/:recruitId',
        name: 'company/recruitStatus',
        component: CompanyRecruitDetailView,
        meta: { requiresAuth: true }
    },
    {
        path: '/company/suggest',
        name: 'company/suggest',
        component: RecruitJobOfferView,
        mata : { requiresAuth: true }
    }
]