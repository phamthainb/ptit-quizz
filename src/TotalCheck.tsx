import React, { useEffect } from "react";
import Chart from "./Chart";

const dataMock = [
  { title: "Đúng", value: 10, color: "green" },
  { title: "Sai", value: 15, color: "red" },
  { title: "Chưa làm", value: 20, color: "gray" },
];

export default function TotalCheck() {
  const stateData = localStorage.getItem("quizz-current");
  useEffect(() => {
    if (stateData) {
      console.log("stateData", JSON.parse(stateData)?.listAnswer);
    }
  }, [stateData]);

  return (
    <div>
      <Chart percentage={35} />
    </div>
  );
}
