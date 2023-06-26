import { Route, Routes, useLocation } from "react-router-dom";
import Login from "./User/Login";
import RegisterPage from "../pages/User/RegisterPage";
import Doctorhome from "../pages/Doctor/Doctorhome";
import Home from "../pages/User/Home";
import DoctorApproval from "../pages/User/DoctorApproval";
import Appointment from "../components/Doctor/Appointment";
import ScheduleAppointment from "../components/Doctor/ScheduleAppointment";
import Dashboard from '../components/Doctor/Dashboard';
import AdminHome from "../pages/Admin/AdminHome";
import ADashboard from "../components/Admin/ADashboard"
import Userlist from "../components/Admin/Userlist"
import ForgetPassword from '../components/User/ForgotPassword';
import ResetPassword from '../components/User/ResetPassword';
import Doctorlist from "../components/Admin/Doctorlist";
import DoctorRequest from "../components/Admin/DoctorRequest";
import UserDoctor from "../pages/User/UserDoctor";
import UserAppointment from "../pages/User/Userappointment";
import Paymentdetails from '../components/Payment/Paymentdetails';
import PaymentSuccessPage from '../components/Payment/PaymentSuccess';


function Proutes() {
  const location = useLocation();
  return (
    <Routes location={location} key={location.pathname}>
      <Route path="/" exact element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path='forgotPassword/' element ={<ForgetPassword/>}/>
      <Route path='resetPassword/' element ={<ResetPassword/>}/>
      <Route path="/doctorApproval" element={<DoctorApproval />} />
      <Route path="/userdoctor" element={<UserDoctor />} />
      <Route path="/userappointment/:id" element={<UserAppointment/>}/>
      

      <Route path="/doctorhome/" element={<Doctorhome />}>
        <Route path="" element={<Dashboard />} />
        <Route path="appointment" element={<Appointment />} />
        <Route path="scheduleappointment" element={<ScheduleAppointment />} />
      </Route>
      
        {/* payment */}
     <Route path='payment/' element ={<Paymentdetails/>}/>
     <Route path='succes/' element ={<PaymentSuccessPage/>}/>

      <Route path="/adminhome" element={<AdminHome />} >
         <Route path="" element={<ADashboard />} />

         <Route path="userlist" element={<Userlist/>}/> 
         <Route path="doctors" element={<Doctorlist/>}/> 
         <Route path="doctorsrrequest" element={<DoctorRequest/>}/> 

      </Route>
    </Routes>
  );
}

export default Proutes;
