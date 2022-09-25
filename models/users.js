const mongoose = require("mongoose");
const { userRole } = require("../constant/constant");

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  phone_no: { type: String, required: true },
  is_active: { type: Boolean, default: false },
  role: {
    type: String,
    default: userRole.ENDUSER,
    enum: [userRole.ENDUSER, userRole.ADMIN],
  },
  created_at: {
    type: Date,
    default: new Date(),
  },
  updated_at: {
    type: Date,
    default: new Date(),
  },
});
module.exports = mongoose.model("Users", UserSchema);
