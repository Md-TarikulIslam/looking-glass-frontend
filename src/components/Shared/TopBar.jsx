import {
  IconButton,
  Menu,
  MenuItem,
  Stack,
  Tooltip,
  Zoom
} from "@mui/material";
import { ThemeSwitcher } from "@toolpad/core";
import { useState } from "react";
import { MdRefresh } from "react-icons/md";

export function TopBar() {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <Stack direction="row">
      <Tooltip title="Refresh" enterDelay={1000}>
        <div>
          <IconButton type="button" aria-label="refresh" onClick={handleClick}>
            <MdRefresh />
          </IconButton>
        </div>
        <Menu
          TransitionComponent={Zoom}
          sx={{
            "& .MuiPaper-root": {
              borderRadius: 2,
              boxShadow: "0px 0px 20px rgba(0, 0, 0, 0.10)",
              mt: 1.5,
              ml: -2,
            },
            "& .MuiList-padding": {
              p: 1,
            },
          }}
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
        >
          <MenuItem
            sx={{
              fontSize: "14px",
              fontWeight: 400,
              color: "primary.main",

              px: 2,
              py: 1,
              borderRadius: 1,
            }}
            onClick={handleClose}
          >
            Refresh All
          </MenuItem>
          <MenuItem
            sx={{
              fontSize: "14px",
              fontWeight: 400,
              color: "primary.main",

              px: 2,
              py: 1,
              borderRadius: 1,
            }}
            onClick={handleClose}
          >
            Refresh Current Page
          </MenuItem>
          <MenuItem
            sx={{
              fontSize: "14px",
              fontWeight: 400,
              color: "primary.main",

              px: 2,
              py: 1,
              borderRadius: 1,
            }}
            onClick={handleClose}
          >
            Refresh Data Only
          </MenuItem>
        </Menu>
      </Tooltip>

      <ThemeSwitcher />
    </Stack>
  );
}
