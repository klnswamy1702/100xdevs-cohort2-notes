const express = require("express");

const app = express();

app.get("/health-checkup", (req, res) => {
  const kidneyId = req.query.kidneyId;
  const username = req.headers.username;
  const password = req.headers.password;

  //! Username and Password checks

  if (username != "sanket" && password != "passowrd") {
    res.status(403).json({
      msg: "User does not exists !",
    });
    return;
  }

  //! input validation

  if (kidneyId != 1 && kidneyId != 2) {
    res.status(411).json({
      msg: "Wrong Inputs !",
    });
    return;
  }

  res.send("Your Kidney Health is fine !");
});

app.listen(3000, () => {
  console.log("Server Running on PORT 3000 !");
});
