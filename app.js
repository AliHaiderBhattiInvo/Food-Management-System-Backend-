const express = require('express');
const multer = require('multer')
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

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './server/images')
    },
    filename: function (req, file, cb) {
      cb(null, file.originalname)
    }
})
var upload = multer({ storage: storage })
app.use(express.static(__dirname + '/public'));
app.use('/server/images', express.static('server/images'));


app.post('/profile-upload-single', upload.single('profile-file'), function (req, res, next) {
    // req.file is the `profile-file` file
    // req.body will hold the text fields, if there were any
    console.log(JSON.stringify(req.file))
    var response = `localhost:5000/`
    // response += "Files uploaded successfully.<br>"
    response += `${req.file.path}`
    return res.send(response)
  })

const port = process.env.PORT || 5000
app.listen(port,()=>{
console.log("Server is running on: " + port);
})

module.exports = app;