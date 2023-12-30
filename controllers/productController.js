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

  const product = await Product.findById(id).populate("category");

  res.status(200).json(product);
};

// get product using category
const getProductByCategory = async (req, res) => {
  const { categoryId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(categoryId)) {
    return res.status(400).json({ error: "No such item" });
  }

  const product = await Product.find({ category: categoryId }).populate(
    "category",
    "title"
  );

  if (!product) {
    return res.status(400).json({ error: "No products found" });
  }

  res.status(200).json(product);
};

// post a new product
const createProduct = async (req, res) => {
  const { title, price, description, count_in_stock, rating, category } =
    req.body;

  try {
    const product = await Product.create({
      title,
      price,
      description,
      count_in_stock,
      rating,
      image: req.file.path,
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

  try {
    let updateData = { ...req.body };

    if (req.file) {
      updateData = { ...updateData, image: req.file.path };
    }

    const product = await Product.findOneAndUpdate({ _id: id }, updateData, {
      new: true,
    });

    if (!product) {
      return res.status(400).json({ error: "Something went wrong" });
    }

    res.status(200).json(product);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  getProducts,
  getProduct,
  createProduct,
  deleteProduct,
  updateProduct,
  getProductByCategory,
};
