import React, { Fragment, useContext, useEffect } from 'react'
import { Menu, Transition } from '@headlessui/react'
import { useNavigate } from 'react-router-dom'
import { AuthContext } from '../../../contexts/auth/AuthContext'
import { FaBars, FaSignOutAlt } from 'react-icons/fa'
import { SocketContext } from 'src/contexts/socket/SocketContext'
import { showToast, showNotif } from 'src/utils'
import toast from 'react-hot-toast'
import { userImage } from 'src/utils/filePath'
import Notifications from './notifications/Notifications'

function classNames(...classes: any[]) {
    return classes.filter(Boolean).join(' ')
}

interface NavbarProps {
    toggleSidebar: any
}

const Navbar = ({
    toggleSidebar
}: NavbarProps) => {
    const { user, logout } = useContext(AuthContext)
    const navigate = useNavigate()

    const onLogout = () => {
        logout()
        navigate('/login')
    }

    const userNavigation = [
        { name: 'Your Profile', click: onLogout },
        { name: 'Settings', click: onLogout },
        { name: 'Sign out', click: onLogout },
    ]
    return (
        <header className="bg-primary-600 shadow-md h-12 flex items-center justify-center fixed w-full z-30">
            <div className="flex flex-grow items-center justify-between px-3">
                <button className="w-10 p-1"
                    onClick={toggleSidebar}
                    title="Toggle menu"
                    tabIndex={1}
                >
                    <FaBars className="text-slate-100" size="25px" />
                </button>
                <div className='flex items-center gap-4'>
                    <Notifications/>
                    <Menu as="div" className="ml-3 relative">
                        <div>
                            <Menu.Button className="max-w-xs bg-gray-800 rounded-full flex items-center text-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-slate-100">
                                <span className="sr-only">Open user menu</span>
                                <img className="h-8 w-8 rounded-full" src={userImage(user.imagePath)} alt={`${user.firstanme} ${user.lastanme}`} />
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
                            <Menu.Items className="origin-top-right z-10 absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                                {userNavigation.map((item) => (
                                    <Menu.Item key={item.name}>
                                        {({ active }) => (
                                            <a
                                                onClick={item.click}
                                                className={classNames(
                                                    active ? 'bg-gray-100' : '',
                                                    'block px-4 py-2 text-sm text-gray-700 cursor-pointer'
                                                )}
                                            >
                                                {item.name}
                                            </a>
                                        )}
                                    </Menu.Item>
                                ))}
                            </Menu.Items>
                        </Transition>
                    </Menu>
                    {/* <button className="p-1 flex items-center text-slate-100"
                        onClick={onLogout}
                        title="Sign out"
                        tabIndex={1}
                    >
                        <FaSignOutAlt className="text-slate-100 mx-1" size="25px" />
                        Sign out
                    </button> */}
                </div>

            </div>
        </header>
    )
}

export default Navbar