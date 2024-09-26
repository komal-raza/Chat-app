const UserModel = require("../models/user.model");
const jwt = require("jsonwebtoken");

const checkUserAuth = async (req, res, next) => {
  try {
    const token = req.cookies.refreshToken; // Get the token from cookies

    if (!token) {
      return res.status(401).json({ message: "Unauthorized, Token not found" });
    }

    // Verify the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (!decoded) {
      return res.status(401).json({ message: "Unauthorized, Invalid token" });
    }

    // Find the user based on the decoded user_id
    const user = await UserModel.findById(decoded?.user_id).select("-password");

    if (!user) {
      return res.status(404).json({ message: "User Not Found" });
    }

    // Attach user info to request object
    req.user = user;

    // Proceed to the next middleware or route
    next();
  } catch (error) {
    console.log(error, "Error in auth");

    // If the token is expired, send a 403 status and a clear message
    if (error.name === "TokenExpiredError") {
      res.cookie("refreshToken", "", {
        httpOnly: true,
        maxAge: 0,
        sameSite: "strict",
      });
      return res.redirect("https://chat-app-njh0.onrender.com/login"); //redirect to login page
    }

    // If the token is invalid
    if (error.name === "JsonWebTokenError") {
      res.cookie("refreshToken", "", {
        httpOnly: true,
        maxAge: 0,
        sameSite: "strict",
      });
      return res.redirect("https://chat-app-njh0.onrender.com/login"); // redirect to Login page
    }

    // Handle other errors
    res.status(500).json({ message: "Invalid Credentials" });
  }
};

module.exports = checkUserAuth;
