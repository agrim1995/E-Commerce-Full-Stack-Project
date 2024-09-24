const express = require('express');
const router = express.Router();
const { saveCategory, getCategory, deleteCategory, updateCategory } = require('../controller/categoryController');
const { protect } = require('../middleware/authMiddleware');


router.route('/list').get(protect, getCategory)
router.route('/save').post(saveCategory);
router.route('/update/:id').put(protect, updateCategory);
router.route('/delete/:id').delete(protect, deleteCategory);

module.exports = router;
