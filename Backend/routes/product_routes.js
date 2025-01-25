const express = require('express');
const ProductController = require('../controller/products_controller');
const auth = require('../middleware/auth');
const upload = require('../middleware/upload');
const Product = require('../models/Product');

const router = express.Router();

// Existing routes for products
router.route('/')
    .get(ProductController.getallproducts)
    .post(auth.verifyUser, auth.verifyAdmin, upload.single('image'), ProductController.createproducts)
    .put((req, res) => {
        res.status(501).send({ "reply": "Put request not supported" });
    })
    .delete(auth.verifyAdmin, ProductController.deleteallproducts);

router.route('/:id')
    .get(ProductController.getProductByID)
    .post((req, res) => {
        res.status(501).send({ "reply": "Not implemented" });
    })
    .put(auth.verifyUser, auth.verifyAdmin, ProductController.updateProductByID)
    .delete(auth.verifyUser, auth.verifyAdmin, ProductController.deleteProductByID);

    // New route to add a review for a product
    router.route('/:id/reviews')
        .post(auth.verifyUser, async (req, res) => {
            const { rating, comment } = req.body;  // Extract review data
            const userId = req.user.id;  // Get user ID from authenticated user
    
            try {
                // Find the product by its ID
                const product = await Product.findById(req.params.id);
    
                if (!product) {
                    return res.status(404).json({ msg: 'Product not found' });
                }
    
                // Create new review object
                const newReview = {
                    user: userId,
                    rating,
                    comment
                };
    
                // Push the new review to the product's reviews array
                product.reviews.push(newReview);
                await product.save();  // Save the updated product with the new review
    
                // Return the updated reviews list
                res.status(201).json(product.reviews);
            } catch (error) {
                console.error(error.message);
                res.status(500).send('Server Error');  // Handle server errors
            }
        });
    
    // Route to get reviews for a product
    router.route('/:id/reviews')
        .get(async (req, res) => {
            try {
                // Find the product by its ID and populate the user name for each review
                const product = await Product.findById(req.params.id).populate('reviews.user', 'name');
    
                if (!product) {
                    return res.status(404).json({ msg: 'Product not found' });
                }
    
                // Return the list of reviews for the product
                res.json(product.reviews);
            } catch (error) {
                console.error(error.message);
                res.status(500).send('Server Error');  // Handle server errors
            }
        });
    
    module.exports = router;
    

module.exports = router;