import homeRoutes from "../components/modules/home/routes";
import authRoutes from "../components/modules/auth/routes";
import usersRoutes from "../components/modules/users/routes";
import coursesRoutes from "../components/modules/courses/routes";
import forumRoutes from "../components/modules/forum/routes";
import channelsRoutes from "../components/modules/channels/routes";

const appRoutes: any[] = [
    ...homeRoutes,
    ...authRoutes,
    ...usersRoutes,
    ...coursesRoutes,
    ...forumRoutes,
    ...channelsRoutes
];

export default appRoutes;