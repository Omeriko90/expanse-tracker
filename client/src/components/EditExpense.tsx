import { Box, Skeleton, Typography } from "@mui/material";
import ExpenseForm from "./common/ExpenseForm";
import { Expense } from "../types";
import useUpdateExpense from "../hooks/useUpdateExpense";
import useGetExpense from "../hooks/useGetExpense";
import { useParams } from "react-router-dom";
import BackButton from "./common/BackButton";

const EditExpense = () => {
  const { id } = useParams<{ id: string }>();
  const intId = parseInt(id);
  const { data: expense, isLoading } = useGetExpense(intId);
  const { mutate: updateExpense } = useUpdateExpense(intId);

  const handleAddExpenseSubmit = (updatedExpense: Expense) => {
    updateExpense(updatedExpense);
  };

  if (isLoading) {
    return <Skeleton />;
  }

  return (
    <Box>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          mb: 4,
        }}
      >
        <BackButton />
        <Box sx={{ display: "flex", flex: 1, justifyContent: "center" }}>
          <Typography variant="h5" gutterBottom>
            Update Expense
          </Typography>
        </Box>
      </Box>
      {expense && (
        <ExpenseForm
          expense={expense}
          onSubmit={handleAddExpenseSubmit}
          btnLabel={"Update"}
        />
      )}
    </Box>
  );
};

export default EditExpense;
