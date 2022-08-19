import { Button, DataGrid, Loader, Modal, PageTitle } from '../../../../../shared/components';
import React, { useEffect, useState } from 'react'
import { FaCheck, FaTimes } from 'react-icons/fa';
import { formateDateTime } from 'src/utils/dateFormat';
import { SubscriptionsService } from '../../services/subscription.service';
import { showToast } from 'src/utils';
import { setCommentRange } from 'typescript';

const SubscriptionList = () => {
    const [subsList, setSubsList] = useState<any>(null);
    const [dataLoading, setDataLoading] = useState<boolean>(false);
    const [rejectionModal, setRejectionModal] = useState<boolean>(false);
    const [rejectionRequest, setRejectionRequest] = useState<string | null>();
    const [comment, setComment] = useState<string>('')
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

    const subsService = new SubscriptionsService()

    const getSubs = () => {
        setDataLoading(true)
        subsService.list({ ...dataState, search }).then(
            (res: any) => {
                setSubsList(res.data.docs)
                setTotalRecords(res.data.total)
                setDataLoading(false)
            },
            error => {
                console.log(error);
                setDataLoading(false)
            }
        )
    }

    const onApprove = async (id: string) => {
        try {
            await subsService.approve(id)
            getSubs()
            showToast('success', 'Subscription approved successfully')
        } catch (e: any) {
            showToast('error', 'Error approving subscription')
        }
    }

    const openRejectionModal = (id: string) => {
        setRejectionRequest(id)
        setRejectionModal(true)
    }

    const closeRejectionModal = () => {
        setRejectionRequest(null)
        setRejectionModal(false)
    }

    const onReject = async () => {
        try {
            await subsService.reject(rejectionRequest!, comment)
            getSubs()
            closeRejectionModal()
            showToast('success', 'Subscription rejected successfully')
        } catch (e: any) {
            showToast('error', 'Error rejecting subscription')
        }
    }

    const _rejectionModal = (
        <Modal title='Reject request' color="primary" open={rejectionModal} confirm={onReject} cancel={closeRejectionModal} footerBtns >
            <form action="" className="space-y-6">
                <div>
                    <label className="text-sm font-bold text-gray-600 block">
                        Comment
                    </label>
                    <textarea name="comment" value={comment} onChange={(e: any) => setComment(e.target.value)}
                        className="w-full p-2 border border-gray-300 rounded mt-1">
                    </textarea>
                </div>
            </form>
        </Modal>
    );


    useEffect(() => {
        getSubs();
    }, [dataState, search]);

    const actionRender = (data: any) => {
        return !data.isTreated ? (
            <>
                <Button title="Edit" rounded onClick={() => onApprove(data._id)} color="primary">
                    <FaCheck size="14px" />
                </Button>
                <Button title="Delete" rounded onClick={() => openRejectionModal(data._id)} color="secondary">
                    <FaTimes size="14px" />
                </Button>
            </>
        ) : null
    }

    const approvedRenderer = (data: any) => {
        return data.approved ?
            <span className='w-full flex justify-center text-primary-500'>
                <FaCheck />
            </span> :
            <span className='w-full flex justify-center text-secondary-500'>
                <FaTimes />
            </span>
    }


    const primeColumns = [
        { field: 'user', header: 'User', body: (data: any) => `${data.user.firstname} ${data.user.lastname}`, filter: false, sortable: false },
        { field: 'course', header: 'Course', body: (data: any) => data.course.label, filter: false, sortable: false },
        { field: 'createdAt', header: 'Created at', body: (data: any) => formateDateTime(data.createdAt), sortable: true },
        { field: 'approved', header: 'Approved', body: approvedRenderer, filter: false, sortable: false },
        { field: 'comment', header: 'Comment', filter: false, sortable: false },
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
                list={subsList}
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
            {_rejectionModal}
            <PageTitle color="primary">Subscriptions</PageTitle>
            <div className="flex justify-between items-center my-2">
                <input type="text" autoComplete='off' name="code" placeholder='Search'
                    onChange={(e: any) => setSearch(e.target.value)} value={search}
                    className="w-1/2 h-full p-2 border border-gray-300 rounded mt-1" />
            </div>
            {subsList ? dataTable : (<Loader />)}
        </div>
    )
}

export default SubscriptionList