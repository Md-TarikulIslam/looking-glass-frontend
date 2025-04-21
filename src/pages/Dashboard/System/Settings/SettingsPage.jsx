import { Box, Tab, Tabs } from "@mui/material";
import React from "react";
import { Outlet, useLocation, useNavigate } from "react-router";
import DashboardBreadcrumbs from "../../../../components/UI/DashboardBreadcrumbs";

const SettingsPage = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const tabs = [
    { label: "General", path: "general" },
    { label: "Monitoring", path: "monitoring" },
    { label: "Localization", path: "localization" },
    { label: "Email", path: "email" },
    { label: "SMS Gateway", path: "sms" },
    { label: "Twitter", path: "twitter" },
    { label: "Pushover", path: "pushover" },
    { label: "Notifications", path: "notifications" },
    { label: "Cron Jobs", path: "cron" },
  ];

  const currentTab =
    tabs.findIndex((tab) => location.pathname.includes(tab.path)) || 0;

  const handleTabChange = (event, newValue) => {
    navigate(`/dashboard/system/settings/${tabs[newValue].path}`);
  };

  return (
    <Box sx={{ width: "100%" }}>
      <DashboardBreadcrumbs name="Settings" item={tabs[currentTab]?.label} />

      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
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
      </Box>
      <Box sx={{ py: 3 }}>
        <Outlet />
      </Box>
    </Box>
  );
};

export default SettingsPage;
