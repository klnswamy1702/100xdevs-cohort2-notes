const jwt = require("jsonwebtoken");
const jwtSecret = "123456";

// TODO : generate, decode and verify

const value = {
  name: "sanket",
  password: "123456",
};

//! generating token
const token = jwt.sign(value, jwtSecret);

console.log(token);

//! verifying token
const verified = jwt.verify(token, jwtSecret);

console.log(verified);

//! decoding token
const decodedToken = jwt.decode(token);

console.log(decodedToken);
