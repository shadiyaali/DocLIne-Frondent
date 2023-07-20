import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Card, CardBody, Typography,CardHeader } from "@material-tailwind/react";
import { BASE_URL } from "../../utils/config";
import { Carousel } from "@material-tailwind/react";
 
 


function Department() {
  const [departments, setDepartments] = useState([]);

  useEffect(() => {
    getDepartments();
  }, []);

  async function getDepartments() {
    try {
      const response = await axios.get('https://www.docline.online/api/homelistdepartment/');
      setDepartments(response.data);
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div className="container mx-auto p-8 shadow-xl bg-gray-200  ">
      <h1 className="text-3xl font-bold text-center  text-teal-600  ">
      
        <span className="border-b-  pb-2 mt-15 mr-4">Our Main</span>Departments
      </h1>
      
      <div className="grid mt-20 grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-5">
     
        {departments.map((department) => (
        <Card key={department.id} className="w-auto flex-col justify-center shadow-lg hover:shadow-lg border-2 p-4">
        <CardHeader className="relative h-56">
          <img
            src={`${BASE_URL + department.image}`}
            alt={department.name}
            className="h-full w-full object-cover"
          />
        </CardHeader>
        <CardBody className="text-center">
          <Typography variant="h5" color="blue-gray" className="mb-3 font-bold">
            {department.name}
          </Typography>
           
        </CardBody>
      </Card>
      
       
       
        ))}
       
      </div>
      
    </div>
   
  );
}

export default Department;


