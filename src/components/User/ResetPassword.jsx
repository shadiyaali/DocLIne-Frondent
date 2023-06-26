import React, { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { toast, Toaster } from "react-hot-toast";
import axios from "axios";
import registerImage from "../../images/register.jpg";
 

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
    <div className= " h-screen w-screen flex items-center justify-center ">
    <Toaster position="top-center" reverseOrder={false} />
    <div className="h-5/6 w-11/12 rounded-2xl shadow-2xl flex flex-row bg-teal-100">
      <div className=" flex flex-1 rounded-tl-2xl h-full w-full rounded-bl-2xl items-center bg-white justify-center ">
        <img src={registerImage} className="w-full h-full rounded-tl-2xl rounded-bl-2xl"  alt="Register" />
        </div>
        <div className="h-full w-3/6 flex flex-1 items-center justify-center">
                  <div className="bg-blue h-5/6 w-4/6 mb-20">
                    <h1 className="font-bold text-3xl text-center text-teal-800 mt-4 px-24 ">
              Reset password
            </h1>
            <form onSubmit={handleSubmit}>
              <input
                className="bg-white h-12 w-full border-2  mt-7 placeholder-black-300  font-bold outline-none text-black px-6"
                type="password"
                name="password"
                placeholder="Password"
                onChange={(e) => setPassword(e.target.value)}
              />
               <input
                className="bg-white h-12 w-full border-2  mt-7 placeholder-black-300  font-bold outline-none text-black px-6"
                type="password"
                name="password"
                placeholder="Confirm Password"
                
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
             <div to="/login" className="flex w-full justify-center">
                 <button type="submit" className=" text-white p-3 bg-teal-600 hover:bg-teal-800  my-6  w-full ">Submit</button>
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