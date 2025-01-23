const express = require('express')
const router = express.Router()
const CategoryController = require('../controller/categories_controller')
const auth = require('../middleware/auth')


router.route('/')
    .get(CategoryController.getallcategory)
    .post(auth.verifyUser, CategoryController.createallcategory)
    .put((req, res) => {
        res.status(501).send({ "reply": "Put request not supported" })
    })
    .delete(auth.verifyUser, auth.verifyAdmin ,CategoryController.deleteallcategory)
    

router.route('/:id')
    .get(CategoryController.getcategorybyID)
    .post((req, res) => {
        res.status(501).send({ "reply": "Put request not supported" })
    })
    .put(auth.verifyUser,CategoryController.updatecategorybyID)
    .delete(auth.verifyUser ,CategoryController.deletecategorybyID)

module.exports = router
