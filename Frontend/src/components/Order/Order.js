import React, { useEffect, useState } from "react";
import orderService from "../../services/orderService";
import NavBar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";
import "./OrderList.css";
import { useSearchParams } from "react-router-dom";

const OrderList = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchParams] = useSearchParams();
  const pidx = searchParams.get("pidx");

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await orderService.getOrdersByUser();

        if (response && response.data && Array.isArray(response.data.data)) {
          setOrders(response.data.data);
        } else {
          throw new Error(
            "Unexpected response format: " + JSON.stringify(response)
          );
        }
      } catch (err) {
        setError(err.message || "An error occurred while fetching orders.");
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();

    const verifyPayment = async () => {
      try {
        setLoading(true);

        const request = await fetch(`http://localhost:5500/order/${pidx}`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${window.localStorage.getItem("token")}`,
          },
        });

        if (request.ok) {
          fetchOrders();
          window.history.replaceState({}, document.title, "/order");
        }
      } catch (err) {
        setError(err.message || "An error occurred while verifying payment.");
      } finally {
        setLoading(false);
      }
    };

    if (pidx) {
      verifyPayment();
    }
  }, []);

  if (loading) {
    return <div className="text-center p-4 text-gray-500">Loading...</div>;
  }

  if (error) {
    return (
      <div className="text-center p-4 text-red-500">
        <p>{error}</p>
      </div>
    );
  }

  return (
    <>
      <NavBar />

      <div className="flex-grow p-6 max-w-7xl mt-64 mx-auto ">
        {" "}
        {/* Added mt-16 for margin top */}
        <h2 className="text-3xl font-semibold text-gray-800 mt-6 mb-6">
          Your Orders
        </h2>
        {orders.length > 0 ? (
          <div className="overflow-x-auto bg-white shadow-md rounded-lg">
            <table className="w-full table-auto text-left">
              <thead className="bg-gray-100 text-sm font-medium text-gray-600">
                <tr>
                  <th className="px-4 py-3 border-b">Order ID</th>
                  <th className="px-4 py-3 border-b">Status</th>
                  <th className="px-4 py-3 border-b">Amount</th>
                  <th className="px-4 py-3 border-b">Products</th>
                </tr>
              </thead>
              <tbody className="text-sm text-gray-700">
                {orders.map((order) => (
                  <tr key={order._id} className="border-b hover:bg-gray-50">
                    <td className="px-4 py-3">{order._id}</td>
                    <td className="px-4 py-3">{order.status}</td>
                    <td className="px-4 py-3">
                      Rs. {parseFloat(order.amount).toFixed(2)}
                    </td>
                    <td className="px-4 py-3">
                      {Array.isArray(order.products) &&
                      order.products.length > 0 ? (
                        <ul className="space-y-2">
                          {order.products.map((product, index) => (
                            <li
                              key={product._id || index}
                              className="space-y-1"
                            >
                              <div className="font-semibold text-gray-800">
                                {product.name}
                              </div>
                              <div className="text-gray-600">
                                Price: Rs.{" "}
                                {parseFloat(product.price).toFixed(2)}
                              </div>
                              <div className="text-gray-600">
                                Quantity: {order.quantity[index]}
                              </div>
                              <div className="text-gray-600">
                                Subtotal: Rs.{" "}
                                {(
                                  parseFloat(product.price) *
                                  order.quantity[index]
                                ).toFixed(2)}
                              </div>
                              <div className="text-gray-500 text-sm">
                                {product.description ||
                                  "No description available."}
                              </div>
                            </li>
                          ))}
                        </ul>
                      ) : (
                        <span className="text-gray-500">
                          No products available.
                        </span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="text-center text-gray-500 mt-6">
            <p>No orders found.</p>
          </div>
        )}
      </div>
      <Footer />
    </>
  );
};

export default OrderList;