const express = require("express");
const {
  getProducts,
  getProduct,
  createProduct,
  deleteProduct,
  updateProduct,
  getProductByCategory,
} = require("../controllers/productController");
const upload = require("../utils/fileUpload");

const router = express.Router();

// get all products
router.get("/getproducts/", getProducts);

// get a signle product
router.get("/getproduct/:id", getProduct);

// get products of certain category
router.get("/getproductsbycategory/:categoryId", getProductByCategory);

// post a new product
router.post("/addproduct/", upload.single("image"), createProduct);

// delete a product
router.delete("/deleteproduct/:id", deleteProduct);

// update a product
router.patch("/updateproduct/:id", upload.single("image"), updateProduct);

module.exports = router;
