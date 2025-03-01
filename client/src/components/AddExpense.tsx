import ExpenseForm from "components/common/ExpenseForm";
import { Expense, SnackbarType } from "src/types";
import useAddExpense from "hooks/useAddExpense";
import Dialog from "components/common/Dialog";
import { useDispatch } from "react-redux";
import { setSnackbarMsg, setSnackbarType } from "src/reducers/global";

interface Props {
  onClose: () => void;
}

const AddExpense = ({ onClose }: Props) => {
  const dispatch = useDispatch();
  const { mutate: AddExpense, isLoading } = useAddExpense({
    onSuccess: () => {
      dispatch(setSnackbarType(SnackbarType.SUCESS));
      dispatch(setSnackbarMsg("Expense created successfully."));
      onClose();
    },
    onError: (msg: string) => {
      dispatch(setSnackbarType(SnackbarType.DANGER));
      dispatch(setSnackbarMsg(msg));
    },
  });

  const handleAddExpenseSubmit = (newExpense: Expense) => {
    if (!newExpense.category_id) {
      dispatch(setSnackbarMsg("Category is required"));
      dispatch(setSnackbarType(SnackbarType.DANGER));
    } else {
      AddExpense(newExpense);
    }
  };

  return (
    <Dialog onClose={onClose} title="Add New Expense">
      <ExpenseForm
        onSubmit={handleAddExpenseSubmit}
        isSubmitting={isLoading}
        onCancel={onClose}
        btnLabel="Add"
      />
    </Dialog>
  );
};

export default AddExpense;
