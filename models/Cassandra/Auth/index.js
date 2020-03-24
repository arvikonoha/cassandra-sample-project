const cassandra = require("../../../config/cassandra");

module.exports.viewCred = async function viewCred(email) {
  return await cassandra.execute(
    "SELECT * from communism.user_credentials where email=?",
    [email]
  );
};

module.exports.registerUser = async ({
  email,
  fname,
  lname,
  password,
  userid
}) => {
  let insertCredential = await cassandra.execute(
    "INSERT INTO communism.user_credentials (email,password,userid) values(?,?,?)",
    [email, password, userid]
  );

  // insert into profile table
  let insertProfile = await cassandra.execute(
    "INSERT INTO communism.users (email,fname,lname,userid) values(?,?,?,?)",
    [email, fname, lname, userid]
  );

  // if both the above tasks are done
  if (insertCredential && insertProfile)
    // return the profile, have to do this separately
    return { success: true };
};
