import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Button,
} from '@material-tailwind/react';
import { BASE_URL } from '../../utils/config';
import { Link } from 'react-router-dom';

function Card2() {
  const [doctors, setDoctors] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [doctorsPerPage] = useState(4);

  useEffect(() => {
    getDoctors();
  }, []);

  async function getDoctors() {
    try {
      const response = await axios.get(`${BASE_URL}/api/homelistdoctor/`);
      setDoctors(response.data);
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  }

  // Pagination Logic
  const indexOfLastDoctor = currentPage * doctorsPerPage;
  const indexOfFirstDoctor = indexOfLastDoctor - doctorsPerPage;
  const currentDoctors = doctors.slice(indexOfFirstDoctor, indexOfLastDoctor);

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className="min-h-screen">
      <div className="container mb-6 mx-auto py-8 bg-gray-200 shadow-xl">
        <h1 className="text-4xl font-bold text-center mb-10 text-teal-600">
          Our Specialists
        </h1>
        <div className="flex flex-wrap gap-6 justify-center">
          {currentDoctors.map((doctor) => (
            <Card
              key={doctor.id}
              className="w-72 flex flex-col shadow-2xl shadow-gray-500/10"
            >
              <CardHeader className="relative h-56">
                <img
                  alt="Card Image"
                  src={`${BASE_URL + doctor?.user?.image}`}
                  className="h-full w-full object-cover rounded-md"
                />
              </CardHeader>
              <CardBody>
                <Typography
                  variant="h4"
                  color="blue-gray"
                  className="mb-2 text-center"
                >
                  Dr. {doctor?.user.first_name}
                </Typography>
                <Typography
                  color="gray"
                  className="text-blue-600 font-bold text-center"
                  textGradient
                >
                  {doctor?.department.name}
                </Typography>
                <Typography
                  color="gray"
                  className="font-semibold"
                  textGradient
                >
                  Experience: {doctor?.experience} years
                </Typography>
                <Typography
                  color="gray"
                  className="font-semibold"
                  textGradient
                >
                  Fee: ${doctor?.fee}
                </Typography>
              </CardBody>
              <CardFooter className="px-3">
              <Link to={`/userappointment/${doctor.id}`}>
                  <button className="py-3 bg-teal-300 hover:bg-teal-600 w-full text-white">Book Now</button>
                </Link>
              </CardFooter>
            </Card>
          ))}
        </div>
        {doctors.length > doctorsPerPage && (
          <div className="flex justify-center mt-5">
            {currentPage !== 1 && (
              <Button
                color="blueGray"
                className="mx-2 mt-6 mb-6  bg-green hover:bg-teal-300"
                onClick={() => paginate(currentPage - 1)}
              >
                Previous Page
              </Button>
            )}
            {currentPage !== Math.ceil(doctors.length / doctorsPerPage) && (
              <Button
                color="blueGray"
                className="mx-2 mt-6 mb-6 bg-green hover:bg-teal-300"
                onClick={() => paginate(currentPage + 1)}
              >
                Next Page
              </Button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default Card2;
