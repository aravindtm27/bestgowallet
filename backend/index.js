

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const apiRoute = require("./src/routes/index.js")
const userRoute = require("./src/routes/user.js");
const accountRoute = require("./src/routes/account.js");
const {authMiddleware} = require("./src/middleware/middleware.js")


const app = express();

const PORT = process.env.PORT || 5000;

mongoose.connect("mongodb+srv://aravindtm98:aravindtm98@cluster0.8b7vdei.mongodb.net/bestgowallet").then((e)=>console.log("Mongodb connected"));

app.use(cors());
app.use(express.json());
app.use(express.urlencoded());

app.use("/api/v1/wallet",apiRoute);
app.use("/api/v1/user",userRoute);
app.use("/api/v1/account",accountRoute);

app.listen(PORT, ()=>console.log("server started at port 4000"));
