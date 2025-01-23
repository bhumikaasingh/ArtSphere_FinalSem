import axios from 'axios';

const baseUrl = 'http://localhost:5500/users';


const user = JSON.parse(window.localStorage.getItem("user"));
const userId = user?._id;
console.log(userId);

const login = (credentials) => {
    return axios.post(`${baseUrl}/login`, credentials);
}

const register = (userDetails) => {
    return axios.post(`${baseUrl}/`, userDetails);
}

const getUser = () => {

    const config = {
        headers: { Authorization: `Bearer ${window.localStorage.getItem('token')}` }
    };
    return axios.get(`${baseUrl}/`, config);
}

const getUserById = () => {
    const config = {
        headers: { Authorization: `Bearer ${window.localStorage.getItem('token')}` }
    };
    return axios.get(`${baseUrl}/profile/`,config);
}
const updatePassword = (password) => {
    const config = {
        headers: { Authorization: `Bearer ${window.localStorage.getItem('token')}` }
    };
    return axios.put(`${baseUrl}/${userId}`, {password}, config);
}

const updateProfile = (data) => {
    const config = {
        headers: { Authorization: `Bearer ${window.localStorage.getItem('token')}` }
    };
    return axios.put(`${baseUrl}/${userId}`, data, config);
}


export default { login, register, getUser ,getUserById, updatePassword, updateProfile };