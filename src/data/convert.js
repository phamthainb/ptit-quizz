const shortID = require("short-uuid");
const fs = require("fs");

fs.readFile("src/data/atbm.json", "utf8", function (err, data) {
  if (err) throw err;
  const obj = JSON.parse(data);
  for (const property in obj) {
    obj[property].index = obj[property].index + 1;
    console.log(`${property}: ${obj[property].index}`);
  }
  fs.writeFile("src/data/atbm_rw.json", JSON.stringify(obj), "utf8", () => {});
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
