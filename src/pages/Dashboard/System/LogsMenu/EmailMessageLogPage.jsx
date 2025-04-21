import DataTable from "../../../../components/UI/DataTable";
import { useBrandsQuery } from "../../../../redux/features/brandApi";

const EmailMessageLogPage = () => {
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

export default EmailMessageLogPage;
