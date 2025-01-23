import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AddEditCategoryPopup from './AddCategory';
import './Category.css';

const Category = () => {
  const [categories, setCategories] = useState([]);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [editCategory, setEditCategory] = useState(null);

  const fetchCategories = async () => {
    try {
      const response = await axios.get('http://localhost:5500/category');
      setCategories(response.data.data);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  const handleAddCategory = () => {
    setEditCategory(null); 
    setIsPopupOpen(true);
  };

  const handleEditCategory = (category) => {
    setEditCategory(category);
    setIsPopupOpen(true);
  };

  const handlePopupClose = () => {
    setIsPopupOpen(false);
    fetchCategories(); 
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Categories</h1>
      <button
        className="bg-blue-500 text-white px-4 py-2 rounded mb-4"
        onClick={handleAddCategory}
      >
        Add Category
      </button>
      {categories.length > 0 ? (
  <ul className="border rounded divide-y">
    {categories.map((category) => (
      <li key={category._id} className="p-2 flex justify-between items-center">
        <span>{category.categoryName}</span>
        <button
          className="text-blue-500 underline"
          onClick={() => handleEditCategory(category)}
        >
          Edit
        </button>
      </li>
    ))}
  </ul>
) : (
  <p>No categories available.</p>
)}
      {isPopupOpen && (
        <AddEditCategoryPopup
          onClose={handlePopupClose}
          category={editCategory}
        />
      )}
    </div>
  );
};

export default Category;
