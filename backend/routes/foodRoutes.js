const express = require("express");
const multer = require("multer");
const Food = require("../models/Food");
const auth = require("../middleware/auth"); // Your auth middleware (must support roles)
const router = express.Router();

// Configure multer for file uploads (create 'uploads/' directory)
const upload = multer({ dest: "uploads/" });

/**
 * POST /api/foods – Add new food (admin only, with image upload)
 * - Input: name (required), price (required), description, category, image (file)
 */
// POST /api/foods – Add new food (logged-in users, with image upload)
router.post("/", upload.single("image"), async (req, res) => {
  try {
    // Extract fields from form-data
    const { name, price, description, category } = req.body;
    const image = req.file?.path ?? null; // Image path if uploaded

    // Validate required fields
    if (!name?.trim() || isNaN(price) || price < 1) {
      return res
        .status(400)
        .json({ error: "Valid name and price are required." });
    }

    // Create and save the food item
    const food = await Food.create({
      name,
      price,
      description: description?.trim() || undefined,
      category: category?.trim() || undefined,
      image,
    });

    res.status(201).json(food);
  } catch (err) {
    console.error("POST /api/foods error:", err);
    res.status(400).json({ error: err.message || "Failed to add food." });
  }
});

/**
 * GET /api/foods – List all foods (public)
 */
router.get("/", async (req, res) => {
  try {
    const foods = await Food.find();
    res.status(200).json(foods);
  } catch (err) {
    console.error("GET /api/foods error:", err);
    res.status(500).json({ error: "Failed to fetch foods." });
  }
});

/**
 * PUT /api/foods/:id – Update food (admin only, with image upload)
 * - Input: name, price, description, category, image (file, optional)
 */
router.put(
  "/:id",
  auth(["admin"]),
  upload.single("image"),
  async (req, res) => {
    try {
      const { name, price, description, category } = req.body;
      if (!name?.trim() || isNaN(price) || price < 1) {
        return res
          .status(400)
          .json({ error: "Valid name and price are required." });
      }

      const update = {
        name,
        price,
        description: description?.trim() || undefined,
        category: category?.trim() || undefined,
        ...(req.file && { image: req.file.path }),
      };

      const food = await Food.findByIdAndUpdate(req.params.id, update, {
        new: true,
      });
      if (!food) {
        return res.status(404).json({ error: "Food not found." });
      }

      res.status(200).json(food);
    } catch (err) {
      console.error("PUT /api/foods/:id error:", err);
      res.status(400).json({ error: err.message || "Failed to update food." });
    }
  }
);

/**
 * DELETE /api/foods/:id – Delete food (admin only)
 */
router.delete("/:id", auth(["admin"]), async (req, res) => {
  try {
    const food = await Food.findByIdAndDelete(req.params.id);
    if (!food) {
      return res.status(404).json({ error: "Food not found." });
    }
    res.status(200).json({ message: "Food deleted successfully." });
  } catch (err) {
    console.error("DELETE /api/foods/:id error:", err);
    res.status(400).json({ error: err.message || "Failed to delete food." });
  }
});

module.exports = router;
