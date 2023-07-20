import React, { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { toast, Toaster } from "react-hot-toast";
import { BASE_URL } from "../../utils/config";
// import { toast } from "react-hot-toast";
import login, { getLocal } from "../../helpers/auth";
import axios from "axios";

import registerImage from "../../images/register.jpg";
import jwt_decode from 'jwt-decode';

const ForgetPassword = () => {
    const [email,setEmail] = useState("")
    

    const navigate = useNavigate("")

    const handleSubmit = (e) => {
    e.preventDefault();
    axios.post(`${BASE_URL}/api/forgot_password/`, {
      email: email,
    }).then((res) => {
        // Convert the response object to a string
        const dataString = JSON.stringify(res.data); 
        console.log(dataString)
       // Store the data in the local storage with a specific key
        localStorage.setItem('response', dataString);
        toast.success('Check Email for Reseting password');
      })
      .catch((error) => {
        toast.error('Email not existing');
        console.log(error);
      });
  }
  return (
    <div className= " h-screen w-screen flex items-center justify-center ">
    <Toaster position="top-center" reverseOrder={false} />
    <div className="h-5/6 w-11/12 rounded-2xl shadow-2xl flex flex-row bg-teal-100">
      <div className=" flex flex-1 rounded-tl-2xl h-full w-full rounded-bl-2xl items-center bg-white justify-center ">
        <img src={registerImage} className="w-full h-full rounded-tl-2xl rounded-bl-2xl"  alt="Register" />
      </div>
      <div className="h-full w-3/6 flex flex-1 items-center justify-center">
        <div className="bg-blue h-5/6 w-4/6 mb-20">
          <h1 className="font-bold text-3xl text-center text-teal-800 mt-4 px-24 ">
              Forgot Password
            </h1>
            <form onSubmit={handleSubmit}>
              <input
                className="bg-white h-12 w-full border-2  mt-16 placeholder-black-300  font-bold outline-none text-black px-6"
                type="email"
                name="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
               
               <div to="/login" className="flex w-full justify-center">
                 <button type="submit" className=" text-white p-3 bg-teal-600 hover:bg-teal-800  my-6  w-full ">Submit</button>
               </div>
               
              
            </form>
            {/* <Link to="/forgotPassword"><button className=" text-xs text-purple-600 hover:underline" >Forget Password?</button></Link>
            <p className="mt-3 text-blue ">
              Not yet registered..?
              <Link to="/register">
                SignUp
              </Link>
            </p> */}
          </div>
        </div>
      </div>
    </div>
  );
}
export default ForgetPassword; 