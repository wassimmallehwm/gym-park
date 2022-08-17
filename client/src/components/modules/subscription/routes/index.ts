import { lazy } from 'react';
const Subscriptions = lazy(() => import('../components/subscription-list/Subscriptions'));

const subscriptionsRoutes: any[] = [
    {
        path: "/subscriptions",
        component: Subscriptions,
        status: 'PROTECTED',
        roles: ["ADMIN"]
    },
]

export default subscriptionsRoutes;