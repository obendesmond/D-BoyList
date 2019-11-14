const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const config = require("config");
const jwt = require("jsonwebtoken");

// item model
const User = require("../../models/User");

// register new user (/api/users)
router.post("/", (req, res) => {
  const { name, email, password } = req.body;

  //   Simple validation
  if (!name || !email || !password) {
    return res.status(404).json({ msg: "please fill all fields" });
  }

  //   Check for existing user
  User.findOne({ email }).then(user => {
    if (user) return res.status(400).json({ msg: "user already exists" });

    // new user
    const newUser = new User({
      name,
      email,
      password
    });

    // create salt and hash
    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(newUser.password, salt, (err, hash) => {
        if (err) throw err;

        newUser.password = hash;
        newUser.save().then(user => {
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
  });
});

module.exports = router;
