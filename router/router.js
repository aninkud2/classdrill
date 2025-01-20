const express = require('express');
const {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
  createScore,
  getAllUsersInfo
} = require('../controller/userController');

const router = express.Router();

// CRUD Routes
router.get('/', getAllUsers);
router.get('/allinfo', getAllUsersInfo);
router.get('/:id', getUserById);
router.post('/', createUser);
router.put('/:id', updateUser);
router.post('/:id', createScore);
router.delete('/:id', deleteUser);

module.exports = router;
