const express = require("express");
const client = require("prom-client");

const app = express();
const PORT = 5006;

const register = new client.Registry();
client.collectDefaultMetrics({ register });

app.get("/health", (req, res) => {
  res.json({
    service: "notification-service",
    status: "ok",
    uptime: process.uptime()
  });
});

app.get("/", (req, res) => {
  res.json({
    message: "Notification service is running"
  });
});

app.get("/metrics", async (req, res) => {
  res.set("Content-Type", register.contentType);
  res.end(await register.metrics());
});

app.listen(PORT, "0.0.0.0", () => {
  console.log("notification-service running on", PORT);
});