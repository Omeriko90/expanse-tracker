import LoadingState from "./LoadingState";
import ExpensesList from "./ExpensesList";
import useGetAllExpenses from "../hooks/useGetAllExpenses";
import { Box, Typography } from "@mui/material";
import AddButton from "./common/AddButton";
import { useHistory } from "react-router-dom";
import SortBySelect from "./common/SortBySelect";

function Expenses() {
  const history = useHistory();
  const { data: expenses, isLoading } = useGetAllExpenses();

  const handleAddButtonClick = () => history.push("/add");

  return isLoading ? (
    <LoadingState />
  ) : (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        paddingInline: 5,
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          marginBlock: 4,
        }}
      >
        <Box sx={{ display: "flex", flex: 1, justifyContent: "center" }}>
          <Typography variant="h2">Expenses</Typography>
        </Box>
        <AddButton onClick={handleAddButtonClick} />
      </Box>
      <Box sx={{ display: "flex", flexDirection: "column" }}>
        <Box
          sx={{
            display: "flex",
            alignSelf: "end",
            justifyContent: "end",
            mb: 2,
            minWidth: 200,
          }}
        >
          <SortBySelect />
        </Box>
        <ExpensesList expenses={expenses} isLoading={isLoading} />
      </Box>
    </Box>
  );
}

export default Expenses;
