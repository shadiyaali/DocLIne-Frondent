import React, { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { toast, Toaster } from "react-hot-toast";
import { BASE_URL } from "../../utils/config";
// import { toast } from "react-hot-toast";
import login, { getLocal } from "../../helpers/auth";


import Loginimage from "../../images/Image1.jpg";
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
        
        if (decoded.is_admin) {
          navigate('/adminhome');
        } else if (decoded.is_staff) {
          navigate('/');
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
    <div className="bg- white h-screen w-screen flex items-center justify-center">
      <Toaster position="top-center" reverseOrder={false} />
      <div className="h-5/6 w-10/12 flex flex-row bg-white  rounded-3xl">
        <div className="h-full w-3/6 flex items-center justify-center">
          <img src={Loginimage} alt="Login" />
        </div>
        <div className="h-full w-3/6 flex items-center justify-center">
          <div className="bg-white h-5/6 w-4/6 rounded-3xl">
            <h1 className="font-serif text-3xl text-custom-black mt-24 px-24 font-bold">
              USER LOGIN
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
                className="bg-white h-12 w-11/12 border-2 rounded-full mt-7 placeholder-black-300 font-bold outline-none text-black px-6"
                type="password"
                name="password"
                placeholder="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <input
                className="bg-black mt-7 h-11 w-5/12 rounded-full text-white"
                type="submit"
                value="LOGIN"
              />
            </form>
            <p className="mt-3 text-blue ">
              Not yet registered..?
              <Link to="/register">
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