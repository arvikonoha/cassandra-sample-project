const route = require("express").Router();
const Joi = require("../../../models/Utils/Joi/index");
const Cassandra = require("../../../models/Cassandra/Auth/index");
const Bcrypt = require("../../../models/Utils/BCrypt/index");
const JWT = require("../../../models/Utils/JWT/index");
const uuid = require("uuid");

route.post("/", async (req, res) => {
  try {
    // check if data is valid
    let { fname, lname, email, password } = await Joi.registerValidation(
      req.body
    );
    let userid = uuid.v4();

    // hash the password
    let hashedPwd = await Bcrypt.hashPwd(password);

    // check for existing account
    let isCredPresent = await Cassandra.viewCred(email);

    // if no account is present
    if (isCredPresent.rowLength === 0) {
      let insertionData = await Cassandra.registerUser({
        fname,
        lname,
        userid,
        email,
        password: hashedPwd
      });

      if (insertionData.success) {
        let token = await JWT.signToken(userid);
        res.cookie("token", "Bearer " + token, {
          httpOnly: true,
          maxAge: 60 * 60 * 6
        });
        return res.json({ fname, lname, email, userid });
      }
    } else {
      let error = new Error();
      error.details = [{ message: '"Email" already has an account' }];
      throw error;
    }
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
