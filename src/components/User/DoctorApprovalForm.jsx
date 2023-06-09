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
            // Success!
            localStorage.removeItem('authToken')
            navigate('/login',{state:{msg:"Pls login again to access the doctor dashboard"}})
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
    //   const localResponse = getLocal('authToken');
    //   const decoded = jwt_decode(localResponse)
    //   setUser(decoded.user_id)
      getDepartments();
    }, []);
  
   
  
    return (
        <div className="flex justify-center items-center h-screen bg-grey">
          <Toaster position="top-center" reverseOrder={false} limit={1} />
          <Card color="white" shadow={false} className="border-2 border-black p-4 w-96 ">
            <Typography variant="h4" color="gray-800" className="font-serif mt-2">
              FILL THE FORM
            </Typography>
            <form className="mt-8 space-y-4" onSubmit={createDoctor}>
              <Input
                size="regular"
                label="Address"
                className="text-start"
                name="address"
                
                onChange={(e) => setAddress(e.target.value)}
              />
    
              <div className="relative">
                <select
                  className="w-full py-2 border border-black rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
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
    
              <Button className="w-full p-3 bg-indigo-500" type="submit">
                Request
              </Button>
            </form>
          </Card>
        </div>
      );
    }   
  