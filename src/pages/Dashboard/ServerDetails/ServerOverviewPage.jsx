import {
  Box,
  Typography
} from "@mui/material";
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
  Filler,
  Legend
);

const ServerOverviewPage = () => {
  // Mock data for CPU Usage
  const cpuData = {
    labels: ["07:36", "08:06", "08:36", "09:06", "09:36", "10:06", "10:32"],
    datasets: [
      {
        label: "Aggregated Usage",
        data: [85, 45, 85, 45, 85, 45, 95],
        borderColor: "rgb(53, 162, 235)",
        tension: 0.4,
      },
    ],
  };

  // Mock data for Load Averages
  const loadData = {
    labels: ["07:36", "08:06", "08:36", "09:06", "09:36", "10:06", "10:32"],
    datasets: [
      {
        label: "1 Min",
        data: [0.2, 0.3, 0.1, 0.4, 0.2, 0.3, 0.2],
        borderColor: "rgb(53, 162, 235)",
        tension: 0.4,
      },
      {
        label: "5 Min",
        data: [0.25, 0.28, 0.22, 0.35, 0.28, 0.32, 0.3],
        borderColor: "rgb(75, 75, 75)",
        tension: 0.4,
      },
      {
        label: "15 Min",
        data: [0.3, 0.32, 0.28, 0.38, 0.35, 0.38, 0.4],
        borderColor: "rgb(76, 175, 80)",
        tension: 0.4,
      },
    ],
  };

  // Mock data for RAM Usage
  const ramData = {
    labels: ["07:36", "08:06", "08:36", "09:06", "09:36", "10:06", "10:32"],
    datasets: [
      {
        label: "Used RAM",
        data: [12744, 12744, 12844, 13044, 13244, 12744, 12944],
        borderColor: "rgb(53, 162, 235)",
        fill: true,
        backgroundColor: "rgba(53, 162, 235, 0.2)",
        tension: 0.4,
      },
    ],
  };

  // Mock server info
  const serverInfo = {
    hostname: "mail",
    operatingSystem: "CentOS Linux release 7.9.2009 (Core)",
    kernel: "3.10.0-1160.119.1.el7.x86_64",
    arch: "x86_64 x86_64",
    serverTime: "2025-04-29 10:32:01",
    uptime: "18 Days, 19 Hours, 27 Minutes",
    cpuModel: "Intel(R) Xeon(R) Gold 6278C CPU @ 2.60GHz",
    cpuCores: "4 Cores @ 2600 MHz",
    load: "0.35 (1 Min) 0.46 (5 Min) 0.43 (15 Min)",
    ram: "2.91 GB Available / 15.51 GB Total",
    swap: "0 MB Used, 0 MB Total",
    ipAddress: "eth0:10.1.1.54",
    sshSessions: "0",
    activeConnections: "178",
    pingLatency: "47.266 ms",
    agentVersion: "1.2",
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "top",
      },
    },
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  // Mock data for Network Speed
  const networkData = {
    labels: ["07:36", "08:06", "08:36", "09:06", "09:36", "10:06", "10:32"],
    datasets: [
      {
        label: "eth0",
        data: [0.5, 1.2, 0.8, 0.3, 1.5, 0.7, 2.5],
        borderColor: "rgb(53, 162, 235)",
        tension: 0.4,
      },
      {
        label: "lo",
        data: [0.2, 0.3, 0.1, 0.4, 0.2, 25.0, 0.2],
        borderColor: "rgb(75, 75, 75)",
        tension: 0.4,
      },
    ],
  };

  // Mock data for Disk Usage
  const diskData = {
    labels: ["07:36", "08:06", "08:36", "09:06", "09:36", "10:06", "10:32"],
    datasets: [
      {
        label: "/",
        data: [5, 5, 5, 5, 5, 5, 5],
        borderColor: "rgb(53, 162, 235)",
        tension: 0.4,
      },
      {
        label: "/opt/zimbra",
        data: [83, 83, 83, 83, 83, 83, 83],
        borderColor: "rgb(75, 75, 75)",
        tension: 0.4,
      },
    ],
  };

  // Mock data for Inode Usage
  const inodeData = {
    labels: ["07:36", "08:06", "08:36", "09:06", "09:36", "10:06", "10:32"],
    datasets: [
      {
        label: "/",
        data: [1, 1, 1, 1, 1, 1, 1],
        borderColor: "rgb(53, 162, 235)",
        tension: 0.4,
      },
      {
        label: "/opt/zimbra",
        data: [1, 1, 1, 1, 1, 1, 1],
        borderColor: "rgb(75, 75, 75)",
        tension: 0.4,
      },
    ],
  };

  const networkChartOptions = {
    ...chartOptions,
    scales: {
      ...chartOptions.scales,
      y: {
        ...chartOptions.scales.y,
        title: {
          display: true,
          text: "MB/s",
        },
      },
    },
  };

  const diskChartOptions = {
    ...chartOptions,
    scales: {
      ...chartOptions.scales,
      y: {
        ...chartOptions.scales.y,
        title: {
          display: true,
          text: "%",
        },
        max: 100,
      },
    },
  };

  const inodeChartOptions = {
    ...chartOptions,
    scales: {
      ...chartOptions.scales,
      y: {
        ...chartOptions.scales.y,
        title: {
          display: true,
          text: "%",
        },
        max: 100,
      },
    },
  };

  return (
    <div className="flex flex-col lg:flex-row gap-4">
      <div className="basis-2/3 space-y-8">
        {/* CPU Usage Chart */}

        <div sx={{ p: 2 }}>
          <Typography variant="h6" gutterBottom>
            CPU Usage
          </Typography>
          <Box sx={{ height: "300px" }}>
            <Line data={cpuData} options={chartOptions} />
          </Box>
        </div>
        {/* Load Averages Chart */}
        <div sx={{ p: 2 }}>
          <Typography variant="h6" gutterBottom>
            Load Averages
          </Typography>
          <Box sx={{ height: "300px" }}>
            <Line data={loadData} options={chartOptions} />
          </Box>
        </div>
        {/* RAM Usage Chart */}
        <div sx={{ p: 2 }}>
          <Typography variant="h6" gutterBottom>
            RAM Usage
          </Typography>
          <Box sx={{ height: "300px" }}>
            <Line data={ramData} options={chartOptions} />
          </Box>
        </div>
        {/* Network Speed Chart */}
        <div sx={{ p: 2 }}>
          <Typography variant="h6" gutterBottom>
            Network Speed
          </Typography>
          <Box sx={{ height: "300px" }}>
            <Line data={networkData} options={networkChartOptions} />
          </Box>
        </div>
        {/* Disk Usage Chart */}
        <div sx={{ p: 2 }}>
          <Typography variant="h6" gutterBottom>
            Disk Usage
          </Typography>
          <Box sx={{ height: "300px" }}>
            <Line data={diskData} options={diskChartOptions} />
          </Box>
        </div>

        {/* Inode Usage Chart */}
        <div sx={{ p: 2 }}>
          <Typography variant="h6" gutterBottom>
            Inode Usage
          </Typography>
          <Box sx={{ height: "300px" }}>
            <Line data={inodeData} options={inodeChartOptions} />
          </Box>
        </div>
      </div>

      {/* Right Side Info Panels */}
      <div className="basis-1/3 space-y-4">
        {/* Server Info */}
        <div className="border-blue/10 border rounded-xl pt-6 pb-3">
          <Typography variant="h6" gutterBottom sx={{ px: 3 }}>
            Server Info
          </Typography>
          <div className="flex flex-col">
            {Object.entries(serverInfo).map(([key, value]) => (
              <div
                className="flex items-center odd:bg-blue/10 px-6 py-1"
                key={key}
              >
                <Typography
                  variant="subtitle1"
                  color="text.secondary"
                  sx={{
                    textTransform: "capitalize",
                    minWidth: "200px",
                    fontWeight: "bold",
                  }}
                >
                  {key.replace(/([A-Z])/g, " $1").trim()}
                </Typography>
                <Typography variant="subtitle2">{value}</Typography>
              </div>
            ))}
          </div>
        </div>

        {/* Disk Usage */}
        <div className="border-blue/10 border rounded-xl pt-6 pb-3">
          <Typography variant="h6" gutterBottom sx={{ px: 3 }}>
            Disk Usage
          </Typography>
          <div className="flex flex-col">
            <div className="flex items-center bg-blue/10 px-6 py-2">
              <Typography
                variant="subtitle1"
                sx={{ minWidth: "200px", fontWeight: "bold" }}
              >
                Mount
              </Typography>
              <Typography variant="subtitle1" sx={{ fontWeight: "bold" }}>
                Used
              </Typography>
            </div>
            <div className="flex items-center px-6 py-2">
              <Typography variant="subtitle2" sx={{ minWidth: "200px" }}>
                /
              </Typography>
              <Typography variant="subtitle2">2%</Typography>
            </div>
            <div className="flex items-center bg-blue/10 px-6 py-2">
              <Typography variant="subtitle2" sx={{ minWidth: "200px" }}>
                /opt/zimbra
              </Typography>
              <Typography variant="subtitle2">83%</Typography>
            </div>
          </div>
        </div>

        {/* Network Usage */}
        <div className="border-blue/10 border rounded-xl pt-6 pb-3">
          <Typography variant="h6" gutterBottom sx={{ px: 3 }}>
            Network Usage
          </Typography>
          <div className="flex flex-col">
            <div className="flex items-center bg-blue/10 px-6 py-2">
              <Typography
                variant="subtitle1"
                sx={{ minWidth: "120px", fontWeight: "bold" }}
              >
                Interface
              </Typography>
              <Typography
                variant="subtitle1"
                sx={{ minWidth: "120px", fontWeight: "bold" }}
              >
                In
              </Typography>
              <Typography
                variant="subtitle1"
                sx={{ minWidth: "120px", fontWeight: "bold" }}
              >
                Out
              </Typography>
              <Typography variant="subtitle1" sx={{ fontWeight: "bold" }}>
                Total
              </Typography>
            </div>
            <div className="flex items-center px-6 py-2">
              <Typography variant="subtitle2" sx={{ minWidth: "120px" }}>
                eth0
              </Typography>
              <Typography variant="subtitle2" sx={{ minWidth: "120px" }}>
                259.13 GB
                <br />
                18.47 KB/s
              </Typography>
              <Typography variant="subtitle2" sx={{ minWidth: "120px" }}>
                2.64 TB
                <br />
                1.02 MB/s
              </Typography>
              <Typography variant="subtitle2">
                2.89 TB
                <br />
                1.04 MB/s
              </Typography>
            </div>
            <div className="flex items-center bg-blue/10 px-6 py-2">
              <Typography variant="subtitle2" sx={{ minWidth: "120px" }}>
                lo
              </Typography>
              <Typography variant="subtitle2" sx={{ minWidth: "120px" }}>
                1.17 TB
                <br />
                1.35 KB/s
              </Typography>
              <Typography variant="subtitle2" sx={{ minWidth: "120px" }}>
                1.17 TB
                <br />
                1.35 KB/s
              </Typography>
              <Typography variant="subtitle2">
                2.33 TB
                <br />
                2.69 KB/s
              </Typography>
            </div>
          </div>
        </div>

        {/* Uptime */}
        <div className="border-blue/10 border rounded-xl pt-6 pb-3">
          <Typography variant="h6" gutterBottom sx={{ px: 3 }}>
            Uptime
          </Typography>
          <div className="flex flex-col">
            <div className="flex items-center odd:bg-blue/10 px-6 py-2">
              <Typography
                variant="subtitle1"
                color="text.secondary"
                sx={{
                  textTransform: "capitalize",
                  minWidth: "200px",
                  fontWeight: "bold",
                }}
              >
                Last 24 Hours
              </Typography>
              <Typography variant="subtitle2">100%</Typography>
            </div>
            <div className="flex items-center px-6 py-2">
              <Typography
                variant="subtitle1"
                color="text.secondary"
                sx={{
                  textTransform: "capitalize",
                  minWidth: "200px",
                  fontWeight: "bold",
                }}
              >
                Last 7 Days
              </Typography>
              <Typography variant="subtitle2">100%</Typography>
            </div>
            <div className="flex items-center odd:bg-blue/10 px-6 py-2">
              <Typography
                variant="subtitle1"
                color="text.secondary"
                sx={{
                  textTransform: "capitalize",
                  minWidth: "200px",
                  fontWeight: "bold",
                }}
              >
                Last 30 Days
              </Typography>
              <Typography variant="subtitle2">100%</Typography>
            </div>
            <div className="flex items-center px-6 py-2">
              <Typography
                variant="subtitle1"
                color="text.secondary"
                sx={{
                  textTransform: "capitalize",
                  minWidth: "200px",
                  fontWeight: "bold",
                }}
              >
                Last 12 Months
              </Typography>
              <Typography variant="subtitle2">98.67%</Typography>
            </div>
            <div className="flex items-center odd:bg-blue/10 px-6 py-2">
              <Typography
                variant="subtitle1"
                color="text.secondary"
                sx={{
                  textTransform: "capitalize",
                  minWidth: "200px",
                  fontWeight: "bold",
                }}
              >
                Selected Period
              </Typography>
              <Typography variant="subtitle2">100%</Typography>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServerOverviewPage;
