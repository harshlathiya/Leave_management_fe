import { Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  ChartOptions,
} from "chart.js";
import { TooltipItem } from "chart.js";
import { LeaveDetails } from "@/Utils/types";

ChartJS.register(ArcElement, Tooltip, Legend);

interface LeavePieChartProps {
  leaveData: LeaveDetails[];
}

interface CustomChartOptions extends ChartOptions<"pie"> {
  responsive: boolean;
  plugins: {
    legend: {
      position: any;
      labels: {
        boxWidth: number;
        padding: number;
      };
    };
    tooltip: {
      callbacks: {
        label: (context: TooltipItem<"pie">) => string;
      };
    };
  };
}

const LeavePieChart = ({ leaveData }: LeavePieChartProps) => {
  const sortedData = leaveData.sort((a, b) => b.usedLeave - a.usedLeave);

  const chartData = {
    labels: sortedData.map((user) => user.user.name),
    datasets: [
      {
        label: "Days of Leave Taken",
        data: sortedData.map((user) => user.usedLeave),
        backgroundColor: sortedData.map(
          (_, index) => `hsl(${(index * 30) % 360}, 70%, 60%)`
        ),
        borderColor: sortedData.map(
          (_, index) => `hsl(${(index * 30) % 360}, 70%, 40%)`
        ),
        borderWidth: 1,
      },
    ],
  };

  const options: CustomChartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: "right",
        labels: {
          boxWidth: 20,
          padding: 15,
        },
      },
      tooltip: {
        callbacks: {
          label: function (context: TooltipItem<"pie">) {
            let label = context.label || "";
            if (label) {
              label += ": ";
            }
            if (context.raw !== null) {
              label += `${context.raw} days`;
            }
            return label;
          },
        },
      },
    },
  };

  return (
    <div className="relative w-full flex justify-center" style={{ height: "500px" }}>
      <Pie data={chartData} options={options} />
    </div>
  );
};

export default LeavePieChart;
