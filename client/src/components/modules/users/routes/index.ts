import { lazy } from 'react';
const Users = lazy(() => import('../users-list/Users'));

const usersRoutes: any[] = [
    {
        path: "/users",
        component: Users,
        status: 'PROTECTED',
        roles: ["ADMIN"]
    },
]

export default usersRoutes;