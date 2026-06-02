const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.register = async (req, res) => {
  try {
    const { name, email, password, bloodGroup, city } = req.body;

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      bloodGroup,
      city
    });

    res.status(201).json(user);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.login = async (req, res) => {
  try {

    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({
        message: "User not found"
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({
        message: "Invalid password"
      });
    }

    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET
    );

    res.json({
      token,
      user
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getDonors = async (req, res) => {
  try {

    const donors = await User.find();

    res.json(donors);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.updateProfile = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, email, bloodGroup, city, profilePic } = req.body;

    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (name !== undefined) user.name = name;
    if (email !== undefined) user.email = email;
    if (bloodGroup !== undefined) user.bloodGroup = bloodGroup;
    if (city !== undefined) user.city = city;
    if (profilePic !== undefined) user.profilePic = profilePic;

    await user.save();

    res.json({
      message: "Profile updated successfully",
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        bloodGroup: user.bloodGroup,
        city: user.city,
        role: user.role,
        profilePic: user.profilePic
      }
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};