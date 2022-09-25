const mongoose = require("mongoose");

//create module
const { seedProduct } = require("./product-seeder");

mongoose
  .connect(`mongodb://localhost:27017/TST-demo-api`)
  .then(async () => {
    console.log("mongodb connected, seeding data");
    await seed();
    await exit();
  })
  .catch((err) => {
    console.log(err);
  });

async function seed() {
  console.log("seed function called");
  await seedProduct();
}

function exit() {
  console.log("seeding completed");
  mongoose.disconnect();
}
