import { TextField } from "@mui/material";

const Input = ({
  name,
  label,
  value,
  onChange,
  disabled,
  fullWidth,
  multiline,
  rows,
  helperText,
  error,
  variant,
  sx,
  size,
  placeholder,
  required,
  margin,
  ...props
}) => {
  return (
    <TextField
      name={name}
      label={label}
      value={value}
      onChange={onChange}
      disabled={disabled}
      fullWidth={fullWidth}
      multiline={multiline}
      placeholder={placeholder}
      rows={rows}
      helperText={helperText}
      error={error}
      variant={variant || "filled"}
      margin={margin || "none"}
      sx={{ ...sx }}
      size={size}
      required={required ? true : false}
      {...props}
    />
  );
};

export default Input;
