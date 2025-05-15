import { useEffect, useState } from "react";
import DataTable from "../../../../components/UI/DataTable";
import { useConfigsQuery } from "../../../../redux/features/configApi";
import { useActivityLogsQuery } from "../../../../redux/features/logsApi";

const ActivityLogPage = () => {
  const { data: configs, isLoading: configLoading } = useConfigsQuery({
    fields: "tableRecords",
  });

  const [limit, setLimit] = useState(0);
  const [page, setPage] = useState(0);

  useEffect(() => {
    if (configs?.data?.tableRecords) {
      setLimit(Number(configs.data.tableRecords));
    }
  }, [configs]);

  const { data: activity, isLoading } = useActivityLogsQuery({
    page: page + 1, // Convert to 1-based for API
    limit,
    fields: "logId,ipAddress,description,createdAt",
    search: "",
  });

  console.log(activity);

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
      field: "ipAddress",
      headerName: "IP Address",
      width: 200,
      // editable: true,
    },
    {
      field: "description",
      headerName: "Description",
      width: 200,
      // editable: true,
    },
    {
      field: "createdAt",
      headerName: "Timestamp",
      width: 200,
      // editable: true,
    },
  ];

  // Show loading state while waiting for configs
  if (configLoading || !limit) return <div>Loading..</div>;

  return (
    <>
      <DataTable
        columns={columns}
        initialRows={activity?.data || []}
        loading={isLoading}
        rowsPerPage={limit}
        rowCount={activity?.total || 25} // Use total count from API
        paginationMode="server"
        onPageChange={setPage} // Directly use setPage
        onPageSizeChange={setLimit}
      />
    </>
  );
};

export default ActivityLogPage;
