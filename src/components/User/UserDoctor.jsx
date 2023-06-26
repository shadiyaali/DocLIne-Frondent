import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Tooltip,
  Button,
} from "@material-tailwind/react";
import React, { useEffect, useState } from 'react';
import axios from 'axios';  
import { BASE_URL } from "../../utils/config";
import { Link} from "react-router-dom";
 
function UserDoctor() {
  const [doctors, setDoctors] = useState([]);

  useEffect(() => {
    getDoctors();
  }, []);

  async function getDoctors() {
    try {
      const response = await axios.get('http://localhost:8000/api/homelistdoctor/');
      setDoctors(response.data);
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  }
  return (
      <> 
       <h1 className="text-3xl font-bold text-center mb-12 text-teal-600 mt-6  ">
    
    <div className="pb-6 mt-15 mr-4 font-bold ">   DOCTORS </div>
   </h1>
    <div className="flex flex-wrap gap-20 justify-center  ">
      
    {
      doctors?.map(doctor => (
        <Card className="w-72 flex flex-col shadow-2xl mb-28">
        <CardHeader className="relative h-56">
          <img
            alt="Card Image"
            src={`${BASE_URL + doctor?.user?.image}`}
            className="h-full w-full object-cover rounded-md"
          />
        </CardHeader>
        <CardBody>
          <Typography variant="h4" color="blue-gray" className="mb-2 text-center">
            Dr. {doctor?.user.first_name}
          </Typography>
          <Typography color="gray" className="text-blue-600 font-bold text-center" textGradient>
            {doctor?.department.name}
          </Typography>
          <Typography color="gray" className="font-semibold" textGradient>
            Experience: {doctor?.experience} years
          </Typography>
          <Typography color="gray" className="font-semibold" textGradient>
            Fee: ${doctor?.fee}
          </Typography>
        </CardBody>
        <CardFooter className="px-3">
        <Link to={`/userappointment/${doctor.id}`}>
          <button className=" py-3 bg-teal-300 hover:bg-teal-600 w-full text-white">Book Now</button>
        </Link>
        </CardFooter>
      </Card>
      ))
    }
    
    </div>
    </>
  );
}
export default UserDoctor;  