import React, { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { toast, Toaster } from "react-hot-toast";
import { BASE_URL } from "../../utils/config";
// import { toast } from "react-hot-toast";
import login, { getLocal } from "../../helpers/auth";
import axios from "axios";

import Loginimage from "../../images/Image1.jpg";
import jwt_decode from 'jwt-decode';

const ForgetPassword = () => {
    const [email,setEmail] = useState("")
    

    const navigate = useNavigate("")

    const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('http://127.0.0.1:8000/api/forgot_password/', {
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
    <div className="bg- white h-screen w-screen flex items-center justify-center">
      <Toaster position="top-center" reverseOrder={false} />
      <div className="h-5/6 w-10/12 flex flex-row bg-white  rounded-3xl">
        <div className="h-full w-3/6 flex items-center justify-center">
          <img src={Loginimage} alt="Login" />
        </div>
        <div className="h-full w-3/6 flex items-center justify-center">
          <div className="bg-white h-5/6 w-5/6 rounded-3xl" >
            <h1 className="font-serif text-3xl text-custom-black mt-24 px-24 font-bold">
              Forgot Password
            </h1>
            <form onSubmit={handleSubmit}>
              <input
                className="bg-white h-12 w-11/12 border-2 rounded-full mt-7 placeholder-black-300  font-bold outline-none text-black px-6"
                type="email"
                name="email"
                placeholder="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
               
              <input
                className="bg-black mt-7 h-11 w-5/12 rounded-full text-white"
                type="submit"
                value="Submit"
              />
              
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