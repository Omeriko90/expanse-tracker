import { Chip } from "@mui/material";

interface Props {
  label: string;
  color: "success" | "error";
}

function StatusChip(props: Props) {
  const { label, color } = props;

  return <Chip variant="outlined" color={color} label={label} />;
}

export default StatusChip;
