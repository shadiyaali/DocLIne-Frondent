import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { BASE_URL } from '../../utils/config';

const DoctorDepartments = () => {
  const [departments, setDepartments] = useState([]);

  useEffect(() => {
    async function fetchDepartments() {
      try {
        const response = await axios.get(`${BASE_URL}/api/departments/`);
        setDepartments(response.data);
      } catch (error) {
        console.error('Error fetching departments:', error);
      }
    }

    fetchDepartments();
  }, []);

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-3xl font-bold text-center mb-16">Departments</h2>
      <div className="flex flex-wrap">
        {departments.map((department, index) => (
          <div key={index} className="w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/5 p-4">
            <div className="border p-4">
              <img
                src={`${BASE_URL}${department.image}`}
                alt={department.name}
                className="w-24 h-24 mx-auto mb-2"
              />
              <h3 className="text-lg font-semibold text-center">{department.name}</h3>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DoctorDepartments;
