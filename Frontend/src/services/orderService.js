import axios from 'axios';

const baseUrl = 'http://localhost:5500/order';

const user = JSON.parse(window.localStorage.getItem("user"));
const userId = user?._id;



const  addorder= ({user,products,amount,quantity}) => {
    const config = {
        headers: { Authorization: `Bearer ${window.localStorage.getItem('token')}` }
    };
    return axios.post(`${baseUrl}/`,{user,products,amount,quantity}, config);
}

const  getorders= () => {
    const config = {
        headers: { Authorization: `Bearer ${window.localStorage.getItem('token')}` }
    };
    return axios.get(`${baseUrl}`, config);
}

const getOrdersByUser = () => {
    const config = {
        headers: { Authorization: `Bearer ${window.localStorage.getItem('token')}` }
    };
    return axios.get(`${baseUrl}/${userId}`, config);
}




export default { addorder, getorders, getOrdersByUser };