const router = require("express").Router();
const { auth } = require("../../middlewares/jwt/index");
const { viewCred } = require("../../../models/Cassandra/Auth/View/index");

router.get("/", auth, async (req, res) => {
  let { user } = req;
  let credentials = await viewCred(user);
  return res.json(credentials.rows[0]);
});

module.exports = router;
