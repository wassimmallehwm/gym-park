import React, { Fragment, useContext, useEffect, useState } from 'react'
import { Menu, Transition } from '@headlessui/react'
import { FaBell } from 'react-icons/fa'
import { NotificationsService } from 'src/components/modules/notifications/services/notification.service'
import { Notification } from '../../../../shared/components'
import { SocketContext } from 'src/contexts/socket/SocketContext'
import { showNotif } from 'src/utils'

const Notifications = () => {
    const { socket } = useContext(SocketContext)
    const notificationsService = new NotificationsService()
    const [list, setList] = useState<any[]>([])
    const [notifCount, setNotifCount] = useState<number>(0)

    const getTopFiveNotifs = () => {
        notificationsService.findTopFive().then(
            (res: any) => setList(res.data)
        )
    }

    const countNotifs = () => {
        notificationsService.count().then(
            (res: any) => setNotifCount(res.data)
        )
    }

    const readAll = () => {
        if(notifCount != 0){
            setNotifCount(0)
        }
    }

    const readNotif = async (notif: any) => {
        if(!notif.read){
            try{
                await notificationsService.read(notif._id)
                setList(prev => prev.map((elem: any) => {
                    if(elem._id == notif._id){
                        return {
                            ...elem,
                            read: true
                        }
                    }
                    return elem
                }))
            } catch(e: any){
                console.error(e)
            }
        }
    }

    useEffect(() => {
        countNotifs()
        getTopFiveNotifs()
    }, [])

    useEffect(() => {
        socket?.on('notif', data => {
            setNotifCount(prev => prev + 1)
            showNotif(<Notification notif={data} />)
            setList(prev => [data, ...prev])
        })


        return () => {
            socket?.off('notif')
        }
    }, [socket])

    return (
        <Menu as="div" className="ml-3 relative">
            <div>
                <Menu.Button onClick={() => readAll()} className="max-w-xs bg-transparent rounded-full flex items-center text-sm focus:outline-none focus:ring-0">
                    <span className="sr-only">Notifications</span>
                    <FaBell size="18" className='text-white' />
                    {
                        notifCount > 0 && (
                            <span className="absolute -top-1/2 left-[60%] p-1 leading-none text-center text-xs whitespace-nowrap align-baseline font-bold bg-red-600 text-white rounded">
                                {notifCount}
                            </span>
                        )
                    }
                </Menu.Button>
            </div>
            <Transition
                as={Fragment}
                enter="transition ease-out duration-100"
                enterFrom="transform opacity-0 scale-95"
                enterTo="transform opacity-100 scale-100"
                leave="transition ease-in duration-75"
                leaveFrom="transform opacity-100 scale-100"
                leaveTo="transform opacity-0 scale-95"
            >
                <Menu.Items className="origin-top-right z-10 absolute right-0 mt-2 w-80 rounded-md shadow-lg bg-white ring-0 focus:outline-none">
                    {
                        list.length > 0 ? 
                        list.map((item) => (
                            <Menu.Item key={item._id} as="div" onClick={() => readNotif(item)} >
                                <Notification notif={item} active={!item.read} />
                            </Menu.Item>
                        )) : (
                            <p>Empty</p>
                        )
                    }
                </Menu.Items>
            </Transition>
        </Menu>
    )
}

export default Notifications