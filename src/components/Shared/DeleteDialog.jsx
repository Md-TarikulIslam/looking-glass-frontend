import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import * as React from "react";
import { MdWarning } from "react-icons/md";


export default function AlertDialog({ open, setOpen, handleDelete, title }) {
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <React.Fragment>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        sx={{ "& .MuiDialog-paper": { borderRadius: "20px", px: 2, py: 2 } }}
      >
        <div
          id="alert-dialog-title"
          className="bg-red-500/20 max-w-min mx-auto p-2 rounded-full"
        >
          {" "}
          <MdWarning color="error" className="mx-auto text-3xl text-red-500" />
        </div>
        <DialogContent>
          <DialogContentText
            id="alert-dialog-description"
            sx={{ textAlign: "center", fontSize: "30px" }}
          >
            Delete Item
          </DialogContentText>
          <DialogContentText
            id="alert-dialog-description"
            sx={{ textAlign: "center", fontSize: "20px", pt: 2 }}
          >
            You're going to delete this item "{title}". Are you sure?
          </DialogContentText>
        </DialogContent>
        <div className="flex flex-col md:flex-row gap-4 p-1">
          <Button
            variant="outlined"
            fullWidth
            sx={{
              textTransform: "none",
              // borderRadius: "30px",
              fontWeight: 600,
              boxShadow: "none",
              py: 1.5,
              px: 3,
            }}
            onClick={handleClose}
          >
            No! Keep it
          </Button>
          <Button
            fullWidth
            sx={{
              textTransform: "none",
              // borderRadius: "30px",
              fontWeight: 600,
              boxShadow: "none",
              py: 1.5,
              px: 3,
            }}
            color="error"
            variant="contained"
            onClick={handleDelete}
            autoFocus
          >
            Yes! Delete It
          </Button>
        </div>
      </Dialog>
    </React.Fragment>
  );
}
