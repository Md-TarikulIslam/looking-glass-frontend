import { Box, Tab, Tabs } from "@mui/material";
import React from "react";
import { Outlet, useLocation, useNavigate, useParams } from "react-router";
import DashboardBreadcrumbs from "../../../components/UI/DashboardBreadcrumbs";
import ServerTimeFilter from "./ServerTimeFilter";

const ServerDetailsPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const params = useParams();
  const tabs = [
    { label: "Overview", path: "overview" },
    { label: "CPU", path: "cpu" },
    { label: "RAM", path: "ram" },
    { label: "Disks", path: "disks" },
    { label: "Network", path: "network" },
    { label: "Processes", path: "processes" },
    { label: "Alerting", path: "alerting" },
    { label: "Incidents", path: "incidents" },
  ];

  const currentTab =
    tabs.findIndex((tab) => location.pathname.includes(tab.path)) || 0;

  const handleTabChange = (event, newValue) => {
    navigate(
      `/dashboard/servers/server-details/${params.id}/${tabs[newValue].path}`
    );
  };

  return (
    <Box sx={{ width: "100%" }}>
      <DashboardBreadcrumbs
        name="Server Details"
        item={tabs[currentTab]?.label}
      />

      <Box sx={{ 
        borderBottom: 1, 
        borderColor: "divider", 
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
      }}>
        <Tabs
          value={currentTab}
          onChange={handleTabChange}
          variant="scrollable"
          scrollButtons="auto"
          aria-label="settings tabs"
        >
          {tabs.map((tab) => (
            <Tab key={tab.path} label={tab.label} />
          ))}
        </Tabs>
        <ServerTimeFilter />
      </Box>
      <Box sx={{ py: 3 }}>
        <Outlet />
      </Box>
    </Box>
  );
};

export default ServerDetailsPage;
