import React, { lazy, useContext, useState } from 'react'
import { useEffect } from 'react'
import { AuthContext } from 'src/contexts'
import { hasRole } from 'src/utils'
import GuestHome from './guest-home/GuestHome';

const AdminHome = lazy(() => import('./admin-home/AdminHome'));
const CoachHome = lazy(() => import('./coach-home/CoachHome'));
const UserHome = lazy(() => import('./user-home/UserHome'));

const Home = () => {
  const { user } = useContext(AuthContext)
  const [homePage, setHomePage] = useState<string>('GUEST')


  const initHomePage = () => {
    if(user && user.roles){
      if (hasRole("ADMIN", user.roles)) {
        setHomePage("ADMIN")
      } else if (hasRole("COACH", user.roles)) {
        setHomePage("COACH")
      } else if (hasRole("USER", user.roles)) {
        setHomePage("USER")
      }
    }
  }

  useEffect(() => {
    initHomePage()
  }, [])

  const pageContent = () => {
    switch (homePage) {
      case "ADMIN":
        return <AdminHome />
      case "COACH":
        return <CoachHome />
      case "USER":
        return <UserHome />
      default: 
        return <GuestHome/>

    }
  }

  return pageContent()
}

export default Home