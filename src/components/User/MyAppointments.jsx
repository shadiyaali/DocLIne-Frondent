import React, { useState, useEffect } from "react";
import axios from "axios";
import { BASE_URL } from "../../utils/config";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import jwt_decode from "jwt-decode";
import { getLocal } from "../../helpers/auth";
import Prescriptions from "./Prescriptions";
import { FaVideo } from "react-icons/fa";
import VideocallModal from "./VideocallModal";

const MyAppointments = () => {
  const [appointments, setAppointments] = useState([]);
  const [completedAppointments, setCompletedAppointments] = useState([]);
  const [showPrescriptions, setShowPrescriptions] = useState(false);
  const user_auth = getLocal("authToken");
  const user_name = user_auth ? jwt_decode(user_auth) : null;
  const [showVideo, setShowVideo] = useState(false);

  async function getAppointments() {
    try {
      const response = await axios.get(
        `${BASE_URL}/api/getappointments/${user_name.user_id}`
      );
      const filteredAppointments = response.data.filter((appointment) => {
        if (appointment.status !== "completed") {
          appointment.canCall = false;
          return true;
        }
        return false;
      });
      // const updatedFiltered
      setAppointments(filteredAppointments);
      setCompletedAppointments(
        response.data.filter(
          (appointment) => appointment.status === "completed"
        )
      );
    } catch (error) {
      console.error("Error fetching appointments:", error);
    }
  }
  let timer;
  useEffect(() => {
    getAppointments();
  }, []);

  // useEffect(() => {
  //   timer = setInterval(() => {
  //     setAppointments((prev) => {
  //       return prev.map((singleAppointment) => {
  //         const appointmentTime = new Date(singleAppointment.slot.date);
  //         console.log('can call' , appointmentTime >= Date.now());
  //         if (appointmentTime >= Date.now()) {
  //           singleAppointment.canCall = true;
  //         } else {
  //           singleAppointment.canCall = false;  
  //         }
  //         return singleAppointment;
  //       });
  //     });
  //   }, 1000);
  //   return () => {
  //     clearInterval(timer);
  //   };
  // }, []);

  const handleCancelAppointment = async (appointmentId) => {
    try {
      await axios.put(`${BASE_URL}/api/appointments/${appointmentId}`, {
        status: "cancelled",
      });
      toast.success("Appointment cancelled successfully");
      getAppointments();
    } catch (error) {
      console.error("Error cancelling appointment:", error);
      toast.error("Failed to cancel appointment");
    }
  };

  const handleViewPrescriptions = () => {
    setShowPrescriptions(true);
  };

  const handleClosePrescriptions = () => {
    setShowPrescriptions(false);
  };

  const handleCall = (doctorId) => {
    setShowVideo({ status: true, doctorId });
  };

  function canCall (start, end, date) {
    const appointmentStartTime = new Date(`${date}T${start}`);
    const appointmentEndTime = new Date(`${date}T${end}`)
    const now = new Date()
    if (appointmentStartTime <= now && appointmentEndTime >= now) {
      return true
    }else {
      return false
    }
  }

  return (
    <>
      {showVideo ? (
        <div className="">
          <VideocallModal setShow={setShowVideo} doctor={showVideo.doctorId} />
        </div>
      ) : (
        <div className="container mx-auto px-4 py-8 mb-28 mt-16">
          <h2 className="text-3xl font-bold mb-4 text-left">
            Your Appointments
          </h2>
          <div className="overflow-x-auto">
            {appointments.length > 0 ? (
              <table className="table-auto w-full mb-8">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="px-4 py-2 font-semibold text-gray-800">
                      Date
                    </th>
                    <th className="px-4 py-2 font-semibold text-gray-800">
                      Doctor
                    </th>
                    <th className="px-4 py-2 font-semibold text-gray-800">
                      Fee
                    </th>
                    <th className="px-4 py-2 font-semibold text-gray-800">
                      Start Time
                    </th>
                    <th className="px-4 py-2 font-semibold text-gray-800">
                      End Time
                    </th>
                    <th className="px-4 py-2 font-semibold text-gray-800">
                      Status
                    </th>
                  </tr>
                </thead>
                <tbody className="text-center">
                  {appointments.map((appointment, index) => (
                    <tr
                      key={index}
                      className="bg-white"
                      style={{ paddingBottom: "0.5rem" }}
                    >
                      <td className="px-4 py-2 border-b">
                        {new Date(appointment?.slot?.date).toLocaleDateString()} {/* Updated date format */}
                     </td>
                      <td className="px-4 py-2 border-b">
                        {appointment?.doctor?.user?.first_name}
                      </td>
                      <td className="px-4 py-2 border-b">
                        {appointment?.doctor?.fee}
                      </td>
                      <td className="px-4 py-2 border-b">
        {new Date(`01/01/2000 ${appointment?.slot?.start_time}`).toLocaleTimeString([], {
          hour: 'numeric',
          minute: '2-digit',
          hour12: true,
        })} {/* Updated start time format */}
      </td>
      <td className="px-4 py-2 border-b">
        {new Date(`01/01/2000 ${appointment?.slot?.end_time}`).toLocaleTimeString([], {
          hour: 'numeric',
          minute: '2-digit',
          hour12: true,
        })} {/* Updated end time format */}
      </td>
                      <td className="px-4 py-2 border-b">
                        {appointment?.status === 'pending' ? 'pending' :
                        canCall(appointment?.slot?.start_time,appointment?.slot?.end_time, appointment?.slot?.date) ? (
                          appointment?.status === "approved" ? (
                            <FaVideo
                              className="mx-auto w-6 h-6 mt-2 cursor-pointer"
                              onClick={() =>{
                                console.log(appointment?.doctor)
                                handleCall(appointment?.doctor)}
                              }
                            />
                          ) : (
                            appointment?.status
                          )
                        ) : (
                          "cant call now"
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <p className="text-center text-lg font-bold">
                No upcoming appointments
              </p>
            )}

            {completedAppointments.length > 0 && (
              <>
                <h2 className="text-3xl font-bold mb-4 text-left">
                  Appointment History
                </h2>
                <table className="table-auto w-full">
                  <thead>
                    <tr className="bg-gray-100">
                      <th className="px-4 py-2 font-semibold text-gray-800">
                        Date
                      </th>
                      <th className="px-4 py-2 font-semibold text-gray-800">
                        Doctor
                      </th>
                      <th className="px-4 py-2 font-semibold text-gray-800">
                        Fee
                      </th>
                      <th className="px-4 py-2 font-semibold text-gray-800">
                        Start Time
                      </th>
                      <th className="px-4 py-2 font-semibold text-gray-800">
                        End Time
                      </th>
                      <th className="px-4 py-2 font-semibold text-gray-800">
                        Status
                      </th>
                    </tr>
                  </thead>
                  <tbody className="text-center">
                    {completedAppointments.map((appointment, index) => (
                      <tr
                        key={index}
                        className="bg-white"
                        style={{ paddingBottom: "0.5rem" }}
                      >
                        <td className="px-4 py-2 border-b">
                          <div className="flex text-center justify-center">
                            <p className="font-medium">
                              {appointment?.slot?.date}
                            </p>
                          </div>
                        </td>
                        <td className="px-4 py-2 border-b">
                          {appointment?.doctor?.user?.first_name}
                        </td>
                        <td className="px-4 py-2 border-b">
                          {appointment?.doctor?.fee}
                        </td>
                        <td className="px-4 py-2 border-b">
                          {appointment?.slot?.start_time}
                        </td>
                        <td className="px-4 py-2 border-b">
                          {appointment?.slot?.end_time}
                        </td>
                        <td className="px-4 py-2 border-b">
                          {appointment?.status}
                        </td>
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
          {showPrescriptions && (
            <Prescriptions onClose={handleClosePrescriptions} />
          )}
          <ToastContainer />{" "}
          {/* Toast container for displaying success/error messages */}
        </div>
      )}
    </>
  );
};

export default MyAppointments;
