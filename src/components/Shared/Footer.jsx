import { Box, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import dayjs from "dayjs";

export const Footer = () => {
  const [currentTime, setCurrentTime] = useState(dayjs());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(dayjs());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <Box
      component="footer"
      sx={{
        p: 2.5,
        backgroundColor: (theme) => theme.palette.background.paper,
        borderTop: (theme) => `1px solid ${theme.palette.divider}`,
        position: 'fixed',
        bottom: 0,
        right: 0,
     
        transition: 'all var(--Sidebar-transition-time)',
        zIndex: 1000,
     
        width: {sm:"100%", md: '90%'},
      }}
    >
      <Typography 
        variant="body2" 
        color="text.secondary"
        sx={{
          width: '100%',
          textAlign: {sm: 'center', md: 'right'},
        }}
      >
        All times are Asia/Dhaka. The time now is {currentTime.format('DD/MM/YYYY HH:mm:ss')}. Sierra Looking Glass 1.12 - 0.005s 
      </Typography>
    </Box>
  );
};