import { Button } from "@mui/material";
import React from "react";

const PrimaryButton = ({
  name,
  startIcon,
  endIcon,
  variant,
  size,
  fullWidth,
  disabled,
  onClick,
  type,
  color,
  sx,
}) => {
  return (
    <Button
      onClick={onClick}
      disabled={disabled}
      fullWidth={fullWidth}
      size={size ? size : "large"}
      color={color ? color : "primary"}
      type={type ? type : "button"}
      variant={variant ? variant : "contained"}
      startIcon={startIcon}
      endIcon={endIcon}
      // className='dm'
      sx={{
       
        textTransform: "none",
        fontWeight: "medium",
        boxShadow: "none",
        px: 3,
        borderRadius: 20,

        // ":hover": {
        //   boxShadow: "0 0px  5px #2d92c9",
        // },
        // 
        // py: 1.86,
        // minWidth:'160px'
        ...sx,
      }}
    >
      {name}
    </Button>
  );
};

export default PrimaryButton;


// ... existing code ...

export const TonalButton = ({
  name,
  startIcon,
  endIcon,
  size,
  fullWidth,
  disabled,
  onClick,
  type,
  color = "primary",
  sx,
}) => {
  return (
    <Button
      onClick={onClick}
      disabled={disabled}
      fullWidth={fullWidth}
      size={size || "large"}
      type={type || "button"}
      variant="text"
      startIcon={startIcon}
      endIcon={endIcon}
      color={color}
      sx={{
      
        px: 3,
        borderRadius: 20,
        textTransform: "none",
        fontWeight: "medium",
        backgroundColor: (theme) => theme.palette[color]?.main ? `${theme.palette[color].main}1A` : `${theme.palette.primary.main}1A`,
        color: (theme) => theme.palette[color]?.main || theme.palette.primary.main,
        "&:hover": {
          backgroundColor: (theme) => theme.palette[color]?.main ? `${theme.palette[color].main}33` : `${theme.palette.primary.main}33`,
        },
        "&:disabled": {
          backgroundColor: (theme) => theme.palette.action.disabledBackground,
          color: (theme) => theme.palette.action.disabled,
        },
        ...sx,
      }}
    >
      {name}
    </Button>
  );
};