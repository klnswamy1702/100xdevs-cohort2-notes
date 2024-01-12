const express = require("express");
const zod = require("zod");
const app = express();

app.use(express.json()); //?middleware to be called before every route

app.post("/kideny-checkup", (req, res) => {
  //* expected input : kidneys = [1,2]

  const schema = zod.array(zod.number());

  /* //? Some Zod method examples :

  {
   email : string => email format
   password : atleast 8 letters
   country : "IN", "US", "UK"
  }

  const zodSchema = zod.object({
    email: zod.string().email(),
    password: zod.string().min(8),
    country: z.literal("IN").or(z.literal("US")).or(z.literal("UK")),
  })
    
    */

  const kidneys = req.body.kidneys;
  const kidenyLength = kidneys.length;
  const response = schema.safeParse(kidneys);
  if (!response.success) {
    res.status(411).json({
      msg: "Invalid Inputs !",
    });
  } else {
    res.send("You have  " + kidenyLength + " kidneys !");
  }
  return;
});

//! GLOBAL CATCHES ! -> Error-handling-middlwares !

//* if there is ever execption thrown in the code, this middleware will catch it

app.use((err, req, res, next) => {
  console.log(err); // log the error for debugging
  res.status(500).json({
    msg: "Something Went Wrong !",
  });
});

app.listen(3000, () => {
  console.log("Server Running on PORT 3000 !");
});
