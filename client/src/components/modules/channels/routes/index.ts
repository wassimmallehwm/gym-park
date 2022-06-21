import { lazy } from 'react';
const ChannelsList = lazy(() => import('../channels-list/ChannelsList'));

const channelsRoutes: any[] = [
    {
        path: "/channels",
        component: ChannelsList,
        status: 'PROTECTED'
    },
]

export default channelsRoutes;