import React, { useEffect, useState } from "react";
import { MdClose } from "react-icons/md";
import { BsCartX } from "react-icons/bs";
import CartItem from "./CartItem/CartItem";
import "./Cart.css";
import cartService from "../../services/cartService";
import orderService from "../../services/orderService";
import { message } from "antd";

const Cart = ({ setshowCart }) => {
  const [cartItems, setCartItems] = useState([]);
  const [cartSubTotal, setCartSubTotal] = useState(0);
  const [cartCount, setCartCount] = useState(0);

  useEffect(() => {
    cartService.getCartItems().then((response) => {
      setCartItems(response.data.data);
    });
  }, []);

  useEffect(() => {
    let subTotal = 0;
    cartItems.map((item) => (subTotal += item.product.price * item.quantity));
    setCartSubTotal(subTotal);
  }, [cartItems]);

  const user = JSON.parse(window.localStorage.getItem("user"));
  const userId = user?._id;

  //   if (!userId) {
  //     return Promise.reject(new Error("User ID not found in local storage"));
  //   }

  const handleOrder = async () => {
    orderService
      .addorder({
        user: userId,
        products: cartItems.map((item) => item.product._id),
        amount: cartSubTotal,
        quantity: cartItems.map((item) => item.quantity),
      })
      .then((response) => {
        console.log(response);
        if (response.status === 201) {
          message.success("Order placed successfully");
          cartService.clearcart().then((response) => {
            console.log(response);
          });
          window.location.href = response.data.paymentUrl;
        }
        cartService.clearcart().then((response) => {
          console.log(response);
        });
        setCartItems([]);
        setshowCart(false);
      });
  };

  return (
    <div className="cart-panel">
      <div className="opac-layer" onClick={() => setshowCart(false)}></div>
      <div className="cart-content">
        <div className="cart-header">
          <span className="heading">Shopping Cart</span>
          <span className="close-btn" onClick={() => setshowCart(false)}>
            <MdClose className="close-btn" />
            <span className="text">close</span>
          </span>
        </div>

        {!cartItems.length && (
          <div className="empty-cart">
            <BsCartX />
            <span>No products in the cart.</span>
            <button
              className="return-cta"
              onClick={() => {
                setshowCart(false);
              }}
            >
              RETURN TO SHOP
            </button>
          </div>
        )}

        {!!cartItems.length && (
          <>
            <CartItem cartItems={cartItems} setCartItems={setCartItems} />
            <div className="cart-footer">
              <div className="subtotal">
                <span className="text">Subtotal:</span>
                <span className="text total">{cartSubTotal}</span>
              </div>
              <div className="button">
                <button className="checkout-cta" onClick={handleOrder}>
                  Checkout
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Cart;