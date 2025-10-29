const fs = require("fs");

const data = JSON.parse(fs.readFileSync("input.json", "utf-8"));

function toint(value, base) {
  const b = BigInt(base);
  let res = 0n;
  for (let i = 0; i < value.length; i++) {
    const ch = value[i].toLowerCase();
    let digit;
    if (ch >= "0" && ch <= "9") digit = BigInt(ch.charCodeAt(0) - 48);
    else digit = BigInt(ch.charCodeAt(0) - 87);
    res = res * b + digit;
  }
  return res;
}

let nums = [];

for (const key in data) {
  if (key !== "keys") {
    const base = parseInt(data[key].base);
    const value = data[key].value;
    const num = toint(value, base);
    nums.push(num);
  }
}

for (let i = 0; i < nums.length; i++) {
  console.log(nums[i].toString());
}
