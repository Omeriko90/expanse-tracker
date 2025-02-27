import { Box, Typography } from "@mui/material";
import ExpenseForm from "./common/ExpenseForm";
import { Expense } from "../types";
import useAddExpense from "../hooks/useAddExpense";
import BackButton from "./common/BackButton";
import useGetAllCategories from "../hooks/useGetAllCategories";

const AddExpense = () => {
  const { data: categories } = useGetAllCategories();
  const { mutate: AddExpense } = useAddExpense();

  const handleAddExpenseSubmit = (newExpense: Expense) => {
    const selectedCategory = categories?.find((category) => category);
    AddExpense(newExpense);
  };

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
            Add New Expense
          </Typography>
        </Box>
      </Box>
      <ExpenseForm onSubmit={handleAddExpenseSubmit} btnLabel="Add" />
    </Box>
  );
};

export default AddExpense;
