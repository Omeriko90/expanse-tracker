import { Box, SxProps, Typography } from "@mui/material";
import OopsImg from "../assets/oops.png";

interface Props {
  title: string;
  subtitle: string;
  style: SxProps;
  imageWidth?: number;
  imageHeight?: number;
}

function ErrorState(props: Props) {
  const { title, subtitle, style, imageWidth, imageHeight } = props;
  return (
    <Box sx={style}>
      <img src={OopsImg} width={imageWidth} height={imageHeight} />
      <Typography variant="h4">{title}</Typography>
      <Typography variant="h4">{subtitle}</Typography>
    </Box>
  );
}

export default ErrorState;
