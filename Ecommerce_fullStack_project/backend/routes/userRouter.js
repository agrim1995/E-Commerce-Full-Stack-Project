const express = require('express');
const router = express.Router();
const { registerUser, loginUser, updateUser, deleteUser } = require('../controller/userController');

router.post('/register', registerUser);
router.post('/login', loginUser);
router.route('/update/:id').put( updateUser);
router.route('/delete/:id').delete( deleteUser);

module.exports = router;
 