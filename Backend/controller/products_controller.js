const Product = require('../models/Product')
const category = require('../models/category')

const getallproducts = (req, res, next) => {
    Product.find()
        .then((products) => {
            res.status(200).json({
                success: true,
                message: "List of products",
                data: products
            });
        }).catch((err) => next(err))
    //res.json(books)
}
const createproducts = (req, res, next) => {
    try {
      // Prepare product data
      let product = { ...req.body };
  
      // Handle file upload
      const file = req.file;
      if (file) {
        const fileName = file.filename;
        product.image = `/images/product_image/${fileName}`;
      }
  
      // Save to database
      Product.create(product)
        .then((savedProduct) => {
          res.status(201).json({
            message: 'Product added successfully',
            data: savedProduct,
          });
        })
        .catch((error) => {
          console.error('Error saving product:', error);
          next(error); // Pass the error to the error-handling middleware
        });
    } catch (error) {
      console.error('Unexpected error:', error);
      next(error); // Handle unexpected errors
    }
  };
  
const deleteallproducts = (req, res) => {
    Product.deleteMany()
        .then((reply) => {
            res.json(reply)
        }).catch(console.log)
}

const getProductByID = (req, res, next) => {
    Product.findById(req.params.id)
        .then((product) => {
            res.status(200).json({
                success: true,
                message: "Product by ID",
                data:product
            });
        }
        ).catch(next)
    
}
const updateProductByID = (req, res, next) => {
    Product.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true })
        .then((product) => {
            res.json(product)
        }
        ).catch(next)
    
}
const deleteProductByID = (req, res, next) => {
    Product.findByIdAndDelete(req.params.id)
        .then((reply) => {
            res.json(reply)
        }).catch(next)
    
}
const searchProductByCategory = (req, res, next) => {
    const categoryId = req.query.categoryId;
    Product.find({ category: categoryId })
        .then(
            (product) => {
                res.status(201).json({
                    success: true,
                    message: "List of products by category",
                    data: product,
                });
            }
        ).catch(
            (err) => {
                res.status(500).json({
                    success: false,
                    message: err,
                });
            }
        );
}

// Add a review to a product
const addReview = async (req, res) => {
    const { rating, comment } = req.body;
    const userId = req.user.id;

    try {
        const product = await Product.findById(req.params.id);

        if (!product) {
            return res.status(404).json({ msg: 'Product not found' });
        }

        const newReview = {
            user: userId,
            rating,
            comment
        };

        product.reviews.push(newReview);
        await product.save();

        res.status(201).json(product.reviews);
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server Error');
    }
};

// Get reviews for a product
const getReviews = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id).populate('reviews.user', 'name');

        if (!product) {
            return res.status(404).json({ msg: 'Product not found' });
        }

        res.json(product.reviews);
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server Error');
    }
};




module.exports = {
    getallproducts,
    createproducts,
    deleteallproducts,
    getProductByID,
    updateProductByID,
    deleteProductByID,
    searchProductByCategory,
    addReview, 
    getReviews 
}

