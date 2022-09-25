const jwt = require("jsonwebtoken");
const verifyToken =
  (roles = []) =>
  (req, res, next) => {
    const token = req.headers["x-access-token"];
    if (!token) {
      return res.status(401).send({
        status: false,
        message: "You are not logged in, please log in and try again",
      });
    }
    try {
      const decoded = jwt.verify(token, process.env.CYPHERKEY);
      req.user = decoded;
      //authrization based on users role
      if (roles.length && !roles.includes(req.user.role)) {
        // user's role is not authorized
        return res.status(401).json({
          status: false,
          message: "You are not authorised to access this endpoint",
        });
      }

      return next();
    } catch {
      return res.status(401).send("Invalid Token");
    }
  };
module.exports = verifyToken;
