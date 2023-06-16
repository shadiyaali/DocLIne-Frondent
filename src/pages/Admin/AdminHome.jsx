import React from 'react'
import Adminsidebar from "../../components/Admin/Adminsidebar"
import { Outlet } from 'react-router-dom'; 
 

function AdminHome() {
  return (
    <div className="flex">
      <Adminsidebar />
      <div className="w-full overflow-hidden">
      <Outlet />
      </div>
      
  
    </div>
  )
}

export default AdminHome
