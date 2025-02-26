import { Box, Tooltip, Typography } from "@mui/material";

interface Props {
  title: string;
  issueNumber: number;
}

function Title(props: Props) {
  const { title, issueNumber } = props;
  return (
    <Tooltip title={<Typography variant="subtitle2">{title}</Typography>}>
      <Box sx={{ display: "flex", alignItems: "baseline" }}>
        <Typography
          gutterBottom
          variant="h6"
          sx={{
            marginInlineEnd: 1,
            marginBottom: 0,
          }}
        >
          {`#${issueNumber}`}
        </Typography>
        <Typography
          gutterBottom
          variant="h6"
          sx={{
            overflow: "hidden",
            display: { xs: "none", md: "-webkit-box" },
            WebkitBoxOrient: "vertical",
            WebkitLineClamp: 1,
            textOverflow: "ellipsis",
            marginBottom: 0,
            maxWidth: { xs: 150, md: "initial" },
          }}
        >
          {title}
        </Typography>
      </Box>
    </Tooltip>
  );
}

export default Title;
