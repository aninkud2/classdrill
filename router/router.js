const express = require('express');
const {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
  
} = require('../controller/userController');

const router = express.Router();

// CRUD Routes
router.get('/', getAllUsers);
router.get('/allinfo', getAllUsersInfo);
router.get('/:id', getUserById);
router.post('/', createUser);
router.put('/:id', updateUser);


module.exports = router;
