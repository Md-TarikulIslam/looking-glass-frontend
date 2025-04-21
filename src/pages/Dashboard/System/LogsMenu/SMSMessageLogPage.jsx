import DataTable from "../../../../components/UI/DataTable";
import { useBrandsQuery } from "../../../../redux/features/brandApi";

const SMSMessageLogPage = () => {
  const { data: brands, isLoading } = useBrandsQuery();

  const columns = [
    {
      field: "id",
      headerName: "ID",
      width: 200,
      // editable: true,
    },
    {
      field: "timestamp",
      headerName: "Timestamp",
      width: 200,
      // editable: true,
    },
    {
      field: "mobile",
      headerName: "Mobile",
      width: 200,
      // editable: true,
    },
    {
      field: "text",
      headerName: "Text",
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

export default SMSMessageLogPage;
