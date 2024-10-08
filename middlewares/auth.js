const jwt = require("jsonwebtoken");
const User = require("../models/user");

const auth = async (req, res, next) => {
  const token = req.header("Authorization")
  console.log(token);

  if (!token) {
    res.status(401).send("Access Denied");
  }
  console.log(process.env.JWT_SECRET);

  try {
    console.log(1);
    jwt.verify(token.split(" ")[1], process.env.JWT_SECRET, async(err, user) => {
      if (err) {
        console.log(err);
      } else {
        console.log(user) 
        req.user = await User.findById(user.id);
        // req.user = user;
        console.log(req.user) 
        next();
      }
    });
    // console.log(2)
    // req.user = await User.findById(verified.id);
    // console.log(3)
    // if (!req.user) {
    //   return res.status(401).send("user not found");

    // }
    // next();
  } catch (err) {
    res.status(400).send("Invalid Token");
  }
};

module.exports = auth;
