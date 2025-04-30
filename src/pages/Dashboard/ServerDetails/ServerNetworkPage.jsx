import React from 'react';
import { Box, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from 'chart.js';

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

const ServerNetworkPage = () => {
  const timeLabels = [
    '11:09', '11:19', '11:29', '11:39', '11:49', '11:59', '12:09',
    '12:19', '12:29', '12:39', '12:49', '12:59', '13:09', '13:19',
    '13:29', '13:39', '13:49', '13:59', '14:05'
  ];

  const networkInfo = [
    {
      interface: 'eth0',
      in: '263.47 GB',
      out: '2.67 TB',
      total: '2.93 TB',
      inSpeed: '2.26 MB/s',
      outSpeed: '42.06 KB/s',
      totalSpeed: '2.3 MB/s',
      inPackets: {
        total: 'Total 682144052',
        speed: 'Speed 1564 p/s'
      },
      outPackets: {
        total: 'Total 750388806',
        speed: 'Speed 795 p/s'
      },
      totalPackets: {
        total: 'Total 1432532858',
        speed: 'Speed 2359 p/s'
      }
    },
    {
      interface: 'lo',
      in: '1.19 TB',
      out: '1.19 TB',
      total: '2.37 TB',
      inSpeed: '917 B/s',
      outSpeed: '917 B/s',
      totalSpeed: '1.79 KB/s',
      inPackets: {
        total: 'Total 364907609',
        speed: 'Speed 2 p/s'
      },
      outPackets: {
        total: 'Total 364907609',
        speed: 'Speed 2 p/s'
      },
      totalPackets: {
        total: 'Total 729815218',
        speed: 'Speed 4 p/s'
      }
    }
  ];

  // Mock data for Network Speed
  const networkSpeedData = {
    labels: timeLabels,
    datasets: [
      {
        label: 'eth0',
        data: timeLabels.map(() => Math.random() * 4),
        borderColor: 'rgb(33, 150, 243)',
        backgroundColor: 'rgba(33, 150, 243, 0.2)',
        tension: 0.4
      },
      {
        label: 'lo',
        data: timeLabels.map((_, i) => i === 12 ? 18 : Math.random() * 2),
        borderColor: 'rgb(117, 117, 117)',
        backgroundColor: 'rgba(117, 117, 117, 0.2)',
        tension: 0.4
      }
    ]
  };

  // Mock data for Ping Latency
  const pingLatencyData = {
    labels: timeLabels,
    datasets: [
      {
        label: 'Latency',
        data: timeLabels.map(() => 47 + Math.random() * 4),
        borderColor: 'rgb(33, 150, 243)',
        backgroundColor: 'rgba(33, 150, 243, 0.2)',
        tension: 0.4
      }
    ]
  };

  const networkChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    interaction: {
      mode: 'index',
      intersect: false,
    },
    plugins: {
      legend: {
        position: 'top',
        labels: {
          usePointStyle: false,
        
        },
      },
      tooltip: {
        mode: 'index',
        intersect: false
      }
    },
    scales: {
      y: {
        min: 0,
        max: 20,
        title: {
          display: true,
          text: 'MB/s'
        }
      }
    }
  };

  const pingChartOptions = {
    ...networkChartOptions,
    scales: {
      y: {
        min: 47,
        max: 52,
        title: {
          display: true,
          text: 'ms'
        }
      }
    }
  };

  // Mock data for Connections
  const connectionsData = {
    labels: timeLabels,
    datasets: [
      {
        label: 'SSH',
        data: timeLabels.map(() => 0),
        borderColor: 'rgb(33, 150, 243)',
        backgroundColor: 'rgba(33, 150, 243, 0.2)',
        tension: 0.4
      },
      {
        label: 'All',
        data: timeLabels.map(() => 180 + Math.random() * 20),
        borderColor: 'rgb(117, 117, 117)',
        backgroundColor: 'rgba(117, 117, 117, 0.2)',
        tension: 0.4
      }
    ]
  };

  const connectionsChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    interaction: {
      mode: 'index',
      intersect: false,
    },
    plugins: {
      legend: {
        position: 'top',
        labels: {
          usePointStyle: false,
          boxWidth: 40,
          boxHeight: 3,
          padding: 20
        },
      },
      tooltip: {
        mode: 'index',
        intersect: false
      }
    },
    scales: {
      y: {
        min: 0,
        max: 200,
        title: {
          display: true,
          text: 'Connections'
        }
      }
    }
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
      {/* Network Information Table */}
      <TableContainer>
        <Table size="small">
          <TableHead>
            <TableRow sx={{ '& th': { fontWeight: 'bold' } }}>
              <TableCell>Interface</TableCell>
              <TableCell>In</TableCell>
              <TableCell>Out</TableCell>
              <TableCell>Total</TableCell>
              <TableCell>In Speed</TableCell>
              <TableCell>Out Speed</TableCell>
              <TableCell>Total Speed</TableCell>
              <TableCell>In Packets</TableCell>
              <TableCell>Out Packets</TableCell>
              <TableCell>Total Packets</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {networkInfo.map((net) => (
              <TableRow key={net.interface} sx={{ '&:nth-of-type(odd)': { backgroundColor: 'action.hover' } }}>
                <TableCell>{net.interface}</TableCell>
                <TableCell>{net.in}</TableCell>
                <TableCell>{net.out}</TableCell>
                <TableCell>{net.total}</TableCell>
                <TableCell>{net.inSpeed}</TableCell>
                <TableCell>{net.outSpeed}</TableCell>
                <TableCell>{net.totalSpeed}</TableCell>
                <TableCell>
                  <div>{net.inPackets.total}</div>
                  <div>{net.inPackets.speed}</div>
                </TableCell>
                <TableCell>
                  <div>{net.outPackets.total}</div>
                  <div>{net.outPackets.speed}</div>
                </TableCell>
                <TableCell>
                  <div>{net.totalPackets.total}</div>
                  <div>{net.totalPackets.speed}</div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Network Speed Chart */}
      <div>
        <Typography variant="h6" gutterBottom>
          Network Speed
        </Typography>
        <Box sx={{ height: '300px' }}>
          <Line data={networkSpeedData} options={networkChartOptions} />
        </Box>
      </div>

      {/* Ping Latency Chart */}
      <div>
        <Typography variant="h6" gutterBottom>
          Ping Latency
        </Typography>
        <Box sx={{ height: '300px' }}>
          <Line data={pingLatencyData} options={pingChartOptions} />
        </Box>
      </div>

      {/* Connections Chart */}
      <div>
        <Typography variant="h6" gutterBottom>
          Connections
        </Typography>
        <Box sx={{ height: '300px' }}>
          <Line data={connectionsData} options={connectionsChartOptions} />
        </Box>
      </div>
    </Box>
  );
};

export default ServerNetworkPage;