import React, { useContext, useState } from 'react'
import { AuthContext } from '../../contexts/auth/AuthContext'
import Navbar from './navbar/Navbar'
import Sidebar from './sidebar/Sidebar'

const Layout = ({ children }: any) => {
    const { user } = useContext(AuthContext)
    const [isSidebarOpen, openSidebar] = useState<boolean>(false)

    const toggleSidebar = () => {
        openSidebar(prev => !prev)
    }
    return user ? (
        <>
            <Navbar toggleSidebar={toggleSidebar}/>
            <Sidebar isOpen={isSidebarOpen}></Sidebar>
            {isSidebarOpen && <div onClick={() => openSidebar(false)} className='top-0 left-0 w-full h-full fixed bg-black bg-opacity-40 z-10'></div>}
            
            <main className='pt-12 p-8 bg-slate-100 min-h-screen'>
                {children}
            </main>
        </>
    ) : children
}

export default Layout
