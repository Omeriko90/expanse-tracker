import { Box, List, Typography } from "@mui/material";
import ExpenseCard from "components/ExpenseCard/ExpenseCard";
import AutoFetcher from "components/common/AutoFetcher";
import { useSelector } from "react-redux";
import { Expense, State } from "src/types";
import ErrorState from "components/ErrorState";
import LoadingState from "components/LoadingState";
import NoDataImg from "assets/no_data.png";
import useIsMobile from "src/hooks/useIsMobile";

interface Props {
  expenses?: Expense[];
  isLoading: boolean;
}

function ExpensesList(props: Props) {
  const { expenses, isLoading } = props;
  const isMobile = useIsMobile();
  const { q: searchValue, noMoreData } = useSelector(
    (state: State) => state.global
  );
  const displayAutoFetcher = !noMoreData && !isLoading && !searchValue;

  if (isLoading) {
    return <LoadingState />;
  }

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

  if (!displayExpenses.length) {
    return (
      <Box
        sx={{
          marginBlock: 2,
        }}
      >
        <img
          src={NoDataImg}
          width={isMobile ? 250 : 350}
          height={isMobile ? 250 : 350}
        />
        <Typography variant="h5">No Data was found.</Typography>
      </Box>
    );
  }

  return (
    <>
      <List
        sx={{
          justifyContent: "center",
          flexDirection: { xs: "column", md: "row" },
          alignItems: { xs: "center", md: "initial" },
          maxHeight: { xs: "calc(100vh - 350px)", md: 450 },
          flex: 1,
          overflowY: "auto",
          "& > :not(:last-child)": {
            marginBottom: 2,
          },
        }}
      >
        {displayExpenses?.map((expenses) => (
          <ExpenseCard key={`expense-${expenses.id}`} id={expenses.id} />
        ))}
        {displayAutoFetcher && (
          <Box sx={{ margin: "16px auto", width: "50%" }}>
            <AutoFetcher />
          </Box>
        )}
      </List>
    </>
  );
}

export default ExpensesList;
