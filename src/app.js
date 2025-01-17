const express = require("express");
const dbConnect = require("./config/db");
const config = require("./config");
const cors = require("cors");
const router = require("./routes");
const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.json({ message: "Auth application" });
});

app.use("/api", router)

dbConnect().then((result) => {
  if (!result) return process.exit(1);
  app.listen(config.port, () => {
    console.log(`application is running on http://localhost:${config.port}`);
  });
});
