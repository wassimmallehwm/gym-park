import { lazy } from 'react';
const Courses = lazy(() => import('../courses-list/Courses'));
const CourseDetails = lazy(() => import('../course-details/CourseDetails'));

const coursesRoutes: any[] = [
    {
        path: "/courses",
        component: Courses,
        status: 'PROTECTED',
        roles: ["ADMIN", "COACH"]
    },
    {
        path: "/courses/:id",
        component: CourseDetails,
        status: 'PROTECTED',
        roles: ["ADMIN", "COACH"]
    },
]

export default coursesRoutes;