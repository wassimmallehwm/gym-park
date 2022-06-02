import React, { useState } from 'react'
import { Button, Confirmation } from '../../../../../shared/components'
import { dismissAllToasts, showToast } from '../../../../../utils'
import { userImage } from '../../../../../utils/filePath'
import { CoursesService } from '../../courses.service'

interface CourseParticipantsProps {
  course: any
  setCourse: any
}

const CourseParticipants = ({
  course,
  setCourse
}: CourseParticipantsProps) => {
  const [deleteParticipantModal, setDeleteParticipantModal] = useState<boolean>(false);
  const [deleteParticipant, setDeleteParticipant] = useState<string | null>();
  const coursesService = new CoursesService()

  const openDeleteModal = (data: any) => {
    setDeleteParticipant(data)
    setDeleteParticipantModal(true);
  }

  const closeDeleteModal = () => {
    setDeleteParticipantModal(false);
    setDeleteParticipant(null)
  }

  const removeParticipant = async () => {
    showToast('loading', 'Loading...')
    try {
      const result = await coursesService.removeCourseParticipant(course._id, deleteParticipant!)
      setCourse(result)
      closeDeleteModal()
      dismissAllToasts()
      showToast('success', 'Participant removed successfully')
    } catch (error: any) {
      dismissAllToasts()
      showToast('error', 'An error occured while removing the participant')
      console.log(error)
    }
  }

  const deleteModal = (
    <Confirmation open={deleteParticipantModal} confirm={removeParticipant}
      cancel={closeDeleteModal} color="secondary" text={`Are you sure you want to perform this action ?`} />
  );

  return (
    <>
      {deleteModal}
      <div className='grid xs:grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 mt-4' >
        {
          course && course.participants && course.participants.map((participant: any) => (
            <div key={participant._id} className='flex flex-col items-center justify-around h-full w-full aspect-1 cursor-pointer hover:shadow-lg'>
              <img src={userImage(participant.imagePath)} />
              <div className='p-2'>
                <h6 className='text-2xl text-center'> {participant.firstname} {participant.lastname} </h6>
              </div>
              <Button color='secondary' outline onClick={() => openDeleteModal(participant._id)}>
                Remove
              </Button>
            </div>
          ))
        }
      </div>
    </>
  )
}

export default CourseParticipants