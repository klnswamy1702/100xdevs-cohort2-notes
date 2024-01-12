function asyncFunction() {
  let p = new Promise(function (resolve, reject) {
    setTimeout(function () {
      resolve("Async/await is cool : no callbacks and .then shit anymore !");
    }, 3000);
  });
  return p;
}

async function main() {
  let value = await asyncFunction();
  //!any code below await wont run until the asyncFunction() is resolved
  console.log(value);
  console.log("Code after await");
}

main();
