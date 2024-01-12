const fs = require("fs");

//our own async function

function readFilePromise() {
  // console.log("Inside my readFile");
  return new Promise(function (resolve, reject) {
    console.log("Inside Promise");
    fs.readFile("b.txt", "utf8", (err, data) => {
      if (err) reject(err);
      console.log("Before Resolve");
      resolve(data);
    });
  });
}

//callback fuction to call
function onDone(data) {
  console.log(data);
}

var a = readFilePromise();
// console.log("Returned Promise : ", a);
a.then(onDone);
