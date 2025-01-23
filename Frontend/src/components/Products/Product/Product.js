import React from 'react';
import './Product.css';
import { useNavigate } from 'react-router-dom';

const Product = ({ products }) => {
    const navigate = useNavigate();
    
    const handleClick = () => {
        if (localStorage.getItem('token')) {
            navigate(`/products/${products._id}`);
        } else {
            navigate('/login');
        }
    };

    return (
        <div className="product-card" onClick={handleClick}>
            <div className="thumbnail">
                <img
                    src={"http://localhost:5500" + products.image}
                    alt={products.name}
                />
            </div>
            <div className="product-info">
                <span className="product-name">{products.name}</span>
                <div className="review-rating">
                    {"★".repeat(Math.floor(Math.random() * 5) + 1)}
                </div>
                <span className="product-price">Rs {products.price}</span>
            </div>
        </div>
    );
};

export default Product;