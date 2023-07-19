import React, { useState } from 'react';
import { AiOutlineSearch } from 'react-icons/ai';
import { BsCart3 } from 'react-icons/bs';
import { Link, useNavigate } from 'react-router-dom';
import jwtDecode from 'jwt-decode';
import { getLocal } from '../../helpers/auth';
import userProfileIcon from '../../images/images (1).jpeg'
import { BASE_URL } from "../../utils/config";


function NavBar() {
  const history = useNavigate();
  const [user, setUser] = useState(null);

  const user_auth = getLocal('authToken');
  let user_name;
  if (user_auth) {
    user_name = jwtDecode(user_auth);
    console.log(user_name);
  }

  const logout = () => {
    localStorage.removeItem('authToken');
    history('/login');
  };

  return (
    <div className='w-100 h-20 flex shadow-2xl bg-gray-100 font-poppins px-5 p-4 place-items-center place-content-center gap-5 '>
      <div className='flex flex-1 place-items-center place-content-start gap-12 '>
      <Link to='/'>
        <li className='px-3 list-none text-3xl font-bold text-teal-800'>DocLine</li>
      </Link>
        <div className='flex  px-10   items-center ms-3'>
          {/* <AiOutlineSearch className='text-black'></AiOutlineSearch> */}
          {/* <input type='text' className='focus:outline-dotted ms-2 bg-transparent placeholder:text-black ' placeholder='search for doctors' /> */}
        </div>
        {/* <Link to='/'>
        <li className='px-3 list-none font-bold text-teal-800'>Home</li>
      </Link> */}
      <Link to="/userdoctor">
        <li className='px-3 list-none font-bold text-teal-800'>Doctors</li>
      </Link>
      <Link to="chat/">
        <li className='px-3 list-none font-bold text-teal-800'>Community</li>
      </Link>
      {user_auth ? (
  <Link to="/myappointments">
    <li className="px-1 list-none font-bold text-teal-800  gap-3">My Appointments</li>
  </Link>
) : null}  

      </div>
     
     
      

      {user_auth ? (
        <div>
          
          <div className='flex gap-3'>
          
            <Link to={`/userprofile/${user_name.user_id}`}>
              <li className='px-1 list-none'>
                <button className='bg-transparent border-none cursor-pointer  '>
                {
                    user?.image ? (
                        <img
                          src={`${BASE_URL}${user?.image}`}
                          alt="profile-picture"
                          className="rounded-full w-60 h-60 mx-auto "
                        />
                      ) : (
                        <img
                          src={userProfileIcon}
                          alt="Profile Picture"
                          className="rounded-full w-10 h-10 mx-auto md:mx-0  mt-3 first-line:mb-3"
                        />
                      )
                }
                </button>
              </li>
            </Link>
            <Link to='/login'>
              <li className='px-1 list-none'>
                <button className='text-white rounded-xl px-4 font-bold w-[75px] py-2 bg-teal-600 mx-5 mt-3' onClick={logout}>
                  Logout
                </button>
              </li>
            </Link>
          </div>
        </div>
      ) : (
        <div>
          <div className='flex gap-2 '>
            <Link to='/login'>
              <li className='px-1 list-none'>
                <button className=' rounded-xl px-6 py-2 bg-teal-600  mx-5  mt-3 font-bold text-white'>Login</button>
              </li>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}

export default NavBar;
