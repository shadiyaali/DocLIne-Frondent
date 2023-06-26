import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { BASE_URL } from "../../utils/config";
import doctorImg from "../../images/download.jpeg";
import { AiOutlineCloseCircle } from 'react-icons/ai';
import Paymentdetails from "../Payment/Paymentdetails";

export default function UserAppointment() {
  const [doctor, setDoctor] = useState({});
  const [date, setDate] = useState('');
  const [slots, setSlots] = useState([]);
  const [selectedSlots, setSelectedSlots] = useState([]);

  const [showDate, setShowDate] = useState(false);
  const [noSlots, setNoSlots] = useState(false);
  const [showPaymentDetails, setShowPaymentDetails] = useState(false);
  const [bookedSlot, setBookedSlot] = useState('');

  const { id } = useParams();

  useEffect(() => {
    getDoctor();
    getSlots();
  }, [date]);

  async function getDoctor() {
    try {
      const response = await axios.get(`${BASE_URL}/api/getDoctorUser/${id}`);
      setDoctor(response.data);
      getSlots(response.data.user?.id); // Pass the doctor's user ID to getSlots
    } catch (e) {
      console.log(e);
    }
  }

  async function getSlots(id) {
    try {
      if (id) {
        const response = await axios.get(`${BASE_URL}/api/getSlotsUser/${id}`);
        setSlots(response.data);
      }
    } catch (e) {
      console.log(e);
    }
  }

  const handleChange = (e) => {
    const selectedDate = e.target.value;
    setDate(selectedDate);
    const selected = slots.filter((slot) => slot.date === e.target.value);
    setNoSlots(selected.length === 0);
    setSelectedSlots(selected);
  };

  const handleClick = (id) => {
    const buttonElement = document.getElementById(id);
    if (buttonElement) {
      buttonElement.classList.toggle('bg-blue-500');
      buttonElement.classList.toggle('bg-green-500');
    }
    const bookedSlot = selectedSlots.find((selected) => selected.id === id);
    setBookedSlot(bookedSlot);
  };

  const toggleDate = () => {
    setShowDate(true);
  };

  const bookAppointment = () => {
    setShowPaymentDetails(true);
  };

  return (
    <div className="flex justify-center mb-28 mt-8">
      <div className="flex flex-col md:flex-row items-center md:items-start mb-6">
        <div className="md:mr-8 justify-center">
          {doctor?.user?.image ? (
            <img
              src={`${BASE_URL + doctor?.user?.image}`}
              alt="profile-picture"
              className="rounded-full w-60 h-60 mx-auto mb-8"
            />
          ) : (
            <img
              src={doctorImg}
              alt="Profile Picture"
              className="rounded-full w-40 h-40 mx-auto md:mx-0 mb-3"
            />
          )}
        </div>
        <div className="text-center md:text-center">
          <h2 className="text-3xl font-bold mb-2">Dr. {doctor?.user?.first_name}</h2>
          {doctor?.department && (
            <p className="text-blue-600 font-bold text-center mb-4">{doctor?.department?.name}</p>
          )}
          <p className="mb-4 ">Phone Number: {doctor?.user?.phone_number}</p>
          <p className="mb-4">Address: {doctor?.address}</p>
          <p className="mb-4">Email: {doctor?.user?.email}</p>
          <p className="mb-4">Fees: Rs {doctor?.fee}</p>
          <p className="mb-4">Experience: {doctor?.experience} Years</p>

          {!showDate ? (
            <button
              className="bg-teal-300 hover:bg-teal-600 text-white py-2 px-9 rounded-md ms-1 mt-2"
              onClick={toggleDate}
            >
              Book Appointment
            </button>
          ) : (
            <div className="mb-4">
              <h5 className="mt-1">Select a Date</h5>
              <input
                type="date"
                id="date"
                value={date}
                onChange={handleChange}
                className="mt-3 border-gray-300 border-2 rounded-md py-2 px-3"
              />
            </div>
          )}
        </div>
      </div>

      {showDate && selectedSlots.length ? (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-lg p-6">
            <div className="flex justify-end">
              <AiOutlineCloseCircle
                className="text-gray-500 cursor-pointer"
                onClick={() => { setShowDate(false); setSelectedSlots([]); }}
              />
            </div>

            <h5 className="mt-4 font-serif text-xl">Available Slots:</h5>
            <div className="grid grid-cols-2 gap-4 mt-4">
              {selectedSlots.map((slot) => (
                <button
                  key={slot.id}
                  className="bg-blue-300 hover:bg-blue-600 text-white py-2 px-4 rounded-md"
                  onClick={() => handleClick(slot.id)}
                  id={slot.id}
                >
                  {slot.start_time}-{slot.end_time}
                </button>
              ))}
            </div>
            <div className="flex justify-center mt-6">
              <button
                className="font-bold text-white bg-teal-300 hover:bg-teal-600 py-3 px-12 rounded-md"
                onClick={bookAppointment}
              >
                Book Now
              </button>
            </div>
          </div>
        </div>
      ) : noSlots ? (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-lg p-6">
            <div className="flex justify-end">
              <AiOutlineCloseCircle
                className="text-gray-500 cursor-pointer"
                onClick={() => { setShowDate(false); setNoSlots(false); }}
              />
            </div>

            <h5 className="mt-4 font-serif text-xl">Available Slots:</h5>
            <div className="grid grid-cols-2 gap-4 mt-4">
              <p className="mt-4">No slots available on that date.</p>
            </div>
          </div>
        </div>
      ) : null}

      {showPaymentDetails && (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50">
          <Paymentdetails doctor={doctor} bookedSlot={bookedSlot} />
        </div>
      )}
    </div>
  );
}
