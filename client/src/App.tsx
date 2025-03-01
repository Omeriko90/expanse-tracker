import "./App.css";
import { Box, Typography } from "@mui/material";
import AppHeader from "components/AppHeader";
import { Suspense } from "react";
import { useDispatch, useSelector } from "react-redux";
import { State } from "src/types";
import { Snackbar } from "@mui/joy";
import Expenses from "components/Expenses";
import { setSnackbarMsg } from "reducers/global";

const TWO_SECONDS = 1000 * 2;

function App() {
  const dispatch = useDispatch();
  const snackbarMsg = useSelector((state: State) => state.global.snackbarMsg);
  const snackbarType = useSelector((state: State) => state.global.snackbarType);

  const handleCloseSnackbar = () => dispatch(setSnackbarMsg(null));
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
            height: { xs: "100%", md: "initial" },
            // paddingInline:{xs: 0, md:5},
            mx: "auto",
          }}
        >
          <Expenses />
        </Box>
      </Suspense>
      {snackbarMsg && (
        <Snackbar
          color={snackbarType}
          variant="soft"
          open
          anchorOrigin={{ vertical: "top", horizontal: "center" }}
          onClose={handleCloseSnackbar}
          autoHideDuration={TWO_SECONDS}
        >
          <Typography variant="body2">{snackbarMsg}</Typography>
        </Snackbar>
      )}
    </Box>
  );
}

export default App;
