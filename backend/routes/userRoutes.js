const router = require('express').Router();
const userController = require('../controllers/userController');
const auth = require('../middleware/auth');
const { check } = require('express-validator');

// @route   GET /api/user
// @desc    Get user profile
router.get('/', auth(['customer']), userController.getProfile);

// @route   PUT /api/user
// @desc    Update user profile
router.put('/', auth(['customer']), [
  check('name', 'Name is required').not().isEmpty()
], userController.updateProfile);

module.exports = router;
