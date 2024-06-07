const router = require("express").Router();
const User = require("../models/user");
const bcrypt = require("bcryptjs");

//Sign UP
router.post("/register", async (req, res) => {
  try {
    const { email, username, password } = req.body;
    const hashpassword = bcrypt.hashSync(password);
    const existingUser = await User.findOne({ $or: [{ username }, { email }] });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }
    const user = new User({ email, username, password: hashpassword });
    await user.save().then(() => {
      res.status(200).json({ message: "signup successfull" });
    });
  } catch (error) {
    res.status(400).json({
      message: "User Already Exists",
    });
  }
});

//Log In
router.post("/login", async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      res.status(400).json({
        message: "Please Sign Up First",
      });
    }
    const isMatch = bcrypt.compareSync(req.body.password, user.password);
    if (!isMatch) {
      res.status(400).json({
        message: "email and password doesn't match",
      });
    }
    const { password, ...others } = user._doc;
    res.status(200).json({ others });
  } catch (error) {
    res.status(400).json({
      message: "unknown error occured",
    });
  }
});

module.exports = router;
