import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { BASE_URL } from '../../utils/config';
import { toast, Toaster } from 'react-hot-toast';
import jwt_decode from 'jwt-decode';
import { getLocal } from '../../helpers/auth';

const DoctorPage = () => {
  const [slots, setSlots] = useState([]);
  const [selectedDate, setSelectedDate] = useState('');
  const [slotsAvailable, setSlotsAvailable] = useState(true);
  const user_auth = getLocal('authToken');
  const user_name = user_auth ? jwt_decode(user_auth) : null;

  useEffect(() => {
    fetchSlots();
  }, [selectedDate]);

  const fetchSlots = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/api/getSlotsUser/${user_name.user_id}/`);
      setSlots(response.data);
      setSlotsAvailable(true); // Reset the slots availability
    } catch (error) {
      console.error('Error fetching slots:', error);
    }
  };

  const handleDateChange = (e) => {
    setSelectedDate(e.target.value);
    setSlotsAvailable(false); // Reset the slots availability until the new slots data is fetched
  };

  const getSlotClassName = (slot) => {
    if (slot.is_booked) {
      return 'text-red-500';
    }
    return '';
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <Toaster position="top-center" reverseOrder={false} limit={1} />
      <div className="bg-white shadow-md rounded-lg p-8 w-full md:max-w-lg">
        <h2 className="text-3xl font-bold mb-6 text-blue-700 text-center">Doctor Slots</h2>
        <div className="mt-4">
          <div className="mb-4">
            <h5 className="mt-1">Select a Date</h5>
            <input
              type="date"
              id="date"
              value={selectedDate}
              onChange={handleDateChange}
              className="mt-3 border-gray-300 border-2 rounded-md py-2 px-3"
            />
          </div>
          {selectedDate !== '' && slots.length > 0 ? (
            <ul className="divide-y divide-gray-300">
              {slots.map((slot) => (
                slot.date === selectedDate && (
                  <li key={slot?.id} className="py-4">
                    {/* <div className="font-bold text-lg mb-2">{slot?.date}</div> */}
                    <div className={`font-bold text-lg mb-2 ${getSlotClassName(slot)}`}>{slot?.start_time}-{slot?.end_time}</div>
                  </li>
                )
              ))}
            </ul>
          ) : (
            selectedDate !== '' && <p className="text-center">No slots available for the selected date.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default DoctorPage;
