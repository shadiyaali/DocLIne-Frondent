import React, { useEffect, useState } from 'react';
import axios from 'axios';
import jwt_decode from 'jwt-decode';
import { useParams } from 'react-router-dom';
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Tooltip,
  Button,
  Input,
} from "@material-tailwind/react";
import { BASE_URL } from "../../utils/config";
import doctorImg from "../../images/download.jpeg";
import img from "../../images/download (2).jpeg"

function UserProfile() {
  const [user, setUser] = useState(null);
  const [editing, setEditing] = useState(false);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [profileImage, setProfileImage] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    getUser();
  }, []);

  async function getUser() {
    try { 
      const response = await axios.get(`${BASE_URL}/api/getSingleUser/${id}`);
      setUser(response.data.userDetails);
      setFirstName(response.data.userDetails.first_name);
      setLastName(response.data.userDetails.last_name);
      setPhoneNumber(response.data.userDetails.phone_number);
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  }

  async function saveChanges() {
    try {
      const formData = new FormData();
      formData.append('first_name', firstName);
      formData.append('last_name', lastName);
      formData.append('phone_number', phoneNumber);
      if (profileImage) {
        formData.append('image', profileImage);
      }
  
      const response = await axios.put(`${BASE_URL}/api/updateUser/${id}/`, formData);
      setUser(response.data.user);
      setEditing(false);
  
      // Fetch the user data again to display the updated information
      await getUser();
    } catch (error) {
      console.error(error);
    }
  }
  

  if (!user) {
    return null;
  }

  return (
    <div className="my-4 flex flex-col 2xl:flex-row space-y-4 2xl:space-y-0 2xl:space-x-4 w-full">
      <div className="w-full flex flex-col h-screen">
      <CardHeader className={`relative h-56 overflow-visible`}>
        <img src={img} alt="" className='absolute w-full h-full z-0' />
        <div className="relative z-[1] h-full ">

        
        {editing ? (
          <div className="flex flex-col-reverse items-center justify-center py-4">
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setProfileImage(e.target.files[0])}
            />
            {user?.image && (
              <img
                src={`${BASE_URL}${user?.image}`}
                alt="profile-picture"
                className="rounded-full w-40 h-40 mx-auto"
              />
            )}
          </div>
        ) : (
            <div className=" w-full absolute left-1/2 translate-x-[-50%]  -bottom-10 ">
                {
                    user?.image ? (
                        <img
                          src={`${BASE_URL}${user?.image}`}
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
                
            </div>
        )}
        </div>
      </CardHeader>
        
        <div className=" bg-white text-center  rounded-lg shadow-xl flex flex-col justify-center items-center gap-8 p-8">
              
              <div className='mt-2'><span className="text-gray-700 text-xl font-bold text-center">{user?.email}</span></div>
              <div className='mt-2'><span className="text-gray-700  font-bold text-center"> Joined Date:{user?.date_joined}</span></div>
        
          <ul className="mb-8 text-gray-700 ">
            {editing ? (
              <>
               {/* <li className="flex  py-4">
              <span className="font-bold w-24 ">Joined Date:</span>
              <span className="text-gray-700 ">{user?.date_joined}</span>
            </li> */}
                <li className="flex  py-2">
                  <span className="font-bold w-60">First Name:</span>
                  <Input
                    type="text"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    placeholder="First Name"
                  />
                </li>
                <li className="flex  py-2">
                  <span className="font-bold w-60">Last Name:</span>
                  <Input
                    type="text"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    placeholder="Last Name"
                  />
                </li>
                <li className="flex  py-2">
                  <span className="font-bold w-60">Mobile:</span>
                  <Input
                    type="text"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    placeholder="Phone Number"
                  />
                </li>
              </>
            ) : (
              <>
              {/* <li className="flex  py-2">
              <span className="font-bold w-24">Joined Date:</span>
              <span className="text-gray-700">{user?.date_joined}</span>
            </li> */}
                <li className="flex gap-3 py-2">
                  <span className="font-bold w-24 ">Full Name:</span>
                  <span className="text-gray-700">{user?.first_name} {user?.last_name}</span>
                </li>
                <li className="flex  py-2">
                  <span className="font-bold w-24">Mobile:</span>
                  <span className="text-gray-700">{user?.phone_number}</span>
                </li>
              </>
            )}
            {/* <li className="flex  py-2">
              <span className="font-bold w-24">Email:</span>
              <span className="text-gray-700">{user?.email}</span>
            </li> */}
            
          </ul>

          <CardFooter>
            {editing ? (
              <>
                <Button
                  color="teal"
                  onClick={saveChanges}
                  className='mr-2 w-60'
                >
                  Save Changes
                </Button>
                <Button
                  color="gray"
                  onClick={() => setEditing(false)}
                  className='mr-2'
                >
                  Cancel
                </Button>
              </>
            ) : (
              <Button
                color="teal"
                onClick={() => setEditing(true)}
                className='w-96 '
              >
                Edit
              </Button>
            )}
          </CardFooter>
        </div>
      </div>
    </div>
  );
}

export default UserProfile;
