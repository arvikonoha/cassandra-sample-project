const jwt = require("jsonwebtoken");

module.exports.signToken = async userid => {
  return await jwt.sign({ userid }, process.env.JSON_SECRET, {
    expiresIn: "6h"
  });
};
