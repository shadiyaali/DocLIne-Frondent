import React from 'react'
import Navbar from "../../components/User/Navbar"
import Banner from "../../components/User/Banner"
import Footer  from "../../components/User/Footer"
 
import LandingPage from './LandingPage'
import { Link } from "react-router-dom";
 
import Card2 from "../../components/User/Card2"
import Card1 from "../../components/User/Card1"
import Navbar2 from "../../components/User/Navbar2"
 

function Home() {
  return (
    <div>
      <Navbar />
      <LandingPage />
      {/* <Banner/> */}
       
       <Card2/>
       <div className="p-2 md:px-10 mt-10">
        <div className="h-[96px] bg-gradient-to-r from-green to-teal-600 text-white font-bold flex p-2 px-3 border-2 border- white shadow items-center shadow-gray-400 rounded-md justify-between">
          <div className="">
            <p className='md:text-3xl'>Ready to join our team of dedicated doctors? Register today!</p>
          </div>
          <div className="">
          <Link to="/doctorApproval"><button className='rounded-md shadow bg-white text-teal-600 px-5 py-2 capitalize font-medium hover:shadow-2xl'>join as doctor</button></Link>
          </div>
        </div>
       </div>
       {/* <Card/> */}
       <Card1/> 
       <Footer/>
    </div>
  )
}
 
export default Home;
