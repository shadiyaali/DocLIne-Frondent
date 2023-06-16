import React, { useState } from "react";
import { Link } from "react-router-dom";
import { toast, Toaster } from "react-hot-toast";
import { BASE_URL } from "../../utils/config";
import registerImage from "../../images/Image1.jpg";
import axios from "axios";

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
        
        <div className="bg-r h-screen w-screen flex items-center justify-center">
      <Toaster position="top-center" reverseOrder={false} />
      <div className="h-5/6 w-10/12 flex flex-row bg-white">
        <div className="h-full w-3/6 flex items-center justify-center">
          <img src={registerImage} alt="Register" />
        </div>
        <div className="h-full w-3/6 flex items-center justify-center">
          <div className="bg-blue h-5/6 w-4/6">
            <h1 className="font-bold text-3xl text-black mt-4 px-24 font-bold">
              SIGNUP
            </h1>
            <form className="login-input" onSubmit={handleSubmit}>
             
              <input
                className="bg-white h-10 w-11/12 border-2 rounded-full mt-5 placeholder-black-300 font-bold outline-none text-black px-6"
                type="text"
                name="first_name"
                placeholder="First Name"
                value={first_name}
                onChange={handleChange}
              />
              <input
                className="bg-white h-10 w-11/12 border-2 rounded-full mt-5 placeholder-black-300 font-bold outline-none text-black px-6"
                type="text"
                name="last_name"
                placeholder="Last Name"
                value={last_name}
                onChange={handleChange}
              />
               <input
                className="bg-white h-10 w-11/12 border-2 rounded-full mt-5 placeholder-black-300 font-bold outline-none text-black px-6"
                type="email"
                name="email"
                placeholder="Email"
                value={email}
                onChange={handleChange}
              />
              <input
               
                className="bg-white h-10 w-11/12 border-2 rounded-full mt-5 placeholder-black-300 font-bold outline-none text-black px-6"
                type="text"
                name="phone_number"
                placeholder="Phone Number"
                value={phone_number}
                onChange={handleChange}
              />
              <input
                className="bg-white h-10 w-11/12 border-2 rounded-full mt-5 placeholder-black-300 font-bold outline-none text-black px-6"
                type="password"
                name="password"
                placeholder="Password"
                value={password}
                onChange={handleChange}
              />
              <input
                className="bg-white h-10 w-11/12 border-2 rounded-full mt-5 placeholder-black-300 font-bold outline-none text-black px-6"
                type="password"
                name="password2"
                placeholder="Confirm Password"
                value={password2}
                onChange={handleChange}
              />
              <input
                className="bg-black mt-6 h-7 w-5/12 rounded-full text-white"
                type="submit"
                value="SIGNUP"
              />

              <p className="text-black  margin-top :10" >
                Already a member? <Link to="/login">Login</Link>
                <Link to="/doctorApproval"><li className='px-1 list-none'></li><button className='px-4 py-2 bg-customColor mx-2 text-black shadow-xl rounded-xl'  >Become a Doctor</button></Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;
