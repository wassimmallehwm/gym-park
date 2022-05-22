import { lazy } from 'react';
const Users = lazy(() => import('../users-list/Users'));

const usersRoutes: any[] = [
    {
        path: "/users",
        component: Users,
        status: 'PROTECTED'
    },
]

export default usersRoutes;