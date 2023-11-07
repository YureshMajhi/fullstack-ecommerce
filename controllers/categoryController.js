const mongoose = require("mongoose");
const Category = require("../models/categoryModel");

// get all categories
const getCategories = async (req, res) => {
  const category = await Category.find({}).sort({ createdAt: -1 });

  res.status(200).json(category);
};

// get a single category
const getCategory = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: "No such category" });
  }

  const category = await Category.findOne({ _id: id });
  res.status(200).json(category);
};

// create category
const createCategory = async (req, res) => {
  const { title } = req.body;

  // check if the category already exists
  const categoryExists = await Category.findOne({ title });

  if (categoryExists) {
    return res.status(400).json({ error: "Category already exists" });
  }

  try {
    const category = await Category.create({ title });

    res.status(200).json(category);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// delete category
const deleteCategory = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: "No such category" });
  }

  const category = await Category.findOneAndDelete({ _id: id });

  if (!category) {
    return res.status(400).json({ error: "No such category" });
  }

  res.status(200).json({ msg: "Category deleted successfully" });
};

// update category
const updateCategory = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: "No such category" });
  }

  const category = await Category.findOneAndUpdate(
    { _id: id },
    { ...req.body },
    { new: true }
  );
  res.status(200).json(category);
};

module.exports = {
  getCategories,
  getCategory,
  createCategory,
  deleteCategory,
  updateCategory,
};
