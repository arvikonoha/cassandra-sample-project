const router = require("express").Router();
const { auth } = require("../../middlewares/jwt/index");

router.post("/", auth, async (req, res) => {
  let { user } = req;
});
