import { Box, Typography } from "@mui/material";
import moment from "moment";
import { Event } from "@mui/icons-material";

interface Props {
  createdAt: string;
}

function CreatedAt({ createdAt }: Props) {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "start",
        alignItems: "center",
        "& > :first-child": {
          marginInlineEnd: 1,
        },
      }}
    >
      <Event sx={{ width: 24, height: 24 }} />
      <Typography variant="body2" color="text.primary">
        {moment(createdAt).format("L LT")}
      </Typography>
    </Box>
  );
}

export default CreatedAt;
