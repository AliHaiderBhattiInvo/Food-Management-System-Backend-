const express = require("express");

const router = express.Router();
const subscriberModel = require("../models").Subscribers;

router.post("/get/subscried-user", async (req, res) => {
  try {
    const user = await subscriberModel.findOne({
      where: {
        user_id: req.body.user_id,
      },
    });
    if (user) res.status(200).json({ user });
    else res.status(400).json("Not found!");
  } catch (error) {
    res.status(500).send(error);
  }
});

router.post("/subscribe", async (req, res) => {
  try {
    const subscriber = await subscriberModel.create({
      user_id: req.body.user_id,
      dish_id: req.body.dish_id,
      dates: req.body.dates,
    });
    res.status(200).json(subscriber);
  } catch (error) {
    res.status(500).send(error);
  }
});

module.exports = router;
