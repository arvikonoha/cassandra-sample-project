const cassandra = require("../../../../config/cassandra");

module.exports.viewProf = async userid => {
  return await cassandra.execute(
    "SELECT * from communism.users where email=? ALLOW FILTERING",
    [email]
  );
};

module.exports.viewCred = async userid => {
  return await cassandra.execute(
    "SELECT email,userid from communism.users where userid=?",
    [userid]
  );
};
