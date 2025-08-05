const MenuItem = require('../models/MenuItem');
const multer = require('multer');

// Configure Multer for images
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname);
  }
});
const upload = multer({ storage });

// Add Menu Item (with image upload)
exports.addMenuItem = (req, res) => {
  upload.single('image')(req, res, async (err) => {
    if (err) return res.status(500).json({ error: 'Failed to upload image' });
    try {
      const { name, description, price, offer, category } = req.body;
      const image = req.file ? req.file.path : '';
      const menuItem = new MenuItem({ name, description, price, image, offer, category });
      await menuItem.save();
      res.json({ msg: 'Menu item added', menuItem });
    } catch (err) {
      console.error(err);
      res.status(500).send('Server error');
    }
  });
};

// Get All Menu Items
exports.getMenuItems = async (req, res) => {
  try {
    const items = await MenuItem.find();
    res.json(items);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
};

// Search Menu Items
exports.searchMenuItems = async (req, res) => {
  try {
    const { name } = req.query;
    const items = await MenuItem.find({ name: { $regex: name, $options: 'i' } });
    res.json(items);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
};
