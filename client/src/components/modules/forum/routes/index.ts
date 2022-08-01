import { lazy } from 'react';
const ForumPage = lazy(() => import('../forum-page/ForumPage'));

const forumRoutes: any[] = [
    {
        path: "/forum",
        component: ForumPage,
        status: 'PROTECTED',
        roles: ["ADMIN", "COACH", "USER"]
    },
]

export default forumRoutes;