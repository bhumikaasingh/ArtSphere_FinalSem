import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from 'react-router-dom';
import ProductService from "../../../services/productService";
import SideBar from "../SideBar";
import "./EditProduct.css"

function EditProduct() {
  const navigate = useNavigate();
  const location = useLocation();

  const [product, setProduct] = useState({});

  useEffect(() => {
    if (location.state && location.state.product) {
      setProduct(location.state.product);
      console.log(location.state.product);
    }
  }, [location.state.product]);


  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    ProductService.editProduct(product._id, product).then((res) => {
      console.log(res);
      navigate('/admin');
    });
  };

  return (
    <>
      <SideBar/>
      
      <div className="edit-product-container">
        <img src={"http://localhost:5500"+product.image} alt={product.name} />

        <form onSubmit={handleSubmit}>
        <h2>Edit Product</h2>
          <div className="form-group">
            <label htmlFor="name">Name</label>
            <input type="text" name="name" id="name" value={product.name} onChange={handleChange} />
          </div>
          <div className="form-group">
            <label htmlFor="description">Description</label>
            <input type="text" name="description" id="description" value={product.description} onChange={handleChange} />
          </div>
          <div className="form-group">
            <label htmlFor="price">Price</label>
            <input type="text" name="price" id="price" value={product.price} onChange={handleChange} />
          </div>
          <button type="submit">Update</button>
        </form>
      </div>
    </>
  );
}

export default EditProduct;
