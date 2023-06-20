import React from 'react'
import { AiOutlineSearch } from 'react-icons/ai';
import { BsCart3 } from 'react-icons/bs';

import { Link, useNavigate } from 'react-router-dom'
import jwtDecode from "jwt-decode"
import { getLocal } from '../../helpers/auth'

function NavBar() {
  const history = useNavigate()


  const user_auth = getLocal('authToken');
  let user_name;
  if(user_auth){
    user_name = jwtDecode(user_auth)
    console.log(user_name)
  }

  const logout = () => {
    localStorage.removeItem('authToken')
    history('/login')
  }

  return (
    <div className='w-100 h-20 flex font-poppins px-5 p-4 place-items-center place-content-center gap-5'>
      <div className="flex flex-1 place-items-center place-content-start gap-12">
          <h1 className='font-extrabold text-4xl ps-3 text-customColorC'>DocLine</h1>
          <div className="flex px-10 rounded-3xl border-2 py-2 place-items-center ms-3">
            <AiOutlineSearch className='text-black'  ></AiOutlineSearch>
            <input type="text" className='focus:outline-dotted ms-2 bg-transparent placeholder:text-black' placeholder='search for doctors'/>
          </div>
      </div>
      
        {/* <div className='flex gap-3 place-items-center'> */}
            
            <Link to="/"><li className='px-1 list-none font-bold text-green'>Home</li></Link>
           <li className='px-1 list-none font-bold text-customColorC'>Doctors</li> 
            <Link to="/user/cart"><BsCart3 className="cursor-pointer text-white"></BsCart3></Link>
        {/* </div>  */}
        {/* {user_auth ? (
          user_name.is_staff ? ( */}
             <li className='px-1 list-none font-bold text-customColorC'>Departments</li> 
             {/* <Link to="/doctorApproval">
                <span className="cursor-pointer  flex justify-center items-center mt-10 font-semibold text-md w-48 bg-[#194569] p-2  text-white hover:text-black rounded">
                  Become a doctor
                </span>
              </Link> */}
              {
                // user_auth ? (
                //   user_name.is_doctor ? (
                //     <Link to="/doctor"><li className='px-1 list-none'></li><button className='px-4 py-2 bg-customColor mx-2 text-black shadow-xl rounded-xl'  >Doctor Dashboard</button></Link>
                //   ) : (
                //     <Link to="/doctorApproval"><li className='px-1 list-none'></li><button className='px-4 py-2 bg-customColor mx-2 text-black shadow-xl rounded-xl'  >Become a Doctor</button></Link>

                //   )
                // ):null
              }
              


        {user_auth ? 
        <div>
            <div className='flex gap-2'>
            <Link to="/login"><li className='px-1 list-none'></li><button className='px-4 w-[75px] py-2 bg-gradient-to-r from-green to-teal-600 mx-2 text-black shadow-xl rounded-xl' onClick={logout} >Logout</button></Link>

            </div>   
        </div> 
        : 
        <div>
            <div className='flex gap-2'>
            <Link to="/login"><li className='px-1 list-none'></li><button className='px-4 py-2 bg-gradient-to-r from-green to-teal-600 mx-2 text-white shadow-xl rounded-xl' >Login</button></Link>
            </div>   
        </div>
        }
           
    </div>
  )
}

export default NavBar