import { PieChart } from "react-minimal-pie-chart";

function PartialLoadingIndicatorStory({ percentage }: { percentage: number }) {
  return (
    <div>
      <PieChart
        data={[{ value: 1, key: 1, color: "green" }]}
        reveal={percentage}
        lineWidth={20}
        background="#bfbfbf"
        lengthAngle={360}
        rounded
        animate
        style={{ height: "250px" }}
      />
    </div>
  );
}

export default PartialLoadingIndicatorStory;
