import React, { useState, useEffect } from 'react';
import './SingleProductPage.css';
import { useParams } from "react-router-dom";
import { FaCartPlus } from "react-icons/fa";
import { message } from 'antd';
import CartService from '../../../services/cartService';
import NavBar from '../../Navbar/Navbar';
import Footer from '../../Footer/Footer';
import ProductService from '../../../services/productService';

const SingleProductPage = ({ product }) => {
    const { id } = useParams();
    const [quantity, setQuantity] = useState(1);
    const [reviews, setReviews] = useState([]);
    const [rating, setRating] = useState(0);
    const [comment, setComment] = useState('');

    // Fetch reviews on component mount
    useEffect(() => {
        ProductService.getProductReviews(id)
            .then((response) => {
                // console.log("Raw API Response:", response);
                // Check if response is directly an array
                if (Array.isArray(response)) {
                    setReviews(response); // Set reviews directly
                } else if (response?.reviews && Array.isArray(response.reviews)) {
                    setReviews(response.reviews); // Fallback if it's nested in 'reviews'
                } else {
                    message.error("Unexpected response format.");
                }
            })
            .catch((error) => {
                console.error("Error fetching reviews:", error);
                message.error("Failed to fetch reviews.");
            });
    }, [id]);
    // Add to cart function
    const handleAddToCart = (product, quantity, amount) => {
        CartService.addtocart({ product, quantity, amount })
            .then((response) => {
                if (response.status === 201) {
                    message.success('Product added to cart successfully');
                } else {
                    message.error("Failed to add product to cart");
                }
            })
            .catch((error) => {
                console.error('Error adding to cart:', error);
                message.error("Error adding product to cart");
            });
    };

    // Decrement quantity
    const decrement = () => setQuantity((prev) => Math.max(prev - 1, 1));

    // Increment quantity
    const increment = () => setQuantity((prev) => prev + 1);

    // Submit review function
    const handleSubmitReview = () => {
        const reviewData = { rating, comment };

        ProductService.addReview(id, reviewData)
            .then((response) => {
                if (response.status === 201) {
                    message.success('Review added successfully');
                    // Add the new review to the existing reviews
                    setReviews((prevReviews) => [...prevReviews, response.data]);
                    setRating(0); // Reset rating
                    setComment(''); // Reset comment
                } else {
                    message.success("Review Added Successfully");
                }
            })
            .catch((error) => {
                console.error('Error submitting review:', error);
                message.error("Error adding review");
            });
    };

    return (
        <>
            <NavBar />
            <div className="single-product-main-content">
                <div className="layout">
                    <div className="single-product-page">
                        <div className="left">
                            <img src={"http://localhost:5500" + product.image} alt="product" />
                        </div>
                        <div className="right">
                            <span className='product-name'>{product.name}</span>
                            <span className='product-price'>Rs. {product.price}</span>
                            <span className='product-description'>{product.description}</span>
                            <div className="cart-buttons">
                                <div className="quantity-buttons">
                                    <span onClick={decrement}>-</span>
                                    <span>{quantity}</span>
                                    <span onClick={increment}>+</span>
                                </div>
                                <button className='add-to-cart-button'
                                    onClick={() => handleAddToCart(product, quantity, product.price * quantity)}>
                                    <FaCartPlus size={20} />
                                    Add to Cart
                                </button>
                            </div>
                            <span className='divider'></span>
                            <div className="info-item">
                                <span className='text-bold'>Category: Medium 
                                    <span> {product.category.categoryName}</span>
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* Reviews Section */}
                    <div className="reviews-section">
                        <h3>Reviews</h3>
                        {reviews.length > 0 ? (
                            <div className="reviews-list">
                                {reviews.map((review) => (
                                    <div key={review._id} className="review-item">
                                        <div className="review-rating">
                                            {'★'.repeat(review.rating)}{'☆'.repeat(5 - review.rating)}
                                        </div>
                                        <div className="review-comment">{review.comment}</div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <p>No reviews yet.</p>
                        )}

                        {/* Add Review Form */}
                        <div className="add-review">
                            <h4>Add Your Review</h4>
                            <div className="review-rating-input">
                                <label>Rating:</label>
                                <div className="star-rating">
                                    {[1, 2, 3, 4, 5].map((star) => (
                                        <span
                                            key={star}
                                            className={star <= rating ? 'filled' : ''}
                                            onClick={() => setRating(star)}
                                        >
                                            ★
                                        </span>
                                    ))}
                                </div>
                            </div>
                            <div className="review-comment-input">
                                <label>Comment:</label>
                                <textarea
                                    value={comment}
                                    onChange={(e) => setComment(e.target.value)}
                                    rows="4"
                                    placeholder="Write your review here..."
                                ></textarea>
                            </div>
                            <button className="submit-review-button" onClick={handleSubmitReview}>
                                Submit Review
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
};

export default SingleProductPage;