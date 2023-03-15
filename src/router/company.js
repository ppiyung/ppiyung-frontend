import CompanyRecruitView from '../views/companyrecruit/CompanyRecruitMainView.vue';

export default [
    {
        path: '/company/recruit',
        name: 'company/recruit',
        component: CompanyRecruitView,
        meta: { requiresAuth: true }
    }
]