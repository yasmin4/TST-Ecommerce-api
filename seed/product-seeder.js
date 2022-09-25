const products = require("../models/product");

async function seed() {
  try {
    await new products({
      name: "t-shirt",
      price: 200,
      stock: 10,
    }).save();

    await new products({
      name: "shirt",
      price: 300,
      stock: 10,
    }).save();

    await new products({
      name: "pent",
      price: 500,
      stock: 10,
    }).save();

    await new products({
      name: "anarkali",
      price: 600,
      stock: 11,
    }).save();

    await new products({
      name: "kurti",
      price: 400,
      stock: 80,
    }).save();

    await new products({
      name: "kurta",
      price: 400,
      stock: 12,
    }).save();

    await new products({
      name: "plazzo",
      price: 800,
      stock: 10,
    }).save();
  } catch (error) {
    console.log("error", error);
  }
}

module.exports.seedProduct = seed;
