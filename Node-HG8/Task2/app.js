import express from "express";
import { sequelize, testConnection } from "./config/db.js";

const PORT = process.env.PORT || 3000;

const app = express();
app.use(express.json());
app.get("/health", (req, res) => {
  res.json({ status: "ok" });
});

app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ error: "Internal Server Error" });
});

(async () => {
  try {
    await testConnection();
    await sequelize.sync();

    app.listen(PORT, () => {
      console.log(` Server is running at http://localhost:${PORT}`);
    });
  } catch (err) {
    console.error("Failed to start the server:", err);
    process.exit(1);
  }
})();
