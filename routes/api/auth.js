const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const config = require("config");
const jwt = require("jsonwebtoken");
const auth = require("../../middleware/auth");

// item model
const User = require("../../models/User");

// log user in (/api/auth/)
router.post("/", (req, res) => {
  const { email, password } = req.body;

  //   Simple validation
  if (!email || !password) {
    return res.status(404).json({ msg: "please enter all fields" });
  }

  //   Check for existing user
  User.findOne({ email }).then(user => {
    if (!user) return res.status(400).json({ msg: "user doesnot exist" });

    // Validate password
    bcrypt.compare(password, user.password).then(isMatch => {
      if (!isMatch) res.status(400).json({ msg: "invalid credentials" });

      // create token
      jwt.sign(
        { id: user._id },
        config.get("jwtSecret"),
        // { expiresIn: "60s" },
        (err, token) => {
          if (err) throw err;
          res.json({
            token,
            user: {
              id: user._id,
              name: user.name,
              email: user.email
            }
          });
        }
      );
    });
  });
});

// ( /api/auth/user) get user data with auth(token)
router.get("/user", auth, (req, res) => {
  User.findById(req.user.id)
    // send user data except password
    .select("-password")
    .then(user => res.json(user));
});

module.exports = router;
