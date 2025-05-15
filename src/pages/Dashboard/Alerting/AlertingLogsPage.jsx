import dayjs from "dayjs";
import timezone from "dayjs/plugin/timezone";
import utc from "dayjs/plugin/utc";
import { useEffect, useState } from "react";
import DashboardBreadcrumbs from "../../../components/UI/DashboardBreadcrumbs";
import DataTable from "../../../components/UI/DataTable";
import { useAlertingLogsQuery } from "../../../redux/features/alertingLogsApi";
import { useConfigsQuery } from "../../../redux/features/configApi";
// Enable the plugins
dayjs.extend(utc);
dayjs.extend(timezone);
const AlertingLogsPage = () => {
  const { data: configs, isLoading: configLoading } = useConfigsQuery({
    fields: "tableRecords",
  });

  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(0);

  useEffect(() => {
    if (configs?.data?.tableRecords) {
      setLimit(Number(configs.data.tableRecords));
    }
  }, [configs]);

  const { data: alertingLogs, isLoading: logsLoading } = useAlertingLogsQuery({
    page: page + 1,
    limit,
    fields: "alertId,body,createdAt",
    search: "",
  });

  if (configLoading || !limit) return <div>Loading..</div>;

  const columns = [
    {
      field: "alertId",
      headerName: "ID",
      width: 100,
    },
    {
      field: "createdAt",
      headerName: "Date",
      width: 200,
      renderCell: (params) => {
        const time = dayjs(params.row.createdAt)
          .tz(configs?.data?.timeZone)
          .format(`${configs?.data?.dateFormat} HH:mm:ss`);
        return time;
      },
    },
    {
      field: "contact",
      headerName: "Contact",
      width: 200,
      renderCell: (params) => params.row.contact?.name || "",
    },
    {
      field: "body",
      headerName: "Message",
      width: 200,
    },
    {
      field: "",
      headerName: "Channels",
      width: 300,
      renderCell: (params) => {
        const row = params.row;
        return (
          <div className="flex gap-2">
            {row.email && <span title={row?.email}>@</span>}
            {row.phone && <span title={row?.phone}>📱</span>}
          </div>
        );
      },
    },
  ];

  return (
    <div className="space-y-6">
      <DashboardBreadcrumbs name="Contacts" />

      <DataTable
        columns={columns}
        initialRows={alertingLogs?.data || []}
        loading={logsLoading}
        rowsPerPage={limit}
        rowCount={alertingLogs?.total || 25}
        paginationMode="server"
        onPageChange={setPage}
        onPageSizeChange={setLimit}
      />
    </div>
  );
};

export default AlertingLogsPage;
