import { Menu, Transition } from '@headlessui/react'
import { Button } from '../../../../../shared/components'
import React, { Fragment } from 'react'
import { FaEdit, FaEllipsisV, FaTrash } from 'react-icons/fa'
import EventsEmitter from 'src/utils/events'

interface ActionsDropdownProps {
    postId: string
    isAdmin: boolean
    isOwner: boolean
}

const ActionsDropdown = ({
    postId,
    isAdmin,
    isOwner
}: ActionsDropdownProps) => {

    //DELETE POST
    //deleteForumPost
    //SEND EVENT TO UPDATE POSTS LIST

    const onEditClick = () => {
        EventsEmitter.emit('forum-post-edit', postId)
    }

    const onDeleteClick = () => {
        EventsEmitter.emit('forum-post-delete', postId)
    }

    const list: any = [
        { 
            id: 0,
            display: isOwner,
            label: 'Edit',
            icon: FaEdit,
            color: 'primary',
            click: onEditClick 
        },
        { 
            id: 1,
            display: isAdmin || isOwner,
            label: 'Delete',
            icon: FaTrash,
            color: 'secondary',
            click: onDeleteClick 
        }
    ]
    return (
        <Menu as="div" className="ml-3 relative">
            <div>
                <Menu.Button className="max-w-xs bg-transparent rounded-full flex items-center text-sm focus:outline-none focus:ring-0">
                    <span className="sr-only">Actions</span>
                    <FaEllipsisV className='text-slate-500' size="18" />
                    {/* <Button color='slate' outline rounded>
                    </Button> */}
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
                <Menu.Items className="origin-top-right z-10 absolute right-0 mt-2 w-32 rounded-md shadow-lg bg-slate-50 border border-slate-300 ring-0 focus:outline-none">
                    {
                        list.map((item: any) => item.display &&  (
                            <Menu.Item key={item.id} as="div"
                                onClick={item.click}
                                className="p-2 cursor-pointer hover:bg-slate-100" >
                                <div className={`flex items-center text-${item.color}-500`}>
                                    <item.icon className='mx-2' />
                                    <span>
                                        {item.label}
                                    </span>
                                </div>
                            </Menu.Item>
                        ))
                    }
                </Menu.Items>
            </Transition>
        </Menu>
    )
}

export default ActionsDropdown