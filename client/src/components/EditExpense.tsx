import { CircularProgress, Skeleton, Typography } from "@mui/material";
import ExpenseForm from "components/common/ExpenseForm";
import { Expense, SnackbarType } from "src/types";
import useUpdateExpense from "hooks/useUpdateExpense";
import useGetExpense from "hooks/useGetExpense";
import Dialog from "components/common/Dialog";
import { useDispatch } from "react-redux";
import { setSnackbarMsg, setSnackbarType } from "src/reducers/global";

interface Props {
  onClose: () => void;
  id: string;
}

const EditExpense = ({ onClose, id }: Props) => {
  const dispatch = useDispatch();
  const intId = parseInt(id);
  const { data: expense, isLoading } = useGetExpense(intId);
  const { mutate: updateExpense, isLoading: isUpdating } = useUpdateExpense({
    id: intId,
    onSuccess: () => {
      dispatch(setSnackbarType(SnackbarType.SUCESS));
      dispatch(setSnackbarMsg("Expense updated successfully."));
      onClose();
    },
    onError: (msg: string) => {
      dispatch(setSnackbarType(SnackbarType.DANGER));
      dispatch(setSnackbarMsg(msg));
    },
  });

  const handleAddExpenseSubmit = (updatedExpense: Expense) => {
    updateExpense(updatedExpense);
  };

  if (isLoading) {
    return <Skeleton />;
  }

  return (
    <Dialog onClose={onClose} title="Edit Expense">
      {isLoading ? (
        <CircularProgress />
      ) : expense ? (
        <ExpenseForm
          expense={expense}
          isSubmitting={isUpdating}
          onCancel={onClose}
          onSubmit={handleAddExpenseSubmit}
          btnLabel="Update"
        />
      ) : (
        <Typography variant="h2">Failed to fetch Expense</Typography>
      )}
    </Dialog>
  );
};

export default EditExpense;
