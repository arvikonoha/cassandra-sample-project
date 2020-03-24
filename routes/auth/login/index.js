const route = require("express").Router();
const Joi = require("../../../models/Utils/Joi/index");
const Cassandra = require("../../../models/Cassandra/Auth/index");
const Bcrypt = require("../../../models/Utils/BCrypt/index");
const JWT = require("../../../models/Utils/JWT/index");

route.post("/", async (req, res) => {
  try {
    // check if data is valid
    let { email, password } = await Joi.loginValidation(req.body);
    let isCredPresent = await Cassandra.viewCred(email);
    if (isCredPresent.rowLength) {
      let { password: hashPwd, userid } = isCredPresent.rows[0];
      let isValidPassword = await Bcrypt.verifyPwd(hashPwd, password);
      if (isValidPassword) {
        let token = await JWT.signToken(userid);
        res.cookie("bearerToken", "Bearer " + token, {
          httpOnly: true,
          maxAge: 60 * 60 * 6
        });
        return res.json({ email, userid });
      } else {
        console.log("password");
        let error = new Error();
        error.details = [{ message: '"Email or Password" is not correct' }];
        throw error;
      }
    } else {
      console.log("email");
      let error = new Error();
      error.details = [{ message: '"Email or Password" is not correct' }];
      throw error;
    }

    // if account is present
  } catch (error) {
    console.log(error);
    let { details } = error;
    let [{ message }] = details;
    if (message)
      return res
        .status(422)
        .json({ type: message.match(/\".+\"/)[0], message });
    res
      .status(500)
      .json({ type: "Server", message: "Unexpected server error" });
  }
});

module.exports = route;
