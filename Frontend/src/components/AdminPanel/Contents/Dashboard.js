import React, { useState, useEffect } from 'react';
import './Dashboard.css';
import OrderService from '../../../services/orderService';
import productService from "../../../services/productService";
import userService from "../../../services/userService";
import categoryService from '../../../services/categoryService';
import defaultproduct from '../../../images/about.png';
import {message} from 'antd';


function Dashboard() {
  const [users, setUsers] = useState(0);
  const [products, setProducts] = useState(0);
  const [orders, setOrders] = useState(0);
  const [categories, setCategories] = useState([]);
  const [image, setImage] = useState(null);
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');

  useEffect(() => {
    OrderService.getorders().then((res) => {
      setOrders(res.data.data);
    });
    productService.getAll().then((res) => {
      setProducts(res.data.data);
    });
    userService.getUser().then((res) => {
      setUsers(res.data.data);
    });
    categoryService.getAll().then((res) => {
      setCategories(res.data.data);
    });
    
  }, []);

  const handleImageChange = (e) => {

      setImage(e.target.files[0]);
    
  };

  const handleSubmit = (e) => {
    if (!image) {
      alert('Please select an image');
      return;
    }
    else if (!name) {
      alert('Please enter product name');
      return;
    }
    else if (!price) {
      alert('Please enter product price');
      return;
    }
    else if (!description) {
      alert('Please enter product description');
      return;
    }
    else if (products.find((p) => p.name === name) ){
      alert('Product already exists');
      return;
    }
    else{
        e.preventDefault();
        const formData = new FormData();
        formData.append('image', image);
        formData.append('name', name);
        formData.append('price', price);
        formData.append('description', description);
        formData.append('category', category);
        
        productService.addProduct(formData).then((res) => {   
          if (res.status==201) {
            message.success("Product added successfully");
            setProducts([...products, res.data.data]);
            setName('');
            setPrice('');
            setDescription('');
            setCategory('');
            setImage(null);
          } else {
            message.error("Product not added");

          }
        });
  }
  };

  return (
    <div className="dashboard">
    

      <div className="add-product">
        <h3>Add New Products</h3>
        <div className='left'>
                        {image ? (
                            <img src={URL.createObjectURL(image)} alt="avatar" />
                        ) : (
                            <img src={defaultproduct} alt="default avatar" />
                        )}
        </div>
        <div className='right'>
        <form>
          <label htmlFor="name">Art Name</label>
          <input type="text" id="name" name="name" value={name} onChange={(e)=>setName(e.target.value)} />

          <label htmlFor="price">Price</label>
          <input type="text" id="price" name="price"  value={price} onChange={(e)=>setPrice(e.target.value)} />

          <label htmlFor="description">Description</label>
          <textarea id="description" name="description" value={description} onChange={(e)=>setDescription(e.target.value)}></textarea>

          <label htmlFor="category">Category of Art</label>
          <select id="category" name="category" onChange={(e)=>setCategory(e.target.value)}>
              {categories.map((category) => (
                  <option key={category._id} value={category._id}  >
                    {category.categoryName}
                  </option>
              ))}   
          </select>
          <label htmlFor="image">Art Image</label>
          <input id="image"
                  name="image"
                  placeholder="Product Image"
                  accept="image/*"
                  type="file"
                  onChange={handleImageChange} />

          <button type="submit" onClick={handleSubmit}>Add Product</button>
        </form>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;