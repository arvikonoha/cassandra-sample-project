const bcrypt = require("bcryptjs");

module.exports.hashPwd = async password => {
  let salt = await bcrypt.genSalt(10);
  let hash = await bcrypt.hash(password, salt);
  return hash;
};

module.exports.verifyPwd = async (password, userPwd) => {
  let isValid = await bcrypt.compare(userPwd, password);
  return isValid;
};
