const mongoose= require("mongoose");

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, "Username must be provided"],
    // unique: true,
    // trim: true,
  },
  fullName: {
    type: String,
    required: [true, "Name must be provided"],
   
  },
  email: {
    type: String,
    required: [true, "Email must be provided"],
    // unique: true,
    // match: [/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g, "Please enter a valid email"],
  },
  password: {
    type: String,
    required: [true, "Password must be provided"],
  },
  gender: {
    type: String,
    required: [true, "Gender must be provided"],
    // enum: ["male, female"],
  },
  profilePic: {
    type: String,
    default: "",
  },
},{timestamps:true});

const UserModel =  mongoose.model("User", UserSchema);

module.exports = UserModel;
