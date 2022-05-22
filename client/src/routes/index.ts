import homeRoutes from "../components/modules/home/routes";
import authRoutes from "../components/modules/auth/routes";
import usersRoutes from "../components/modules/users/routes";

const appRoutes: any[] = [
    ...homeRoutes,
    ...authRoutes,
    ...usersRoutes
];

export default appRoutes;