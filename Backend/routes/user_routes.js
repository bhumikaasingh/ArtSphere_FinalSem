const express = require('express')
const userController = require('../controller/users_controller')
const auth = require('../middleware/auth')
const uploadOptions = require('../middleware/uploaduser')
const cartController=require('../controller/carts_controller')

const router = express.Router()


router.route('/login')
    .post(userController.loginuser)

router.route('/profile')
    .get(auth.verifyUser, userController.getUserByID)


router.route('/')
    .get(auth.verifyUser, auth.verifyAdmin, userController.getAllUsers)
    .post(uploadOptions.single('image'), userController.registeruser)
    .put((req, res) => {
        res.status(501).send({ "reply": "Put request not supported" })
    })
    .delete(auth.verifyAdmin, userController.deleteallusers)

router.route('/:id')
    .get(auth.verifyUser, userController.getUserByID)
    .post((req, res) => {
        res.status(501).send({ "reply": "Not implemented" })
    })
    .put(auth.verifyUser, userController.updateUserByID)
    .delete(auth.verifyUser, userController.deleteUserByID)

module.exports = router