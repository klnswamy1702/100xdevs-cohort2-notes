const express = require("express");

const app = express();
app.use(express.json());

const mongoose = require("mongoose");

mongoose.connect(process.env.MONGOURL);

const User = mongoose.model("Users", {
  username: String,
  email: String,
  pasword: String,
});

app.post("/signup", async (req, res) => {
  const password = req.body.password;
  const email = req.body.email;
  const username = req.body.name;

  const existingUser = await User.findOne({ email: email });
  console.log(existingUser);
  if (existingUser) {
    return res.status(403).json({
      msg: "User already exists !",
    });
  } else {
    const user = new User({
      username: username,
      password: password,
      email: email,
    });
    await user.save();
    return res.json({
      msg: "User Created !",
    });
  }
});

app.listen(3000, () => {
  console.log("Server Running on PORT 3000 !");
});
