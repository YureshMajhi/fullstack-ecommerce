const express = require("express");
const {
  getCategories,
  getCategory,
  createCategory,
  deleteCategory,
  updateCategory,
} = require("../controllers/categoryController");
const { requireAuth } = require("../controllers/userController");

const router = express.Router();

// get all categories
router.get("/", getCategories);

// get a category
router.get("/:id", getCategory);

// create a category
router.post("/", requireAuth, createCategory);

// delete a category
router.delete("/:id", deleteCategory);

// update a category
router.patch("/:id", updateCategory);

module.exports = router;
