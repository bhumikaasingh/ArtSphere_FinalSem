const Order = require("../models/Order");

// Get all orders
const getAllOrders = (req, res, next) => {
  Order.find()
    .then((orders) => {
      if (orders.length === 0) {
        return res.status(404).json({
          status: false,
          message: "No orders found",
        });
      }
      res.status(200).json({
        status: true,
        message: "List of orders",
        data: orders,
      });
    })
    .catch((error) => {
      console.error("Error fetching orders:", error);
      res.status(500).json({
        status: false,
        message: "Fetching orders failed",
        error: error.message || "Unknown error",
      });
    });
};

// Get orders by user
const getOrdersbyUser = (req, res, next) => {
  const userId = req.params.id;

  if (!userId) {
    return res.status(400).json({
      status: false,
      message: "User ID is required",
    });
  }

  Order.find({ user: userId })
    .populate({ path: "user", populate: { path: "address" } })
    // Populate the products array directly, without referencing 'product' in it
    .populate("products") // This will populate the product details
    .then((orders) => {
      if (orders.length === 0) {
        return res.status(404).json({
          status: false,
          message: "No orders found for this user",
        });
      }

      // Map the orders to match the frontend's expected format
      const formattedOrders = orders.map((order) => {
        // Calculate the total amount based on product prices and quantities
        let totalAmount = 0;
        const formattedProducts = order.products.map((product, index) => {
          totalAmount += parseFloat(product.price) * order.quantity[index]; // Multiply price by quantity
          return {
            _id: product._id,
            image: product.image,
            name: product.name,
            price: product.price,
            description: product.description,
            category: product.category,
            createdAt: product.createdAt,
            updatedAt: product.updatedAt,
            reviews: product.reviews,
          };
        });

        return {
          _id: order._id,
          user: {
            _id: order.user._id,
            fname: order.user.fname,
            lname: order.user.lname,
            username: order.user.username,
            email: order.user.email,
            role: order.user.role,
            isFormFilled: order.user.isFormFilled,
            image: order.user.image,
            createdAt: order.user.createdAt,
            updatedAt: order.user.updatedAt,
          },
          products: formattedProducts,
          amount: totalAmount,
          quantity: order.quantity,
          status: order.status,
          createdAt: order.createdAt,
          updatedAt: order.updatedAt,
        };
      });

      res.status(200).json({
        status: true,
        message: "List of orders for the user",
        data: formattedOrders,
      });
    })
    .catch((error) => {
      console.error("Error fetching user orders:", error);
      res.status(500).json({
        status: false,
        message: "Fetching orders failed",
        error: error.message || "Unknown error",
      });
    });
};

// Create a new order
const createOrder = async (req, res, next) => {
  const { user, products, amount, quantity } = req.body;

  // Check if required fields are present
  if (!user || !products || !amount || !quantity) {
    return res.status(400).json({
      status: false,
      message: "Missing required fields (user, products, amount, quantity)",
    });
  }

  const payment = await fetch(
    "https://dev.khalti.com/api/v2/epayment/initiate/",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Key d3d569ae149b47cea132ca13e40d6476",
      },
      body: JSON.stringify({
        return_url: "http://localhost:3000/order",
        website_url: "http://localhost:3000",
        amount: amount * 100,
        purchase_order_id: Math.floor(Math.random() * 1000000),
        purchase_order_name: "Order from ArtSphere",
      }),
    }
  );

  const paymentData = await payment.json();

  const order = new Order({
    user,
    products,
    amount,
    quantity,
    paymentId: paymentData.pidx,
  });

  order
    .save()
    .then((createdOrder) => {
      res.status(201).json({
        status: true,
        message: "Order added successfully",
        data: createdOrder,
        paymentUrl: paymentData.payment_url,
      });
    })
    .catch((error) => {
      console.error("Error creating order:", error);
      res.status(500).json({
        status: false,
        message: "Creating order failed",
        error: error.message || "Unknown error",
      });
    });
};

// Delete an order
const deleteOrder = (req, res, next) => {
  const orderId = req.params.id;

  if (!orderId) {
    return res.status(400).json({
      status: false,
      message: "Order ID is required",
    });
  }

  Order.findByIdAndDelete(orderId)
    .then((result) => {
      if (!result) {
        return res.status(404).json({
          status: false,
          message: "Order not found",
        });
      }
      res.status(200).json({
        status: true,
        message: "Order deleted successfully",
        data: result,
      });
    })
    .catch((error) => {
      console.error("Error deleting order:", error);
      res.status(500).json({
        status: false,
        message: "Deleting order failed",
        error: error.message || "Unknown error",
      });
    });
};

const verifyPayment = async (req, res, next) => {
  const pidx = req.params.pidx;

  if (!pidx) {
    return res.status(400).json({
      status: false,
      message: "Payment ID is required",
    });
  }

  await fetch(`https://dev.khalti.com/api/v2/epayment/lookup/	`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Key d3d569ae149b47cea132ca13e40d6476",
    },
    body: JSON.stringify({
      pidx: pidx,
    }),
  })
    .then(async (response) => await response.json())
    .then(async (data) => {
      if (data.status === "Completed") {
        const order = await Order.findOneAndUpdate(
          { paymentId: pidx },
          { status: "paid" }
        );
        res.status(200).json({
          status: true,
          message: "Payment verified",
          data,
        });
      } else {
        res.status(400).json({
          status: false,
          message: "Payment not verified",
          data,
        });
      }
    })
    .catch((error) => {
      console.error("Error verifying payment:", error);
      res.status(500).json({
        status: false,
        message: "Verifying payment failed",
        error: error.message || "Unknown error",
      });
    });
};

module.exports = {
  getOrdersbyUser,
  createOrder,
  deleteOrder,
  getAllOrders,
  verifyPayment,
};