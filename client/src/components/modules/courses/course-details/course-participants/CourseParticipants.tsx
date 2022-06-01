import React from 'react'
import { Button } from '../../../../../shared/components'
import { userImage } from '../../../../../utils/filePath'

interface CourseParticipantsProps {
  course: any
  setCourse: any
}

const CourseParticipants = ({
  course,
  setCourse
}: CourseParticipantsProps) => {
  return (
    <div className='grid xs:grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 mt-4' >
      {
        course && course.participants.map((participant: any) => (
          <div key={participant._id} className='flex flex-col items-center justify-around h-full w-full aspect-1 cursor-pointer hover:shadow-lg'>
            <img src={userImage(participant.imagePath)} />
            <div className='p-2'>
              <h6 className='text-2xl text-center'> {participant.firstname} {participant.lastname} </h6>
            </div>
            <Button color='secondary' outline onClick={() => {}}>
              Remove
            </Button>
          </div>
        ))
      }
    </div>
  )
}

export default CourseParticipants