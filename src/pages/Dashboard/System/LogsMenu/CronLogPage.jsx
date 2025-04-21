import DataTable from "../../../../components/UI/DataTable";
import { useBrandsQuery } from "../../../../redux/features/brandApi";

const CronLogPage = () => {
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
      field: "data",
      headerName: "Data",
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

export default CronLogPage;
