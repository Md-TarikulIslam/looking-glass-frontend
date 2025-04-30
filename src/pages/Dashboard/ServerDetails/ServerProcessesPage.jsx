import DataTable from "../../../components/UI/DataTable";
import { useBrandsQuery } from "../../../redux/features/brandApi";


const ServerProcessesPage = () => {
  const { data: brands, isLoading } = useBrandsQuery();

  const columns = [
    {
      field: "pid",
      headerName: "PID",
      width: 200,
    
    },
    {
      field: "ppid",
      headerName: "PPID",
      width: 200,
    
    },
    {
      field: "rss",
      headerName: "RSS",
      width: 200,
    
    },
    {
      field: "vsz",
      headerName: "VSZ",
      width: 200,
    
    },
    {
      field: "user",
      headerName: "USER",
      width: 200,
    
    },
    {
      field: "mem",
      headerName: "%MEM",
      width: 200,
    
    },
    {
      field: "cpu",
      headerName: "%CPU",
      width: 200,
    
    },
    {
      field: "command",
      headerName: "COMMAND",
      width: 200,
    
    },
    {
      field: "cmd",
      headerName: "CMD",
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

export default ServerProcessesPage;
