import ExpensesList from "components/ExpensesList";
import useGetExpenses from "hooks/useGetExpenses";
import { Box, Typography } from "@mui/material";
import AddButton from "components/common/AddButton";
import SortBySelect from "components/common/SortBySelect";
import moment from "moment";
import useGetMonthTotalExpenses from "hooks/useGetMonthTotalExpenses";
import { useState } from "react";
import AddExpense from "components/AddExpense";
import EditExpense from "components/EditExpense";
import { useDispatch, useSelector } from "react-redux";
import { State } from "src/types";
import { setEditExpenseId } from "src/reducers/global";

function Expenses() {
  const dispatch = useDispatch();
  const editExpenseId = useSelector(
    (state: State) => state.global.editExpenseId
  );
  const [isAddExpenseDialogOpen, setIsAddExpenseDialogOpen] = useState(false);
  const { data: totalMonthExpense } = useGetMonthTotalExpenses();
  const { data: expenses, isLoading } = useGetExpenses(0);

  const handleAddButtonClick = () => setIsAddExpenseDialogOpen(true);
  const handleAddExpenseDialogClose = () => setIsAddExpenseDialogOpen(false);
  const handleEditExpenseDialogClose = () => dispatch(setEditExpenseId(null));

  return (
    <>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          paddingInline: { xs: 1, md: 5 },
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            marginBlock: 3,
          }}
        >
          <Box sx={{ display: "flex", flex: 1, justifyContent: "center" }}>
            <Typography variant="h2">Expenses</Typography>
          </Box>
          <AddButton onClick={handleAddButtonClick} />
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            paddingInline: { xs: 1, md: 0 },
          }}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              flexDirection: { xs: "column", md: "row" },
              alignItems: "center",
              mb: 2,
              minWidth: 200,
              "& > :first-child": {
                marginBottom: { xs: 2, md: 0 },
              },
            }}
          >
            <Typography variant="h6">
              Total Expense for {moment().format("MMMM")}: {totalMonthExpense}$
            </Typography>
            <Box
              sx={{
                width: { xs: "100%", md: 200 },
              }}
            >
              <SortBySelect />
            </Box>
          </Box>
          <ExpensesList expenses={expenses} isLoading={isLoading} />
        </Box>
      </Box>
      {isAddExpenseDialogOpen && (
        <AddExpense onClose={handleAddExpenseDialogClose} />
      )}
      {editExpenseId && (
        <EditExpense
          id={editExpenseId}
          onClose={handleEditExpenseDialogClose}
        />
      )}
    </>
  );
}

export default Expenses;
