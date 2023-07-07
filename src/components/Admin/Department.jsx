import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { BASE_URL } from '../../utils/config';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FaTrash, FaEdit } from 'react-icons/fa';

const AdminDepartments = () => {
  const [departments, setDepartments] = useState([]);
  const [newDepartment, setNewDepartment] = useState({ name: '', description: '', image: null });
  const [showAddForm, setShowAddForm] = useState(false);
  const [selectedDepartment, setSelectedDepartment] = useState(null);
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  const [showEditForm, setShowEditForm] = useState(false);
  const [editDepartment, setEditDepartment] = useState({ id: null, name: '', description: '', image: null });

  useEffect(() => {
    fetchDepartments();
  }, []);

  const fetchDepartments = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/api/departments/`);
      setDepartments(response.data);
    } catch (error) {
      console.error('Error fetching departments:', error);
    }
  };

  const handleAddDepartment = async () => {
    try {
      const formData = new FormData();
      formData.append('name', newDepartment.name);
      formData.append('description', newDepartment.description);
      formData.append('image', newDepartment.image);

      await axios.post(`${BASE_URL}/api/createDepartment/`, formData);
      setNewDepartment({ name: '', description: '', image: null });
      fetchDepartments();
      toast.success('Department added successfully');
      setShowAddForm(false);
    } catch (error) {
      console.error('Error adding department:', error);
      toast.error('Failed to add department');
    }
  };

  const handleDeleteDepartment = (department) => {
    setSelectedDepartment(department);
    setShowDeleteConfirmation(true);
  };
  const handleEditDepartment = (department) => {
    setEditDepartment({
      id: department.id,
      name: department.name,
      description: department.description,
      image: null
    });
    setShowEditForm(true);
  };
  
  const handleSaveEditDepartment = async () => {
    try {
      const formData = new FormData();
      formData.append('name', editDepartment.name);
      formData.append('description', editDepartment.description);
      if (editDepartment.image) {
        formData.append('image', editDepartment.image);
      }
  
      await axios.put(`${BASE_URL}/api/updateDepartment/${editDepartment.id}/`, formData);
      setEditDepartment({ id: null, name: '', description: '', image: null });
      fetchDepartments();
      toast.success('Department updated successfully');
      setShowEditForm(false);
    } catch (error) {
      console.error('Error updating department:', error);
      toast.error('Failed to update department');
    }
  };
  


  const handleDeleteConfirmation = async () => {
    try {
      await axios.delete(`${BASE_URL}/api/deleteDepartment/${selectedDepartment.id}`);
      setSelectedDepartment(null);
      fetchDepartments();
      toast.success('Department deleted successfully');
      setShowDeleteConfirmation(false);
    } catch (error) {
      console.error('Error deleting department:', error);
      toast.error('Failed to delete department');
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-3xl font-bold text-center mb-8">Departments</h2>
      <div className="mb-4">
        <div className="flex">
          <button
            className="bg-teal-300 hover:bg-teal-600 text-white font-semibold py-2 px-6 rounded"
            onClick={() => setShowAddForm(true)}
          >
            Add Department
          </button>
        </div>
      </div>
      {showAddForm && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-4 rounded">
            <h3 className="text-lg font-bold mb-4">Add Department</h3>
            <form>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
                  Name
                </label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="name"
                  type="text"
                  placeholder="Enter department name"
                  value={newDepartment.name}
                  onChange={(e) => setNewDepartment({ ...newDepartment, name: e.target.value })}
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="description">
                  Description
                </label>
                <textarea
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="description"
                  placeholder="Enter department description"
                  value={newDepartment.description}
                  onChange={(e) =>
                    setNewDepartment({ ...newDepartment, description: e.target.value })
                  }
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="image">
                  Image
                </label>
                <input
                  className="border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="image"
                  type="file"
                  accept="image/*"
                  onChange={(e) =>
                    setNewDepartment({ ...newDepartment, image: e.target.files[0] })
                  }
                />
              </div>
              <div className="flex justify-end">
                <button
                  className="bg-gray-500 hover:bg-gray-600 text-white font-semibold py-2 px-4 rounded mr-2"
                  onClick={() => setShowAddForm(false)}
                >
                  Cancel
                </button>
                <button
                  className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded"
                  onClick={handleAddDepartment}
                >
                  Add
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
      <table className="min-w-full">
        <thead>
          <tr>
            <th className="px-4 py-2">Image</th>
            <th className="px-4 py-2">Name</th>
            <th className="px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {departments.map((department) => (
            <tr key={department.id}>
              <td className="border px-6 py-2 ">
                <img
                  className="h-20 w-40 object-cover mx-auto"
                  src={`${BASE_URL}${department.image}`}
                  alt="Department"
                />
              </td>
              <td className="border px-6 py-2 text-center">{department.name}</td>
              <td className="border px-8 py-5 text-center">
                <button
                  className="mr-8  text-blue-600 hover:text-blue-900"
                  onClick={() => handleEditDepartment(department)}
                >
                  <FaEdit />
                </button>
                <button
                  className="text-red-600 hover:text-red-900 w-30 gap-5"
                  onClick={() => handleDeleteDepartment(department)}
                >
                  <FaTrash />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {showDeleteConfirmation && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-4 rounded">
            <h3 className="text-lg font-bold mb-4">Delete Department</h3>
            <p>Are you sure you want to delete the department: {selectedDepartment.name}?</p>
            <div className="flex justify-end mt-4">
              <button
                className="bg-gray-500 hover:bg-gray-600 text-white font-semibold py-2 px-4 rounded mr-2"
                onClick={() => setShowDeleteConfirmation(false)}
              >
                Cancel
              </button>
              <button
                className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded"
                onClick={handleDeleteConfirmation}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
      {showEditForm && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-gray-500 bg-opacity-50">
          <div className="bg-white rounded-lg p-8 w-1/2">
            <h3 className="text-xl font-bold mb-2">Edit Department</h3>
            {/* Edit Department Form */}
            {/* Replace with your desired form fields and logic */}
            <form onSubmit={handleSaveEditDepartment}>
              {/* Form fields */}
              <div className="mb-4">
                <label className="block text-gray-700 font-bold mb-2" htmlFor="edit-name">
                  Name
                </label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="edit-name"
                  type="text"
                  placeholder="Department Name"
                  value={editDepartment.name}
                  onChange={(e) => setEditDepartment({ ...editDepartment, name: e.target.value })}
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 font-bold mb-2" htmlFor="edit-description">
                  Description
                </label>
                <textarea
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="edit-description"
                  placeholder="Department Description"
                  value={editDepartment.description}
                  onChange={(e) => setEditDepartment({ ...editDepartment, description: e.target.value })}
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 font-bold mb-2" htmlFor="edit-image">
                  Image
                </label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="edit-image"
                  type="file"
                  accept="image/*"
                  onChange={(e) => setEditDepartment({ ...editDepartment, image: e.target.files[0] })}
                />
              </div>
              <div className="flex justify-end">
                <button
                  className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded mr-2"
                  type="submit"
                >
                  Save
                </button>
                <button
                  className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded"
                  onClick={() => setShowEditForm(false)}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
<ToastContainer />
</div>
  );
};

export default AdminDepartments;
