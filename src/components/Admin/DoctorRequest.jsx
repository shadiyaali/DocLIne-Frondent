import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Avatar from "../../images/download.jpeg";
import { BASE_URL } from '../../utils/config';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function DoctorList() {
  const [doctors, setDoctors] = useState([]);
  const [selectedDoctor, setSelectedDoctor] = useState(null);

  async function getDoctors() {
    try {
      const response = await axios.get(`${BASE_URL}/api/doctorsRequest/`);
      setDoctors(response.data);
      console.log(response.data);
    } catch (error) {
      console.error('Error fetching doctors:', error);
    }
  }

  async function acceptDoctor(id) {
    try {
      const response = await axios.post(`${BASE_URL}/api/acceptdoctor/${id}/`);
      console.log(response.data);
      toast.success(response.data.msg); // Display success toast message
  
      const updatedDoctors = doctors.map((doctor) => {
        if (doctor.id === id) {
          return { ...doctor, is_active: true, is_approved: true }; // Set both is_active and is_approved to true
        }
        return doctor;
      });
  
      setDoctors(updatedDoctors);
      closeDoctorModal();
    } catch (error) {
      console.error('Error accepting doctor:', error);
      toast.error('Error accepting doctor'); // Display error toast message
    }
  }
  
  

  async function rejectDoctor(id) {
    try {
      const response = await axios.post(`${BASE_URL}/api/rejectdoctor/${id}/`);
      console.log(response.data);
      toast.success(response.data.msg); // Display success toast message
      getDoctors();
      closeDoctorModal();
    } catch (error) {
      console.error('Error rejecting doctor:', error);
      toast.error('Error rejecting doctor'); // Display error toast message
    }
  }

  useEffect(() => {
    getDoctors();
  }, []);

  const openDoctorModal = (doctor) => {
    setSelectedDoctor(doctor);
  };

  const closeDoctorModal = () => {
    setSelectedDoctor(null);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-4">Doctors Requests</h1>
      <div className="flex items-center mb-4 justify-end">
        <input
          type="text"
          placeholder="Search by email or name"
          className="border border-gray-300 rounded-lg px-4 py-2 mr-4 focus:outline-none"
        />
        <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg">
          Search
        </button>
      </div>
      <div className="overflow-x-auto">
        <table className="table-auto w-full">
          <thead>
            <tr className="bg-gray-100">
              <th className="px-4 py-2 font-semibold text-gray-800"></th>
              <th className="px-4 py-2 font-semibold text-gray-800">Doctor Name</th>
              <th className="px-4 py-2 font-semibold text-gray-800">Email</th>
              <th className="px-4 py-2 font-semibold text-gray-800">Status</th>
              <th className="px-4 py-2 font-semibold text-gray-800">View</th>
            </tr>
          </thead>
          <tbody className="text-center">
            {doctors.map((doctor, index) => (
              <tr key={index} className="bg-white" style={{ paddingBottom: '0.5rem' }}>
                <td className="px-4 py-2 border-b">
                  <div className="flex items-center justify-center">
                  <img
                      className="h-8 w-8 rounded-full object-cover"
                      src={doctor.image || Avatar}
                      alt="Avatar"
                    />
                  </div>
                </td>
                <td className="px-4 py-2 border-b">
                  <div className="flex items-center justify-center">
                    <p className="font-medium">Dr.{doctor.user.first_name}</p>
                  </div>
                </td>
                <td className="px-4 py-2 border-b">{doctor.user.email}</td>
                <td className="px-4 py-2 border-b">
                  {doctor.is_active ? (
                    <span className="inline-block px-2 py-1 text-xs font-semibold text-light-green-800 bg-green rounded-full">
                      Active
                    </span>
                  ) : (
                    <span className="inline-block px-2 py-1 text-xs font-semibold text-red-800 bg-red-200 rounded-full">
                      Inactive
                    </span>
                  )}
                </td>
                <td className="px-4 py-2 border-b">
                  <button
                    className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg"
                    onClick={() => openDoctorModal(doctor)}
                  >
                    View
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Doctor Request View Modal */}
      {selectedDoctor && (
  <div className="fixed inset-0 bg-gray-900 bg-opacity-75 flex items-center justify-center z-50">
    <div className="bg-white p-6 rounded-lg w-1/2">
      <h2 className="text-2xl font-bold mb-4">Doctor Request</h2>
      <div>
        <p>Doctor Name: Dr. {selectedDoctor.user.first_name}</p>
        <p>Email: {selectedDoctor.user.email}</p>
        <p>Phone Number: {selectedDoctor.user.phone_number}</p>
        <p>Address: {selectedDoctor.address}</p>
        <p>Department: {selectedDoctor.department.name}</p>
        <p>Experience: {selectedDoctor.experience} years</p>
        <p>Fee: ${selectedDoctor.fee}</p>
        {selectedDoctor.certificate && (
          <div>
            <p>
              Certificate:{" "}
              <a href={selectedDoctor.certificate} target="_blank" rel="noopener noreferrer">
                View Certificate
              </a>
            </p>
            <button
              className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg mt-2"
              onClick={closeDoctorModal}
            >
              Back
            </button>
          </div>
        )}
      </div>
      <div className="mt-4">
        <button
          className="bg-light-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg mr-2"
          onClick={() => {
            acceptDoctor(selectedDoctor.id);
            selectedDoctor.is_active = true; // Set the doctor as active
          }}
        >
          Accept
        </button>
        <button
          className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg"
          onClick={() => rejectDoctor(selectedDoctor.id)}
        >
          Reject
        </button>
        <button
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg ml-2"
          onClick={closeDoctorModal}
        >
          Close
        </button>
      </div>
    </div>
  </div>
)}



      <ToastContainer /> {/* Add ToastContainer component from react-toastify */}
    </div>
  );
}

export default DoctorList;

