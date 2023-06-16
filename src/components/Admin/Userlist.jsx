import React, { useState, useEffect } from 'react';
import axios from 'axios';
import userAvatar from "../../images/download.jpeg";
import { BASE_URL } from '../../utils/config';

function UsersList() {
  const [users, setUsers] = useState([]);

  async function getUsers() {
    try {
      const response = await axios.get(`${BASE_URL}/api/users/`);
      setUsers(response.data);
      console.log(response.data);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  }
  async function changeStatus(id) {
    try {
      const updatedUsers = users.map((user) => {
        if (user.id === id) {
          return { ...user, is_active: !user.is_active };
        }
        return user;
      });
      setUsers(updatedUsers);
  
      const response = await axios.patch(`${BASE_URL}/api/blockuser/${id}/`);
      console.log(response.data);
    } catch (error) {
      console.error('Error blocking/unblocking user:', error);
    }
  }
  
  
  
  

  useEffect(() => {
    getUsers();
  }, []);


  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-4">Users List</h1>
      <div className="flex items-center mb-4 justify-end">
        <input
          type="text"
          placeholder="Search by email or name"
          className="border border-gray-300 rounded-lg px-4 py-2 mr-4 focus:outline-none"
        />
        <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg">
          Search
        </button>
      </div>
      <div className="overflow-x-auto">
        <table className="table-auto w-full">
          <thead>
            <tr className="bg-gray-100">
              <th className="px-4 py-2 font-semibold text-gray-800"></th>
              <th className="px-4 py-2 font-semibold text-gray-800">User Name</th>
              <th className="px-4 py-2 font-semibold text-gray-800">Email</th>
              <th className="px-4 py-2 font-semibold text-gray-800">Phone Number</th>
              <th className="px-4 py-2 font-semibold text-gray-800">Status</th>
              <th className="px-4 py-2 font-semibold text-gray-800">Action</th>
            </tr>
          </thead>
          <tbody className="text-center">
            {users.map((user, index) => (
              <tr key={index} className="bg-white"style={{ paddingBottom: '0.5rem' }}>
                <td className="px-4 py-2 border-b">
                  <div className="flex items-center justify-center">
                    <img
                      className="h-8 w-8 rounded-full object-cover"
                      src={user.image || userAvatar}
                      alt="Avatar"
                    />
                  </div>
                </td>
                <td className="px-4 py-2 border-b">
                  <div className="flex items-center justify-center">
                    <p className="font-medium">{user.first_name}</p>
                  </div>
                </td>
                <td className="px-4 py-2 border-b">{user.email}</td>
                <td className="px-4 py-2 border-b">{user.phone_number}</td>
                <td className="px-4 py-2 border-b">
                  {user.is_active ? (
                    <span className="inline-block px-2 py-1 text-xs font-semibold text-green-800 bg-green-200 rounded-full">
                      Active
                    </span>
                  ) : (
                    <span className="inline-block px-2 py-1 text-xs font-semibold text-red-800 bg-red-200 rounded-full">
                      Inactive
                    </span>
                  )}
                </td>
                <td className="px-4 py-2 border-b">
                  <button
                    className={`${
                      user.is_active ? 'bg-red-500 hover:bg-red-600' : 'bg-green-500 hover:bg-green-600'
                    } px-4 py-2 text-sm font-medium text-white rounded-lg`}
                    onClick={() => changeStatus(user.id)}
                  >
                    {user.is_active ? 'Block' : 'Unblock'}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      </div>
);
                }

export default UsersList;
