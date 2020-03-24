const route = require("express").Router();

route.use("/register", require("./register/index"));
route.use("/login", require("./login/index"));
route.use("/authorize", require("./authrize/index"));

module.exports = route;
