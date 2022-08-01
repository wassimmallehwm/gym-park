import React, { useState, useEffect, useContext, useRef } from 'react'
import { Loader, Confirmation, Button, Modal, PageTitle, DataGrid } from '../../../../shared/components';
import moment from 'moment';
// import NoData from '../NoData';
import { AuthContext } from '../../../../contexts/auth/AuthContext';
import { FaEdit, FaPlus, FaTrash } from 'react-icons/fa';
import UserForm from '../user-form/UserForm';
import { UsersService } from '../users.service';

const Users = () => {
    const { user } = useContext(AuthContext)
    const usersService = new UsersService();

    const initUser = {
        email: "",
        firstname: "",
        lastname: "",
        roles: [],
        phone: "",
        sex: "",
        birthdate: "",
        _id: ""
    }

    const [loading, setLoading] = useState<any>(false);
    const [tableKey, setTableKey] = useState<any>(false);
    const [usersList, setUsersList] = useState<any>(null);
    const [rolesList, setRolesList] = useState<any>(null);
    const [editUser, setEditUser] = useState<any>(initUser);
    const [deleteUser, setDeleteUser] = useState<any>();
    const [editUserModal, setEditUserModal] = useState<any>(false);
    const [deleteUserModal, setDeleteUserModal] = useState<any>(false);
    const [password, setPassword] = useState<any>('');
    const [passwordCheck, setPasswordCheck] = useState<any>('');
    const [mode, setMode] = useState<any>('add');
    const [dataLoading, setDataLoading] = useState<boolean>(false);
    const [totalRecords, setTotalRecords] = useState(0);
    const [dataState, setDataState] = useState({
        filters: null,
        first: 0,
        page: 1,
        limit: 10,
        sortField: null,
        sortOrder: null
    })
    const [search, setSearch] = useState<string>('')

    const getUsers = () => {
        setDataLoading(true)
        user && usersService.list({ ...dataState, search }).then(
            (res: any) => {
                setUsersList(res.data.docs)
                setTotalRecords(res.data.total)
                setDataLoading(false)
            },
            error => {
                console.log(error);
                setDataLoading(false)
            }
        )
    }

    const getOneUser = (id: string) => {
        user && usersService.findOne(id).then(
            (res: any) => {
                setEditUser(res.data);
                openAddModal()
            },
            error => {
                console.log(error);
            }
        )
    }

    const removeUserAccount = () => {
        user && usersService.removeUser(deleteUser._id).then(
            (res) => {
                getUsers()
                closeDeleteModal()
                // Toast("SUCCESS", "User deleted successfully");
            },
            error => {
                console.log(error);
                // Toast("ERROR", "Error deleting user !");
            }
        )
    }
    const getRoles = () => {
        user && usersService.findRoles().then(
            (res) => {
                setRolesList(res.data)
            },
            error => {
                console.log(error);
            }
        )
    }

    useEffect(() => {
        getUsers();
    }, [dataState, search]);

    useEffect(() => {
        getRoles();
    }, []);

    const addOrEditUser = () => {
        setLoading(true);
        let userData = null
        if (mode === 'add') {
            userData = { ...editUser, password, passwordCheck }
        } else {
            userData = editUser
        }
        user && usersService.addOrUpdateUser(mode, userData).then(
            (res) => {
                setLoading(false);
                getUsers()
                closeAddModal();
                // Toast("SUCCESS", "User details saved successfully");
            },
            error => {
                console.log(error);
                setLoading(false);
                // Toast("ERROR", "Error saving user details !");
            }
        )
    }

    const formatDate = (date: any) => {
        return moment(date).format("DD/MM/YYYY HH:mm")
    }

    const openAddModal = () => {
        setEditUserModal(true)
    }

    const closeAddModal = () => {
        setMode('add')
        setEditUserModal(false)
        setEditUser(initUser)
    }

    const openEditModal = (data: any) => {
        setMode('edit')
        //setEditUser(data)
        getOneUser(data._id)
    }

    const openDeleteModal = (data: any) => {
        setDeleteUser(data)
        setDeleteUserModal(true);
    }

    const closeDeleteModal = () => {
        setDeleteUserModal(false);
        setDeleteUser(null)
    }

    const onEditUserChange = (e: any) => {
        setEditUser({ ...editUser, [e.target.name]: e.target.value })
    }

    const onChangeRole = (role: string) => {
        if(editUser.roles.find((elem:any) => elem.label === role) != undefined){
            setEditUser((prev: any) => ({...prev, roles: prev.roles.filter((elem:any) => elem.label != role)}))
        } else {
            const addRole = rolesList.find((elem:any) => elem.label === role)
            setEditUser((prev: any) => ({...prev, roles: [...prev.roles, addRole]}))
        }
    }

    const addUserModal = (
        <Modal title='Add user' color="primary" open={editUserModal} confirm={addOrEditUser} cancel={closeAddModal} footerBtns >
            <UserForm rolesList={rolesList} onChangeRole={onChangeRole} userData={editUser} onChange={onEditUserChange} />
        </Modal>
    );

    const deleteModal = (
        <Confirmation open={deleteUserModal} confirm={removeUserAccount}
            cancel={closeDeleteModal} color="secondary" text={`Are you sure you want to delete the user ?`} />
    );

    const isAdmin = (roles: any) => {
        const admin = roles.find((elem: any) => elem.label === 'ADMIN');
        return admin != null;
    }

    const dateRender = (data: any) => {
        return formatDate(data.createdAt)
    }

    const rolesRender = (data: any) => {
        return data.roles.map(function (elem: any) {
            return elem.label;
        }).join(",");
    }

    const nameRender = (data: any) => {
        return `${data.firstname} ${data.lastname}`
    }

    const actionRender = (data: any) => {
        return isAdmin(data.roles) ? null
            :
            (
                <>
                    <Button rounded onClick={() => openEditModal(data)} color="primary">
                        <FaEdit size="14px" />
                    </Button>
                    <Button rounded onClick={() => openDeleteModal(data)} color="secondary">
                        <FaTrash size="14px" />
                    </Button>
                </>
            )

    }

    const primeColumns = [
        { field: 'firstname', header: 'Name', body: nameRender, filter: true, sortable: true },
        { field: 'roles', header: 'Roles', body: rolesRender, filter: true, sortable: true },
        { field: 'createdAt', header: 'Created at', body: dateRender, sortable: true },
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
                list={usersList}
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
            {addUserModal}
            {deleteModal}
            <PageTitle color="primary">Users</PageTitle>
            <div className="flex justify-between items-center my-2">
                <input type="text" autoComplete='off' name="code" placeholder='Search'
                    onChange={(e: any) => setSearch(e.target.value)} value={search}
                    className="w-1/2 h-full p-2 border border-gray-300 rounded mt-1" />
                <Button rounded title="Ajouter" onClick={openAddModal} outline color="secondary">
                    <FaPlus size="14px" />
                </Button>
            </div>
            {usersList ? dataTable : (<Loader />)}
        </div>
    )
}

export default Users
