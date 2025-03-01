import { Box, ListItem, Theme, Tooltip, Typography } from "@mui/material";
import useGetExpense from "../../hooks/useGetExpense";
import useDeleteExpense from "../../hooks/useDeleteExpense";
import ActionButtons from "./ActionButtons";
import CreatedAt from "./CreatedAt";
import { useDispatch } from "react-redux";
import {
  setEditExpenseId,
  setSnackbarMsg,
  setSnackbarType,
} from "src/reducers/global";
import { SnackbarType } from "src/types";
import Category from "./Category";
import { parseAmount } from "src/helpers";
interface Props {
  id: number;
}

const ExpenseCard = ({ id }: Props) => {
  const dispatch = useDispatch();
  const { data: expense } = useGetExpense(id);
  const { mutate: deleteExpense } = useDeleteExpense({
    onSuccess: () => {
      dispatch(setSnackbarType(SnackbarType.SUCESS));
      dispatch(setSnackbarMsg("Expense deleted successfully."));
    },
    onError: (msg: string) => {
      dispatch(setSnackbarType(SnackbarType.DANGER));
      dispatch(setSnackbarMsg(msg));
    },
  });

  const handleUpdateButtonClick = () => dispatch(setEditExpenseId(id));
  const handleDeleteButtonClick = () => deleteExpense(id);
  if (!expense) {
    return null;
  }

  return (
    <ListItem
      disablePadding
      sx={{
        display: "block",
        borderRadius: 2,
        border: ({ palette }: Theme) => `1px solid ${palette.divider}`,
        "&:focus-visible": {
          outline: "none",
        },
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          padding: ({ spacing }: Theme) => `${spacing(1)} ${spacing(2)} 0`,
          mb: 1,
          borderBottom: ({ palette }: Theme) => `1px solid ${palette.divider}`,
        }}
      >
        <CreatedAt createdAt={expense.created_at.toString()} />
        <ActionButtons
          onDeleteClick={handleDeleteButtonClick}
          onUpdateClick={handleUpdateButtonClick}
        />
      </Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          justifyContent: "space-between",
          padding: ({ spacing }: Theme) => `${spacing(1)} ${spacing(2)}`,
        }}
      >
        <Tooltip title={expense.description}>
          <Typography
            sx={{
              width: { xs: "auto", md: 400 },
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
            }}
            variant="body1"
          >
            {expense.description}
          </Typography>
        </Tooltip>
        <Category id={expense.category_id} />
        <Tooltip title={`-${parseAmount(parseFloat(expense.amount))}$`}>
          <Typography
            sx={{
              width: 100,
              textAlign: "end",
              overflow: "hidden",
              textOverflow: "ellipsis",
            }}
            variant="body1"
          >
            {`-${parseAmount(parseFloat(expense.amount))}$`}
          </Typography>
        </Tooltip>
      </Box>
    </ListItem>
  );
};

export default ExpenseCard;
