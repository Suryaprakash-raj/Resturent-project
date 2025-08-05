const Food = require('../models/Food');

// Add food item (admin only)
exports.addFood = async (req, res) => {
  try {
    const food = new Food(req.body);
    await food.save();
    res.status(201).json({ msg: 'Food item added', food });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Get all foods (public)
exports.getFoods = async (req, res) => {
  try {
    const foods = await Food.find({});
    res.json(foods);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch foods.' });
  }
};

// Update food item (admin only)
exports.updateFood = async (req, res) => {
  try {
    const food = await Food.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!food) return res.status(404).json({ error: 'Food not found.' });
    res.json({ msg: 'Food updated', food });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Delete food item (admin only)
exports.deleteFood = async (req, res) => {
  try {
    const food = await Food.findByIdAndDelete(req.params.id);
    if (!food) return res.status(404).json({ error: 'Food not found.' });
    res.json({ msg: 'Food deleted' });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
