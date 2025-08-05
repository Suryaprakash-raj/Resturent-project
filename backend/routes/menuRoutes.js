const router = require('express').Router();
const menuController = require('../controllers/menuController');
const auth = require('../middleware/auth');
const { check } = require('express-validator');

// @route   GET /api/menu
// @desc    Get all menu items
router.get('/', menuController.getMenuItems);

// @route   POST /api/menu
// @desc    Add new menu item (admin)
router.post('/', auth(['admin']), menuController.addMenuItem);

// @route   GET /api/menu/search
// @desc    Search menu items
router.get('/search', menuController.searchMenuItems);

module.exports = router;
