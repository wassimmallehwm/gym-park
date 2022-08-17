import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { CoursesService } from '../services/courses.service';
import { TabView, TabPanel } from 'primereact/tabview';
import CourseContent from './course-content/CourseContent';
import CourseParticipants from './course-participants/CourseParticipants';
import CourseCoachs from './course-coachs/CourseCoachs';

const CourseDetails = () => {
    const coursesService = new CoursesService();
    const navigate = useNavigate();

    let { id } = useParams();
    const [course, setCourse] = useState<any>()
    const [activeIndex, setActiveIndex] = useState(0);

    const getOneCourse = () => {
        coursesService.findFullById(id!).then(
            (res: any) => {
                setCourse(res.data);
            },
            error => {
                console.log(error);
            }
        )
    }

    const pageContent = () => {
        if (activeIndex == 2) {
            return <CourseCoachs setCourse={(item: any) => setCourse(item)} course={course} />
        } else if (activeIndex == 1) {
            return <CourseParticipants setCourse={(item: any) => setCourse(item)} course={course} />
        } else {
            return <CourseContent setCourse={(item: any) => setCourse(item)} course={course} />
        }
    }

    useEffect(() => {
        getOneCourse()
    }, [])
    return (
        <div className='pt-4'>
            <div className='flex items-center justify-evenly border-b-2 border-primary-200 text-slate-600'>

                <div className={`text-lg w-full text-center cursor-pointer px-4 py-4 hover:bg-blue-100 ${activeIndex == 0 ? 'bg-blue-100' : ''}`}
                    onClick={() => setActiveIndex(0)}>
                    Content
                </div>
                <div className={`text-lg w-full text-center cursor-pointer px-4 py-4 hover:bg-blue-100 ${activeIndex == 1 ? 'bg-blue-100' : ''}`}
                    onClick={() => setActiveIndex(1)}>
                    Participants
                </div>
                <div className={`text-lg w-full text-center cursor-pointer px-4 py-4 hover:bg-blue-100 ${activeIndex == 2 ? 'bg-blue-100' : ''}`}
                    onClick={() => setActiveIndex(2)}>
                    Coachs
                </div>
            </div>
            <div className='py-8 h-[70vh]'>
                {course && pageContent()}
            </div>
        </div>
    )
}

export default CourseDetails