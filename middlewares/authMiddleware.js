const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

const isAuthorized = async (req, res, next) => {
  let token;
  try {
    if (!req.headers.authorization) {
      res.status(401);
      throw new Error("Not authorized, no token");
    }

    token = req.headers.authorization.split(" ")[1];

    // decode token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(decoded.id).select("-password");

    if (req.user.blocked) {
      res.status(401);
      throw new Error("Not authorized, user is blocked");
    }

    console.log("====== auth check passed =======", req.user.name);
    next();
  } catch (error) {
    next(error);
  }
};

module.exports = isAuthorized;
