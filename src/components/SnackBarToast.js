import { Button, IconButton, Snackbar, SnackbarContent } from "@mui/material";
import React from "react";

const SnackBarToast = ({
  open,
  handleClose,
  liked,
  handleLikedSubmission,
  data,
}) => {
  return (
    <Snackbar
      open={open}
      autoHideDuration={6000}
      anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      onClose={handleClose}
    >
      <SnackbarContent
        message={
          <div>
            <div>{`${data.firstName} ${data.lastName}`}</div>
            <div>{data.email}</div>
          </div>
        }
        action={
          <>
            <Button
              color={liked ? "success" : "primary"}
              size="small"
              onClick={handleLikedSubmission}
            >
              {liked ? "Liked" : "Like"}
            </Button>
            <IconButton size="small" color="inherit" onClick={handleClose}>
              X
            </IconButton>
          </>
        }
      />
    </Snackbar>
  );
};

export default SnackBarToast;
