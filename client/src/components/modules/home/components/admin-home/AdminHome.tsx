import React, { useEffect, useState } from 'react'
import { FaFileVideo, FaUsers } from 'react-icons/fa'
import { useNavigate } from 'react-router-dom'
import CourseLevelBadge from 'src/components/modules/courses/course-level-badge/CourseLevelBadge'
import { formateDate } from 'src/utils/dateFormat'
import { courseImage } from 'src/utils/filePath'
import { DashboardService } from '../../services/dashboard.service'

const AdminHome = () => {
  const dashboardService = new DashboardService()
  const navigate = useNavigate()
  const [counts, setCounts] = useState<any>({
    users: 0,
    coachs: 0,
    courses: 0
  })
  const [topCourses, setTopCourses] = useState<any>([])

  const getCounts = () => {
    dashboardService.getCounts().then(
      res => setCounts(res.data)
    )
  }

  const getTopCourses = () => {
    dashboardService.topCourses().then(
      res => setTopCourses(res.data)
    )
  }

  const navigateTo = (id: string) => {
    navigate(`/courses/${id}`)
  }

  useEffect(() => {
    getCounts()
    getTopCourses()
  }, [])
  return (
    <div>

      <div className="grid gap-6 grid-cols-1 md:grid-cols-3 my-6">

        <div className="p-6 bg-white rounded-sm shadow-md">
          <div className="card-content">
            <div className="flex items-center justify-between">
              <div className="widget-label">
                <h3 className='text-3xl text-gray-600'>
                  Members
                </h3>
                <h1 className='text-3xl'>
                  {counts.users}
                </h1>
              </div>
              <span className="icon widget-icon text-green-500">
                <FaUsers size="40" />
              </span>
            </div>
          </div>
        </div>

        <div className="p-6 bg-white rounded-sm shadow-md">
          <div className="card-content">
            <div className="flex items-center justify-between">
              <div className="widget-label">
                <h3 className='text-3xl text-gray-600'>
                  Coachs
                </h3>
                <h1 className='text-3xl'>
                  {counts.coachs}
                </h1>
              </div>
              <span className="icon widget-icon text-blue-500">
                <FaUsers size="40" />
              </span>
            </div>
          </div>
        </div>

        <div className="p-6 bg-white rounded-sm shadow-md">
          <div className="card-content">
            <div className="flex items-center justify-between">
              <div className="widget-label">
                <h3 className='text-3xl text-gray-600'>
                  Courses
                </h3>
                <h1 className='text-3xl'>
                  {counts.courses}
                </h1>
              </div>
              <span className="icon widget-icon text-red-500">
                <FaFileVideo size="40" />
              </span>
            </div>
          </div>
        </div>

      </div>

      <div className='mt-24'>
        <div className='text-center my-6 py-2 rounded-sm bg-primary-500 text-slate-50'>Top courses</div>
        <div className="overflow-x-auto relative shadow-md rounded-sm">
          <table className="w-full text-sm rounded-sm text-left text-gray-500 dark:text-gray-400">
            <thead className="text-gray-700 text-xs uppercase bg-gray-200 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="py-2 px-4 min-w-[120px]">
                </th>
                <th scope="col" className="py-2 px-4">
                  Label
                </th>
                <th scope="col" className="py-2 px-4">
                  Description
                </th>
                <th scope="col" className="py-2 px-4">
                  Participants
                </th>
                <th scope="col" className="py-2 px-4">
                  Started at
                </th>
                <th scope="col" className="py-2 px-4">
                  Level
                </th>
                <th scope="col" className="py-2 px-4">
                  Private
                </th>
              </tr>
            </thead>
            <tbody>
              {
                topCourses.length > 0 ? topCourses.map((course: any) => (
                  <tr
                    onClick={() => navigateTo(course._id)}
                    className="bg-white hover:bg-gray-100 border-b cursor-pointer">

                    <td className="py-2 px-4">
                      <img src={courseImage(course.poster)} className="h-12 mx-auto" />
                    </td>
                    <th scope="row" className="py-2 px-4 max-w-[180px] truncate font-medium text-gray-900 whitespace-nowrap dark:text-white">
                      {course.label}
                    </th>
                    <td className="py-2 px-4 max-w-[180px] truncate">
                      {course.description}
                    </td>
                    <td className="py-2 px-4">
                      {course.participants_count}
                    </td>
                    <td className="py-2 px-4">
                      {formateDate(course.date)}
                    </td>
                    <td className="py-2 px-4">
                      <CourseLevelBadge level={course.level} />
                    </td>
                    <td className="py-2 px-4">
                      {course.isPrivate ? 'Private' : 'Public'}
                    </td>
                  </tr>
                )) : (
                  <tr>
                    <td colSpan={7}>
                      <div className='w-full h-24 flex items-center justify-center text-xl'>
                        No data available
                      </div>
                    </td>
                  </tr>
                )
              }

            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default AdminHome