import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { BASE_URL } from '../../utils/config';
import { Link } from 'react-router-dom';
import { FaRupeeSign } from 'react-icons/fa';

import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Tooltip,
  Button,
} from '@material-tailwind/react';

function UserDoctor() {
  const [doctors, setDoctors] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredDoctors, setFilteredDoctors] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [doctorsPerPage] = useState(8);

  useEffect(() => {
    getDoctors();
  }, []);

  async function getDoctors() {
    try {
      const response = await axios.get(`${BASE_URL}/api/homelistdoctor/`);
      setDoctors(response.data);
      setFilteredDoctors(response.data);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    const filtered = doctors.filter(
      (doctor) =>
        doctor.user.first_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        doctor.department.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredDoctors(filtered);
  }, [doctors, searchQuery]);

  // Pagination Logic
  const indexOfLastDoctor = currentPage * doctorsPerPage;
  const indexOfFirstDoctor = indexOfLastDoctor - doctorsPerPage;
  const currentDoctors = filteredDoctors.slice(indexOfFirstDoctor, indexOfLastDoctor);

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
    setCurrentPage(1); // Reset pagination to first page when performing a search
  };

  return (
    <>
      <h1 className="text-3xl font-bold text-center mb-12 text-teal-600 mt-6">
        <div className="pb-6 mt-15 mr-4 font-bold">DOCTORS</div>
      </h1>
      <div className="flex flex-wrap gap-20 justify-center">
        <div className="w-full mx-32">
          <form>
            <label htmlFor="default-search" className="mb-2 text-sm font-medium text-gray-900 sr-only">
              Search
            </label>
            <div className="relative">
              <div className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
                <svg
                  className="w-5 h-5 text-gray-500 dark:text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </div>
              <input
                type="search"
                id="default-search"
                className="block p-4 pl-10 w-full text-sm text-gray-900  rounded-lg border  focus:border-gray-500   dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500 outline-none"
                placeholder="Search Doctors, Departments, Or any related ..."
                onChange={handleSearch}
                value={searchQuery}
                required
              />
              <button
                type="submit"
                className="text-white absolute right-2.5 bottom-2.5 bg-teal-400 hover:bg-teal-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                Search
              </button>
            </div>
          </form>
        </div>

        {currentDoctors.length === 0 ? (
          <div className="text-center text-gray-500">No doctors found</div>
        ) : (
          currentDoctors.map((doctor) => (
            <Card key={doctor.id} className="w-72 flex flex-col shadow-2xl mb-28">
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
                Fee: <FaRupeeSign className="inline-block text-gray-600" /> {doctor?.fee}
              </Typography>
              </CardBody>
              <CardFooter className="px-3">
                <Link to={`/userappointment/${doctor.id}`}>
                  <button className="py-3 bg-teal-300 hover:bg-teal-600 w-full text-white">Book Now</button>
                </Link>
              </CardFooter>
            </Card>
          ))
        )}
      </div>

      {filteredDoctors.length > doctorsPerPage && (
        <div className="flex justify-center mt-5">
          {currentPage !== 1 && (
            <Button color="blueGray" className="mx-2 mb-8 bg-green hover:bg-teal-300" onClick={() => paginate(currentPage - 1)}>
              Previous Page
            </Button>
          )}
          {currentPage !== Math.ceil(filteredDoctors.length / doctorsPerPage) && (
            <Button color="teal"  className="mx-2 mb-8  bg-green hover:bg-teal-300" onClick={() => paginate(currentPage + 1)}>
              Next Page
            </Button>
          )}
        </div>
      )}
    </>
  );
}

export default UserDoctor;
