const config = require("config");
const jwt = require("jsonwebtoken");

function auth(req, res, next) {
  // set token name to 'x-auth-token' in header
  const token = req.header("x-auth-token");

  // check for token
  if (!token)
    return res.status(401).json({ msg: "No token, authorization denied" });

  try {
    //   verify token
    const decoded = jwt.verify(token, config.get("jwtSecret"));
    //   Add user from payload
    req.user = decoded;
    // go to the next piece of middleware
    next();
  } catch (e) {
    return res.status(400).json({ msg: "Token is not valid" });
    next();
  }
}

module.exports = auth;
