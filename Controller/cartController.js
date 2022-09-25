const cartModel = require("../models/cart");
const productModel = require("../models/product");

exports.addToCart = async (req, res) => {
  try {
    const findProduct = await productModel.findOne({
      product_id: req.body.product_id,
    });

    // If product is invalid
    if (!findProduct) {
      return res.status(400).send({
        status: false,
        message: "Sorry, this product is not exist with our db",
      });
    }

    // If stock is not valid
    if (findProduct.stock < req.body.quantity) {
      return res.status(400).send({
        status: false,
        message: `sorry stock is not avaliable only ${findProduct.stock} iteam`,
      });
    }

    //if product already present in your cart
    const userWithSameProduct = await cartModel.findOne({
      product_id: req.body.product_id,
      user_id: req.user.user_id,
    });

    if (userWithSameProduct) {
      // update cart record
      await cartModel.findOneAndUpdate(
        { product_id: req.body.product_id, user_id: req.user.user_id },
        {
          $inc: { quantity: req.body.quantity },
        }
      );

      // Reduce qty from stock
      await productModel.updateOne(
        { product_id: req.body.product_id },
        {
          $inc: { stock: -req.body.quantity },
        }
      );

      return res.status(200).send({
        status: true,
        message: "Item was already in your cart. We updated it's quentity",
      });
    }

    //add new product in cart
    const newCartlist = await new cartModel({
      product_id: req.body.product_id,
      user_id: req.user.user_id,
      quantity: req.body.quantity,
    }).save();

    // Reduce qty from stock
    await productModel.updateOne(
      { product_id: req.body.product_id },
      {
        $set: { stock: findProduct.stock - req.body.quantity },
      }
    );

    return res.status(200).send({
      status: true,
      message: "New cart item added successfully.",
    });
  } catch (error) {
    return res.status(400).send({
      status: false,
      message: "new cart list not added ",
    });
  }
};
exports.removeToCart = async (req, res) => {
  try {
    //if product already present in your cart
    const userWithSameProduct = await cartModel.findOne({
      product_id: req.body.product_id,
      user_id: req.user.user_id,
    });
    if (userWithSameProduct) {
      // increase stock with cart qty
      await productModel.findOneAndUpdate(
        {
          product_id: req.body.product_id,
        },
        {
          $inc: { stock: userWithSameProduct.quantity },
        }
      );

      // Remove item from cart
      await cartModel.deleteOne({
        product_id: req.body.product_id,
        user_id: req.user.user_id,
      });

      return res.status(200).send({
        status: true,
        message:
          "iteam in your cart is deleted succesfully and product stock is updated",
      });
    } else {
      return res.status(400).send({
        status: false,
        message: " cart iteam not found",
      });
    }
  } catch (error) {
    console.log("error", error);
    return res.status(400).send({
      status: false,
      message: " cart iteam not deleted",
    });
  }
};
exports.listingCartIteams = async (req, res) => {
  try {
    //find cart  iteams using user id
    const findCartIteams = await cartModel
      .find({
        user_id: req.user.user_id,
      })
      .populate("product_id");

    if (findCartIteams) {
      let subTotal = 0;
      for (let iteams = 0; iteams < findCartIteams.length; iteams++) {
        subTotal +=
          findCartIteams[iteams]["product_id"].price *
          findCartIteams[iteams].quantity;
      }
      return res.status(200).send({
        status: true,
        message: "iteam in your cart ",
        result: {
          cartIteams: findCartIteams,
          sabTotal: subTotal,
        },
      });
    }
  } catch (error) {
    console.log("error", error);
    return res.status(400).send({
      status: false,
      message: " cart iteam not find for this user",
    });
  }
};
