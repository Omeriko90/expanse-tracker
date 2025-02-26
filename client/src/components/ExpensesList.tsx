import { List } from "@mui/material";
import ExpenseCard from "./ExpenseCard/ExpenseCard";
import AutoFetcher from "./common/AutoFetcher";
import { useSelector } from "react-redux";
import { Expense, State } from "../types";
import ErrorState from "./ErrorState";
interface Props {
  expenses?: Expense[];
  isLoading: boolean;
}

function ExpensesList(props: Props) {
  const { expenses, isLoading } = props;
  const { q: searchValue, noMoreData } = useSelector(
    (state: State) => state.global
  );

  // const displayAutoFetcher = !noMoreData && !isLoading && !searchValue;

  if (!expenses) {
    return (
      <ErrorState
        style={{
          display: "flex",
          flexDirection: "column",
          flex: 1,
          mt: 4,
          justifyContent: "start",
          alignItems: "center",
        }}
        imageWidth={350}
        title="Oops, there was a problem with fetching the issues."
        subtitle="Please try again later"
      />
    );
  }

  const displayExpenses = searchValue
    ? expenses?.filter((issue) =>
        issue.description?.toLowerCase().includes(searchValue.toLowerCase())
      )
    : expenses;

  return (
    <>
      <List
        sx={{
          justifyContent: "center",
          flexDirection: { xs: "column", md: "row" },
          alignItems: { xs: "center", md: "initial" },
          "& > :not(:last-child)": {
            marginBottom: 2,
          },
        }}
      >
        {displayExpenses?.map((expenses) => (
          <ExpenseCard key={`expense-${expenses.id}`} id={expenses.id} />
        ))}
      </List>
      {/* {displayAutoFetcher && (
        <Box sx={{ margin: "16px auto", width: "50%" }}>
          <AutoFetcher />
        </Box>
      )} */}
    </>
  );
}

export default ExpensesList;
