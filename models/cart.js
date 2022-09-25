const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CartSchema = new mongoose.Schema({
  product_id: { type: Schema.Types.ObjectId, ref: "Products", required: true },
  user_id: { type: Schema.Types.ObjectId, ref: "Users", required: true },
  quantity: { type: Number, required: true },
  created_at: {
    type: Date,
    default: new Date(),
  },
  updated_at: {
    type: Date,
    default: new Date(),
  },
});
module.exports = mongoose.model("Cart", CartSchema);
