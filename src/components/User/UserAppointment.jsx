import React, { useState } from 'react';


const AppointmentPage = () => {
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);

  const doctors = [
    { id: 1, name: 'Dr. John Doe', image: 'doctor1.jpg' },
    { id: 2, name: 'Dr. Jane Smith', image: 'doctor2.jpg' },
    // Add more doctors here
  ];

  const handleDoctorSelection = (doctor) => {
    setSelectedDoctor(doctor);
  };

  const handleDateSelection = (date) => {
    setSelectedDate(date);
  };

  const handleTimeSelection = (time) => {
    setSelectedTime(time);
  };

  const handleAppointmentBooking = () => {
    // Implement your appointment booking logic here
    // You can access the selectedDoctor, selectedDate, and selectedTime states
  };

  return (
    <div>
      <h1>Book an Appointment</h1>
      <h2>Choose a Doctor</h2>
      <div className="doctor-list">
        {doctors.map((doctor) => (
          <div
            key={doctor.id}
            className={`doctor ${selectedDoctor && selectedDoctor.id === doctor.id ? 'selected' : ''}`}
            onClick={() => handleDoctorSelection(doctor)}
          >
            <img src={doctor.image} alt={doctor.name} />
            <span>{doctor.name}</span>
          </div>
        ))}
      </div>

      {selectedDoctor && (
        <div>
          <h2>Choose a Date</h2>
          {/* Implement date selection component here */}
          <h2>Choose a Time</h2>
          {/* Implement time selection component here */}
          <button onClick={handleAppointmentBooking}>Book Now</button>
        </div>
      )}
    </div>
  );
};

export default AppointmentPage;
