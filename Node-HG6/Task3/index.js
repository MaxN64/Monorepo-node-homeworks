import express from "express";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.get("/", (req, res, next) => {
  try {
    res.json({ message: "Hello, World!" });
  } catch (err) {
    next(err);
  }
});

app.post("/", (req, res, next) => {
  try {
    const { name } = req.body;
    if (!name) {
      const err = new Error("Name is required");
      err.statusCode = 400;
      throw err;
    }
    res.status(201).json({ message: `Hello, ${name}!` });
  } catch (err) {
    next(err);
  }
});

app.use((req, res) => {
  res.status(404).json({ message: "Not found" });
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  const status = err.statusCode || 500;
  res.status(status).json({
    error: err.message || "Something went wrong",
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
