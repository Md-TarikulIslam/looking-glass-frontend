import { Box, Typography } from "@mui/material";
import Loading from "../../../../components/UI/Loading";
import { useOtherConfigsQuery } from "../../../../redux/features/otherConfigApi";

const CronJobsPage = () => {
  const { data: otherConfigs, isLoading } = useOtherConfigsQuery({
    fields: "cronJob,alterCronJob",
  });
  const data = otherConfigs?.data;
  if (isLoading) {
    return <Loading />;
  }
  return (
    <Box className="space-y-4">
      <Typography variant="h6" component="h2">
        System Cron Job
      </Typography>

      <Box className="bg-gray-100 p-4 rounded-md">
        <Typography
          variant="body1"
          component="pre"
          className="font-mono break-all whitespace-pre-wrap"
        >
          {data?.cronJob}
        </Typography>
      </Box>

      <Typography variant="body2" className="text-gray-600">
        or
      </Typography>

      <Box className="bg-gray-100 p-4 rounded-md">
        <Typography
          variant="body1"
          component="pre"
          className="font-mono break-all whitespace-pre-wrap"
        >
          {data?.alterCronJob}
        </Typography>
      </Box>

      <Typography variant="body2" className="text-gray-600">
        This cron job will check websites and checks, process alerts and send
        notifications if needed, every 3 minutes.
      </Typography>
    </Box>
  );
};

export default CronJobsPage;
