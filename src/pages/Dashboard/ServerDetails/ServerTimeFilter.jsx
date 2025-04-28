/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Box, Button, List, ListItem, ListItemButton, ListItemText, Typography, Popover, Input, TextField } from "@mui/material";
import { AccessTime } from "@mui/icons-material";

const QUICK_RANGES = [
  { label: "Last 30 Minutes", value: 30 },
  { label: "Last 60 Minutes", value: 60 },
  { label: "Last 3 Hours", value: 180 },
  { label: "Last 6 Hours", value: 360 },
  { label: "Last 12 Hours", value: 720 },
  { label: "Last 24 Hours", value: 1440 },
  { label: "Last 3 Days", value: 4320 },
  { label: "Last 7 Days", value: 10080 },
  { label: "Last 30 Days", value: 43200 },
];

const ServerTimeFilter = ({ onApply, onCancel }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [showCustom, setShowCustom] = useState(false);
  const [startDate, setStartDate] = useState(new Date(Date.now() - 30 * 60 * 1000));
  const [endDate, setEndDate] = useState(new Date());

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
    setShowCustom(false);
  };

  const handleQuickRange = (minutes) => {
    setShowCustom(false);
    setStartDate(new Date(Date.now() - minutes * 60 * 1000));
    setEndDate(new Date());
    if (onApply) {
      onApply({
        startDate: new Date(Date.now() - minutes * 60 * 1000),
        endDate: new Date(),
      });
    }
    handleClose();
  };

  const handleCustom = () => setShowCustom(true);

  const handleApply = () => {
    if (onApply) onApply({ startDate, endDate });
    handleClose();
  };

  const open = Boolean(anchorEl);

  return (
    <Box>
      <Button
        variant="outlined"
        onClick={handleClick}
        startIcon={<AccessTime />}
        sx={{ height: 40, ml: 2 }}
      >
        Time Range
      </Button>
      <Popover
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        sx={{
          '& .MuiPopover-paper': {
            // border: '1px solid #ddd',
            borderRadius: 4,
            px:1,
            boxShadow: '0px 0px 4px rgba(0, 0, 0, 0.2)',
          },
        }}
      >
        <Box sx={{ display: "flex", gap: 2, p: 1, minWidth: 500 }}>
          <List sx={{ width: 200 }}>
            {QUICK_RANGES.map((range) => (
              <ListItem key={range.label} disablePadding sx={{borderRadius:2, overflow:'hidden'}}>
                <ListItemButton onClick={() => handleQuickRange(range.value)}>
                  <ListItemText primary={range.label} />
                </ListItemButton>
              </ListItem>
            ))}
            <ListItem disablePadding sx={{borderRadius:2, overflow:'hidden'}}>
              <ListItemButton
                selected={showCustom}
                onClick={handleCustom}
                sx={{ bgcolor: showCustom ? "primary.main" : undefined, color: showCustom ? "#000" : undefined }}
              >
                <ListItemText primary="Custom Range" />
              </ListItemButton>
            </ListItem>
          </List>
          {showCustom && (
            <Box sx={{ p: 2, borderLeft: "1px solid #eee" }}>
              <Typography variant="subtitle2" gutterBottom>
                Select Custom Range
              </Typography>
              <Box sx={{ display: "flex", flexDirection: "column", gap: 2, mb: 2 }}>
                <DatePicker
                  selected={startDate}
                  onChange={(date) => setStartDate(date)}
                  selectsStart
                  startDate={startDate}
                  endDate={endDate}
                  showTimeSelect
                  dateFormat="dd/MM/yyyy HH:mm:ss"
                  timeFormat="HH:mm:ss"
                  customInput={
                    <TextField 
                    variant="filled"
                    label="Start Date and Time"
                  
                   
                    />
                  }
                />
                <DatePicker
                  selected={endDate}
                  onChange={(date) => setEndDate(date)}
                  selectsEnd
                  startDate={startDate}
                  endDate={endDate}
                  minDate={startDate}
                  showTimeSelect
                  dateFormat="dd/MM/yyyy HH:mm:ss"
                  timeFormat="HH:mm:ss"
                  customInput={
                    <TextField
                      variant="filled"
                      label="End Date and Time" 
                     
                    />
                  }
                />
              </Box>
              <Box sx={{ display: "flex", gap: 1 }}>
                <Button variant="contained" color="primary" onClick={handleApply}>
                  Apply
                </Button>
                <Button variant="outlined" color="secondary" onClick={handleClose}>
                  Cancel
                </Button>
              </Box>
            </Box>
          )}
        </Box>
      </Popover>
    </Box>
  );
};

export default ServerTimeFilter;