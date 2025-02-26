import { Box, Skeleton } from "@mui/material";

const LoadingItem = () => (
  <Skeleton variant="rectangular" height={100} width={"100%"} />
);

function LoadingState() {
  return (
    <Box
      sx={{
        flexDirection: { xs: "column", md: "row" },
        justifyContent: { xs: "initial", md: "center" },
        "& > :not(:last-child)": {
          marginBottom: 1,
        },
      }}
    >
      <LoadingItem />
      <LoadingItem />
      <LoadingItem />
      <LoadingItem />
      <LoadingItem />
      <LoadingItem />
      <LoadingItem />
      <LoadingItem />
    </Box>
  );
}

export default LoadingState;
