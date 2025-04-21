import { Box, Tab, Tabs } from "@mui/material";
import React from "react";
import { Outlet, useLocation, useNavigate } from "react-router";
import DashboardBreadcrumbs from "../../../../components/UI/DashboardBreadcrumbs";

const LogsPage = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const tabs = [
    { label: "Activity Log", path: "activity-log" },
    { label: "Email Message Log", path: "email-message-log" },
    { label: "SMS Message Log", path: "sms-message-log" },
    { label: "Cron Log", path: "cron-log" },
 
  ];

  const currentTab =
    tabs.findIndex((tab) => location.pathname.includes(tab.path)) || 0;

  const handleTabChange = (event, newValue) => {
    navigate(`/dashboard/system/logs/${tabs[newValue].path}`);
  };

  return (
    <Box sx={{ width: "100%" }}>
      <DashboardBreadcrumbs name="Logs" item={tabs[currentTab]?.label} />

      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs
          value={currentTab}
          onChange={handleTabChange}
          variant="scrollable"
          scrollButtons="auto"
          aria-label="logs tabs"
        >
          {tabs.map((tab) => (
            <Tab key={tab.path} label={tab.label} />
          ))}
        </Tabs>
      </Box>
      <Box sx={{ py: 3 }}>
        <Outlet />
      </Box>
    </Box>
  );
};

export default LogsPage;
