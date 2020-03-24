const Joi = require("@hapi/joi");

module.exports.regObj = new Joi.object({
  fname: Joi.string().required(),
  lname: Joi.string().required(),
  email: Joi.string()
    .email()
    .required(),
  password: Joi.string()
    .pattern(
      new RegExp(
        "^(((?=.*[a-z])(?=.*[A-Z]))|((?=.*[a-z])(?=.*[0-9]))|((?=.*[A-Z])(?=.*[0-9])))(?=.{6,})"
      )
    )
    .required(),
  cpassword: Joi.string().valid(Joi.ref("password"))
});

module.exports.logObj = new Joi.object({
  email: Joi.string()
    .email()
    .required(),
  password: Joi.string().required()
});
