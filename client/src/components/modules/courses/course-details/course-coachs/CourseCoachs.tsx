import React from 'react'
import { userImage } from '../../../../../utils/filePath'

interface CoursecoachsProps {
  course: any
  setCourse: any
}

const CourseCoachs = ({
  course,
  setCourse
}: CoursecoachsProps) => {
  return (
    <div className='grid xs:grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 mt-4' >
      {
        course && course.coachs.map((coach: any) => (
          <div key={coach._id} className='flex flex-col items-center justify-around h-full w-full aspect-1 cursor-pointer hover:shadow-lg'>
            <img src={userImage(coach.imagePath)} />
            <div className='p-2'>
              <h6 className='text-2xl text-center'> {coach.firstname} {coach.lastname} </h6>
            </div>
          </div>
        ))
      }
    </div>
  )
}

export default CourseCoachs