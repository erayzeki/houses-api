const express = require("express");
const app = express();

const port = process.env.PORT || 5000;

app.get("/", (req, res) => {
  res.send(`<h1>Server is listening on port ${port}</h1>`);
});

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
