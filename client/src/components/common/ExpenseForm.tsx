import { useForm } from "react-hook-form";
import { Button } from "@mui/material";
import { Category, Expense } from "../../types";
import FormTextInput from "./Form/FormTextInput";
import FormDateInput from "./Form/FormDateInput";
import dayjs from "dayjs";
import FormAmountInput from "./Form/FormNumberInput";
import FormSelectInput from "./Form/FormSelectInput";
import useGetAllCategories from "../../hooks/useGetAllCategories";

interface Props {
  expense?: Expense;
  onSubmit: (data: Expense) => void;
  btnLabel: string;
}

const ExpenseForm = ({ expense, onSubmit, btnLabel }: Props) => {
  const now = new Date();
  const { data: categories } = useGetAllCategories();
  const { control, handleSubmit, watch } = useForm<Expense>({
    defaultValues: {
      description: expense?.description || "",
      amount: expense?.amount,
      createdAt: dayjs(expense?.createdAt) || dayjs(now.toISOString()),
      category: expense?.category || "",
    },
  });

  const test = watch();
  console.log(test);

  const categoriesOptions = categories
    ? categories.map((category: Category) => ({
        id: category.id,
        label: category.title,
      }))
    : [];

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <FormTextInput
        control={control}
        fullWidth
        name="description"
        label="Description"
        sx={{ marginBottom: 2 }}
      />
      <FormAmountInput
        control={control}
        fullWidth
        name="amount"
        required
        sx={{ marginBottom: 2 }}
      />
      <FormDateInput
        control={control}
        name="createdAt"
        fullWidth
        sx={{ marginBottom: 2 }}
      />
      <FormSelectInput
        control={control}
        name="category"
        fullWidth
        options={categoriesOptions}
      />
      <Button
        type="submit"
        variant="contained"
        color="primary"
        fullWidth
        sx={{ mt: 2 }}
      >
        {btnLabel}
      </Button>
    </form>
  );
};

export default ExpenseForm;
