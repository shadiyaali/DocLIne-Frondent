import React, { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { toast, Toaster } from "react-hot-toast";
import { BASE_URL } from "../../utils/config";
// import { toast } from "react-hot-toast";
import login, { getLocal } from "../../helpers/auth";


import registerImage from "../../images/register.jpg";
import jwt_decode from 'jwt-decode';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const location = useLocation();

  let state = location.state;

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const loginResponse = await login(email, password);
      console.log(loginResponse, 'login response');
      
      const localResponse = getLocal('authToken');
      if (localResponse) {
        const decoded = jwt_decode(localResponse);
        console.log(decoded, 'decoded in login page');
        console.log(decoded)
        
        if (decoded.is_admin) {
          navigate('/adminhome');
        } else if (decoded.is_staff === true) {
          navigate('/doctorhome');
        } else if (state?.from) {
          navigate(state.from, { replace: true });
        } else {
          navigate('/', { replace: true });
        }
        
        toast.success('Login Success');
      } else {
        toast.error('Invalid User Credentials');
      }
    } catch (error) {
      console.error(error);
      toast.error('An error occurred during login');
    }
  };

  return (
    <div className= " h-screen w-screen flex items-center justify-center ">
      <Toaster position="top-center" reverseOrder={false} />
      <div className="h-5/6 w-11/12 rounded-2xl shadow-2xl flex flex-row bg-teal-100">
      <div className=" flex flex-1 rounded-tl-2xl h-full w-full rounded-bl-2xl items-center bg-white justify-center  ">
      <img src={registerImage} className="w-full h-full rounded-tl-2xl rounded-bl-2xl"  alt="Register" />
        </div>
        <div className="h-full w-3/6 flex flex-1 items-center justify-center">
          <div className="bg-blue h-5/6 w-4/6 mb-20">
            <h1 className="font-bold text-3xl text-center text-teal-800 mt-4 px-24 ">
              login
            </h1>
            <form onSubmit={handleSubmit}>
              <input
                className="bg-white h-12 w-full border-2  mt-7 placeholder-black-300  font-bold outline-none text-black px-6"
                type="email"
                name="email"
                placeholder="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <input
                className="bg-white h-12 w-full border-2  mt-7 placeholder-black-300 font-bold outline-none text-black px-6"
                type="password"
                name="password"
                placeholder="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
             
             <div to="/login" className="flex w-full justify-center">
                 <button type="submit" className=" text-white p-3  bg-teal-600 hover:bg-teal-800  my-6  w-full ">Login</button>
               </div>
               
              
            </form>
            <Link to="/forgotPassword"><button className=" text-lg text-blue-600 hover:underline" >Forgot Password?</button></Link>
            <p className="mt-3 text-blue ">
              Not yet registered..?
              <Link to="/register" className="text-blue-600">
                SignUp
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Login;