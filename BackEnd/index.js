const express = require("express");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const app = express();

const userRouter = require("./Routes/UserRoutes");
const accountRouter = require("./Routes/AccountRoutes")

app.use(cors());
app.use(express.json());

app.use("/user",userRouter);
app.use("/account",accountRouter);

app.listen(3000);