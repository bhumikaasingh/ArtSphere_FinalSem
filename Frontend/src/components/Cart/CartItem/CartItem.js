import React, { useEffect, useState} from "react";
import { MdClose } from "react-icons/md";
import "./CartItem.css";
import cartService from "../../../services/cartService";
import {message} from "antd";

const CartItem = ({cartItems,setCartItems}) => { 

    const handleRemoveFromCart = (product) => {
        console.log(product._id)
        cartService.deleteCartItems(product._id)
            .then((res) => {
                console.log(res);
                message.success("Item removed from cart");
                const newCartItems = cartItems.filter((item) => item.product._id !== product._id);
                setCartItems(newCartItems);
            }).catch((err) => {
                    console.log(err);
                    message.error("Error removing item from cart");
            });

        
    };


    return (
        <div className="cart-products">
            {cartItems?.map((item) => (
                <div
                    className="search-result-item"
                    key={item.product._id}
                    onClick={() => {}}
                >
                    <div className="image-container">
                        <img
                            src={
                                "http://localhost:5500" + item.product.image
                            }
                        />
                    </div>
                    <div className="prod-details">
                        <span className="name">{item.product.name}</span>
                        <MdClose
                            className="close-btn"
                            onClick={() => handleRemoveFromCart(item.product)}
                        />
                        
                        <div className="text">
                           
                            <span className="highlight">
                                
                                {item.amount}
                            </span>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default CartItem;