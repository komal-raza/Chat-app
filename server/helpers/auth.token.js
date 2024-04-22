const jwt = require("jsonwebtoken");

const generateToken = (user_id, res) => {
  const token = jwt.sign({ user_id }, process.env.JWT_SECRET, {
    expiresIn: "3h",
  });
//   const refresh_token = jwt.sign({ user_id }, process.env.JWT_REFRESH_SECRET, {
//     expiresIn: "1d",
//   });

  res.cookie("refreshToken", token, {
    httpOnly: true,
    maxAge: 1 * 24 * 60 * 60 * 1000,
    sameSite: "strict",
  });

//   return token;
};


module.exports = generateToken;
