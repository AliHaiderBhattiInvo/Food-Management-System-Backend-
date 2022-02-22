const express = require('express');
const bodyParser = require('body-parser');
const authRoutes = require("./server/routes/auth")
const cors=require('cors');

// Set up the express app
const app = express();
app.use(cors())

// Parse incoming requests data (https://github.com/expressjs/body-parser)
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Setup a default catch-all route that sends back a welcome message in JSON format.
app.use("/api", authRoutes)

const port = process.env.PORT || 5000
app.listen(port,()=>{
console.log("Server is running on: " + port);
})

module.exports = app;