const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const policyHolderRoute = require("./routes/policyHolders.route");
const claimsRoute = require("./routes/claims.route");
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
  })
);

app.use("/policyHolder", policyHolderRoute);
app.use("/claims", claimsRoute)

app.use(express.json({ limit: "16kb" }));

module.exports = { app };