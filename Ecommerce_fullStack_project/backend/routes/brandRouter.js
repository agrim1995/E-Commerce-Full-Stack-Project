const express = require('express');
const router = express.Router();
const { saveBrand, getBrand, deleteBrand, updateBrand } = require('../controller/brandController');
const { protect } = require('../middleware/authMiddleware');


router.route('/list').get(protect, getBrand)
router.route('/save').post(protect, saveBrand);
router.route('/update/:id').put(protect, updateBrand);
router.route('/delete/:id').delete(protect, deleteBrand);

module.exports = router;
