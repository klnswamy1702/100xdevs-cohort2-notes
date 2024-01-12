// const fs = require("fs");

// console.log("Before readFile");

// fs.readFile("a.txt", "utf8", (err, data) => {
//   if (err) throw err;
//   console.log(data);
// });

//  console.log("After readFile");

const fs = require("fs");

//!our own async function

function readFilePromise(cb) {
  console.log("Inside my readFile");
  fs.readFile("a.txt", "utf8", function (err, data) {
    if (err) throw err;
    cb(data);
  });
}

//callback fuction to call
function onDone(data) {
  console.log(data);
}

setTimeout(function () {
  console.log("2nd async function");
  readFilePromise(onDone);
}, 2000);

//* if there are 2 async functions in the code then the first one will execute first and then the second one will execute
