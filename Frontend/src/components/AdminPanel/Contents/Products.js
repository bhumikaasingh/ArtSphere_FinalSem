import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import ProductService from "../../../services/productService";
import "./Product.css";


function SeeProducts() {
  const navigate = useNavigate();

  const [products, setProducts] = useState([]);

  useEffect(() => {
    ProductService.getAll().then((res) => {
      setProducts(res.data.data);
    });
  }, []);

  const deleteProduct = async (productId) => {
    console.log(productId);
    await ProductService.deleteProduct(productId);
    setProducts(products.filter(product => product._id !== productId));
  };
  
  const editProduct = (product) => {
    navigate('/editProduct', { state: { product } });
  };

  return (
    <div className="products-container">
      <table>
        <thead>
          <tr>
            <th>Image</th>
            <th>Name</th>
            <th>Description</th>
            <th>Price</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product.id}>
              <td>
                <img src={"http://localhost:5500" + product.image} alt={product.name} className="product-image" />
              </td>
              <td>{product.name}</td>
              <td>{product.description}</td>
              <td>{product.price}</td>
              <td className="product-actions">
                <i className="fas fa-edit" onClick={() => editProduct(product)}></i>
                <i className="fas fa-trash-alt" onClick={() => deleteProduct(product._id)}></i>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default SeeProducts;
