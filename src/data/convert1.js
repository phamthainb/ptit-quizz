const shortID = require("short-uuid");
const fs = require("fs");
var k = 1;

// let d0; fs.readFile("./qldapm/data_temp.json", (err, data) => {d0 = JSON.parse(data)})
// let d1; fs.readFile("./qldapm/data1_temp.json", (err, data) => {d1 = JSON.parse(data)})
// let d2; fs.readFile("./qldapm/data2_temp.json", (err, data) => {d2 = JSON.parse(data)})
// let d3; fs.readFile("./qldapm/data3_temp.json", (err, data) => {d3 = JSON.parse(data)})
// let d4; fs.readFile("./qldapm/data4_temp.json", (err, data) => {d4 = JSON.parse(data)})
// let d5; fs.readFile("./qldapm/data5_temp.json", (err, data) => {d5 = JSON.parse(data)})

// setTimeout(() => {
// fs.writeFile("./qldapm/data_all.json", JSON.stringify({ ...d0, ...d1, ...d2, ...d3, ...d4, ...d5 }), "utf8", () => { });
    
// }, 3000);
fs.readFile("./qldapm/data_all.json", "utf8", function (err, data) {
  if (err) throw err;
  const obj = JSON.parse(data);
  for (const property in obj) {
    obj[property].index = k++;
    console.log(`${property}: ${obj[property].index}`);
  }
  fs.writeFile("./qldapm/data_all1.json", JSON.stringify(obj), "utf8", () => {});
});

// fs.readFile("src/data/mmt.json", "utf8", function (err, data) {
//   if (err) throw err;
//   const obj = JSON.parse(data);
//   let result = {};
//   obj.forEach((item, index) => {
//     const id = shortID.generate();
//     result[id] = {
//       index: index + 1,
//       id: id,
//       question: item.question,
//       answers: item.answers.map((k) => k.slice(3)),
//       correct: 0,
//     };
//   });
//   console.log("result", result);
//   fs.writeFile("src/data/mmt_a.json", JSON.stringify(result), "utf8", () => {});
// });
