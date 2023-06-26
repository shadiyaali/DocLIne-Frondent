import {
    Card,
    Input,
    Button,
    Typography,
  } from "@material-tailwind/react";
  import React, { useState, useEffect } from "react";
  import axios from "axios";
  import { toast,Toaster } from 'react-hot-toast';
  import login,{ getLocal } from '../../helpers/auth'
  import jwt_decode from 'jwt-decode';
  import { BASE_URL } from "../../utils/config";
  import { useNavigate } from "react-router-dom";
  import registerImage from "../../images/doctor.png";

  
  export default function DoctorApprovalForm() {
    const [departments, setDepartments] = useState([]);
    const navigate = useNavigate()
    

    
    const [address, setAddress] = useState('');
    const [department, setSpecialization] = useState('');
    const [experience, setExperience] = useState('');
    const [fee, setFee] = useState('');
    const [certificate, setCertificate] = useState(null);
    // const [user,setUser] = useState("")
    const user_auth = getLocal('authToken')
    // const  [is_approved,setIs_approved] = useState(false)
    let user_name;
    if(user_auth){
        user_name = jwt_decode(user_auth)
    }
    const createDoctor = async (e) => {
        e.preventDefault()
        try {
          if (!localStorage.getItem('authToken')) {
            // User is not logged in, redirect to login page
            return;
          }
      
          // Validate the input data
          if (address === '') {
            throw new Error('Please enter an address');
          }
      
          if (department === '') {
            throw new Error('Please select a specialization');
          }
      
          if (experience === '') {
            throw new Error('Please enter your experience');
          }
      
          if (fee === '') {
            throw new Error('Please enter your fee');
          }
      
          // Create a new FormData object
          
          const formData = new FormData();
          formData.append('user',user_name.user_id);
          formData.append('address', address);
          formData.append('department', department);
          formData.append('experience', experience);
          formData.append('fee', fee);
          formData.append('certificate', certificate);

          console.log(...formData)
        //   formData.append("is_approved", is_approved);
          // Append the user ID to the FormData object
          
      
          // Submit the form data to the server
          const response = await axios({
            method:'post',
            url:`${BASE_URL}/api/createDoctors/`,
            data:formData
          })
          console.log(response)
        //   post("/api/createDoctors/", formData);
      
          // Check the response status code
          if (response.status === 201) {
            toast.success("succefully sent  request .");
          } else {
            // Error!
            toast.error('Error creating doctor');
          }
        } catch (error) {
          console.log(error);
          toast.error(error.message);
        }
      };

    async function getDepartments() {
      try {
        const response = await axios.get(`${BASE_URL}/api/departments/`)
        setDepartments(response.data);
      } catch (error) {
        console.log("could not fetch data", error);
      }
    }
  
    useEffect(() => {
 
      getDepartments();
    }, []);
  
   
  
    return (
         
      <div className= " h-screen w-screen flex items-center justify-center mb-20">
      <Toaster position="top-center" reverseOrder={false} />
      <div className="h-5/6 w-11/12 rounded-2xl shadow-2xl flex flex-row bg-white">
        <div className=" flex flex-1 rounded-tl-2xl h-full w-full rounded-bl-2xl items-center bg-teal-100 justify-center ">
          <img src={registerImage} className="w-full h-full rounded-tl-2xl rounded-bl-2xl"  alt="Register" />
        </div>
         <div className="h-full w-3/6 flex items-center justify-center">
          <div className="bg-blue h-5/6 w-4/6 mb-20">
            <h1 className="font-bold text-3xl text-teal-800 mt-4 px-24 ">
              Fill The Form
            </h1>
            <form className="h-12 w-full mt-10 space-y-7"  onSubmit={createDoctor}>
              <Input
                size="regular"
                label="Address"
                className="text-start"
                name="address"
                
                onChange={(e) => setAddress(e.target.value)}
              />
    
              <div className="relative">
                <select
                  className="h-10 w-full bg-transparent  outline outline-blue-gray-100 py-3 rounded-md "
                //   label="specialization"
                //   value={specialization}
                  onChange={(e) => setSpecialization(e.target.value)}
                  name="department"
                  id = "department"
                >
                    <>
                  <option value = "select">Select department</option>
                  {departments?.map((department) => (
                    <option  value={department.id}>
                      {department.name}
                    </option>
                  ))}
                  </>
                </select>
              </div>
    
              <Input
                size="regular"
                label="Experience"
                type="number"
                name="experience"
                onChange={(e) => setExperience(e.target.value)}
              />
    
              <Input
                size="regular"
                label="Required Fee in Rs."
                type="number"
                name="fee"
                step="0.01"
                onChange={(e) => setFee(e.target.value)}
              />
    
              <Input
                size="regular"
                label="Certificate"
                type="file"
                name="certificate"
                onChange={(e) => setCertificate(e.target.files[0])}
              />
    
              <Button className="w-full p-3 bg-teal-600 hover:bg-teal-800" type="submit">
                Request
              </Button>
            </form>
            </div>
        </div>
      </div>
    </div>
  );
}