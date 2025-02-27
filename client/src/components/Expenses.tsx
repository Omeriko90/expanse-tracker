import LoadingState from "./LoadingState";
import ExpensesList from "./ExpensesList";
import useGetAllExpenses from "../hooks/useGetAllExpenses";
import { Box, Typography } from "@mui/material";
import AddButton from "./common/AddButton";
import { useHistory } from "react-router-dom";
import SortBySelect from "./common/SortBySelect";
import moment from "moment";
import useGetMonthTotalExpenses from "../hooks/useGetMonthTotalExpenses";

function Expenses() {
  const history = useHistory();
  const { data: totalMonthExpense } = useGetMonthTotalExpenses();
  const { data: expenses, isLoading } = useGetAllExpenses();

  const handleAddButtonClick = () => history.push("/add");

  return isLoading && false ? (
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
        <Box>
          <Typography variant="h6">
            Total Expense for {moment().format("MMMM")}: {totalMonthExpense}$
          </Typography>
        </Box>
      </Box>
    </Box>
  );
}

export default Expenses;
