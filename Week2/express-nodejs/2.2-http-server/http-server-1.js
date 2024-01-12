const express = require("express");
const PORT = 3000;
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

/*
? Syntax
app.get("/route-handler", (req, res) => {
    req: Headers, body, query parameters
    res : send a response
})
*/

app.get("/", (req, res) => {
  res.send("<b>Helloo from '/' </b>");
  console.log("Hello from '/' ");
});

app.post("/", (req, res) => {
  res.send({
    name: "sanket",
    age: 21,
  });
  console.log("Authorization : ", req.headers["authorization"]);
  console.log(req.body);
});

app.listen(PORT, () => {
  console.log(`App running on PORT ${PORT}`);
});
