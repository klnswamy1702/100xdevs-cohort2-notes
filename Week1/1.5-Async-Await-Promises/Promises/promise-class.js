//!Stages of a Promise : Pending, Resolved, Rejected

var p = new Promise(function (resolve) {
  setTimeout(function () {
    resolve("promise resolved");
  }, 2000);
});

function callback() {
  console.log(p);
}

console.log(p);
p.then(callback);
