/* eslint-disable no-unused-vars */
import { Box, Card, CardContent, Typography } from "@mui/material";
import { blue, red } from "@mui/material/colors";
import { MdContactEmergency, MdStorage } from "react-icons/md";
import DashboardBreadcrumbs from "../../components/UI/DashboardBreadcrumbs";
import DataTable from "../../components/UI/DataTable";
import Loading from "../../components/UI/Loading";
import { useBrandsQuery } from "../../redux/features/brandApi";
import { useState, useEffect } from "react";
import { useConfigsQuery } from "../../redux/features/configApi";
import { useContactsQuery } from "../../redux/features/contactsApi";

const DashboardPage = () => {
  const { data: brands, isLoading } = useBrandsQuery();
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

  const { data: contacts, isLoading: contactsLoading } = useContactsQuery({
    page: page + 1,
    limit,
    fields: "name",
    search: "",
  });

  const columns = [
    {
      field: "id",
      headerName: "",
      width: 200,
      // editable: true,
    },
    {
      field: "server",
      headerName: "Server",
      width: 200,
      // editable: true,
    },
    {
      field: "incident",
      headerName: "Incident",
      width: 200,
      // editable: true,
    },
    {
      field: "startTime",
      headerName: "Start Time",
      width: 200,
      // editable: true,
    },
  ];
  return (
    <div>
      <DashboardBreadcrumbs name="Dashboard" />
      <Box className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Item
            title="Servers"
            number="38"
            color={red[500]}
            icon={<MdStorage />}
          />
          <Item
            title="Contacts"
            number={contactsLoading ? "0" : contacts?.data?.length}
            color={blue[500]}
            icon={<MdContactEmergency />}
          />
        </div>

        <div className="space-y-6">
          {isLoading ? (
            <Loading />
          ) : (
            <DataTable
              columns={columns}
              initialRows={brands?.data || []}
              rowsPerPage={100}
            />
          )}
        </div>
      </Box>
    </div>
  );
};

export default DashboardPage;

const Item = ({ color, number, title, icon }) => {
  return (
    <Card
      sx={{
        height: "100%",
        backgroundColor: `${color}10`,
        boxShadow: "0",
        borderRadius: "8px",
        transition: "transform 0.2s, box-shadow 0.2s",
        "&:hover": {
          // transform: 'translateY(-2px)',
          boxShadow: `0 0px 16px ${color}40`,
        },
        position: "relative",
      }}
    >
      <CardContent>
        <p className="absolute right-2 top-0 text-7xl text-gray-200">{icon}</p>
        <Typography
          variant="h3"
          sx={{
            mb: 1,
            color: color,
            fontWeight: "bold",
          }}
        >
          {number}
        </Typography>
        <Typography
          color={`${color}80`}
          sx={{ fontSize: "18px", fontWeight: "bold" }}
        >
          {title}
        </Typography>
      </CardContent>
    </Card>
  );
};
