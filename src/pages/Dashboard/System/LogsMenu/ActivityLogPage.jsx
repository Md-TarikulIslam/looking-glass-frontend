import DataTable from "../../../../components/UI/DataTable";
import { useBrandsQuery } from "../../../../redux/features/brandApi";

const ActivityLogPage = () => {
  const { data: brands, isLoading } = useBrandsQuery();

  const columns = [
    {
      field: "id",
      headerName: "ID",
      width: 200,
      // editable: true,
    },
    {
      field: "user",
      headerName: "User",
      width: 200,
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
      field: "timestamp",
      headerName: "Timestamp",
      width: 200,
      // editable: true,
    },
  ];
  return (
    <>
      <DataTable
        columns={columns}
        initialRows={brands?.data || []}
        rowsPerPage={100}
        loading={isLoading}
      />
    </>
  );
};

export default ActivityLogPage;
