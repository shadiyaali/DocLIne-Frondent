import React from 'react';
import { AiOutlineSearch } from 'react-icons/ai';
import { BsCart3 } from 'react-icons/bs';
import { Link, useNavigate } from 'react-router-dom';
import jwtDecode from 'jwt-decode';
import { getLocal } from '../../helpers/auth';
import userProfileIcon from '../../images/images (1).jpeg'

function NavBar() {
  const history = useNavigate();

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
        <h1 className='font-extrabold text-4xl ps-3 text-customColorC'>DocLine</h1>
        <div className='flex  px-10   items-center ms-3'>
          {/* <AiOutlineSearch className='text-black'></AiOutlineSearch> */}
          {/* <input type='text' className='focus:outline-dotted ms-2 bg-transparent placeholder:text-black ' placeholder='search for doctors' /> */}
        </div>
        <Link to='/'>
        <li className='px-3 list-none font-bold text-teal-800'>Home</li>
      </Link>
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
                  <img src={userProfileIcon} alt='User Profile' className='w-10 h-10 rounded-full' />
                </button>
              </li>
            </Link>
            <Link to='/login'>
              <li className='px-1 list-none'>
                <button className='text-white rounded-xl px-4 font-bold w-[75px] py-2 bg-teal-600 mx-5' onClick={logout}>
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
                <button className=' rounded-xl px-6 py-2 bg-teal-600  mx-5 font-bold text-white'>Login</button>
              </li>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}

export default NavBar;
