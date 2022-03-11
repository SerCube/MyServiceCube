const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();

// const mongoConnectionString = process.env.DB_URI;
const mongoConnectionString ="mongodb+srv://myservicecube:myservicecube@cluster0.lc7rr.mongodb.net/myServiceCube?retryWrites=true&w=majority";
//should change the database name
const cors = require("cors");

const app = express();

// cors
app.use(cors());
app.use(express.json());
app.get("/", (req, res) => {
  res.send("Welcome");
});


//mongoose connecting
mongoose.connect(mongoConnectionString, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true,
});
const con = mongoose.connection;

con.on("open", () => {
  console.log("Database connected");
});

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const userRoutes = require("./AuthService/routes/userRoutes");
const resetPassword = require("./AuthService/routes/resetRoutes");
const forgetPasswordRoutes = require("./AuthService/routes/forgetPasswordRoutes");
const checkIdentity = require("./AuthService/routes/checkIdentity");


app.use("/auth", userRoutes);
app.use("/account", resetPassword);
app.use("/forget-password", forgetPasswordRoutes);
app.use("/check-identity", checkIdentity);


app.listen(8080, () => {
  console.log("Server started at 8080");
});
