import "./App.css";
import { Box } from "@mui/material";
import AppHeader from "./components/AppHeader";
import Routes from "./routes/Routes";
import { Suspense } from "react";

function App() {
  return (
    <Box
      sx={{
        display: "flex",
        flex: 1,
        flexDirection: "column",
        position: "relative",
      }}
    >
      <AppHeader />
      <Suspense fallback={<div>Loading...</div>}>
        <Box
          sx={{
            width: { xs: "100%", md: 1200 },
            mx: "auto",
            mt: 4,
            p: 3,
          }}
        >
          <Routes />
        </Box>
      </Suspense>
    </Box>
  );
}

export default App;
