import { lazy } from 'react';
const ChannelsList = lazy(() => import('../channels-list/ChannelsList'));
const ChannelMessages = lazy(() => import('../channel-messages/ChannelMessages'));

const channelsRoutes: any[] = [
    {
        path: "/channels",
        component: ChannelsList,
        status: 'PROTECTED'
    },
    {
        path: "/channels/:id",
        component: ChannelMessages,
        status: 'PROTECTED'
    },
    
]

export default channelsRoutes;