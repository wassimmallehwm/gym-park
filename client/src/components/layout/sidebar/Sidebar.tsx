import React, { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { AuthContext } from '../../../contexts/auth/AuthContext'
import menus from './menus.json'
import logo from '../../../assets/logo.png'

interface SidebarProps {
  isOpen: boolean
}

const Sidebar = ({
  isOpen
}: SidebarProps) => {
  const { user } = useContext(AuthContext)
  const [menusList, setMenusList] = useState<any[]>([])

  const initMenus = () => {
    let result: any[] = []
    const rolesMap = new Map(user?.roles?.map((item: any) => [item.label, item.label]));
    menus.forEach((menu: any) => {
      menu.roles.forEach((role: string) => {
        if (role == rolesMap.get(role)) {
          result.push(menu)
        }
      })
    });
    setMenusList(result)
  }

  useEffect(() => {
    initMenus()
  }, [])


  return (
    <div className={`${isOpen ? 'translate-x-0' : '-translate-x-full'} ease-in-out duration-300 top-0 left-0 fixed h-screen w-60 pt-12 bg-slate-100 z-20`}>
      <Link to="/">
      <img src={logo} className="w-36 mx-auto text-center" />
      <div className="text-xl font-bold text-gray-800 text-center"> Gym Park</div>
      </Link>
      <hr/>
      {
        menusList.map((menu: any) => (
          <Link key={menu.label} to={menu.url}>
            <li className="p-3 cursor-pointer rounded-sm flex items-center justify-between hover:bg-gray-200">
              <span className="mx-4"> {menu.label} </span>
            </li>
          </Link>
        ))
      }
    </div>
  )
}

export default Sidebar