import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { BASE_URL } from '../../utils/config';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import jwt_decode from 'jwt-decode';
import { getLocal } from '../../helpers/auth';
import Prescriptions from './Prescriptions';

const MyAppointments = () => {
  const [appointments, setAppointments] = useState([]);
  const [completedAppointments, setCompletedAppointments] = useState([]);
  const [showPrescriptions, setShowPrescriptions] = useState(false);
  const user_auth = getLocal('authToken');
  const user_name = user_auth ? jwt_decode(user_auth) : null;

  async function getAppointments() {
    try {
      const response = await axios.get(`${BASE_URL}/api/getappointments/${user_name.user_id}`);
      console.log(response);
      setAppointments(response.data.filter(appointment => appointment.status !== 'completed'));
      setCompletedAppointments(response.data.filter(appointment => appointment.status === 'completed'));
    } catch (error) {
      console.error('Error fetching appointments:', error);
    }
  }

  useEffect(() => {
    getAppointments();
  }, []);

  const handleCancelAppointment = async (appointmentId) => {
    try {
      await axios.put(`${BASE_URL}/api/appointments/${appointmentId}`, { status: 'cancelled' });
      toast.success('Appointment cancelled successfully');
      getAppointments();
    } catch (error) {
      console.error('Error cancelling appointment:', error);
      toast.error('Failed to cancel appointment');
    }
  };

  const handleViewPrescriptions = () => {
    setShowPrescriptions(true);
  };

  const handleClosePrescriptions = () => {
    setShowPrescriptions(false);
  };

  return (
    <div className="container mx-auto px-4 py-8 mb-28 mt-16">
      <h2 className="text-3xl font-bold mb-4 text-left">Your Appointments</h2>
      <div className="overflow-x-auto">
        {appointments.length > 0 ? (
          <table className="table-auto w-full mb-8">
            <thead>
              <tr className="bg-gray-100">
                <th className="px-4 py-2 font-semibold text-gray-800">Date</th>
                <th className="px-4 py-2 font-semibold text-gray-800">Doctor</th>
                <th className="px-4 py-2 font-semibold text-gray-800">Fee</th>
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
                  <td className="px-4 py-2 border-b">{appointment?.doctor?.fee}</td>
                  <td className="px-4 py-2 border-b">{appointment?.slot?.start_time}</td>
                  <td className="px-4 py-2 border-b">{appointment?.slot?.end_time}</td>
                  <td className="px-4 py-2 border-b">{appointment?.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p className="text-center text-lg font-bold">No upcoming appointments</p>
        )}

        {completedAppointments.length > 0 && (
          <>
            <h2 className="text-3xl font-bold mb-4 text-left">Appointment History</h2>
            <table className="table-auto w-full">
              <thead>
                <tr className="bg-gray-100">
                  <th className="px-4 py-2 font-semibold text-gray-800">Date</th>
                  <th className="px-4 py-2 font-semibold text-gray-800">Doctor</th>
                  <th className="px-4 py-2 font-semibold text-gray-800">Fee</th>
                  <th className="px-4 py-2 font-semibold text-gray-800">Start Time</th>
                  <th className="px-4 py-2 font-semibold text-gray-800">End Time</th>
                  <th className="px-4 py-2 font-semibold text-gray-800">Status</th>
                </tr>
              </thead>
              <tbody className="text-center">
                {completedAppointments.map((appointment, index) => (
                  <tr key={index} className="bg-white" style={{ paddingBottom: '0.5rem' }}>
                    <td className="px-4 py-2 border-b">
                      <div className="flex text-center justify-center">
                        <p className="font-medium">{appointment?.slot?.date}</p>
                      </div>
                    </td>
                    <td className="px-4 py-2 border-b">{appointment?.doctor?.user?.first_name}</td>
                    <td className="px-4 py-2 border-b">{appointment?.doctor?.fee}</td>
                    <td className="px-4 py-2 border-b">{appointment?.slot?.start_time}</td>
                    <td className="px-4 py-2 border-b">{appointment?.slot?.end_time}</td>
                    <td className="px-4 py-2 border-b">{appointment?.status}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </>
        )}

        <div className="flex justify-center mt-4">
          <button
            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
            onClick={handleViewPrescriptions}
          >
            View Prescriptions
          </button>
        </div>
      </div>

      {showPrescriptions && <Prescriptions onClose={handleClosePrescriptions} />}

      <ToastContainer /> {/* Toast container for displaying success/error messages */}
    </div>
  );
};

export default MyAppointments;
