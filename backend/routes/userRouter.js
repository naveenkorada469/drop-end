const express = require("express");

const router = express.Router();
//post API
router.post("/", (req, res) => {

res.json({
    message:"user created successfully",
    data:req.body
});
});
const {
  register,
  login,
  getDonors
} = require("../controllers/userController");

router.post("/register", register);

router.post("/login", login);

router.get("/donors", getDonors);

module.exports = router;