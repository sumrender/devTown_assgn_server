const jwt = require("jsonwebtoken");

const generateToken = (userObj) => {
  return jwt.sign(userObj, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });
};

module.exports = generateToken;
