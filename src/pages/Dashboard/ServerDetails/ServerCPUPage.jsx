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

const ServerCPUPage = () => {
  const timeLabels = [
    "08:29",
    "08:39",
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
    "11:25",
  ];

  const cpuTypes = [
    { label: "user", color: "rgb(53, 162, 235)" },
    { label: "nice", color: "rgb(75, 75, 75)" },
    { label: "system", color: "rgb(82, 196, 26)" },
    { label: "iowait", color: "rgb(156, 39, 176)" },
    { label: "irq", color: "rgb(0, 150, 136)" },
    { label: "softirq", color: "rgb(244, 143, 177)" },
    { label: "steal", color: "rgb(211, 47, 47)" },
    { label: "guest", color: "rgb(0, 188, 212)" },
    { label: "guestnice", color: "rgb(0, 96, 100)" },
  ];

  const generateMockData = () => ({
    labels: timeLabels,
    datasets: cpuTypes.map((type) => ({
      label: type.label,
      backgroundColor: type.color,
      data: timeLabels.map(() => Math.random() * 30),
      borderColor: type.color,
      tension: 0.4,
      fill: false,
    })),
  });

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
        max: 100,
        title: {
          display: true,
          text: "Usage %",
        },
      },
    },
  };

  // Generate mock data for each core
  const cpuData = generateMockData();
  const core0Data = generateMockData();
  const core1Data = generateMockData();
  const core2Data = generateMockData();
  const core3Data = generateMockData();

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
      {/* Overall CPU Usage */}
      <div>
        <Typography variant="h6" gutterBottom>
          CPU Usage
        </Typography>
        <Box sx={{ height: "300px" }}>
          <Line data={cpuData} options={chartOptions} />
        </Box>
      </div>

      {/* Core 0 Usage */}
      <div>
        <Typography variant="h6" gutterBottom>
          Core 0 Usage
        </Typography>
        <Box sx={{ height: "300px" }}>
          <Line data={core0Data} options={chartOptions} />
        </Box>
      </div>

      {/* Core 1 Usage */}
      <div>
        <Typography variant="h6" gutterBottom>
          Core 1 Usage
        </Typography>
        <Box sx={{ height: "300px" }}>
          <Line data={core1Data} options={chartOptions} />
        </Box>
      </div>

      {/* Core 2 Usage */}
      <div>
        <Typography variant="h6" gutterBottom>
          Core 2 Usage
        </Typography>
        <Box sx={{ height: "300px" }}>
          <Line data={core2Data} options={chartOptions} />
        </Box>
      </div>

      {/* Core 3 Usage */}
      <div>
        <Typography variant="h6" gutterBottom>
          Core 3 Usage
        </Typography>
        <Box sx={{ height: "300px" }}>
          <Line data={core3Data} options={chartOptions} />
        </Box>
      </div>
    </Box>
  );
};

export default ServerCPUPage;
