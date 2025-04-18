import { Group } from "@mui/icons-material";
import { Box, Button, Paper, Typography } from "@mui/material";
import { Link } from "react-router";

export default function HomePage() {
  return (
    <Paper
      sx={{
        color: "white",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 6,
        justifyContent: "center",
        alignContent: "center",
        height: "100vh",
        backgroundImage: "linear-gradient(135deg, #182a73 0%, #204085 100%)",
      }}
    >
      <Box sx={{
        display: "flex",
        alignItems: "center",
        alignContent: "center",
        color: "white", gap: 3
      }}>
        <Group sx={{ height: 110, width: 110 }} />
        <Typography variant="h1">
          Reactivities
        </Typography>
      </Box>
      <Typography variant="h2">Welcome to Reactivities</Typography>
      <Button
        component={Link}
        to="/activities"
        variant="contained"
        size="large"
        sx={{ height: 80, borderRadius: 4, fontSize: "1.5rem" }}
        color="primary">
        Take me to the activities!
      </Button>
    </Paper>
  )
}
