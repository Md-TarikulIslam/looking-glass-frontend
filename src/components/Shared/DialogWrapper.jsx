import { DialogTitle, Grow } from "@mui/material";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import * as React from "react";

export default function DialogWrapper({ open, setOpen, content, size, title }) {
  const handleClose = () => {
    setOpen(false);
  };
  const Transition = React.forwardRef(function Transition(props, ref) {
    return <Grow ref={ref} {...props} />;
  });
  return (
    <React.Fragment>
      <Dialog
      
        TransitionComponent={Transition}
        fullWidth={true}
        maxWidth={size ? size : "sm"}
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        sx={{ "& .MuiDialog-paper": { borderRadius: "20px", p: "6px", boxShadow: "none", } }}
      >
        <DialogTitle sx={{fontSize:'30px'}} id="alert-dialog-title">
          {title}
        </DialogTitle>
        <DialogContent sx={{ height: "100%" }}>{content}</DialogContent>
      </Dialog>
    </React.Fragment>
  );
}
