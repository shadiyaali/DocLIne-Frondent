import React from 'react';
import Sidebar from '../../components/Doctor/Sidebar';
import Dashboard from '../../components/Doctor/Dashboard';
// import Appointment from '../../components/Doctor/Appointment';

function Home() {
  return (
    <div className="flex">
      <Sidebar />
      <div className="w-full overflow-hidden"> {/* Add 'overflow-hidden' class to hide the scroll */}
        <Dashboard />
        {/* <Appointment /> */}
      </div>
    </div>
  );
}

export default Home;
