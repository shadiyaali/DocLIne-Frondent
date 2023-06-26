import React from 'react';
import Navbar from "../../components/User/Navbar";
import Footer from "../../components/User/Footer";
import LandingPage from './LandingPage';
import Card2 from "../../components/User/Card2";
import Card1 from "../../components/User/Card1";
import img from "../../images/download (2).jpeg";

function Home() {
  return (
    <div>
      <Navbar />
      <LandingPage />
      
      <Card2 />

      
        <Card1 />
        <div
        className=" items-center mt-36 "
        style={{
          backgroundImage: `url(${img})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
        }}
      >
        <div className="w-full  bg-opacity-75 p-8 border-2 bg-gray-200 shadow-lg rounded-md">
          <h2 className="text-3xl font-bold text-center mb-8 text-teal-900">
            Ready to join our team of dedicated doctors? Register today!
          </h2>
          <p className="text-xl font-bold text-center mb-4 text-teal-900">
            "Our team of experienced and compassionate doctors is dedicated to providing exceptional medical care and personalized treatment to every patient."
          </p>
          <div className="flex justify-center">
            <a href="/doctorApproval">
              <button className="bg-teal-200 px-6 py-3 rounded-md text-white font-medium hover:bg-teal-600">
                Join As a Doctor
              </button>
            </a>
          </div>
        </div>
        </div>

      
      <Footer />
    </div>
  );
}

export default Home;
