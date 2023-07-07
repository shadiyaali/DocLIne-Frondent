import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { BASE_URL } from '../../utils/config';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AdminAppointments = () => {
  const [appointments, setAppointments] = useState([]);

  async function getAppointments() {
    try {
      const response = await axios.get(`${BASE_URL}/api/appointments/`);
      console.log(response);
      setAppointments(response.data);
    } catch (error) {
      console.error('Error fetching appointments:', error);
    }
  }

  useEffect(() => {
    getAppointments();
  }, []);

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-3xl font-bold mb-4 text-left">Doctor Appointments</h2>
      <div className="overflow-x-auto">
        <table className="table-auto w-full">
          <thead>
            <tr className="bg-gray-100">
              <th className="px-4 py-2 font-semibold text-gray-800">Date</th>
              <th className="px-4 py-2 font-semibold text-gray-800">Doctor</th>
              <th className="px-4 py-2 font-semibold text-gray-800">Patient</th>
              <th className="px-4 py-2 font-semibold text-gray-800">Start Time</th>
              <th className="px-4 py-2 font-semibold text-gray-800">End Time</th>
              <th className="px-4 py-2 font-semibold text-gray-800">Status</th>
            </tr>
          </thead>
          <tbody className="text-center">
            {appointments.map((appointment, index) => (
              <tr key={index} className="bg-white" style={{ paddingBottom: '0.5rem' }}>
                <td className="px-4 py-2 border-b">
                  <div className="flex text-center justify-center">
                    <p className="font-medium">{appointment?.slot?.date}</p>
                  </div>
                </td>
                <td className="px-4 py-2 border-b">{appointment?.doctor?.user?.first_name}</td>
                <td className="px-4 py-2 border-b">{appointment?.patient?.first_name}</td>
                <td className="px-4 py-2 border-b">{appointment?.slot?.start_time}</td>
                <td className="px-4 py-2 border-b">{appointment?.slot?.end_time}</td>
                <td className="px-4 py-2 border-b">{appointment?.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <ToastContainer /> {/* Toast container for displaying success/error messages */}
    </div>
  );
};

export default AdminAppointments;
