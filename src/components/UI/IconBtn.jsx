import { IconButton } from "@mui/material";
import React from "react";

const IconBtn = ({ icon, size, name , color, onClick}) => {
  return (
    <IconButton onClick={onClick} aria-label={name} label={name} size={size ? size : "medium"} color={color ? color : 'primary'}>
      {React.isValidElement(icon) ? icon : React.createElement(icon, { fontSize: size ? size : "medium" })}
    </IconButton>
  );
};

export default IconBtn;