const express = require("express");

const router = express.Router();

const BloodRequest = require("../models/BloodRequest");


// CREATE REQUEST
const createRequest = async (req, res) => {
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
};

router.post("/", createRequest);
router.post("/register", createRequest);


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

// UPDATE REQUEST STATUS
router.put("/:id", async (req, res) => {
  try {
    const { status } = req.body;
    const request = await BloodRequest.findById(req.params.id);
    if (!request) {
      return res.status(404).json({ message: "Request not found" });
    }
    if (status) request.status = status;
    await request.save();
    res.json({ message: "Request updated successfully", data: request });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});


module.exports = router;