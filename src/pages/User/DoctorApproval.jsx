import React from "react";
import Navbar from "../../components/User/Navbar";
 
import DoctorApprovalForm  from "../../components/User/DoctorApprovalForm";
import Footer from "../../components/User/Footer";


const DoctorApproval = () => {
    
  return (
    <div>
      <Navbar/>
      <DoctorApprovalForm/>
      <Footer />
    </div>
    
  );
};

export default DoctorApproval;