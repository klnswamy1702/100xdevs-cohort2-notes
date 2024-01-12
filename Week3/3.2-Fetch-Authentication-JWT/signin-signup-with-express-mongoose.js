/* // TODO

1. Create a /signup endpoint which will create a user if they don't exist and
generate a JWT after creating the user
2. Crete a /signin endpoint which will check if user exists and generate a JWT
token if they do
3. Create a /users endpoint which will use the JWT to verify and list all the
users from database except for the currently logged in user

*/

const express = require("express");
const app = express();
app.use(express.json());
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const jwtSecret = process.env.JWTSECRET;

try {
  mongoose.connect(process.env.MONGOURL);
  console.log("MongoDB connection established succcesfully");
} catch (error) {
  console.log(error);
}

const userSchema = {
  username: String,
  email: String,
  password: String,
};

const User = mongoose.model("Users", userSchema);

function verifyUser(req, res, next) {
  const token = req.headers.authorizartion;

  if (!token) {
    return res.status(401).json({
      msg: "Unauthorized : No token provided",
    });
  } else {
    jwt.verify(token, jwtSecret, (err, decoded) => {
      if (err) {
        return res.status(401).json({
          msg: "Unauthorized : Invalid Token",
        });
      } else {
        req.userId = decoded.userId;
        next();
      }
    });
  }
}

//? Sign-up Endpoint :
// TODO => create a user if they don't exist and generate a JWT after creating
// the user

app.post("/signup", async (req, res) => {
  const { username, email, password } = req.body;

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        msg: "User Already Exists !",
      });
    }

    // TODO : create new user

    const newUser = new User({
      username,
      email,
      password,
    });
    await newUser.save();

    // TODO : generate JWT token
    //! jwt.sign(id,jwtSecret)
    const token = jwt.sign({ userId: newUser._id }, jwtSecret);

    res.status(200).json({
      token,
    });
  } catch (error) {
    res.status(500).json({
      msg: error.message,
    });
  }
});

//? Sign-in Endpoint :
// TODO => check if user exists and generate a JWT token if they do

app.post("/signin", async (req, res) => {
  const { username, email, password } = req.body;

  try {
    //* checking if user exists
    const existingUser = await User.findOne({ email });
    // TODO : if not !
    if (!existingUser) {
      return res.status(400).json({
        msg: "User Dosent Exists !",
      });
    }
    //? if user exists then return token as a response
    const token = jwt.sign({ userId: existingUser._id }, jwtSecret);
    res.status(200).json({
      token,
    });
  } catch (error) {
    res.status(500).json({
      msg: error.message,
    });
  }
});

//? Users Endpoint :
// TODO => verify and list all the users from database except for the currently
// logged in user

app.get("/users", verifyUser, async (req, res) => {
  try {
    //! imp and tricky
    //*? checking and filtering user out on the basis of userId

    //?getting all users using User.find()
    const users = await User.find();
    const userId = req.userId;
    console.log(userId);

    const filterUsers = users.filter(({ _id }) => {
      return _id.toString() !== userId;
    });

    res.status(200).json(filterUsers);
  } catch (error) {
    res.status(500).json({
      msg: error.message,
    });
  }
});

app.listen(3000, () => {
  console.log("Server Running on PORT 3000 !");
});
