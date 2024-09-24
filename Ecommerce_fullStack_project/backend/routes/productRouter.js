const express = require('express');
const router = express.Router();
const { saveProduct, getProduct, deleteProduct, updateProduct } = require('../controller/productController');
const { protect } = require('../middleware/authMiddleware');


router.route('/list').get(getProduct)
router.route('/save').post(protect, saveProduct);
router.route('/update/:id').put(protect, updateProduct);
router.route('/delete/:id').delete(protect, deleteProduct);

module.exports = router;
