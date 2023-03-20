import CompanyRecruitView from '../views/company/CompanyRecruitMainView.vue';
import RecruitJobOfferView from '../views/recruit/RecruitJobOfferView.vue';
import NotifyCompanyView from '../views/notify/NotifyCompanyView.vue';
import RecruitJobOfferView from '../views/company/RecruitJobOfferView.vue';
import CompanyRecruitDetailView from '../views/company/CompanyRecruitDetailView.vue';
import CompanyRecruitNew from '../views/company/CompanyRecruitNewView.vue';
import CompanyRecruitEdit from '../views/company/CompanyRecruitEditView.vue';

export default [
    {
        path: '/company/recruit',
        name: 'company/recruit',
        component: CompanyRecruitView,
        meta: { requiresAuth: true }
    },
    {
        path: '/company/recruit/new',
        name: 'company/newRecruit',
        component: CompanyRecruitNew,
        mata : { requiresAuth: true }
    },
    {
        path: '/company/recruit/edit/:recruitId',
        name: 'company/editRecruit',
        component: CompanyRecruitEdit,
        mata : { requiresAuth: true }
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
    },
    {
        path: '/notify/company',
        name: 'notify/company',
        component: NotifyCompanyView,
        meta: { requiresAuth: true } 
    }
]