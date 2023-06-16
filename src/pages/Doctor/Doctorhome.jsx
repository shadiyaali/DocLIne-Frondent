import React from 'react';
import Sidebar from '../../components/Doctor/Sidebar';
import Appointment from '../../components/Doctor/Appointment';
import { Outlet } from 'react-router-dom';

function DHome() {
  return (
    <div className="flex">
      <Sidebar />
      <div className="w-full overflow-hidden"> {/* Add 'overflow-hidden' class to hide the scroll */}
        <Outlet />
        
      </div>
    </div>
  );
}

export default DHome;
