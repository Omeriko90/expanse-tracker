import { Box, ListItem, Theme, Typography } from "@mui/material";
import useGetExpense from "../../hooks/useGetExpense";
import { useHistory } from "react-router-dom";
import useDeleteExpense from "../../hooks/useDeleteExpense";
import ActionButtons from "./ActionButtons";
import CreatedAt from "./CreatedAt";
interface Props {
  id: number;
}

const ExpenseCard = ({ id }: Props) => {
  const history = useHistory();
  const { data: expense } = useGetExpense(id);
  const { mutate: deleteExpense } = useDeleteExpense();

  const handleUpdateButtonClick = () => history.push(`/edit/${id}`);
  const handleDeleteButtonClick = () => deleteExpense(id);
  if (!expense) {
    return null;
  }

  return (
    <ListItem
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
          mb: 1,
        }}
      >
        <CreatedAt createdAt={expense.createdAt.toString()} />
        <ActionButtons
          onDeleteClick={handleDeleteButtonClick}
          onUpdateClick={handleUpdateButtonClick}
        />
      </Box>
      <Box sx={{ display: "flex", justifyContent: "space-between" }}>
        <Typography variant="body1">{expense.description}</Typography>
        <Typography variant="body1">{expense.category}</Typography>
        <Typography variant="body1">-{expense.amount}$</Typography>
      </Box>
      <Box sx={{ display: "flex", justifyContent: "end" }}></Box>
    </ListItem>
  );
};

export default ExpenseCard;
