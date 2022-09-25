const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const userModel = require("../models/users");

exports.signupUser = async (req, res) => {
  try {
    // Find user with email
    // If user found with this email. Then throw error
    // otherwise add new user
    const userWithSameEmail = await userModel.findOne({
      email: req.body.email,
    });

    // user with email is not found.
    if (userWithSameEmail) {
      return res.status(400).json({
        message: "This email is already register,try with another one",
      });
    }

    //encrypted the password
    const encryptedPassword = await bcrypt.hash(req.body.password, 10);

    // Create new user
    const newUser = await new userModel({
      name: req.body.name,
      email: req.body.email,
      password: encryptedPassword,
      phone_no: req.body.phone_no,
    }).save();

    return res.status(200).send({
      status: true,
      message: "New user added successfully.",
      result: newUser,
    });
  } catch (error) {
    return res.status(500).send({
      status: false,
      message: "Something went wrong. Please try again.",
    });
  }
};

exports.loginUser = async (req, res) => {
  try {
    //find email present in database or not
    const findUser = await userModel.findOne({ email: req.body.email });

    //if findUser is null so email is not present in db
    if (!findUser) {
      return res.status(400).json({
        message: "Email is not exist",
      });
    }

    //compare the password
    //if match generate the token
    if (await bcrypt.compare(req?.body?.password, findUser?.password)) {
      const userData = {
        user_id: findUser._id,
        email: req.body.email,
        role: findUser.role,
      };

      const token = await jwt.sign(
        JSON.parse(JSON.stringify(userData)),
        process.env.CYPHERKEY,
        {
          expiresIn: process.env.TOKENEXPIRETIME,
        }
      );
      // User cred is correct. Login success.
      return res.status(200).send({
        status: true,
        message: "Succefully login.",
        result: {
          token: token,
          role: findUser.role,
        },
      });
    }
    return res.status(400).json({
      message: "Invalid password",
    });
  } catch (error) {
    return res.status(500).send({
      status: false,
      message: "Something went wrong",
    });
  }
};

exports.userListing = async (req, res) => {
  try {
    //find all users
    const users = await userModel.find({ _id: { $ne: req.user.user_id } });
    if (users) {
      return res.status(200).json({
        success: true,
        message: "Users fetched successfully",
        result: {
          users: users,
        },
      });
    } else {
      return res.status(400).json({
        success: false,
        message: "User not found",
      });
    }
  } catch (error) {
    return res.status(500).send({
      status: false,
      message: "Something went wrong",
    });
  }
};

exports.SingleUserListing = async (req, res) => {
  try {
    const user = await userModel.findOne(
      { _id: req.params.id },
      { name: 1, email: 1, phone_no: 1 }
    );
    if (user) {
      return res.status(200).json({
        success: true,
        message: "Users data fetched successfully",
        result: {
          user: user,
        },
      });
    } else {
      return res.status(400).json({
        success: false,
        message: "User not found",
      });
    }
  } catch (error) {
    return res.status(500).send({
      status: false,
      message: "Something went wrong",
    });
  }
};

exports.userUpdate = async (req, res) => {
  try {
    await userModel.updateOne(
      { _id: req.params.id },
      {
        $set: req.body,
      }
    );

    return res.status(200).json({
      status: true,
      message: "User data updated succesfully",
    });
  } catch (error) {
    return res.status(500).send({
      status: false,
      message: "Something went wrong",
    });
  }
};

exports.userDelete = async (req, res) => {
  try {
    await userModel.deleteOne({ _id: req.params.id });
    return res.status(200).send({
      status: true,
      message: "User deleted succesfully",
    });
  } catch (error) {
    return res.status(500).send({
      status: false,
      message: "Something went wrong",
    });
  }
};
