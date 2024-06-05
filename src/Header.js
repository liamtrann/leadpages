import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import { createMockFormSubmission, onMessage } from "./service/mockServer";
import { useListContext } from "./context/ListContext";
import SnackBarToast from "./components/SnackBarToast";

export default function Header() {
  const [open, setOpen] = useState(false);
  const [liked, setLiked] = useState(false);
  const [formSubmission, setFormSubmission] = useState(null);

  // Accessing addList function from ListContext
  const { addList } = useListContext();

  // Function to handle closing the toast
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  // Function to handle liking a form submission
  const handleLikedSubmission = () => {
    if (!formSubmission) return;
    const { liked, ...rest } = formSubmission.data;
    addList(rest);
    setLiked(true);
  };

  useEffect(() => {
    // Register the callback to handle new form submissions
    onMessage((newSubmission) => {
      setFormSubmission(newSubmission);
    });
  }, []);
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ marginRight: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            Toast Exercise
          </Typography>
          <Button
            variant="contained"
            size="small"
            color="secondary"
            onClick={() => {
              setOpen(true);
              setLiked(false);
              createMockFormSubmission();
            }}
          >
            New Submission
          </Button>
          {/* Display the toast if there is a form submission */}
          {formSubmission && formSubmission.data && (
            <SnackBarToast
              open={open}
              handleClose={handleClose}
              liked={liked}
              handleLikedSubmission={handleLikedSubmission}
              data={formSubmission.data}
            />
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
}
