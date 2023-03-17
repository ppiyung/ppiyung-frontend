import CompanyRecruitView from '../views/company/CompanyRecruitMainView.vue';
import RecruitJobOfferView from '../views/recruit/RecruitJobOfferView.vue';
import NotifySuggestView from '../views/notify/NotifySuggestView.vue';


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
    },
    {
        path: '/company/notify',
        name: 'company/notify',
        component: NotifySuggestView,
        meta: { requiresAuth: true } 
    }
]