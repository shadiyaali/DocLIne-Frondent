import {
    Card,
    CardHeader,
    CardBody,
    CardFooter,
    Typography,
    Tooltip,
  } from "@material-tailwind/react";
  import React, { useEffect, useState } from 'react';
  import axios from 'axios';  
import { BASE_URL } from "../../utils/config";
   
function Card2() {
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
        <h1 className="text-3xl font-bold text-center mb-12 text-teal-600 ">
      
      <span className="border-b-  pb-2 mt-15 mr-4">TOP</span>  DOCTORS
    </h1>
      <div className="flex flex-wrap gap-20 justify-center  ">
        
      {
        doctors?.map(doctor => (
            <Card className="w-80 flex flex-col shadow-lg ">
        <div floated={false} className="flex justify-center items-center">
          <img src={`${BASE_URL + doctor?.user?.image}`} alt="profile-picture" className="rounded "/>
        </div>
        <CardBody className="text-center">
          <Typography variant="h3" color="blue-gray" className="mb-2">
            Dr.{ doctor?.user.first_name }
          </Typography>
          <Typography color="gray" className=" text-blue-400" textGradient>
          {doctor?.department.name}
          </Typography>
          <Typography color="gray" className="font-bold" textGradient>
          Experience: {doctor?.experience} years
          </Typography>
          <Typography color="gray" className="font-bold" textGradient>
          Fee: ${doctor?.fee}
          </Typography>
        </CardBody>
        <CardFooter className=" px-3">
           
           
          <button className="btn btn-outline bg-green   w-full text-white ">Book Now</button>
        </CardFooter>
      </Card>
        ))
      }
      
      </div>
      </>
    );
  }
export default Card2  