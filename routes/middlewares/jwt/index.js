const jwt = require("jsonwebtoken");

module.exports.auth = async (req, res, next) => {
  let token;
  let { bearerToken } = req.cookies;
  if (bearerToken) {
    [, token] = bearerToken.split(" ");
    const { userid } = await jwt.verify(token, process.env.JSON_SECRET);
    req.user = userid;
    next();
  } else {
    return res
      .status(403)
      .json({ type: '"token"', message: "Token not found" });
  }
};
