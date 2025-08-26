require("dotenv").config();
const express = require("express");

const app = express();
app.use(express.json());

const apiRouter = require("./routes/routes");
app.use("/api", apiRouter);

app.get("/", (req, res) => {
  res.json({ status: "ok", service: "express-mongoose-starter" });
});

app.get("/health/db", (req, res) => {
  const state = require("mongoose").connection.readyState;
  const map = {
    0: "disconnected",
    1: "connected",
    2: "connecting",
    3: "disconnecting",
  };
  res.json({ readyState: state, stateText: map[state] });
});

module.exports = app;
