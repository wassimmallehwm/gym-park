import { lazy } from 'react';
const Courses = lazy(() => import('../courses-list/Courses'));
const CourseDetails = lazy(() => import('../course-details/CourseDetails'));

const coursesRoutes: any[] = [
    {
        path: "/courses",
        component: Courses,
        status: 'PROTECTED'
    },
    {
        path: "/courses/:id",
        component: CourseDetails,
        status: 'PROTECTED'
    },
]

export default coursesRoutes;