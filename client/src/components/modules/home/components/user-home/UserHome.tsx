import React, { useContext, useState } from 'react'
import { useEffect } from 'react'
import { FaChartBar, FaUsers } from 'react-icons/fa'
import { CourseItem } from 'src/components/modules/courses'
import { CoursesService } from 'src/components/modules/courses/services/courses.service'
import { AuthContext } from 'src/contexts'
import { courseImage } from 'src/utils/filePath'

const UserHome = () => {

  const coursesService = new CoursesService()
  
  const { user } = useContext(AuthContext)

  const [activeIndex, setActiveIndex] = useState(0);
  const [courses, setCourses] = useState<any>(null);
  const [allCourses, setAllCourses] = useState<boolean>(false);
  const [dataLoading, setDataLoading] = useState<boolean>(false);
  const [totalRecords, setTotalRecords] = useState(0);
  const [search, setSearch] = useState<string>('')
  const [dataState, setDataState] = useState({
    filters: null,
    first: 0,
    page: 1,
    limit: 10,
    sortField: null,
    sortOrder: null
  })

  const findCourses = () => {
    coursesService.list({ ...dataState, search }, {
      all: allCourses
    }).then(
      (res: any) => {
        setCourses(res.data.docs)
        setTotalRecords(res.data.total)
        setDataLoading(false)
      },
      error => {
        console.log(error);
        setDataLoading(false)
      }
    )
  }

  useEffect(() => {
    findCourses()
  }, [allCourses])

  const onTabChange = (index: number, isAllCourses: boolean) => {
    setActiveIndex(index)
    setAllCourses(isAllCourses)
  }

  return (


    <div className='pt-4'>
      <div className='flex items-center justify-evenly border-b-2 border-primary-200 text-slate-600'>

        <div className={`text-lg w-full text-center cursor-pointer px-4 py-4 hover:bg-blue-100 ${activeIndex == 0 ? 'bg-blue-100' : ''}`}
          onClick={() => onTabChange(0, false)}>
          My courses
        </div>
        <div className={`text-lg w-full text-center cursor-pointer px-4 py-4 hover:bg-blue-100 ${activeIndex == 1 ? 'bg-blue-100' : ''}`}
          onClick={() => onTabChange(1, true)}>
          Courses
        </div>
      </div>
      <div className='py-8 h-[70vh]'>
        <div className='grid xs:grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 mt-4' >
          {
            courses && courses.map((course: any) => (
              <CourseItem key={course._id} course={course} user={user._id}/>
            ))
          }
        </div>
      </div>
    </div>
  )
}

export default UserHome