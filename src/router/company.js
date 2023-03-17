import CompanyRecruitView from '../views/company/CompanyRecruitMainView.vue';
import RecruitJobOfferView from '../views/recruit/RecruitJobOfferView.vue';


export default [
    {
        path: '/company/recruit',
        name: 'company/recruit',
        component: CompanyRecruitView,
        meta: { requiresAuth: true }
    },
    {
        path: '/company/suggest',
        name: 'company/suggest',
        component: RecruitJobOfferView,
        mata : { requiresAuth: true }
    }
]