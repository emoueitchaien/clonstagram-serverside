const express = require("express");
const app = express();
const PORT = 5000;
const cors = require("cors");
//MONGODB CONNECTION
//vw2s8G1nB1L954uk

const mongoose = require("mongoose");
const { mongoURI } = require("./key"); //receives URI FROM FILE key.js

require("dotenv").config(); //dotenv module access .env file
const uri = process.env.mongoURI; //receives URI from file .env

mongoose.connect(mongoURI, {
  useUnifiedTopology: true,
  useNewUrlParser: true,
});

mongoose.connection.on("connected", () => {
  console.log("Mongodb connected successfully!");
});

mongoose.connection.off("error", () => {
  console.log("Mongodb connection failed!");
});

require("./models/user");
require("./models/post");

app.use(cors());
app.use(express.json());
app.use(require("./routes/auth"));
app.use(require("./routes/post"));

//MIDDLEWARES
/*
const customMiddleware = (req,res,next) =>{
    console.log("Middleware running!")
    next()
}

app.use(customMiddleware)
*/

//this is get request we basically do this in separate folder routes
/*
app.get('/',(req,res) => {
    res.send("Welcome to our Home Page!")
})
*/

app.listen(PORT, () => {
  console.log("Server started at", PORT);
});
