import React from 'react';
import { Box, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
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

const ServerDisksPage = () => {
  const timeLabels = [
    '09:09', '09:19', '09:29', '09:39', '09:49', '09:59', '10:09',
    '10:19', '10:29', '10:39', '10:49', '10:59', '11:09', '11:19',
    '11:29', '11:39', '11:49', '11:59', '12:05'
  ];

  const diskInfo = [
    {
      mount: '/',
      device: '/dev/vda1',
      filesystem: 'ext4',
      size: '251.86 GB',
      used: '3.89 GB',
      free: '237.31 GB',
      usedPercent: '2%',
      inodes: '16777216',
      iUsed: '97396',
      iFree: '16679820',
      iUsedPercent: '1%'
    },
    {
      mount: '/opt/zimbra',
      device: '/dev/vdb1',
      filesystem: 'xfs',
      size: '1023.5 GB',
      used: '849.45 GB',
      free: '174.05 GB',
      usedPercent: '83%',
      inodes: '365988512',
      iUsed: '803008',
      iFree: '365185504',
      iUsedPercent: '1%'
    }
  ];

  // Mock data for Disk Usage
  const diskUsageData = {
    labels: timeLabels,
    datasets: [
      {
        label: '/',
        data: timeLabels.map(() => 2),
        borderColor: 'rgb(33, 150, 243)',
        backgroundColor: 'rgba(33, 150, 243, 0.2)',
        fill: true,
        tension: 0.4
      },
      {
        label: '/opt/zimbra',
        data: timeLabels.map(() => 83),
        borderColor: 'rgb(117, 117, 117)',
        backgroundColor: 'rgba(117, 117, 117, 0.2)',
        fill: true,
        tension: 0.4
      }
    ]
  };

  // Mock data for Inode Usage
  const inodeUsageData = {
    labels: timeLabels,
    datasets: [
      {
        label: '/',
        data: timeLabels.map(() => 1),
        borderColor: 'rgb(33, 150, 243)',
        backgroundColor: 'rgba(33, 150, 243, 0.2)',
        fill: true,
        tension: 0.4
      },
      {
        label: '/opt/zimbra',
        data: timeLabels.map(() => 1),
        borderColor: 'rgb(117, 117, 117)',
        backgroundColor: 'rgba(117, 117, 117, 0.2)',
        fill: true,
        tension: 0.4
      }
    ]
  };

  const chartOptions = {
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
        max: 100,
        title: {
          display: true,
          text: '%'
        }
      }
    }
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
      {/* Disk Information Table */}
      <TableContainer>
        <Table size="small">
          <TableHead>
            <TableRow sx={{ '& th': { fontWeight: 'bold' } }}>
              <TableCell>Mount</TableCell>
              <TableCell>Device</TableCell>
              <TableCell>Filesystem</TableCell>
              <TableCell>Size</TableCell>
              <TableCell>Used</TableCell>
              <TableCell>Free</TableCell>
              <TableCell>Used</TableCell>
              <TableCell>Inodes</TableCell>
              <TableCell>I-Used</TableCell>
              <TableCell>I-Free</TableCell>
              <TableCell>I-Used %</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {diskInfo.map((disk) => (
              <TableRow key={disk.mount} sx={{ '&:nth-of-type(odd)': { backgroundColor: 'action.hover' } }}>
                <TableCell>{disk.mount}</TableCell>
                <TableCell>{disk.device}</TableCell>
                <TableCell>{disk.filesystem}</TableCell>
                <TableCell>{disk.size}</TableCell>
                <TableCell>{disk.used}</TableCell>
                <TableCell>{disk.free}</TableCell>
                <TableCell>{disk.usedPercent}</TableCell>
                <TableCell>{disk.inodes}</TableCell>
                <TableCell>{disk.iUsed}</TableCell>
                <TableCell>{disk.iFree}</TableCell>
                <TableCell>{disk.iUsedPercent}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Disk Usage Chart */}
      <div>
        <Typography variant="h6" gutterBottom>
          Disks Usage
        </Typography>
        <Box sx={{ height: '300px' }}>
          <Line data={diskUsageData} options={chartOptions} />
        </Box>
      </div>

      {/* Inode Usage Chart */}
      <div>
        <Typography variant="h6" gutterBottom>
          Inode Usage
        </Typography>
        <Box sx={{ height: '300px' }}>
          <Line data={inodeUsageData} options={chartOptions} />
        </Box>
      </div>
    </Box>
  );
};

export default ServerDisksPage;