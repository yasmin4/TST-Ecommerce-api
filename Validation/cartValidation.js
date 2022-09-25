const yup = require("yup");

exports.addCartValidation = async (req, res, next) => {
  try {
    const cartSchema = yup.object().shape({
      product_id: yup.string().required(),
      quantity: yup.number().required(),
    });
    await cartSchema.validate(req.body);
    next();
  } catch (error) {
    console.log("error", error);
    return res.status(400).json({
      success: false,
      errors: error.errors[0],
    });
  }
};
exports.removeCartValidation = async (req, res, next) => {
  try {
    const cartSchema = yup.object().shape({
      product_id: yup.string().required(),
    });
    await cartSchema.validate(req.body);
    next();
  } catch (error) {
    console.log("error", error);
    return res.status(400).json({
      success: false,
      errors: error.errors[0],
    });
  }
};
