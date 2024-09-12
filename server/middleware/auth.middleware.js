const UserModel = require("../models/user.model");

const jwt = require("jsonwebtoken");

const checkUserAuth = async (req, res, next) => {
  try {
    const token = req.cookies.refreshToken;

    if (!token) {
      return res
        .status(401)
        .json({ message: "Unauthorized ,Token is not Valid" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (!decoded) {
      return res
        .status(401)
        .json({ message: "Unauthorized ,Token is not Valid" });
    }
    const user = await UserModel.findById(decoded?.user_id).select("-password");

    if (!user) {
      return res.status(404).json({ message: "User Not Found" });
    }

    req.user = user;
    next();
  } catch (error) {
    console.log(error, "Error for auth");
    res.status(500).json({ message: "Invalid Credentials" });
  }
};

module.exports = checkUserAuth;
