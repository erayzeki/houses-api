require("dotenv").config();
require("express-async-errors");

// security packages
const helmet = require("helmet");
const cors = require("cors");
const rateLimit = require("express-rate-limit");

//swagger
const swaggerUI = require("swagger-ui-express");
const YAML = require("yamljs");
const swaggerDocument = YAML.load("./swagger.yaml");

// import and setup express
const express = require("express");
const app = express();

// connectDB
const connectDB = require("./db/connect");

// routers
const authRouter = require("./routes/authRouter");
const houseRouter = require("./routes/houseRouter");

// error handlers
const notFoundMiddleware = require("./middleware/not-found");
const errorHandlerMiddleware = require("./middleware/error-handler");

app.set("trust proxy", 1);
app.use(
  rateLimit({
    windowMs: 1000 * 60 * 15,
    max: 100,
  })
);
app.use(express.json());
app.use(helmet());
app.use(cors());

// routes
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/houses", houseRouter);

app.get("/", (req, res) => {
  res.send(
    `<h1><center>Houses API</center></h1><h2><center><a href="/api-docs">Documentation</a></center></h2>`
  );
});

app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(swaggerDocument));

// middlewares
app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const port = process.env.PORT || 3000;

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
