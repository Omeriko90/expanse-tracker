import { Avatar, Box, Typography } from "@mui/material";

interface Props {
  name: string;
  avatarUrl: string;
}

function User(props: Props) {
  const { name, avatarUrl } = props;
  return (
    <Box
      sx={{
        overflow: "auto",
        display: "flex",
        alignItems: "center",
      }}
    >
      <Avatar
        alt={name}
        src={avatarUrl}
        sx={{
          marginInlineEnd: 1,
          width: 32,
          height: 32,
        }}
      />
      <Typography variant="subtitle1" textAlign={"start"}>
        Reporter: {name}
      </Typography>
    </Box>
  );
}

export default User;
