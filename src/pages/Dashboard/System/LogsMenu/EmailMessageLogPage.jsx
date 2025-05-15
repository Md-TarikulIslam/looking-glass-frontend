import dayjs from "dayjs";
import timezone from "dayjs/plugin/timezone";
import utc from "dayjs/plugin/utc";
import { useEffect, useState } from "react";
import DataTable from "../../../../components/UI/DataTable";
import { useConfigsQuery } from "../../../../redux/features/configApi";
import { useEmailLogsQuery } from "../../../../redux/features/logsApi";
// Enable the plugins
dayjs.extend(utc);
dayjs.extend(timezone);
const EmailMessageLogPage = () => {
  const { data: configs, isLoading: configLoading } = useConfigsQuery({
    fields: "tableRecords,timeZone,dateFormat",
  });

  const [limit, setLimit] = useState(0);
  const [page, setPage] = useState(0);

  useEffect(() => {
    if (configs?.data?.tableRecords) {
      setLimit(Number(configs.data.tableRecords));
    }
  }, [configs]);

  const { data: email, isLoading } = useEmailLogsQuery({
    page: page + 1, // Convert to 1-based for API
    limit,
    fields: "logId,email,subject,createdAt",
    search: "",
  });

  const columns = [
    {
      field: "logId",
      headerName: "ID",
      width: 200,
      // editable: true,
    },
    {
      field: "user",
      headerName: "User",
      width: 200,
      renderCell: (params) => params.row.user || "",
      // editable: true,
    },
    {
      field: "email",
      headerName: "Email",
      width: 200,
      // editable: true,
    },
    {
      field: "subject",
      headerName: "Subject",
      width: 200,
      // editable: true,
    },
    {
      field: "createdAt",
      headerName: "Timestamp",
      width: 200,
      renderCell: (params) => {
        const time = dayjs(params.row.createdAt)
          .tz(configs?.data?.timeZone)
          .format(`${configs?.data?.dateFormat} HH:mm:ss`);
        return time;
      },
    },
  ];
  if (configLoading || !limit) return <div>Loading..</div>;
  return (
    <>
      <DataTable
        columns={columns}
        initialRows={email?.data || []}
        loading={isLoading}
        rowsPerPage={limit}
        rowCount={email?.total || 25}
        paginationMode="server"
        onPageChange={setPage}
        onPageSizeChange={setLimit}
      />
    </>
  );
};

export default EmailMessageLogPage;
