import axios from "axios";

const baseUrl = "http://localhost:5500/cart";

// const user = JSON.parse(window.localStorage.getItem("user"));
// const userId = user?._id;
// if (!userId) {
//     console.log("User ID not found in local storage");
// }

let userId = null;

const getUserById = () => {
  const config = {
    headers: {
      Authorization: `Bearer ${window.localStorage.getItem("token")}`,
    },
  };
  return axios.get(`http://localhost:5500/users/profile`, config);
};

const getUserId = async () => {
  try {
    const res = await getUserById();
    const userId = res.data.data._id;
    return userId;
  } catch (error) {
    console.error("Error fetching user ID:", error);
  }
};

(async () => {
  userId = await getUserId();
})();

const addtocart = ({ product, quantity, amount }) => {
  const config = {
    headers: {
      Authorization: `Bearer ${window.localStorage.getItem("token")}`,
    },
  };
  return axios.post(`${baseUrl}`, { product, quantity, amount }, config);
};
const getCartItems = () => {
  const config = {
    headers: {
      Authorization: `Bearer ${window.localStorage.getItem("token")}`,
    },
  };
  return axios.get(`${baseUrl}/user/${userId}`, config);
};

const deleteCartItems = (id) => {
  const config = {
    headers: {
      Authorization: `Bearer ${window.localStorage.getItem("token")}`,
    },
  };
  return axios.delete(`${baseUrl}/${id}`, config);
};

const clearcart = () => {
  const config = {
    headers: {
      Authorization: `Bearer ${window.localStorage.getItem("token")}`,
    },
  };
  return axios.delete(`${baseUrl}/user/${userId}`, config);
};

export default { addtocart, getCartItems, deleteCartItems, clearcart };
