import { FormProvider, useForm } from "react-hook-form";
import { Box, Button, CircularProgress, Theme } from "@mui/material";
import { Category, Expense } from "../../types";
import FormTextInput from "./Form/FormTextInput";
import FormDateInput from "./Form/FormDateInput";
import dayjs from "dayjs";
import FormAmountInput from "./Form/FormNumberInput";
import FormSelectInput from "./Form/FormSelectInput";
import useGetAllCategories from "../../hooks/useGetAllCategories";
import useIsMobile from "../../hooks/useIsMobile";

interface Props {
  expense?: Expense;
  onSubmit: (data: Expense) => void;
  onCancel?: () => void;
  isSubmitting: boolean;
  btnLabel: string;
}

const ExpenseForm = ({
  expense,
  onSubmit,
  onCancel,
  btnLabel,
  isSubmitting,
}: Props) => {
  const now = new Date();
  const isMobile = useIsMobile();
  const { data: categories } = useGetAllCategories();
  const methods = useForm<Expense>({
    defaultValues: {
      description: expense?.description || "",
      amount: expense?.amount,
      created_at: dayjs(expense?.created_at) || dayjs(now.toISOString()),
      category_id: expense?.category_id || "",
    },
  });
  const { handleSubmit, watch } = methods;
  const categoriesOptions = categories
    ? categories.map((category: Category) => ({
        id: category.id,
        label: category.name,
      }))
    : [];

  return (
    <form
      style={{ display: "grid", height: "100%" }}
      onSubmit={handleSubmit(onSubmit)}
    >
      <Box>
        <FormProvider {...methods}>
          <FormTextInput
            fullWidth
            name="description"
            label="Description"
            sx={{ marginBottom: 2 }}
          />
          <FormAmountInput
            fullWidth
            name="amount"
            required
            sx={{ marginBottom: 2 }}
          />
          <FormDateInput name="created_at" fullWidth sx={{ marginBottom: 2 }} />
          <FormSelectInput
            name="category_id"
            fullWidth
            required
            options={categoriesOptions}
          />
        </FormProvider>
      </Box>
      <Box
        sx={{
          mt: { xs: 0, md: 2 },
          mb: { xs: 2, md: 0 },
          alignSelf: "end",
          display: "flex",
          justifyContent: "end",
        }}
      >
        {onCancel && (
          <Button
            sx={{
              marginInlineEnd: 1,
              color: ({ palette }: Theme) => palette.grey[500],
              textTransform: "capitalize",
            }}
            variant="text"
            color="inherit"
            onClick={onCancel}
            disableRipple
            size={isMobile ? "large" : "medium"}
          >
            Cancel
          </Button>
        )}
        <Button
          type="submit"
          variant="contained"
          color="primary"
          disableRipple
          disabled={isSubmitting}
          size={isMobile ? "large" : "medium"}
          sx={{ textTransform: "capitalize" }}
        >
          {isSubmitting ? <CircularProgress /> : btnLabel}
        </Button>
      </Box>
    </form>
  );
};

export default ExpenseForm;
