import React, { useEffect, useState } from "react";
import axios from "axios";
import { Card, Input, Typography } from "@material-tailwind/react";
import { toast, Toaster } from 'react-hot-toast';
import jwtDecode from 'jwt-decode';
import { getLocal } from '../../helpers/auth';
import { BASE_URL } from "../../utils/config";

export default function CreateRoom() {
  const [doctor, setDoctor] = useState('');
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState(null);

  useEffect(() => {
    const localResponse = getLocal('authToken');
    const decodedToken = jwtDecode(localResponse);
    setDoctor(decodedToken.user_id);
  }, []);

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append('doctor', doctor);
      formData.append('name', name);
      formData.append('description', description);
      formData.append('image', image);

      const response = await axios.post(`${BASE_URL}/chat/roomCreate/`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      setDoctor('')
      setName('')
      setDescription('')
      setImage(null)
      toast.success('Successfully created Room');
    } catch (error) {
      console.log(error);
      toast.error('Could not create Room');
    }
  };

  const handleImageChange = (e) => {
    const selectedImage = e.target.files[0];
    setImage(selectedImage);
  };

  return (
    <Card color="lightBlue" className="max-w-md mx-auto p-6 mt-16 shadow-2xl">
      <Toaster position="top-center" reverseOrder={false} limit={1} />
      <Typography variant="h4" color="black " className="font-bold mb-16  text-center">
        Create Community
      </Typography>

      <form onSubmit={handleFormSubmit}>
        <div className="mb-4">
          <Input
            size="regular"
            label="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div className="mb-4">
          <Input
            size="regular"
            label="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </div>
        <div className="mb-4">
          <input
            type="file"
            onChange={handleImageChange}
            accept="image/*"
            required
          />
        </div>
        <div className="flex justify-center ">
          <button
            type="submit"
            className="px-10 py-2 bg-blue-400 text-white rounded-lg hover:bg-blue-800 focus:outline-none font-bold"
          >
            Create
          </button>
        </div>
      </form>
    </Card>
  );
}
