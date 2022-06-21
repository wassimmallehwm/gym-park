import React, { useEffect, useState } from 'react'
import { Button, Confirmation } from '../../../../../shared/components'
import { Input, AutoComplete } from '../../../../../shared/components/form'
import { showToast } from '../../../../../utils'
import { userImage } from '../../../../../utils/filePath'
import { CoursesService } from '../../courses.service'
import { UsersService } from '../../../users/users.service'
import { Dropdown } from 'primereact/dropdown'

interface CoursecoachsProps {
  course: any
  setCourse: any
}

const CourseCoachs = ({
  course,
  setCourse
}: CoursecoachsProps) => {
  const [deleteCoachModal, setDeleteCoachModal] = useState<boolean>(false);
  const [deleteCoach, setDeleteCoach] = useState<string | null>();
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [coachsList, setCoachsList] = useState<any[]>([]);
  const [selectedCoach, setSelectedCoach] = useState<any>();
  const coursesService = new CoursesService()
  const usersService = new UsersService()

  const openDeleteModal = (data: any) => {
    setDeleteCoach(data)
    setDeleteCoachModal(true);
  }

  const closeDeleteModal = () => {
    setDeleteCoachModal(false);
    setDeleteCoach(null)
  }

  const removeCoach = async () => {
    showToast('loading', 'Loading...')
    try {
      const result = await coursesService.removeCourseCoach(course._id, deleteCoach!)
      setCourse(result.data)
      closeDeleteModal()
      showToast('success', 'Coach removed successfully')
    } catch (error: any) {
      showToast('error', 'An error occured while removing the coach')
      console.log(error)
    }
  }

  const addCoach = async () => {
    showToast('loading', 'Loading...')
    try {
      const result = await coursesService.addCourseCoach(course._id, selectedCoach!)
      setCourse(result.data)
      setSelectedCoach(null)
      setSearchQuery('')
      showToast('success', 'Coach added successfully')
    } catch (error: any) {
      showToast('error', 'An error occured while adding the coach')
      console.log(error)
    }
  }

  const onCoachSearch = (event: any) => {
    const q = event.target.value
    usersService.search('COACH', q).then(
      (res: any) => {
        setCoachsList(res.data.filter((elem: any) => !course.coachs.find((item: any) => elem._id === item._id)))
      },
      error => console.log(error)
    )
  }

  const onCoachSelect = (selected: any) => {
    setSelectedCoach(selected)
  }

  const deleteModal = (
    <Confirmation open={deleteCoachModal} confirm={removeCoach}
      cancel={closeDeleteModal} color="secondary" text={`Are you sure you want to perform this action ?`} />
  );


  return (
    <>
      {deleteModal}
      <div className='flex items-center justify-around my-4'>
        <AutoComplete
          onChangeValue={onCoachSelect}
          onChangeQuery={onCoachSearch}
          options={coachsList}
          selected={selectedCoach}
          resetSelected={() => setSearchQuery('')}
          displayValue={(option: any) => option ? `${option?.firstname} ${option?.lastname}` : ''}
          placeholder="Find a coach"
        />
        <Button color="primary" outline onClick={addCoach}>
          Add coach
        </Button>
      </div>

      {
        course && course.coachs && course.coachs.length > 0 ? (
          <div className='grid xs:grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 mt-4'>
            {
              course.coachs.map((coach: any) => (
                <div key={coach._id} className='flex flex-col items-center justify-around h-full w-full aspect-1 cursor-pointer'>

                  <img className='hover:shadow-lg rounded-full' src={userImage(coach.imagePath)} />
                  <div className='p-2'>
                    <h6 className='text-xl text-center'>
                      {coach.firstname} {coach.lastname}
                    </h6>
                  </div>
                  <Button color="secondary" outline onClick={() => openDeleteModal(coach._id)}>
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

export default CourseCoachs