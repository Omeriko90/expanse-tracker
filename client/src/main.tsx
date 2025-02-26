import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { Box } from "@mui/material";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import { Provider } from "react-redux";
import { store } from "./store.ts";
import { Router } from "react-router-dom";
import { createBrowserHistory } from "history";

const queryClient = new QueryClient();
const history = createBrowserHistory({ basename: "/" });

createRoot(document.getElementById("root")!).render(
  <Box sx={{ display: "flex", flexDirection: "column", height: "100%" }}>
    <Router history={history}>
      <Provider store={store}>
        <QueryClientProvider client={queryClient}>
          <App />
          <ReactQueryDevtools initialIsOpen={false} />
        </QueryClientProvider>
      </Provider>
    </Router>
  </Box>
);
