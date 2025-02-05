import React from "react";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, BarElement, CategoryScale, LinearScale, Tooltip, Legend } from "chart.js";
import { useSelector } from "react-redux";

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);


const BarChart = ({chartLabel, chartColor, chartData}) => {
    const { modes } = useSelector((state)=>state.mode)
  const data = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "June", "July", "Aug", "Sep", "Oct", "Nov", "Dec"],
    datasets: [
      {
        label: chartLabel,
        data: chartData, // Ensure all months have data
        backgroundColor: chartColor,
        borderRadius: 10, // Rounded corners on bars
        tension: 0.3,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: { display: false },
    },
    scales: {
      x: {
        grid: {
          color: modes === "dark" ? "#2D2D2D" : "#ffffff",
        },
      },
      y:{
         beginAtZero: true,
         grid: {
          color: modes === "dark" ? "white" : "red",
        },
        },
    },
  };

  return (
    <div className={`w-full ${ modes === "dark" ? 'bg-darksecondary text-white' : 'bg-white text-gray-800'} max-w-lg mx-auto rounded-lg shadow-md`}>
      <h2 className="px-2 text-lg font-semibold">{chartLabel}</h2>
      <Bar data={data} options={options} />
    </div>
  );
};

export default BarChart;
