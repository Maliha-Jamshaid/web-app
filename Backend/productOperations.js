const ProductModel = require("./models/productmodels");
const createProduct = async (title, cost, sizes) => {
  console.log("Create Product");
  let product = new ProductModel();
  product.title = title;
  product.cost = cost;
  product.sizes = sizes;
  await product.save();
  return product;
};
const updateProduct = async (_id, title, cost, sizes) => {
  let product = await ProductModel.findById(_id);
  product.title = title;
  product.cost = cost;
  product.sizes = sizes;
  await product.save();
  return product;
};
const getAllProducts = async () => {
  let products = await ProductModel.find();
  return products;
};
const deleteProduct = async (_id) => {
  let product = await ProductModel.findByIdAndDelete(_id);
  return product;
};
module.exports.createProduct = createProduct;
module.exports.getAllProducts = getAllProducts;
module.exports.deleteProduct = deleteProduct;
module.exports.updateProduct = updateProduct;