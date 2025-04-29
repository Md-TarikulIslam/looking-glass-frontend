import { Box, Typography } from "@mui/material";
import {
    CategoryScale,
    Chart as ChartJS,
    Filler,
    Legend,
    LinearScale,
    LineElement,
    PointElement,
    Title,
    Tooltip,
} from "chart.js";
import React from "react";
import { Line } from "react-chartjs-2";

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

const ServerRAMPage = () => {
  const timeLabels = [
    "08:49",
    "08:59",
    "09:09",
    "09:19",
    "09:29",
    "09:39",
    "09:49",
    "09:59",
    "10:09",
    "10:19",
    "10:29",
    "10:39",
    "10:49",
    "10:59",
    "11:09",
    "11:19",
    "11:29",
    "11:39",
    "11:45",
  ];

  const swapUsageData = {
    labels: timeLabels,
    datasets: [
      {
        label: "Used",
        data: timeLabels.map(() => 0), // Flat line at 0 MB as shown in screenshot
        borderColor: "rgb(33, 150, 243)",
        backgroundColor: "rgba(33, 150, 243, 0.2)",
        fill: true,
        tension: 0.4,
      },
    ],
  };

  

  // Mock data for RAM Usage
  const ramUsageData = {
    labels: timeLabels,
    datasets: [
      {
        label: "Used",
        data: timeLabels.map(() => 12700 + Math.random() * 300),
        borderColor: "rgb(33, 150, 243)",
        backgroundColor: "rgba(33, 150, 243, 0.2)",
        fill: true,
        tension: 0.4,
      },
    ],
  };

  // Mock data for RAM Usage Including Caches & Buffers
  const ramDetailedData = {
    labels: timeLabels,
    datasets: [
      {
        label: "Total Used",
        data: timeLabels.map(() => 15000),
        borderColor: "rgb(33, 150, 243)",
        backgroundColor: "rgba(33, 150, 243, 0.2)",
        fill: true,
        tension: 0.4,
      },
      {
        label: "Caches",
        data: timeLabels.map(() => 2500),
        borderColor: "rgb(117, 117, 117)",
        backgroundColor: "rgba(117, 117, 117, 0.2)",
        fill: true,
        tension: 0.4,
      },
      {
        label: "Buffers",
        data: timeLabels.map(() => 1000),
        borderColor: "rgb(76, 175, 80)",
        backgroundColor: "rgba(76, 175, 80, 0.2)",
        fill: true,
        tension: 0.4,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    interaction: {
      mode: "index",
      intersect: false,
    },
    plugins: {
      legend: {
        position: "top",
        labels: {
          usePointStyle: false,
        },
      },
      tooltip: {
        mode: "index",
        intersect: false,
      },
    },
    scales: {
      y: {
        min: 0,
        title: {
          display: true,
          text: "MB",
        },
      },
    },
  };
  const swapChartOptions = {
    ...chartOptions,
    scales: {
      ...chartOptions.scales,
      y: {
        min: -1,
        max: 1,
        title: {
          display: true,
          text: "MB",
        },
        ticks: {
          stepSize: 0.2,
        },
      },
    },
  };
  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
      {/* RAM Usage Chart */}
      <div>
        <Typography variant="h6" gutterBottom>
          RAM Usage
        </Typography>
        <Box sx={{ height: "300px" }}>
          <Line data={ramUsageData} options={chartOptions} />
        </Box>
      </div>

      {/* RAM Usage Including Caches & Buffers Chart */}
      <div>
        <Typography variant="h6" gutterBottom>
          RAM Usage Including Caches & Buffers
        </Typography>
        <Box sx={{ height: "300px" }}>
          <Line data={ramDetailedData} options={chartOptions} />
        </Box>
      </div>
       {/* SWAP Usage Chart */}
       <div>
        <Typography variant="h6" gutterBottom>
          SWAP Usage
        </Typography>
        <Box sx={{ height: "300px" }}>
          <Line data={swapUsageData} options={swapChartOptions} />
        </Box>
      </div>
    </Box>
  );
};

export default ServerRAMPage;
