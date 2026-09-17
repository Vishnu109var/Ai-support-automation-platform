const express = require("express");
const cors = require("cors");
require("dotenv").config();

const { initDb } = require("./db");
const ticketRoutes = require("./routes/tickets");

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static("public"));

app.use("/api/tickets", ticketRoutes);

const PORT = process.env.PORT || 4000;

initDb().then(() => {
  app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
  });
});