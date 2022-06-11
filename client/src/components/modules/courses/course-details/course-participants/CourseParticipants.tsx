import React, { useState } from 'react'
import { Button, Confirmation } from '../../../../../shared/components'
import { AutoComplete } from '../../../../../shared/components/form'
import { dismissAllToasts, showToast } from '../../../../../utils'
import { userImage } from '../../../../../utils/filePath'
import { UsersService } from '../../../users/users.service'
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
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [participantsList, setParticipantsList] = useState<any[]>([]);
  const [selectedParticipant, setSelectedParticipant] = useState<any>();
  const coursesService = new CoursesService()
  const usersService = new UsersService()

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
      setCourse(result.data)
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
      cancel={closeDeleteModal} color="red" text={`Are you sure you want to perform this action ?`} />
  );

  const addParticipant = async () => {
    showToast('loading', 'Loading...')
    try {
      const result = await coursesService.addCourseParticipant(course._id, selectedParticipant!)
      setCourse(result.data)
      setSelectedParticipant(null)
      setSearchQuery('')
      showToast('success', 'participant added successfully')
    } catch (error: any) {
      showToast('error', 'An error occured while adding the participant')
      console.log(error)
    }
  }

  const onParticipantSearch = (event: any) => {
    const q = event.target.value
    usersService.search('USER', q).then(
      (res: any) => {
        setParticipantsList(res.data.filter((elem: any) => !course.participants.find((item: any) => elem._id === item._id)))
      },
      error => console.log(error)
    )
  }

  const onparticipantSelect = (selected: any) => {
    setSelectedParticipant(selected)
  }

  return (
    <>
      {deleteModal}
      <div className='flex items-center justify-around my-4'>
        <AutoComplete
          onChangeValue={onparticipantSelect}
          onChangeQuery={onParticipantSearch}
          options={participantsList}
          selected={selectedParticipant}
          resetSelected={() => setSearchQuery('')}
          displayValue={(option: any) => option ? `${option?.firstname} ${option?.lastname}` : ''}
          placeholder="Find a participant"
        />
        <Button color='blue' outline onClick={addParticipant}>
          Add participant
        </Button>
      </div>
        {
        course && course.participants && course.participants.length > 0 ?(
          <div className='grid xs:grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 mt-4' >
            {
              course.participants.map((participant: any) => (
                <div key={participant._id} className='flex flex-col items-center justify-around h-full w-full aspect-1 cursor-pointer'>
    
                  <img className='hover:shadow-lg rounded-full' src={userImage(participant.imagePath)} />
                  <div className='p-2'>
                    <h6 className='text-xl text-center'>
                      {participant.firstname} {participant.lastname}
                    </h6>
                  </div>
                  <Button color='red' outline onClick={() => openDeleteModal(participant._id)}>
                    Remove
                  </Button>
                </div>
              ))
            }
          </div>
        )
          
        : (
          <div className='h-full flex justify-center items-center'>
            <span>No data to display</span>
          </div>
        )
      }
    </>
  )
}

export default CourseParticipants