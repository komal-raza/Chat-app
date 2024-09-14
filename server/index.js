const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./database/connectDb.js");
const messageRoutes = require("./routes/message.routes.js");
const authRoutes = require("./routes/auth.routes.js");
const userRoutes = require("./routes/user.routes.js");
const cookieParser = require("cookie-parser");
const {  server, app } = require("./socket/socket.js");
const path = require("path")
dotenv.config();

const PORT = process.env.PORT || 5000;
const __dirname = path.resolve();

app.use(express.json());  //parse JSON payload from request body
app.use(cookieParser());

app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/messages", messageRoutes);
app.use("/api/v1/users", userRoutes);

app.use(express.static(path.join(__dirname, "/frontend/dist")));

app.get("*", (req, res) => {
	res.sendFile(path.join( __dirname,"frontend", "dist", "index.html"));
});
server.listen(PORT, () => {
  connectDB();
  console.log("Server is listening on port " + PORT);
});
