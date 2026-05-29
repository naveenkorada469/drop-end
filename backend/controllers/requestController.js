const BloodRequest = require("../models/BloodRequest");

exports.createRequest = async (req, res) => {
  try {

    const request = await BloodRequest.create(req.body);

    res.status(201).json(request);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getRequests = async (req, res) => {
  try {

    const requests = await BloodRequest.find();

    res.json(requests);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};