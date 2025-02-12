require("dotenv").config();
const express = require("express");
const cors = require("cors");
const swaggerUi = require("swagger-ui-express");
let swaggerDocument = require("./swagger/swagger.json");
const path = require("path");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/static", express.static(path.join(__dirname, "public")));

// Set up Swagger UI
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Define routes
app.use(require("./routes/dev"));
app.use("/auth", require("./routes/auth"));
app.use("/tour", require("./routes/tour"));
app.use("/basket", require("./routes/basket"));
app.use("/user", require("./routes/user"));
app.use("/order", require("./routes/order"));

app.get("/", (req, res) => {
  res.send("Welcome to the Tour and Travel Agency API!");
});

// Export app for Vercel
module.exports = app;
