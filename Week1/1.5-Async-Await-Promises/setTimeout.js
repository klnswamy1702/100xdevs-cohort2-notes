function findSum(n) {
  let ans = 0;
  for (let i = 0; i < n; i++) {
    ans += i;
  }
  return ans;
}

function findSumTill100() {
  console.log("inside setTimeout");
  console.log(findSum(100));
}

console.log("Before setTimeout");
setTimeout(findSumTill100, 5000);
console.log("After setTimeout");
