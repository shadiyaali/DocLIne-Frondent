import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Card, Typography, Button } from "@material-tailwind/react";
import { BASE_URL } from "../../utils/config";
import { Rating } from "@material-tailwind/react";


function Doctor() {
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
    <div className="container mx-auto p-8">
      <h1 className="text-3xl font-bold text-center mb-20 mr-7">OUR DOCTORS</h1>
      <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {doctors.map((doctor) => (
          <Card key={doctor.id} className="p-2 shadow-md hover:shadow-lg border-2 border-blue-200">
            <div className="flex flex-col justify-center items-center">
              
                <div className="flex items-center">
                <div className="">
                <img
                src={`${BASE_URL + doctor.user.image}`}
                alt={doctor.user.first_name }
                className="h-24 w-24 object-cover rounded-md"
              />
              </div>
              <div className="p-4 flex flex-col text-center justify-center">
                <p className="mb-2 font-bold leading-5 text-2xl ">
                  Dr.{doctor.user.first_name}
                </p>
                <Typography variant="subtitle1" className="text-center">
                  {doctor.department.name}
                </Typography>
                <Typography variant="subtitle2" className="">
                  Experience: {doctor.experience} years
                </Typography>
                <Typography variant="subtitle2">
                  Fee: ${doctor.fee}
                </Typography>
                
                </div>
                
                </div>
                <Rating value={4} readonly />
                
 
 
                  

              
                <Button
                  color="blue"
                  size="regular"
                  className="mt-4 w-full"
                >
                  Book Now
                </Button>
              
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}

export default Doctor;
