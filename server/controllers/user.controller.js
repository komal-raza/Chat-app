const UserModel = require("../models/user.model");

const GetUsers = async (req, res) => {
  try {
    const LoggedInUser = req.user?._id;

    const users = await UserModel?.find({ _id: { $ne: LoggedInUser } }).select("-password");

    res.status(200).json(users);
  } catch (error) {
    // console.log(error, "User fetching failed");
    res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = GetUsers;
