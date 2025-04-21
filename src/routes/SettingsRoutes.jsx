import { Box, Tab, Tabs } from '@mui/material';
import { PageContainer } from '@toolpad/core';
import React from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';

const SettingsPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  
  const tabs = [
    { label: 'General', path: 'general' },
    { label: 'Monitoring', path: 'monitoring' },
    { label: 'Localisation', path: 'localisation' },
    { label: 'Email', path: 'email' },
    { label: 'SMS Gateway', path: 'sms' },
    { label: 'Twitter', path: 'twitter' },
    { label: 'Pushover', path: 'pushover' },
    { label: 'Notifications', path: 'notifications' },
    { label: 'Cron Jobs', path: 'cron' },
  ];

  const currentTab = tabs.findIndex(
    tab => location.pathname.includes(tab.path)
  ) || 0;

  const handleTabChange = (event, newValue) => {
    navigate(tabs[newValue].path);
  };

  // Generate breadcrumbs based on current tab
  const currentTabName = tabs[currentTab]?.label || '';
  const breadcrumbs = [
    { title: 'Dashboard', href: '/dashboard' },
    { title: 'System', href: '/dashboard/system' },
    { title: 'Settings', href: '/dashboard/system/settings' },
    { title: currentTabName }
  ];

  return (
    <Box sx={{ width: '100%' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
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
      <Box sx={{ p: 3 }}>
        <PageContainer breadcrumbs={breadcrumbs}>
          <Outlet />
        </PageContainer>
      </Box>
    </Box>
  );
};

export default SettingsPage;