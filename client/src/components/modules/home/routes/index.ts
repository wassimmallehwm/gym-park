import { lazy } from 'react';
const Home = lazy(() => import('../components/Home'));

const homeRoutes: any[] = [
    {
        path: "/",
        component: Home,
        status: 'GUEST'
    },
]

export default homeRoutes;