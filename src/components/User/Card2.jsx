import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Tooltip,
  Button,
   
} from "@material-tailwind/react";
import { Fragment } from "react";
 
import React, { useEffect, useState } from 'react';
import axios from 'axios';  
import { BASE_URL } from "../../utils/config";
import Loginimage from "../../images/download (3).jpeg";

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
    <div className=" min-h-screen  ">
       
 
 
{/*  
    // <Fragment>
    //   <Typography variant="h1" color="blue-gray">
    //   The kit comes with three pre-built pages to help you get started
    //             faster. You can change the text and images and you're good to
    //             go. Just make sure you enable them first via JavaScript.
    //   </Typography>
       
    // </Fragment> */}
  
      <div className="container mb-6 mx-auto py-8 bg-gray-200   shadow-xl">
      
        <h1 className="text-4xl font-bold text-center mb-10 text-teal-600">
          Our Specialist
        </h1>
        <div className="flex flex-wrap gap-6 justify-center">
          {doctors?.map(doctor => (
            <Card className="w-72 flex flex-col shadow-2xl shadow-gray-500/10">
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
              <Button
                color="teal"
                variant="outline"
                fullWidth
                className="text-white"
              >
                Book Now
              </Button>
            </CardFooter>
          </Card>
          
          ))}
        </div>
       
      </div>
           
    </div>
  );
          }  
          export default Card2 ; 