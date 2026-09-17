const { initDb } = require("./db");
initDb().then(() => process.exit(0)).catch(err => {
  console.error("Connection failed:", err.message);
  process.exit(1);
});