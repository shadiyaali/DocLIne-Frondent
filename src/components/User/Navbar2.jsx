import React from 'react';
import { AiOutlineSearch } from 'react-icons/ai';
import { BsCart3 } from 'react-icons/bs';
import { Link, useNavigate } from 'react-router-dom';
import jwtDecode from 'jwt-decode';
import { getLocal } from '../../helpers/auth';

function NavBar2() {
  //   const history = useNavigate()

  //   const user_auth = getLocal('authToken');
  //   let user_name;
  //   if(user_auth){
  //     user_name = jwtDecode(user_auth)
  //     console.log(user_name)
  //   }

  //   const logout = () => {
  //     localStorage.removeItem('authToken')
  //     history('/login')
  //   }

  return (
    <div className="w-100 h-20 flex font-poppins px-5 p-4 place-items-center place-content-center gap-5 bg-gradient-to-r from-green to-teal-600">
      <div className="flex flex-1 place-items-center place-content-start gap-12">
        <h1 className="font-extrabold text-4xl ps-3 text-customColorC"></h1>
        <div className="flex px-10 rounded-3xl border-2 py-2 place-items-center ms-3">
          <AiOutlineSearch className="text-black"></AiOutlineSearch>
          <input
            type="text"
            className="focus:outline-dotted ms-2 bg-transparent placeholder:text-black"
            placeholder="search for doctors"
          />
        </div>
      </div>

      <li className="px-1 list-none font-bold text-customColorC">Doctors</li>

      <li className="px-1 list-none font-bold text-customColorC">Departments</li>

      <div>
        <div className="flex gap-2"></div>
      </div>

      <div>
        <div className="flex gap-2">
          <button className="px-4 py-2 bg-gradient-to-r from-green to-teal-600 mx-2 text-white shadow-xl rounded-xl">
            Login
          </button>
        </div>
      </div>
    </div>
  );
}

export default NavBar2;
