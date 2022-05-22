import { lazy } from 'react';
const Login = lazy(() => import('../Login'));

const authRoutes: any[] = [
    {
        path: "/login",
        component: Login,
        status: 'GUEST'
    },
]

export default authRoutes;