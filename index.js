const fs = require("fs");

const data = JSON.parse(fs.readFileSync("input1.json", "utf-8"));

function convert(val, base) {
  let num = 0n, b = BigInt(base);
  for (let ch of val.toLowerCase()) {
    let d = ch >= "0" && ch <= "9" ? BigInt(ch) : BigInt(ch.charCodeAt(0) - 87);
    num = num * b + d;
  }
  return num;
}

let roots = [];
for (let k of Object.keys(data).sort((a, b) => a - b)) {
  if (k !== "keys" && roots.length < data.keys.k) {
    roots.push(convert(data[k].value, data[k].base));
  }
}

function findCoeff(roots) {
  let c = [1n];
  for (let r of roots) {
    let next = [0n, ...c];
    for (let i = 0; i < c.length; i++) next[i] -= c[i] * r;
    c = next;
  }
  return c;
}

let coeffs = findCoeff(roots).reverse(); 
console.log("Roots:", roots.map(r => r.toString()));
console.log("Coeffs:", coeffs.map(c => c.toString()));

fs.writeFileSync("output.json", JSON.stringify({
  Roots: roots.map(r => r.toString()),
  Coeffs: coeffs.map(c => c.toString())
}, null, 2));
