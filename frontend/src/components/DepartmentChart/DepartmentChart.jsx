import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

import { Bar } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

function DepartmentChart({ employees }) {
  const departments = ["IT", "HR", "Finance", "Marketing"];

  const counts = departments.map(
    (dept) =>
      employees.filter((emp) => emp.department === dept).length
  );

  const data = {
  labels: departments,
  datasets: [
    {
      label: "Employees",
      data: counts,
      backgroundColor: "#f9a8d4", // Pink
      borderColor: "#db2777",
      borderWidth: 1,
    },
  ],
};

  return (
    <div className="bg-white p-6 rounded-xl shadow mb-6">
      <h2 className="text-2xl font-bold mb-4">
        Employee Department Chart
      </h2>

      <Bar data={data} />
    </div>
  );
}

export default DepartmentChart;