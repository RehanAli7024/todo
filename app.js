const express = require("express");
const path = require("path");
const cors = require("cors");
const app = express();

// Import routes
const auth = require("./routes/auth");
const list = require("./routes/list");

// Connect to the database
require("./connection/connection");

// Middleware
app.use(cors());
app.use(express.json());

// API routes
app.use("/api/v1", auth);
app.use("/api/v2", list);

// Serve static files from the React app
app.use(express.static(path.join(__dirname, "client", "build")));

// Catch-all handler to serve the React app for any request that doesn't match the above routes
app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
