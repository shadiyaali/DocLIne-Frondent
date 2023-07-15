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
import AdminAppointments from "./Admin/Appointments";
import DoctorPage from "../components/Doctor/SlotePage";
import Doctordepartments from "../components/Doctor/Department";
import AdminDepartments from "../components/Admin/Department";
// import DoctorProfilePage from "../components/Doctor/Profile"
import UserProfile from "../pages/User/UserProfilePage"
import MyAppointments from "../pages/User/MyAppointmentPage";
import Department from "../pages/User/DepartmentPage";
import ChatGroup from "../pages/chat/ChatGroups";
import CreateRoom from "./Doctor/CreateRoom";
 



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
      <Route path="/userprofile/:id" element={<UserProfile/>}/>
      <Route path="/myappointments" element={<MyAppointments/>}/>
      <Route path="/departments" element={<Department/>}/>

      <Route path="/doctorhome/" element={<Doctorhome />}>
        <Route path="" element={<Dashboard />} />
        <Route path="appointment" element={<Appointment />} />
        <Route path="scheduleappointment" element={<ScheduleAppointment />} />
        <Route path="viewslot" element={<DoctorPage/>} />
        <Route path="doctordepartment" element={<Doctordepartments/>} />
        <Route path='createRoom/' element ={<CreateRoom/>}/>,
        {/* <Route path="doctorprofile" element={<DoctorProfilePage/>} /> */}
      </Route>
      
        {/* payment */}
     <Route path='payment/' element ={<Paymentdetails/>}/>
     <Route path='success/' element ={<PaymentSuccessPage/>}/>
     
       {/* chat */}
     <Route path='chat/' element ={<ChatGroup/>}/>

      <Route path="/adminhome" element={<AdminHome />} >
         <Route path="" element={<ADashboard />} />

         <Route path="userlist" element={<Userlist/>}/> 
         <Route path="doctors" element={<Doctorlist/>}/> 
         <Route path="doctorsrrequest" element={<DoctorRequest/>}/> 
         <Route path="adminappointment" element={<AdminAppointments/>}/> 
         <Route path="admindepartment" element={<AdminDepartments/>}/> 


      </Route>
    </Routes>
  );
}

export default Proutes;
