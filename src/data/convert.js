const shortID = require("short-uuid");
const fs = require("fs");

// "6iSzoBh6DhC7AeRErVcdjo": {
//   "index": 4,
//   "id": "6iSzoBh6DhC7AeRErVcdjo",
//   "question": "Quá trình dữ liệu di chuyển từ hệ thống máy tính này sang hệ thống máy tính khác phải trải qua giai đoạn nào:",
//   "answers": ["Phân tích dữ liệu", "Nén dữ liệu", "Đóng gói", "Lọc dữ liệu"],
//   "correct": 0
// },

let newArray = {};
const path = './qldapm/data5'

fs.readFile(`${path}.json`, "utf8", function (err, data) {
  if (err) throw err;
  const array = JSON.parse(data);

  array.forEach((item, index) => {
    let id = shortID().new();
    let a = {
      "index": index + 1,
      "id": id,
      "question": item.question,
      "answers": item.options.map(k => k[1]),
      "correct": item.Ans === "A" ? 0 : item.Ans === "B" ? 1 : item.Ans === "C" ? 2 : 3
    }

    newArray[id] = { ...a };
  })
  // for (const property in obj) {
  //   obj[property].index = obj[property].index + 1;

  //   console.log(`${property}: ${obj[property].index}`);
  // }
  fs.writeFile(`${path}_temp.json`, JSON.stringify(newArray), "utf8", () => { });
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
