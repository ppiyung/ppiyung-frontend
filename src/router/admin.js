import AdminMemeberView from '../views/admin/AdminMemberView.vue';
import AdminRecruitView from '../views/admin/AdminRecruitView.vue';
import AdminBoardView from '../views/admin/AdminBoardView.vue';

export default [
    {
        path: '/admin/member',
        name: 'admin/member',
        component: AdminMemeberView,
        meta: { requiresAuth: true }
    },
    {
        path: '/admin/recruit',
        name: 'admin/recruit',
        component: AdminRecruitView,
        meta: { requiresAuth: true }
    },
    {
        path: '/admin/board',
        name: 'admin/board',
        component: AdminBoardView,
        meta: { requiresAuth: true }
    },
]