const express = require("express");
var multer  = require('multer')

const router = express.Router();
const invoiceModel = require("../models").Invoices

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, "./server/images");
    },
    filename: function (req, file, cb) {
      cb(null, file.originalname);
    },
  });
  var upload = multer({ storage: storage });

  router.post('/upload-proof',upload.single("profile-file"), async(req, res) => {
      try {
        var imagePath = `http://localhost:5000/`;
        imagePath += `${req.file.path}`;
        const invoice = await invoiceModel.create({
          user_id: req.body.user_id,
          dish_id: req.body.dish_id,
          total_meals: req.body.total_meals,
          total_amount: req.body.total_amount,
          proof_payment: imagePath,
        });
        res.status(200).json({invoice});
      } catch (error) {
          res.status(500).send(error)
      }
  })

module.exports = router;
