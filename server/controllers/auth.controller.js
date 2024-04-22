const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const UserModel = require("../models/user.model");
const generateToken = require("../helpers/auth.token.js");

// Register new User
async function SignupUser(req, res) {
  try {
    const { username, email, password, confirmPassword, gender, fullName } =
      req.body;

      console.log(req.body,"Signup ")
    if (password !== confirmPassword) {
      return res.status(400).json({ message: "Password don't match" });
    }

    const UserNameExist = await UserModel.findOne({ username });
    if (UserNameExist) {
      return res.status(400).json({ message: "Username already Taken" });
    }

    // Hash Password

    const hashedPassword = await bcrypt.hash(password, 10);

    const boyProfilePic = ` https://avatar.iran.liara.run/public/boy?username=${username}`;

    const girlProfilePic = ` https://avatar.iran.liara.run/public/girl?username=${username}`;

    const newUser = new UserModel({
      fullName,
      username,
      email,
      password: hashedPassword,
      gender,
      profilePic: gender === "male" ? boyProfilePic : girlProfilePic,
    });

    await newUser.save();

    res.status(201).json({
      _id: newUser?._id,
      fullName: newUser?.fullName,
      email: newUser?.email,
      username: newUser?.username,
      profilePic: newUser?.profilePic,
    });
  } catch (error) {
    console.log(error, "Signup user");
    return res.status(500).json({ message: error.message });
  }
}

async function SigninUser(req, res) {
  try {
    const { username, password } = req.body;
    if (!username || !password) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const UserNameExist = await UserModel.findOne({ username });
    if (!UserNameExist) {
      return res.status(400).json({ message: "User Not Found" });
    }

    // Match the Password field

    const matchPassword = await bcrypt.compare(
      password,
      UserNameExist?.password || ""
    );
    if (!matchPassword)
      return res.status(400).json({ message: "Password is not correct" });

    console.log(UserNameExist);

    // Generate Token
    generateToken(UserNameExist?._id, res);

    res.status(200).json({
      fullName: UserNameExist?.fullName,
      email: UserNameExist?.email,
      username: UserNameExist?.username,
      profilePic: UserNameExist?.profilePic,
    });
  } catch (error) {
    console.log(error, "Signin user");
    return res.status(500).json({ message: error.message });
  }
}

async function SignoutUser(req, res) {
  try {
    res.cookie("refreshToken", "", {
      httpOnly: true,
      maxAge: 0,
      sameSite: "strict",
    });


    res.status(200).json({ message:"Logout successfully"})
  } catch (error) {
    console.log(error, "Signout user failed");
  }
}

module.exports = { SigninUser, SignoutUser, SignupUser };
