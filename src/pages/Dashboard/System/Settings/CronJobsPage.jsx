import { Box, Typography } from "@mui/material";

const CronJobsPage = () => {
  return (
    <Box className="space-y-4">
      <Typography variant="h6" component="h2">
        System Cron Job
      </Typography>

      <Box className="bg-gray-100 p-4 rounded-md">
        <Typography variant="body1" component="pre" className="font-mono break-all whitespace-pre-wrap">
        GET https://lookingglass.sierrasolution.com/crons/cron.php
        </Typography>
      </Box>

      <Typography variant="body2" className="text-gray-600">
        or
      </Typography>

      <Box className="bg-gray-100 p-4 rounded-md">
        <Typography variant="body1" component="pre" className="font-mono break-all whitespace-pre-wrap">
        php -q /home/sierrasolution-lookingglass/htdocs/lookingglass.sierrasolution.com/crons/cron.php
        </Typography>
      </Box>

      <Typography variant="body2" className="text-gray-600">
        This cron job will check websites and checks, process alerts and send notifications if needed, every 3 minutes.
      </Typography>
    </Box>
  );
};

export default CronJobsPage;