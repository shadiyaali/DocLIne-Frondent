import React, { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { toast, Toaster } from "react-hot-toast";
import axios from "axios";
import Loginimage from "../../images/Image1.jpg";
 

const ResetPassword = () => {
    const [password,setPassword] = useState("")
    const [confirmPassword,setConfirmPassword] = useState("")

    

    const navigate = useNavigate("")

    const handleSubmit = (e) => {
    e.preventDefault();

    // Retrieve the stored data from the local storage
    const storedDataString = localStorage.getItem('response');
    // Parse the string back into an object
    const storedData = JSON.parse(storedDataString);
   
    if (password !== confirmPassword){
        return toast.error('Passwords are not equal')
    }
    axios.post('http://127.0.0.1:8000/api/resetPassword/', {
      password : password,
      cPassword :confirmPassword,
      storedData : storedData
      

    })
      .then(() => {
        toast.success('Succesfully changed password');
        navigate('/login');
      })
      .catch((error) => {
        toast.error('couldnt change password');
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
              Reset Password
            </h1>
            <form onSubmit={handleSubmit}>
              <input
                className="bg-white h-12 w-11/12 border-2 rounded-full mt-7 placeholder-black-300  font-bold outline-none text-black px-6"
                type="password"
                name="password"
                placeholder="Password"
                onChange={(e) => setPassword(e.target.value)}
              />
               <input
                className="bg-white h-12 w-11/12 border-2 rounded-full mt-7 placeholder-black-300  font-bold outline-none text-black px-6"
                type="password"
                name="password"
                placeholder="Confirm Password"
                
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
             <div to="/login" className="flex w-full justify-center">
                 <button type="submit" className=" text-white p-3 bg-blue-800 rounded-2xl my-5  w-32">Submit</button>
               </div>
              
              
            </form>
             
            <Link to="/login"><button className=" font-medium text-blue-600 hover:underline" >Go to Login</button></Link>
                   
                  
                  
 
          </div>
        </div>
      </div>
    </div>
  );
}
export default ResetPassword; 