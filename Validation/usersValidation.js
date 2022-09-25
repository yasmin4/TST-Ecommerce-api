const yup = require("yup");

exports.signupValidation = (req, res, next) => {
  const phoneRegExp =
    /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;
  const signupSchema = yup.object().shape({
    name: yup.string().required("Name is required"),
    email: yup
      .string()
      .email("Please enter valid email")
      .required("Email is required"),
    password: yup.string().required("Password is required"),
    phone_no: yup
      .string()
      .required("Phone number is required")
      .matches(phoneRegExp, "Phone number should be valid 10 digits")
      .min(10, "Phone number should be valid 10 digits")
      .max(10, "Phone number should be valid 10 digits"),
  });
  signupSchema
    .validate(req.body)
    .then(next())
    .catch((error) =>
      res.status(400).json({
        success: false,
        errors: error.errors[0],
      })
    );
};

exports.loginValidation = (req, res, next) => {
  const loginSchema = yup.object().shape({
    email: yup
      .string()
      .email("Please enter valid email")
      .required("Email is required"),
    password: yup.string().required("Password is required"),
  });
  loginSchema
    .validate(req.body)
    .then(next())
    .catch((error) =>
      res.status(400).json({
        success: false,
        errors: error.errors[0],
      })
    );
};
