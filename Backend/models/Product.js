const mongoose = require('mongoose');
const category = require('./category');
const user = require('./User');

const ProductSchema = mongoose.Schema({
    image: {
        type: String
    },
    name: {
        type: String,
        required: true,
    },
    price: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    category: {
        type: String,
        ref: 'Category'
    },
    reviews: [
        {
            user: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'User'
            },
            rating: {
                type: Number,
                required: true,
                min: 1,
                max: 5
            },
            comment: {
                type: String,
                required: true
            }
        }
    ]
}, { timestamps: true });

module.exports = mongoose.model('Product', ProductSchema);
