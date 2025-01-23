import axios from "axios";

const baseUrl = "http://localhost:5500/products";
const reviewBaseUrl = "http://localhost:5500/products"; // separate review base URL

function getAll() {
    return axios.get(baseUrl);
}

function addProduct(newProduct) {
    const config = {
        headers: { Authorization: `Bearer ${window.localStorage.getItem('token')}` }
    };
    return axios.post(baseUrl, newProduct, config);
}

function editProduct(id, newProduct) {
    const config = {
        headers: { Authorization: `Bearer ${window.localStorage.getItem('token')}` }
    };
    return axios.put(`${baseUrl}/${id}`, newProduct, config);
}

function deleteProduct(id) {
    const config = {
        headers: { Authorization: `Bearer ${window.localStorage.getItem('token')}` }
    };
    return axios.delete(`${baseUrl}/${id}`, config);
}

function getProductReviews(productId) {
    return axios
        .get(`${reviewBaseUrl}/${productId}/reviews`)
        .then(response => response.data)
        .catch(error => {
            console.error("Error fetching reviews:", error);
            throw new Error("Unable to fetch reviews. Please try again later.");
        });
}

// Function to add a review for a specific product
function addReview(productId, reviewData) {
    const token = window.localStorage.getItem('token');
    
    if (!token) {
        throw new Error("User is not authenticated.");
    }

    const config = {
        headers: { Authorization: `Bearer ${token}` }
    };

    return axios
        .post(`${reviewBaseUrl}/${productId}/reviews`, reviewData, config)
        .then(response => response.data)
        .catch(error => {
            console.error("Error adding review:", error);
            throw new Error("Unable to add review. Please try again later.");
        });
}

export default {
    getAll,
    addProduct,
    editProduct,
    deleteProduct,
    getProductReviews, // Export the review functions
    addReview
};