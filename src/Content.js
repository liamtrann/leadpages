import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import {
  Table,
  TableContainer,
  TableHead,
  TableRow,
  TableCell,
  Paper,
  TableBody,
  CircularProgress,
  Stack,
  Alert,
} from "@mui/material";
import { useListContext } from "./context/ListContext";

export default function Content() {
  // Retrieve data, loading state, and error from the ListContext
  const { lists, loading, error } = useListContext();
  return (
    <Box sx={{ marginTop: 3 }}>
      <Typography variant="h4">Liked Form Submissions</Typography>
      {/* If there's a server error, display an alert */}
      {error && error.status === 500 ? (
        <Stack spacing={2} sx={{ width: "100%" }}>
          <Alert severity="error">{error.message}</Alert>
        </Stack>
      ) : loading ? ( // If data is still loading, show a loading spinner
        <CircularProgress sx={{ justifyContent: "center", mt: 5 }} />
      ) : (
        // If data is loaded, display the table
        <TableContainer component={Paper} sx={{ mt: 5 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell sx={{ fontWeight: "bold" }}>First Name</TableCell>
                <TableCell sx={{ fontWeight: "bold" }}>Last Name</TableCell>
                <TableCell sx={{ fontWeight: "bold" }}>Email</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {lists && lists.length ? (
                lists.map((row, index) => (
                  <TableRow key={index}>
                    <TableCell>{row.firstName}</TableCell>
                    <TableCell>{row.lastName}</TableCell>
                    <TableCell>{row.email}</TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell>No data</TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </Box>
  );
}
