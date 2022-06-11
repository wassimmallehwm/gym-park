import React, { useState } from 'react'
import { FaArrowLeft, FaEdit, FaEllipsisV, FaPlus, FaTrash } from 'react-icons/fa'
import { useNavigate } from 'react-router-dom'
import { Button, Confirmation, DataGrid, Grid, Modal, ProgressBar } from '../../../../../shared/components'
import { compressfile } from '../../../../../utils/compressFile'
import { formateDateTime } from '../../../../../utils/dateFormat'
import { courseContentFile } from '../../../../../utils/filePath'
import { CoursesService } from '../../courses.service'
import CourseMedia from './course-media/CourseMedia'

interface CourseContentProps {
  course: any
  setCourse: any
}

const CourseContent = ({
  course,
  setCourse
}: CourseContentProps) => {

  const initMedia = {
    label: "",
    path: "",
    description: "",
    poster: ""
  }

  const [courseMediaModal, setCourseMediaModal] = useState<any>(false);
  const [deleteMediaModal, setDeleteMediaModal] = useState<any>(false);
  const [media, setMedia] = useState<any>(initMedia)
  const [mode, setMode] = useState<any>('add');
  const [deleteMedia, setDeleteMedia] = useState<any>(initMedia)
  const [isProgressBar, showProgressBar] = useState<any>(false)
  const [uploadProgress, setUploadProgress] = useState<number>(0)
  const [mediaFile, setMediaFile] = useState<any>()
  const [posterFile, setPosterFile] = useState<any>()
  const navigate = useNavigate();
  const coursesService = new CoursesService();

  const openAddMediaModal = () => {
    setCourseMediaModal(true)
  }

  const openEditModal = (data: any) => {
    setMode('edit')
    setMedia(data)
    setCourseMediaModal(true)
  }
  const closeMediaModal = () => {
    setMode('add')
    setCourseMediaModal(false)
  }

  const openDeleteModal = (data: any) => {
    setDeleteMedia(data)
    setDeleteMediaModal(true);
  }

  const closeDeleteModal = () => {
    setDeleteMediaModal(false);
    setDeleteMedia(null)
  }

  const onChangeMedia = (e: any) => {
    setMedia({ ...media, [e.target.name]: e.target.value })
  }

  const uploadfilesCallback = (data: any) => {
    setUploadProgress(Math.round((100 * data.loaded) / data.total))
  }

  const onCourseSubmitSuccess = (courseData: any) => {
    setCourse(courseData)
    setMedia(initMedia)
    closeMediaModal()
    showProgressBar(false)
    setUploadProgress(0)
  }

  const onSubmitMedia = async () => {
    showProgressBar(true)
    try {

      let data: FormData = new FormData();
      data.append("label", media.label)
      data.append("description", media.description)
      data.append("path", media.path)
      data.append("poster", media.poster)
      if(mediaFile){
        data.append("mediafile", mediaFile)
      }
      if(posterFile){
        const posterFileCompressed = await compressfile(posterFile)
        data.append("posterfile", posterFileCompressed)
      }

      if(mode === 'add'){
        const result = await coursesService.addCourseMedia(course._id, data, uploadfilesCallback);
        onCourseSubmitSuccess(result.data)
      } else {
        const result = await coursesService.editCourseMedia(course._id, media._id, data, uploadfilesCallback);
        onCourseSubmitSuccess(result.data)
      }
      
    } catch (error) {
      console.log(error);
      showProgressBar(false)
      setUploadProgress(0)
      setMedia(initMedia)

    }
  }

  const removeMedia = async () => {
    try {
      console.log("COURSE BEFORE : ", course)
      const result = await coursesService.removeCourseMedia(course._id, deleteMedia)
      setCourse(result.data)
      closeDeleteModal()
    } catch (error) {
      console.log(error)
    }
  }


  const addCourseModal = (
    <Modal title='Course media' color='blue' open={courseMediaModal}
      confirm={onSubmitMedia} cancel={closeMediaModal} footerBtns showOverlay={isProgressBar}
      overlay={(<ProgressBar progress={uploadProgress} title="Uploading..." />)} >
      <CourseMedia progress={uploadProgress} onChange={onChangeMedia} courseId={course._id} media={media}
        onChangePoster={(file: File) => setPosterFile(file)}
        onChangeMedia={(file: File) => setMediaFile(file)} />
    </Modal>
  );

  const deleteModal = (
    <Confirmation open={deleteMediaModal} confirm={removeMedia}
      cancel={closeDeleteModal} color="red" text={`Are you sure you want to perform this action ?`} />
  );

  const actionRender = (data: any) => (
    <>
      <Button onClick={() => openEditModal(data)} title="Edit" rounded color="blue">
        <FaEdit size="14px" />
      </Button>
      <Button onClick={() => openDeleteModal(data._id)} title="Delete" rounded color="red">
        <FaTrash size="14px" />
      </Button>
    </>
  )

  const posterRender = (data: any) => {
    return (<img className='h-16 mx-auto' src={courseContentFile(course._id, data.poster)} />)
  }


  const columns = [
    { field: 'poster', header: 'Poster', body: posterRender },
    { field: 'label', header: 'Label' },
    { field: 'description', header: 'Description' },
    { field: 'createdAt', header: 'Created at', body: (data: any) => formateDateTime(data.createdAt) },
    { field: '_id', header: 'Action', body: actionRender, style: { "textAlign": 'center' }, headerStyle: { "textAlign": 'center' } }
  ];

  return (
    <div className='flex flex-col gap-4'>
      {addCourseModal}
      {deleteModal}
      <div className='flex justify-end items-center'>
        <Button onClick={() => navigate(-1)} rounded title="Return" outline color="red">
          <FaArrowLeft size="14px" />
        </Button>
        <Button onClick={openAddMediaModal} rounded title="Add" outline color="blue">
          <FaPlus size="14px" />
        </Button>
      </div>
      {
        course && course.content && <DataGrid paginated={false} list={course.content} columns={columns} totalRecords={course.content.length} />
      }
    </div>
  )
}

export default CourseContent