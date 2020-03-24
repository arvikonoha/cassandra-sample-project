const joi = require("./joi-objects/index");
module.exports.registerValidation = async body => {
  let { error, fname, lname, password, email } = await joi.regObj.validateAsync(
    body
  );
  if (error) throw new Error(error);
  return { fname, lname, password, email };
};

module.exports.loginValidation = async body => {
  let { password, email, error } = await joi.logObj.validateAsync(body);
  if (error) throw new Error(error);
  return { password, email };
};
