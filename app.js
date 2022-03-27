const express = require("express");
const connect = require("./src/config/db")
const userController = require("./src/controllers/user.controller");
const app = express();

app.use(express.json());
app.use("/user", userController);

const start = async()=>{
    await connect();
app.listen(4500,()=>{
    console.log("Connected to port 4500");
    })
}
start();
