const express = require('express');
const app = require("./app");

// initialize environment variables
const dotenv = require("dotenv");
dotenv.config();

// database connection
const connectDatabase = require("./Models/db");
connectDatabase();


// starting server
const server = app.listen(process.env.PORT || 4000, () => {
  console.log(`Server is working on http://127.0.0.1:${process.env.PORT}`);
});

process.on("unhandledRejection", (err) => {
  console.log("UNHANDLED REJECTION! 💥 Shutting down...");
  console.log(err.name, err.message);
  server.close(() => {
    process.exit(1);
  });
});
