const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 5002;

app.use(cors());
app.use(express.json());

const uri = process.env.ATLAS_URI;

mongoose.connect(uri, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
});

const connection = mongoose.connection;
connection.once("open", () => {
  console.log("mongoDB connection established");
});

const registerRouter = require("./routes/registerRouter");
const loginRouter = require("./routes/loginRouter");

app.use("/register", registerRouter);
app.use("/login", loginRouter);

app.listen(PORT, () => {
  console.log("Server started on port ", PORT);
});
