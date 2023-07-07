import React, { useState, useEffect } from "react";
import { NavLink } from 'react-router-dom'
import axios from 'axios';
import {BiHomeAlt2,BiCategoryAlt,BiCategory} from 'react-icons/bi'
import {BsBook} from 'react-icons/bs'
import {AiOutlineUser} from 'react-icons/ai'
import {SlGraduation} from 'react-icons/sl'
import {CiDiscount1,CiLogout} from 'react-icons/ci'
import {HiOutlineDocumentText} from 'react-icons/hi'
import { useNavigate } from 'react-router-dom'
import { BASE_URL } from '../../utils/config';
import jwt_decode from 'jwt-decode';
import doctorImg from '../../images/download.jpeg'
import login,{ getLocal } from '../../helpers/auth'

export default function Sidebar() {
  const [doctor, setDoctor] = useState('');
  const history = useNavigate();

  useEffect(() => {
    const localResponse = getLocal();
    if (localResponse) {
      const decoded = jwt_decode(localResponse);
      const doctorId = decoded?.user_id;
      console.log(doctorId);
      if (doctorId) {
        fetchDoctorData(doctorId);
      }
    }
  }, []);

  const fetchDoctorData = async (doctorId) => {
    try {
      const response = await axios.get(`${BASE_URL}/api/getDoctorUser/${doctorId}/`);
      setDoctor(response.data);
    } catch (error) {
      console.log(error);
    }
  };
  
    const adminLogout = () => {
        localStorage.removeItem('authToken')
        history('/')
    }

  return (
    <div className='bg-white z-50 absolute h-auto min-h-screen xl:relative left-0 w-2/4 md:w-[350px]  shadow-xl  font-poppins rounded-r-2xl '>
        <div className="flex py-3 top-0">
              
        {doctor?.user?.image ? (
          <img
            src={`${BASE_URL}${doctor?.user?.image}`}
            alt="profile-picture"
            className="rounded-full w-60 h-60 mx-auto mb-8"
          />
        ) : (
          <img
            src={doctorImg}
            alt="Profile Picture"
            className="rounded-full w-40 h-40 mx-auto md:mx-0 mb-3"
          />
        )}
             
        </div>
        <div className="flex flex-col px-3 py-5 mt-2">
            <NavLink to="/doctorhome/" className={({isActive})=>(isActive ? ' bg-gray-500 rounded-xl flex place-items-center text-white my-2' : 'flex place-items-center bg-white-10 my-2')}>
                <BiHomeAlt2 size={50} className='px-3'></BiHomeAlt2>
                <h3 className=' font-semibold '>Dashboard</h3>
            </NavLink>
            
            
            
 
<div className="dropdown">
  <label tabIndex={0} className="btn p-0 bg-transparent border-none w-full justify-start gap-0 text-[14px] capitalize" style={{ fontSize: '16px' }}>
<SlGraduation size={50} className="px-3" />
    Appointment
  </label>
  <ul
    tabIndex={0}
    className="dropdown-content menu p-2 shadow bg-white rounded-box w-52"
  >
    <li>
      <NavLink
        to="appointment"
        className="text-black hover:bg-gray-100 flex place-items-center"
      >
        <SlGraduation size={50} className="px-3" />
        <span>View Appointment</span>
      </NavLink>
    </li>
    <li>
      <NavLink
        to="scheduleappointment"
        className="text-black hover:bg-gray-100 flex place-items-center"
      >
        <SlGraduation size={50} className="px-3" />
        <span>Schedule Appointment</span>
      </NavLink>
    </li>
    <li>
      <NavLink
        to="viewslot"
        className="text-black hover:bg-gray-100 flex place-items-center"
      >
        <SlGraduation size={50} className="px-3" />
        <span>View Slots</span>
      </NavLink>
    </li>
  </ul>
</div>



           
            <NavLink to="doctordepartment" className={({isActive})=>(isActive ? ' bg-gray-500  rounded-xl flex place-items-center text-white my-2' : 'flex place-items-center bg-white-10 my-2')}>
                <BiCategoryAlt size={50} className='px-3'></BiCategoryAlt>
                <h3 className='font-semibold'>Departments</h3>
            </NavLink>
          
            <NavLink to="chat" className={({isActive})=>(isActive ? ' bg-gray-500  rounded-xl flex place-items-center text-white my-2' : 'flex place-items-center bg-white-10 my-2')}>
                <HiOutlineDocumentText size={50} className='px-3'></HiOutlineDocumentText>
                <h3 className='font-semibold'>Chat</h3>
            </NavLink>
            <hr className="border-b-2 border-blue-gray-200 mt-4 mb-10"/>
            <NavLink to="doctorprofile" className={({isActive})=>(isActive ? ' bg-gray-500  rounded-xl flex place-items-center text-white my-2' : 'flex place-items-center bg-white-10 my-2')}>
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



