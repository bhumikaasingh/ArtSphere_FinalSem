import './Products.css';
import React, { useState, useEffect } from 'react';
import Product from './Product/Product';
import productService from '../../services/productService';

const ProductsContainer = ({ products, setProducts }) => {
    const [searchTerm, setSearchTerm] = useState("");

    useEffect(() => {
        productService.getAll()
            .then(response => {
                setProducts(response.data.data);
            })
            .catch(err => console.log(err));
    }, [setProducts]);

    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
    };

    const filteredProducts = products.filter((product) =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="products-container">
            <div className="section-heading-container">
                <div className="section-heading">Our Products</div>
                {/* Search Bar */}
                <div className="search-container">
                    <input
                        type="text"
                        placeholder="Search for products..."
                        value={searchTerm}
                        onChange={handleSearchChange}
                        className="search-input"
                    />
                </div>
            </div>
            <div className="products">
                {filteredProducts.map((items) => {
                    return <Product key={items.id} products={items} />;
                })}
            </div>
        </div>
    );
};

export default ProductsContainer;
