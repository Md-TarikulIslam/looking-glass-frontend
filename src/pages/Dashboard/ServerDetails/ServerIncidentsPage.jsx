import DataTable from "../../../components/UI/DataTable";
import { useBrandsQuery } from "../../../redux/features/brandApi";


const ServerIncidentsPage = () => {
  const { data: brands, isLoading } = useBrandsQuery();

  const columns = [
    {
      field: "status",
      headerName: "",
      width: 200,
    
    },
    {
      field: "type",
      headerName: "Type",
      width: 200,
    
    },
    {
      field: "comparison",
      headerName: "Comparison",
      width: 200,
    
    },
    {
      field: "start_time",
      headerName: "Start Time",
      width: 200,
    
    },
    {
      field: "end_time",
      headerName: "End Time",
      width: 200,
    
    },
    {
      field: "comment",
      headerName: "Comment",
      width: 200,
    
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

export default ServerIncidentsPage;
