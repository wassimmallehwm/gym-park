import React, { useState, useEffect, useContext, useRef } from 'react'
import { Loader, Confirmation, Button, Modal, PageTitle, DataGrid } from '../../../../shared/components';
import moment from 'moment';
// import NoData from '../NoData';
import { AuthContext } from '../../../../contexts/auth/AuthContext';
import { FaEdit, FaList, FaPlus, FaTrash, FaVideo } from 'react-icons/fa';
import CourseForm from '../course-form/CourseForm';
import { CoursesService } from '../courses.service';
import { AxiosResponse } from 'axios';
import { courseImage } from '../../../../utils/filePath';
import { formateDate, formateDateTime } from '../../../../utils/dateFormat';
import { useNavigate } from 'react-router-dom';

const Courses = () => {
    const { user } = useContext(AuthContext)
    const coursesService = new CoursesService();
    const navigate = useNavigate();

    const initCourse = {
        label: "",
        description: "",
        level: "",
        poster: "",
        date: "",
        _id: ""
    }

    const [loading, setLoading] = useState<any>(false);
    const [coursesList, setCoursesList] = useState<any>(null);
    const [editCourse, setEditCourse] = useState<any>(initCourse);
    const [deleteCourse, setDeleteCourse] = useState<any>();
    const [editCourseModal, setEditCourseModal] = useState<any>(false);
    const [deleteCourseModal, setDeleteCourseModal] = useState<any>(false);
    const [password, setPassword] = useState<any>('');
    const [passwordCheck, setPasswordCheck] = useState<any>('');
    const [mode, setMode] = useState<any>('add');
    const [dataLoading, setDataLoading] = useState<boolean>(false);
    const [totalRecords, setTotalRecords] = useState(0);
    const [posterFile, setPosterFile] = useState<any>()
    const [dataState, setDataState] = useState({
        filters: null,
        first: 0,
        page: 1,
        limit: 10,
        sortField: null,
        sortOrder: null
    })
    const [search, setSearch] = useState<string>('')

    const getCourses = () => {
        setDataLoading(true)
        user && coursesService.list({ ...dataState, search }).then(
            (res: any) => {
                setCoursesList(res.data.docs)
                setTotalRecords(res.data.total)
                setDataLoading(false)
            },
            error => {
                console.log(error);
                setDataLoading(false)
            }
        )
    }


    const getOneCourse = (id: string) => {
        user && coursesService.findOne(id).then(
            (res: any) => {
                setEditCourse(res.data);
                openAddModal()
            },
            error => {
                console.log(error);
            }
        )
    }

    const removeCourseAccount = () => {
        user && coursesService.removeCourse(deleteCourse._id).then(
            (res) => {
                getCourses()
                closeDeleteModal()
                // Toast("SUCCESS", "Course deleted successfully");
            },
            error => {
                console.log(error);
                // Toast("ERROR", "Error deleting Course !");
            }
        )
    }

    useEffect(() => {
        getCourses();
    }, [dataState, search]);

    const addOrEditCourse = () => {
        setLoading(true);
        let courseData: FormData = new FormData()
        if (mode === 'add') {
            courseData.append("poster", posterFile);
            courseData.append("label", editCourse.label);
            courseData.append("description", editCourse.description);
            courseData.append("date", editCourse.date);
        } else {
            courseData = editCourse
        }
        user && coursesService.addOrUpdateCourse(mode, courseData).then(
            (res) => {
                setLoading(false);
                getCourses()
                closeAddModal();
                // Toast("SUCCESS", "Course details saved successfully");
            },
            error => {
                console.log(error);
                setLoading(false);
                // Toast("ERROR", "Error saving Course details !");
            }
        )
    }


    const openAddModal = () => {
        setEditCourseModal(true)
    }

    const closeAddModal = () => {
        setMode('add')
        setEditCourseModal(false)
        setEditCourse(initCourse)
    }

    const openEditModal = (data: any) => {
        setMode('edit')
        //setEditCourse(data)
        getOneCourse(data._id)
    }

    const openDeleteModal = (data: any) => {
        setDeleteCourse(data)
        setDeleteCourseModal(true);
    }

    const closeDeleteModal = () => {
        setDeleteCourseModal(false);
        setDeleteCourse(null)
    }

    const onEditCourseChange = (e: any) => {
        setEditCourse({ ...editCourse, [e.target.name]: e.target.value })
    }

    const onChangeFile = (file: File) => {
        setPosterFile(file)
    }

    const addCourseModal = (
        <Modal title='Add Course' color='primary' open={editCourseModal} confirm={addOrEditCourse} cancel={closeAddModal} footerBtns >
            <CourseForm onChangeFile={onChangeFile} courseData={editCourse} onChange={onEditCourseChange} />
        </Modal>
    );

    const deleteModal = (
        <Confirmation open={deleteCourseModal} confirm={removeCourseAccount}
            cancel={closeDeleteModal} color="secondary" text={`Are you sure you want to delete the Course ?`} />
    );

    const dateRender = (data: any) => {
        return formateDate(data.createdAt)
    }

    const dateTimeRender = (data: any) => {
        return formateDateTime(data.createdAt)
    }

    const posterRender = (data: any) => {
        return (<img className='h-16 mx-auto' src={courseImage(data.poster)} />)
    }


    const actionRender = (data: any) => (
        <>
            <Button title="Edit" rounded onClick={() => openEditModal(data)} color="primary">
                <FaEdit size="14px" />
            </Button>
            <Button title="Content" rounded onClick={() => navigate(`/courses/${data._id}`)} color="primary">
                <FaList size="14px" />
            </Button>
            <Button title="Delete" rounded onClick={() => openDeleteModal(data)} color="secondary">
                <FaTrash size="14px" />
            </Button>
        </>
    )


    const primeColumns = [
        { field: 'poster', header: 'Poster', body: posterRender, filter: true, sortable: true },
        { field: 'label', header: 'Label', filter: true, sortable: true },
        { field: 'date', header: 'Start date', body: dateRender, sortable: true },
        { field: 'createdAt', header: 'Created at', body: dateTimeRender, sortable: true },
        { field: '_id', header: 'Action', body: actionRender, style: { "textAlign": 'center' }, headerStyle: { "textAlign": 'center' } }
    ];

    const onPage = (event: any) => {
        console.log(event)
        setDataState({
            ...dataState,
            page: event.page + 1,
            limit: event.rows,
            first: event.first
        })
    }


    const dataTable = (
        <div className="card">
            <DataGrid
                columns={primeColumns}
                list={coursesList}
                sortField={dataState.sortField}
                sortOrder={dataState.sortOrder}
                onSort={(data: any) => setDataState({ ...dataState, sortField: data.sortField, sortOrder: data.sortOrder })}
                loading={dataLoading}
                onFilter={(e: any) => console.log("FILTER EVENT : ", e)}
                first={dataState.first}
                limit={dataState.limit}
                onPage={onPage}
                totalRecords={totalRecords}
            />
        </div>
    )

    return (
        <div className="main-div">
            {addCourseModal}
            {deleteModal}
            <PageTitle color='primary'>Courses</PageTitle>
            <div className="flex justify-between items-center my-2">
                <input type="text" autoComplete='off' name="code" placeholder='Search'
                    onChange={(e: any) => setSearch(e.target.value)} value={search}
                    className="w-1/2 h-full p-2 border border-gray-300 rounded mt-1" />
                <Button rounded title="Add" onClick={openAddModal} outline color="secondary">
                    <FaPlus size="14px" />
                </Button>
            </div>
            {coursesList ? dataTable : (<Loader />)}
        </div>
    )
}

export default Courses
