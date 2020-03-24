const express = require("express");
const cookieParser = require("cookie-parser");
const app = express();
require("dotenv").config();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use("/auth", require("./routes/auth/"));

app.listen(3000, () => console.log("Listening"));
