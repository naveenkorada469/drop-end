const express = require("express");

const router = express.Router();

const {
  register,
  login,
  getDonors,
  updateProfile,
} = require("../controllers/userController");

router.post("/register", register);
router.post("/login", login);
router.get("/", getDonors);
router.put("/profile/:id", updateProfile);

module.exports = router;