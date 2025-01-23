import React, { useState, useEffect } from "react";
import orderService from "../../../services/orderService";
import productService from "../../../services/productService";
import userService from "../../../services/userService";
import "./Order.css";

function Orders() {
  const [orders, setOrders] = useState([]);
  const [products, setProducts] = useState([]);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    orderService.getorders().then((res) => {
      setOrders(res.data.data);
    });

    productService.getAll().then((res) => {
      setProducts(res.data.data);
    });

    userService.getUser().then((res) => {
      setUsers(res.data.data);
    });
  }, []);

  const getProductName = (productIds) => {
    const productNames = productIds.map((productId) => {
      const product = products.find((p) => p._id === productId);
      return product ? product.name : "";
    });
    return productNames.join(", ");
  };

  const getUsername = (userId) => {
    const user = users.find((u) => u._id === userId);
    return user ? user.username : "";
  };

  return (
    <div className="order-container">
      <h2>Orders</h2>
      <table className="order-table">
        <thead>
          <tr>
            <th>Order ID</th>
            <th>Product Name</th>
            <th>User Name</th>
            <th>Quantity</th>
            <th>Total</th>
            {/* <th>Status</th> */}
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr key={order._id}>
              <td>{order._id}</td>
              <td>{getProductName(order.products)}</td>
              <td>{getUsername(order.user)}</td>
              <td>{order.quantity.length}</td>
              <td>RS.{order.amount.toFixed(2)}</td>
              {/* <td>{order.status}</td> */}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Orders;
