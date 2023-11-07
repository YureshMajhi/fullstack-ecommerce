const { default: mongoose } = require("mongoose");
const Product = require("../models/productModel");

// get all products
const getProducts = async (req, res) => {
  const product = await Product.find({})
    .populate("category", "title")
    .sort({ createdAt: -1 });

  res.status(200).json(product);
};

// get a single product
const getProduct = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: "No such Product" });
  }

  const product = await Product.findById(id);

  res.status(200).json({ product });
};

// post a new product
const createProduct = async (req, res) => {
  const { title, price, description, rating, image, category } = req.body;

  try {
    const product = await Product.create({
      title,
      price,
      description,
      rating,
      image,
      category,
    });
    res.status(200).json(product);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// delete a product
const deleteProduct = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: "No such product" });
  }

  const product = await Product.findByIdAndDelete(id);

  if (!product) {
    return res.status(400).json({ error: "No such product" });
  }

  res.status(200).json({ msg: "Product deleted successfully" });
};

// update a product
const updateProduct = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: "No such product" });
  }

  const product = await Product.findOneAndUpdate({ _id: id }, { ...req.body });

  res.status(200).json(product);
};

module.exports = {
  getProducts,
  getProduct,
  createProduct,
  deleteProduct,
  updateProduct,
};
