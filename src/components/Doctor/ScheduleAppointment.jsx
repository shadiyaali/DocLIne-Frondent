import React, { useEffect, useState } from 'react';
import axios from 'axios';
import jwtDecode from 'jwt-decode';
import { getLocal } from '../../helpers/auth';
import { toast, Toaster } from 'react-hot-toast';

const AppointmentSchedule = () => {
  const [doctor, setDoctor] = useState('');
  const [date, setDate] = useState('');
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [status, setStatus] = useState(true);
  const [slotDuration, setSlotDuration] = useState('');
  const [selectedDates, setSelectedDates] = useState([]);

  useEffect(() => {
    const fetchDoctor = async () => {
      try {
        const localResponse = getLocal('authToken');
        const response = jwtDecode(localResponse);
        if (response && response.user_id) {
          setDoctor(response.user_id);
        } else {
          throw new Error('Invalid token');
        }
      } catch (error) {
        console.error(error);
        // Handle token error (e.g., redirect to login, show error message)
      }
    };

    fetchDoctor();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const slotData = {
      doctor,
      date,
      start_time: startTime,
      end_time: endTime,
      status,
      slot_duration: slotDuration,
    };

    try {
      const response = await axios.post('/doctor/scheduleappointment/', slotData);
      console.log(response.data);
      toast.success('Slot created successfully');
    } catch (error) {
      console.error(error);
      toast.error('Failed to create slot');
    }
  };

  const handleDateChange = (e) => {
    setDate(e.target.value);
  };

  const handleAddDate = () => {
    setSelectedDates((prevDates) => [...prevDates, date]);
    setDate('');
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <Toaster position="top-center" reverseOrder={false} limit={1} />
      <div className="bg-white shadow-md rounded-lg p-8 w-full md:max-w-lg">
        <h2 className="text-3xl font-bold mb-6 text-blue-700 justify-center">Schedule</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex flex-col">
            <label htmlFor="chooseDate" className="block font-bold mb-1">
              Choose a Date:
            </label>
            <input
              type="date"
              id="chooseDate"
              value={date}
              onChange={handleDateChange}
              className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500"
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex flex-col">
              <label htmlFor="startTime" className="block text-sm font-bold text-black-600 mb-1">
                Start Time:
              </label>
              <input
                type="time"
                id="startTime"
                value={startTime}
                onChange={(e) => setStartTime(e.target.value)}
                className="w-full border border-gray-300 rounded-md py-2 px-3 text-sm text-black-600 focus:outline-none focus:border-blue-500"
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="endTime" className="block text-sm font-bold text-black-600 mb-1">
                End Time:
              </label>
              <input
                type="time"
                id="endTime"
                value={endTime}
                onChange={(e) => setEndTime(e.target.value)}
                className="w-full border border-gray-300 rounded-md py-2 px-3 text-sm text-gray-700 focus:outline-none focus:border-blue-500"
              />
            </div>
          </div>
          <div className="flex flex-col">
            <label htmlFor="slotDuration" className="block font-bold mb-1">
              Time Duration in minutes:
            </label>
            <input
              type="number"
              id="slotDuration"
              value={slotDuration}
              onChange={(e) => setSlotDuration(e.target.value)}
              className="w-full border-gray-300 border-2 rounded-md py-2 px-3"
            />
          </div>
          <div className="flex items-center">
            <input
              type="checkbox"
              id="status"
              checked={status}
              onChange={(e) => setStatus(e.target.checked)}
              className="mr-2"
            />
            <label htmlFor="status" className="text-gray-700">
              Active
            </label>
          </div>
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded float-right"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
  
  }  

export default AppointmentSchedule;

