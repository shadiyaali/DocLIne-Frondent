import React, { useState } from "react";
import { Link } from "react-router-dom";
import { toast, Toaster } from "react-hot-toast";
import { BASE_URL } from "../../utils/config";
import registerImage from "../../images/register.jpg";
import axios from "axios";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Input,
  Checkbox,
  Button,
  Typography,
} from "@material-tailwind/react";

function Register() {
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    phone_number: "",
    password: "",
    password2: "",
     // Default userType as "user"
  });

  const {
    first_name,
    last_name,
    email,
    phone_number,
    password,
    password2,
   
  } = formData;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== password2) {
      toast.error("Passwords do not match.");
      return;
    }

    try {
      const response = await axios.post(`${BASE_URL}/api/register/`, {
        first_name,
        last_name,
        email,
        phone_number,
        password,
       
      });

      if (response.status === 201) {
        toast.success("Registration successful. Please activate your account.");
      } else {
        toast.error("Something went wrong during registration.");
      }
    } catch (error) {
      console.error(error);
      toast.error("An error occurred during registration.");
    }
  };

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
              Register
            </h1>
            <form className="login-input" onSubmit={handleSubmit}>
             
              <input
                className=" h-12 w-full border-2  mt-5 placeholder-black-300 font-bold outline-none text-black px-3"
                type="text"
                variant="standard"
                name="first_name"
                placeholder="First Name"
                value={first_name}
                onChange={handleChange}
              />
              <input
                className="  h-12 w-full border-2  mt-5 placeholder-black-300 font-bold outline-none text-black px-6"
                type="text"
                name="last_name"
                placeholder="Last Name"
                value={last_name}
                onChange={handleChange}
              />
               <input
                className=" h-12 w-full border-2  mt-5 placeholder-black-300 font-bold outline-none text-black px-6"
                type="email"
                name="email"
                placeholder="Email"
                value={email}
                onChange={handleChange}
              />
              <input
               
                className=" h-12 w-full border-2  mt-5 placeholder-black-300 font-bold outline-none text-black px-6"
                type="text"
                name="phone_number"
                placeholder="Phone Number"
                value={phone_number}
                onChange={handleChange}
              />
              <input
                className=" h-12 w-full border-2  mt-5 placeholder-black-300 font-bold outline-none text-black px-6"
                type="password"
                name="password"
                placeholder="Password"
                value={password}
                onChange={handleChange}
              />
              <input
                className=" h-12 w-full border-2  mt-5 placeholder-black-300 font-bold outline-none text-black px-6"
                type="password"
                name="password2"
                placeholder="Confirm Password"
                value={password2}
                onChange={handleChange}
              />
            <div to="/login" className="flex w-full justify-center">
                 <button type="submit" className=" text-white p-3 bg-teal-600 hover:bg-teal-800  my-6  w-full ">Register</button>
               </div>

              <p className="text-blue-600  margin-top :10"  >
                Already a member? <Link to="/login">Login</Link>
                 
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;
