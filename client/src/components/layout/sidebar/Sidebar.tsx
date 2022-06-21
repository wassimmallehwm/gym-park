import React from 'react'
import { Link } from 'react-router-dom'

interface SidebarProps {
  isOpen: boolean
}

const Sidebar = ({
  isOpen
}: SidebarProps) => {
  return (
    <div className={`${isOpen ? 'translate-x-0' : '-translate-x-full'} ease-in-out duration-300 top-0 left-0 fixed h-screen w-60 pt-12 bg-slate-100 z-20`}>
      <Link to="/users">
        <li className="p-3 cursor-pointer rounded-sm flex items-center justify-between hover:bg-gray-200">
          <span className="mx-4"> Users </span>
        </li>
      </Link>
      <Link to="/courses">
        <li className="p-3 cursor-pointer rounded-sm flex items-center justify-between hover:bg-gray-200">
          <span className="mx-4"> Courses </span>
        </li>
      </Link>
      <Link to="/channels">
        <li className="p-3 cursor-pointer rounded-sm flex items-center justify-between hover:bg-gray-200">
          <span className="mx-4"> Channels </span>
        </li>
      </Link>
      <Link to="/forum">
        <li className="p-3 cursor-pointer rounded-sm flex items-center justify-between hover:bg-gray-200">
          <span className="mx-4"> Forum </span>
        </li>
      </Link>
    </div>
  )
}

export default Sidebar