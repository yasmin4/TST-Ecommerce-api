const productModel = require("../models/product");
exports.productListing = async (req, res) => {
  try {
    //find all products
    const products = await productModel.find();
    return res.status(200).json({
      success: true,
      message: "products fetched successfully",
      result: {
        products: products,
      },
    });
  } catch (error) {
    return res.status(500).send({
      status: false,
      message: "Something went wrong",
    });
  }
};
