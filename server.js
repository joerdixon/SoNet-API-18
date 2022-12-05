// Require express
const express = require("express");
// Import our db connection.
const db = require("./config/connection");
// Import our routes
const routing = require("./routing")

const PORT = process.env.port || 3001;
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(routing);

db.once('open', () => {
  app.listen(PORT, () => {
    console.log(`API server running on port ${PORT}!`);
  });
});