import React, { useState } from 'react';
import axios from 'axios';

const AddEditCategoryPopup = ({ onClose, category }) => {
  const [categoryName, setCategoryName] = useState(category ? category.categoryName : '');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = window.localStorage.getItem('token');
      const config = {
        headers: { Authorization: `Bearer ${token}` },
      };

      if (category) {
        // Edit category
        await axios.put(`http://localhost:5500/category/${category._id}`, { categoryName }, config);
      } else {
        // Add new category
        await axios.post('http://localhost:5500/category', { categoryName }, config);
      }

      onClose();
    } catch (error) {
      console.error('Error saving category:', error);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded shadow-lg w-96">
        <h2 className="text-xl font-bold mb-4">
          {category ? 'Edit Category' : 'Add Category'}
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="categoryName" className="block font-medium mb-1">
              Category Name
            </label>
            <input
              id="categoryName"
              type="text"
              value={categoryName}
              onChange={(e) => setCategoryName(e.target.value)}
              className="w-full border px-3 py-2 rounded"
              required
            />
          </div>
          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-300 rounded"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-500 text-white rounded"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddEditCategoryPopup;
