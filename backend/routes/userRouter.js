const express = require("express");

const router = express.Router();

const BloodRequest = require("../models/BloodRequest");
const {
  register,
  login,
  getDonors,
} = require("../controllers/userController");

router.post("/register", register);
router.post("/login", login);
router.get("/", getDonors);


// CREATE REQUEST
router.post("/register", async (req, res) => {

  try {

    const newRequest = await BloodRequest.create(req.body);

    res.status(201).json({
      message: "Blood request created successfully",
      data: newRequest
    });

  } catch (error) {

    res.status(500).json({
      message: error.message
    });

  }

});


// GET ALL REQUESTS
router.get("/", async (req, res) => {

  try {

    const requests = await BloodRequest.find();

    res.json(requests);

  } catch (error) {

    res.status(500).json({
      message: error.message
    });

  }

});


module.exports = router;