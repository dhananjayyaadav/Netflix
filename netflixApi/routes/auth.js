const router = require("express").Router();
const User = require("../Models/User");
const CryptoJS = require("crypto-js");
const jwt = require("jsonwebtoken");

//Register
router.post("/register", async (req, res) => {
  try {
    const encrypted = CryptoJS.AES.encrypt(
      req.body.password,
      process.env.PASS_SECRET_KEY
    ).toString();
    const newUser = new User({
      username: req.body.username,
      email: req.body.email,
      password: encrypted,
    });
    const user = await newUser.save();
    res.status(201).json(user);
  } catch (err) {
    res.status(500).json("user already exists");
  }
});

//Login
router.post("/login", async (req, res) => {
  try {
    const foundUser = await User.findOne({ email: req.body.email });
    if (foundUser) {
      const decrypted = CryptoJS.AES.decrypt(
        foundUser.password,
        process.env.PASS_SECRET_KEY
      );
      const originalPass = decrypted.toString(CryptoJS.enc.Utf8);
      if (originalPass === req.body.password) {
        const accessToken = jwt.sign(
          {
            id: foundUser._id,
            isAdmin: foundUser.isAdmin,
          },
          process.env.JWT_KEY,
          { expiresIn: "3d" }
        );
        const { password, ...info } = foundUser._doc;
        res.status(201).json({ ...info, accessToken });
      } else {
        res.status(401).json("Wrong username or Password");
      }
    } else {
      res.status(401).json("Wrong username or Password");
    }
  } catch (error) {
    res.status(501).json("Something went wrong please try again");
  }
});

module.exports = router;
