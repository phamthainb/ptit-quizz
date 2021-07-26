import React, { useEffect } from "react";
import Chart from "./Chart";

export default function TotalCheck() {
  const stateData = localStorage.getItem("quizz-current");
  useEffect(() => {
    if (stateData) {
      console.log("listAnswer", JSON.parse(stateData)?.listAnswer);
      console.log("listAnswer", JSON.parse(stateData)?.listAnswer);
    }
  }, [stateData]);

  return (
    <div>
      <Chart percentage={35} />
    </div>
  );
}
