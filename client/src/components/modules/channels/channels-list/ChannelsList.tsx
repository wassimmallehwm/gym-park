import React, { useEffect, useState } from 'react'
import { FaComment, FaEdit, FaPlus, FaTrash, FaUsers } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { Button, Confirmation, DataGrid, Loader, Modal, PageTitle } from '../../../../shared/components';
import { AutoComplete } from '../../../../shared/components/form';
import { showToast } from '../../../../utils';
import { formateDate } from '../../../../utils/dateFormat';
import { userImage } from '../../../../utils/filePath';
import { UsersService } from '../../users/users.service';
import ChannelsForm from '../channel-form/ChannelsForm';
import { ChannelsService } from '../services/channels.service';

const ChannelsList = () => {
  const channelsService = new ChannelsService();
  const usersService = new UsersService();

  const initChannel = {
    label: "",
    description: "",
    isPrivate: false
  }

  const [loading, setLoading] = useState<any>(false);
  const [channels, setChannels] = useState<any>(null);
  const [channel, setChannel] = useState<any>(initChannel);
  const [deleteChannel, setDeleteChannel] = useState<any>();
  const [editChannelModal, setEditChannelModal] = useState<any>(false);
  const [deleteChannelModal, setDeleteChannelModal] = useState<any>(false);
  const [membersModal, setMembersModal] = useState<any>(false);

  const [searchQuery, setSearchQuery] = useState<string>('');
  const [usersList, setUsersList] = useState<any[]>([]);
  const [membersList, setMembersList] = useState<any[]>([]);
  const [selectedUser, setSelectedUser] = useState<any>();

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
  const navigate = useNavigate();

  const getChannels = () => {
    setDataLoading(true)
    channelsService.list({ ...dataState, search }).then(
      (res: any) => {
        setChannels(res.data.docs)
        setTotalRecords(res.data.total)
        setDataLoading(false)
      },
      error => {
        console.log(error);
        setDataLoading(false)
      }
    )
  }

  const getOneChannel = (id: string) => {
    channelsService.findOne(id).then(
      (res: any) => {
        setChannel(res.data);
      },
      error => {
        console.log(error);
      }
    )
  }

  const removeChannel = () => {
    channelsService.remove(deleteChannel._id).then(
      (res) => {
        getChannels()
        closeDeleteModal()
        showToast('success', 'Channel deleted successfully')
      },
      error => {
        console.log(error);
        showToast('error', 'Error deleting Channel')
      }
    )
  }

  useEffect(() => {
    getChannels();
  }, [dataState, search]);


  const addOrEditChannel = async () => {
    setLoading(true);
    try {
      await channelsService.addOrUpdate(mode, channel)
      setLoading(false);
      getChannels()
      closeAddModal();
      showToast('success', 'Channel saved successfully')
    } catch (error) {
      console.log(error);
      setLoading(false);
      showToast('error', 'Error saving Channel')
    }
  }

  const onMembersSearch = (event: any) => {
    const q = event.target.value
    usersService.search(q, '').then(
      (res: any) => {
        console.log(res.data)
        setUsersList(res.data.filter((elem: any) => !channel.members.find((item: any) => elem._id === item._id)))
      },
      error => console.log(error)
    )
  }

  const addMembers = async () => {
    setLoading(true);
    try {
      let membersId = membersList.map((elem: any) => elem._id)
      await channelsService.addMembers(channel._id, membersId)
      setLoading(false);
      setMembersList([])
      closeMembersModal()
      showToast('success', 'Channel saved successfully')
    } catch (error) {
      console.log(error);
      setLoading(false);
      showToast('error', 'Error saving Channel')
    }
  }

  const onMemberSelect = (selected: any) => {
    setMembersList([...membersList, selected])
    setSearchQuery('')
    //setSelectedUser(selected)
  }

  const openAddModal = () => {
    setEditChannelModal(true)
  }

  const closeAddModal = () => {
    setMode('add')
    setEditChannelModal(false)
    setChannel(initChannel)
  }

  const openEditModal = (data: any) => {
    setMode('edit')
    getOneChannel(data._id)
    setEditChannelModal(true)
  }

  const openDeleteModal = (data: any) => {
    setDeleteChannel(data)
    setDeleteChannelModal(true);
  }

  const closeDeleteModal = () => {
    setDeleteChannelModal(false);
    setDeleteChannel(null)
  }


  const openMembersModal = (channelId: string) => {
    getOneChannel(channelId)
    setMembersModal(true);
  }

  const closeMembersModal = () => {
    setMembersModal(false);
    setChannel(initChannel)
  }

  const onChannelChange = (e: any) => {
    if (e.target.name == "isPrivate") {
      setChannel((prev: any) => ({
        ...prev,
        isPrivate: !prev.isPrivate
      }))
    } else {
      setChannel({ ...channel, [e.target.name]: e.target.value })
    }
  }

  const addChannelModal = (
    <Modal title='Add Channel' color="primary" open={editChannelModal} confirm={addOrEditChannel} cancel={closeAddModal} footerBtns >
      <ChannelsForm channel={channel} onChange={onChannelChange} />
    </Modal>
  );

  const channelMembersModal = (
    <Modal title='Members' color="primary" open={membersModal} confirm={addMembers} cancel={closeMembersModal} footerBtns >
      Members
      <div className='h-full min-h-[300px]'>
        <AutoComplete
          onChangeValue={onMemberSelect}
          onChangeQuery={onMembersSearch}
          options={usersList}
          selected={selectedUser}
          resetSelected={() => setSearchQuery('')}
          displayValue={(option: any) => option ? `${option?.firstname} ${option?.lastname}` : ''}
          placeholder="Add a member"
        />
        {/* <div>
          {
            membersList.map((member: any) => (
              <img key={member._id} className='w-12 h-12 rounded-full mx-2 shadow-md' src={userImage(member?.imagePath)} />
            ))
          }
        </div> */}
        {
          membersList.length > 0 && (
            <div className='p-4 shadow-md rounded-md'>
              <span className='text-lg'>New members</span>
              <div className='flex gap-2 flex-wrap py-4'>
                {
                  membersList.map((member: any) => (
                    <div className='group w-12 h-12 rounded-full mx-2 shadow-md'>
                      <img key={member._id} className='w-12 h-12 rounded-full shadow-md' src={userImage(member?.imagePath)} />
                      <p className='group-hover:block hidden w-max -ml-8 mt-1 text-sm bg-gray-700 text-white p-2 rounded-md'>
                        {member.firstname} {member.lastname}
                      </p>
                    </div>
                  ))
                }
              </div>
            </div>
          )
        }

        <div className='p-4 shadow-md rounded-md'>
          <span className='text-lg'>Current members</span>
          <div className='flex gap-2 flex-wrap py-4'>
            {
              channel.members?.map((member: any) => (
                <div className='group w-12 h-12 rounded-full mx-2 shadow-md'>
                  <img key={member._id} className='w-12 h-12 rounded-full shadow-md' src={userImage(member?.imagePath)} />
                  <p className='group-hover:block hidden w-max -ml-8 mt-1 text-sm bg-gray-700 text-white p-2 rounded-md'>
                    {member.firstname} {member.lastname}
                  </p>
                </div>
              ))
            }
          </div>
        </div>
      </div>
    </Modal>
  );

  const deleteModal = (
    <Confirmation open={deleteChannelModal} confirm={removeChannel}
      cancel={closeDeleteModal} color="secondary" text={`Are you sure you want to delete the Channel ?`} />
  );


  const dateRender = (data: any) => {
    return formateDate(data.createdAt)
  }

  const isPrivateRender = (data: any) => {
    if (data.isPrivate) {
      return <p className='bg-secondary-600 text-xs text-white text-center py-1 px-2 rounded-lg w-min mx-auto'>Private</p>
    } else {
      return <p className='bg-primary-600 text-xs text-white text-center py-1 px-2 rounded-lg w-min mx-auto'>Public</p>
    }
  }

  const actionRender = (data: any) => (
    <>
      <Button rounded title="Edit" onClick={() => openEditModal(data)} color="primary">
        <FaEdit size="14px" />
      </Button>
      {
        data.isPrivate && (
          <Button rounded title="Members" onClick={() => openMembersModal(data._id)} color="primary">
            <FaUsers size="14px" />
          </Button>
        )
      }
      <Button rounded title="Messages" onClick={() => navigate(`/channels/${data._id}`)} color="primary">
        <FaComment size="14px" />
      </Button>
      <Button rounded title="Delete" onClick={() => openDeleteModal(data)} color="secondary">
        <FaTrash size="14px" />
      </Button>
    </>
  )

  const primeColumns = [
    { field: 'label', header: 'Label', filter: true, sortable: true },
    { field: 'description', header: 'Description', filter: true, sortable: true },
    { field: 'isPrivate', header: 'Private', body: isPrivateRender, filter: true, sortable: false },
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
        list={channels}
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
      {addChannelModal}
      {channelMembersModal}
      {deleteModal}
      <PageTitle color='primary'>Channels</PageTitle>
      <div className="flex justify-between items-center my-2">
        <input type="text" autoComplete='off' name="code" placeholder='Search'
          onChange={(e: any) => setSearch(e.target.value)} value={search}
          className="w-1/2 h-full p-2 border border-gray-300 rounded mt-1" />
        <Button rounded title="Add" onClick={openAddModal} outline color="secondary">
          <FaPlus size="14px" />
        </Button>
      </div>
      {channels ? dataTable : (<Loader />)}
    </div>
  )
}

export default ChannelsList