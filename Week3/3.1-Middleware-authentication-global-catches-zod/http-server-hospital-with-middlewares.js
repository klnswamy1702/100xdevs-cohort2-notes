const express = require("express");

const app = express();

let requestCount = 0;
function noOfRequests(req, res, next) {
  requestCount++;
  console.log("Total Requests: ", requestCount);
  next;
}
noOfRequests();

app.use(express.json()); //?middleware to be called before every route

function userMiddleware(req, res, next) {
  //! Username and Password checks

  const username = req.headers.username;
  const password = req.headers.password;

  if (username != "sanket" && password != "passowrd") {
    res.status(403).json({
      msg: "User does not exists !",
    });
    return;
  } else {
    next(); //? next() is used to call the next middleware
  }
}

function kidenyMiddleware(req, res, next) {
  //! input validation

  const kidneyId = req.query.kidneyId;

  if (kidneyId != 1 && kidneyId != 2) {
    res.status(411).json({
      msg: "Wrong kideny Inputs !",
    });
    return;
  } else {
    next(); //? next() is used to call the next middleware
  }
}

function heartMiddleware(req, res, next) {
  //! input validation

  const heartId = req.query.heartId;

  if (heartId != 1) {
    res.status(411).json({
      msg: "Wrong heart Inputs !",
    });
    return;
  } else {
    next();
  }
}

app.get("/kideny-checkup", userMiddleware, kidenyMiddleware, (req, res) => {
  res.send("Your Kidney Health is fine !");
});

app.get("/heart-checkup", userMiddleware, heartMiddleware, (req, res) => {
  res.send("Your Heart Health is fine !");
});

app.listen(3000, () => {
  console.log("Server Running on PORT 3000 !");
});
