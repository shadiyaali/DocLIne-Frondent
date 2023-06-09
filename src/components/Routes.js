import { Route,Routes,useLocation} from 'react-router-dom'
import Login from "./User/Login"
import Register from "./User/Register"
import Doctorhome from "../pages/Doctor/Doctorhome"
import Home from "../pages/User/Home"
import DoctorApproval from '../pages/User/DoctorApproval' 
import Appointment from "../pages/Doctor/Doctorhome"
 


function Proutes() {

    const location = useLocation();
    return (
      <Routes location={location} key={location.pathname}>
        <Route path='/' exact>
        <Route path='/' exact Component={Home} />
          <Route path='/login' Component={Login} />
          <Route path='/register' Component={Register} />
          

          <Route path='/doctorhome' exact Component={Doctorhome} /> 
           <Route path='doctorApproval/' element ={<DoctorApproval/>}/>
           {/* <Route path=' /appointment' exact Component={Appointment}/>            */}
        </Route>

      </Routes>
  )
}

export default Proutes