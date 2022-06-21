import React, { useEffect, useState } from 'react'
import { FaEdit, FaPlus, FaTrash } from 'react-icons/fa';
import { Button, Confirmation, DataGrid, Loader, Modal, PageTitle } from '../../../../shared/components';
import { formateDate } from '../../../../utils/dateFormat';
import ChannelsForm from '../channels-form/ChannelsForm';
import { ChannelsService } from '../channels.service';

const ChannelsList = () => {
  const channelsService = new ChannelsService();

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
        openAddModal()
      },
      error => {
        console.log(error);
      }
    )
  }

  const removeChannelAccount = () => {
    channelsService.remove(deleteChannel._id).then(
      (res) => {
        getChannels()
        closeDeleteModal()
        // Toast("SUCCESS", "Channel deleted successfully");
      },
      error => {
        console.log(error);
        // Toast("ERROR", "Error deleting Channel !");
      }
    )
  }

  useEffect(() => {
    getChannels();
  }, [dataState, search]);


  const addOrEditChannel = async () => {
    setLoading(true);
    try {
      const { data } = await channelsService.addOrUpdate(mode, channel)
      setLoading(false);
      getChannels()
      closeAddModal();
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
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
    //setEditChannel(data)
    getOneChannel(data._id)
  }

  const openDeleteModal = (data: any) => {
    setDeleteChannel(data)
    setDeleteChannelModal(true);
  }

  const closeDeleteModal = () => {
    setDeleteChannelModal(false);
    setDeleteChannel(null)
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

  const deleteModal = (
    <Confirmation open={deleteChannelModal} confirm={removeChannelAccount}
      cancel={closeDeleteModal} color="secondary" text={`Are you sure you want to delete the Channel ?`} />
  );


  const dateRender = (data: any) => {
    return formateDate(data.createdAt)
  }

  const isPrivateRender = (data: any) => {
    if(data.isPrivate){
      return <p className='bg-secondary-600 text-xs text-white text-center py-1 px-2 rounded-lg w-min mx-auto'>Private</p>
    } else {
      return <p className='bg-primary-600 text-xs text-white text-center py-1 px-2 rounded-lg w-min mx-auto'>Public</p>
    }
  }

  const actionRender = (data: any) => (
    <>
      <Button rounded onClick={() => openEditModal(data)} color="primary">
        <FaEdit size="14px" />
      </Button>
      <Button rounded onClick={() => openDeleteModal(data)} color="secondary">
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