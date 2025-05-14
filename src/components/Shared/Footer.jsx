import { Box, Typography } from "@mui/material";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { useConfigsQuery } from "../../redux/features/configApi";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";

// Enable the plugins
dayjs.extend(utc);
dayjs.extend(timezone);

export const Footer = () => {
  const [currentTime, setCurrentTime] = useState(dayjs());
  const { data: configs } = useConfigsQuery({
    fields: "weekStart,timeZone,dateFormat,appName",
  });

  const data = configs?.data;

  useEffect(() => {
    const timer = setInterval(() => {
      // Set the timezone from configs
      const time = dayjs().tz(data?.timeZone);
      setCurrentTime(time);
    }, 1000);

    return () => clearInterval(timer);
  }, [data?.timeZone]);

  return (
    <Box
      component="footer"
      sx={{
        p: 2.5,
        backgroundColor: (theme) => theme.palette.background.paper,
        borderTop: (theme) => `1px solid ${theme.palette.divider}`,
        position: "fixed",
        bottom: 0,
        right: 0,

        transition: "all var(--Sidebar-transition-time)",
        zIndex: 1000,

        width: { sm: "100%", md: "90%" },
      }}
    >
      <Typography
        variant="body2"
        color="text.secondary"
        sx={{
          width: "100%",
          textAlign: { sm: "center", md: "right" },
        }}
      >
        All times are {data?.timeZone}. The time now is{" "}
        {currentTime.format(`${data?.dateFormat} HH:mm:ss`)}.{" "}
        <div
          style={{
            display: "inline-block",
          }}
          dangerouslySetInnerHTML={{ __html: data?.appName }}
        />{" "}
        1.12 - 0.005s
      </Typography>
    </Box>
  );
};
