import { lazy } from 'react';
const Home = lazy(() => import('../Home'));

const homeRoutes: any[] = [
    {
        path: "/",
        component: Home,
        status: 'PROTECTED'
    },
]

export default homeRoutes;