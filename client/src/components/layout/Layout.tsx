import React, { useContext, useEffect, useState } from 'react'
import { SocketContext } from 'src/contexts/socket/SocketContext'
import { AuthContext } from '../../contexts/auth/AuthContext'
import Navbar from './navbar/Navbar'
import Sidebar from './sidebar/Sidebar'

const Layout = ({ children }: any) => {
    const { user } = useContext(AuthContext)
    const { socket, connect, disconnect } = useContext(SocketContext)
    const [isSidebarOpen, openSidebar] = useState<boolean>(false)

    useEffect(() => {
        if(user){
            disconnect()
            const user_roles = user.roles.map((elem: any) => elem.label)
            connect(user._id, user_roles)
        }

        return () => {
            disconnect()
        }
    }, [])

    const toggleSidebar = () => {
        openSidebar(prev => !prev)
    }
    return user ? (
        <>
            <Navbar toggleSidebar={toggleSidebar}/>
            <Sidebar isOpen={isSidebarOpen}></Sidebar>
            {isSidebarOpen && <div onClick={() => openSidebar(false)} className='top-0 left-0 w-full h-full fixed bg-black bg-opacity-40 z-10'></div>}
            
            <main className='pt-12 p-8 bg-slate-100 fixed w-full h-full overflow-auto'>
                {children}
            </main>
        </>
    ) : children
}

export default Layout
