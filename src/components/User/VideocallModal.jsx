import { Fragment, useCallback, useEffect, useRef, useState } from "react";
// import { Dialog, Transition } from "@headlessui/react";
import { Button } from "@material-tailwind/react";
import { toast } from 'react-toastify';
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../../utils/config";
import doctorImg from "../../images/download.jpeg"
import { FaVideo } from 'react-icons/fa'

import { useSocket } from '../SocketContext/SocketProvider';



function VideocallModal({doctor,setShow}) {
 
    const socket = useSocket()
  

    const Email = 'patient@gmail.com'
    const navigate = useNavigate()
  
    const handleSubmitForm = useCallback(() => {
      
      console.log('hj')
      // e.preventDefault()
      console.log('actual doc', doctor);
      socket?.emit("room:join", { Email, doctor: doctor?.id })
  
    }, [Email, doctor, socket])
  
   
  
    const handleJoinRoom = useCallback((data) => {
      const { Email, doctor } = data
      console.log(data,'adipoli')
      navigate(`/room/${doctor}`)
    }, [navigate])
  
  useEffect(() => {
    socket?.on("room:join", handleJoinRoom)
    return () => {
      socket?.off("room:join", handleJoinRoom)
    }
   },[socket])
  
  


    return (
            <div className="w-full">
            <div className="bg-gray-200 font-sans h-screen w-full flex flex-row justify-center items-center">
                <div className="card w-96 mx-auto bg-white  shadow-xl hover:shadow">
                {
                    doctor?.user?.image ? (
                        <img
                          src={`${BASE_URL}${doctor?.user?.image}`}
                          alt="profile-picture"
                          className="rounded-full w-60 h-60 mx-auto "
                        />
                      ) : (
                        <img
                          src={doctorImg}
                          alt="Profile Picture"
                          className="rounded-full w-40 h-40 mx-auto md:mx-0 mb-3"
                        />
                      )
                }
                <div className="text-center mt-2 text-3xl font-medium">{doctor?.user?.first_name}</div>
                <div className="text-center mt-2 font-light text-sm">{doctor?.user?.email}</div>
                <div className="text-center font-normal text-lg">{doctor?.department?.name}</div>
      
                <hr className="mt-8" />
                <div className="flex p-4">
                    <div className="w-1/2 text-center">
                    <Button  className="bg-red-500" onClick={()=>setShow(false)}>Back</Button>
                    </div>
                    <div className="w-0 border border-gray-300">
                    </div>
                    <div className="w-1/2 text-center" >
                    <Button className="bg-green" onClick={()=> handleSubmitForm()}>Start</Button>
                    </div>
                </div>
                </div>
            </div>
            </div>
    )
}

export default VideocallModal