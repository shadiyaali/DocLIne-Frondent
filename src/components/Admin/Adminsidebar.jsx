import React from 'react'
import { NavLink } from 'react-router-dom'
import {BiHomeAlt2,BiCategoryAlt,BiCategory} from 'react-icons/bi'
import {BsBook} from 'react-icons/bs'
import {AiOutlineUser} from 'react-icons/ai'
import {SlGraduation} from 'react-icons/sl'
import {CiDiscount1,CiLogout} from 'react-icons/ci'
import {HiOutlineDocumentText} from 'react-icons/hi'
import { useNavigate } from 'react-router-dom'


import profile from '../../images/download.jpeg'

export default function Sidebar() {
    const history = useNavigate()

    const adminLogout = () => {
        localStorage.removeItem('authToken')
        history('/')
    }

  return (
    <div className='bg-white z-50 absolute h-auto min-h-screen xl:relative left-0 w-2/4 md:w-[350px]  shadow-xl  font-poppins rounded-r-2xl '>
        <div className="flex py-3 top-0">
              
            <img src={profile} alt="admin_profile_image" className='rounded-xl w-15 h-35 ml-7 mt-6' />
             
        </div>
        <div className="flex flex-col px-3 py-5 mt-2">
            <NavLink to="/adminhome/" className={({isActive})=>(isActive ? ' bg-gray-500 rounded-xl flex place-items-center text-white my-2' : 'flex place-items-center bg-white-10 my-2')}>
                <BiHomeAlt2 size={50} className='px-3'></BiHomeAlt2>
                <h3 className=' font-semibold '>Dashboard</h3>
            </NavLink>
            
            
            <NavLink to="userlist" className={({isActive})=>(isActive ? ' bg-gray-500  rounded-xl flex place-items-center text-white my-2' : 'flex place-items-center bg-white-10 my-2')}>
                <SlGraduation size={50} className='px-3'></SlGraduation>
                <h3 className='font-semibold'>Users</h3>
            </NavLink>
              
           
            <div className="dropdown">
  <label tabIndex={0} className="btn p-0 bg-transparent border-none w-full justify-start gap-0 text-[14px] capitalize" style={{ fontSize: '16px' }}>
<SlGraduation size={50} className="px-3" />
    Doctors
  </label>
  <ul
    tabIndex={0}
    className="dropdown-content menu p-2 shadow bg-white rounded-box w-52"
  >
    <li>
      <NavLink
        to="doctors"
        className="text-black hover:bg-gray-100 flex place-items-center"
      >
        <SlGraduation size={50} className="px-3" />
        <span>View Doctors</span>
      </NavLink>
    </li>
    <li>
      <NavLink
        to="doctorsrrequest"
        className="text-black hover:bg-gray-100 flex place-items-center"
      >
        <SlGraduation size={50} className="px-3" />
        <span>Doctor Requests</span>
      </NavLink>
    </li>
  </ul>
</div>
          
            <NavLink to="appointment" className={({isActive})=>(isActive ? ' bg-gray-500  rounded-xl flex place-items-center text-white my-2' : 'flex place-items-center bg-white-10 my-2')}>
                <HiOutlineDocumentText size={50} className='px-3'></HiOutlineDocumentText>
                <h3 className='font-semibold'>Appointments</h3>
            </NavLink>
            {/* <hr className="border-b-2 border-blue-gray-200 mt-4 mb-10"/> */}
            <NavLink to="/profile" className={({isActive})=>(isActive ? ' bg-gray-500  rounded-xl flex place-items-center text-white my-2' : 'flex place-items-center bg-white-10 my-2')}>
                <AiOutlineUser size={50} className='px-3 '></AiOutlineUser>
                <h3 className='font-semibold '>profile</h3>
            </NavLink>
            <div className="flex place-items-center h-10 my-2 cursor-pointer" onClick={()=>{adminLogout()}}>
                <CiLogout size={50} className='px-3 text-primaryBlue'></CiLogout>
                <h3 className='font-semibold text-primaryBlue'>Logout</h3>
            </div>

        </div>
    </div>
  )
}



