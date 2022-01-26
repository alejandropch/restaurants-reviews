import React,{useContext} from 'react';
import AppContext from '../context/AppContext';
import NavBar from './NavBar'
import { useLocation } from 'react-router-dom';
export default function Layout({children}) {
    const {user} = useContext(AppContext)
    const {pathname}= useLocation()
    const path = pathname.split('/')[1]
  return (
    <div>
        <NavBar user= {user? user.name : undefined} path={path} />
        {children}
    </div>
  )
}