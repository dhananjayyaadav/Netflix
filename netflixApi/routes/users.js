const router = require("express").Router();
const User = require("../Models/User");
const CryptoJS = require("crypto-js");
const verify = require("../verifyUser");

//update
router.put("/:id", verify, async (req, res) => {
  if (req.user.id === req.params.id || req.user.isAdmin) {
    if (req.body.password) {
      req.body.password = CryptoJS.AES.encrypt(
        req.body.password,
        process.env.PASS_SECRET_KEY
      ).toString();
    }

    try {
      const updatedUser = await User.findByIdAndUpdate(
        req.params.id,
        {
          $set: req.body,
        },
        { new: true }
      );
      res.status(201).json(updatedUser);
    } catch (error) {
      res.status(500).json(error);
    }
  } else {
    res.status(403).json("Invalid user");
  }
});

//delete
router.delete("/:id", verify, async (req, res) => {
  if (req.user.id === req.params.id || req.user.isAdmin) {
    try {
      await User.findByIdAndDelete(req.params.id);
    } catch (error) {
      res.status(500).json(error);
    }
  } else {
    res.status(403).json("Invalid user");
  }
});

//find user
router.get("/find/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (user) {
      const { password, ...info } = user._doc;
      res.status(201).send(info);
    } else {
      res.status(404).json("User not found");
    }
  } catch (error) {
    res.status(404).json("User not found");
  }
});

//find all users

router.get("/", verify, async (req, res) => {
  const querry = req.query.new;
  if (req.user.isAdmin) {
    try {
      const user = querry
        ? await User.find({}).sort({ _id: -1 }).limit(5)
        : await User.find({});
      res.status(201).json(user);
    } catch (error) {
      res.status(404).json("User not found");
    }
  } else {
    res.status(403).json("You are not authenticated");
  }
});
//get user status
router.get("/stats", async (req, res) => {
  const today = new Date();
  const lastYear = today.setFullYear(today.setFullYear() - 1);
  try {
    const data = await User.aggregate([
      {
        $project: {
          month: { $month: "$createdAt" },
        },
      },
      {
        $group: {
          _id: "$month",
          total: { $sum: 1 },
        },
      },
    ]);
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json(err);
  }
});
module.exports = router;
