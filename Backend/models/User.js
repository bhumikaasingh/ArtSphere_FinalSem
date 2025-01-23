const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
    fname: {
        type: String,
        required: true,
    },
    lname: {
        type: String,
        required: true,
    },
    image:{
        type:String
    },
    username: {
        type: String,
        required: true,
        unique: true,
        minLength: [5, 'Username should be longer than 5 characters']
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    role:{
        type: String,
        enum:['Admin','User','Vendor'],
        default: 'User'
    },
    address:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Address'
    },
    isFormFilled:{
        type:Boolean,
        default:false
    }
}, { timestamps: true })
module.exports = mongoose.model('User', userSchema)