require("dotenv").config();

// import and setup express
const express = require("express");
const app = express();

// connectDB
const connectDB = require("./db/connect");

const port = process.env.PORT || 3000;

app.get("/", (req, res) => {
  res.send(`<h1>Server is listening on port ${port}</h1>`);
});

const startServer = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(port, () => {
      console.log(`Server is listening on port ${port}`);
    });
  } catch (error) {
    console.log(error);
  }
};

startServer();
