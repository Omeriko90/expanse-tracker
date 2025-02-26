import { Add } from "@mui/icons-material";
import { Button } from "@mui/material";

interface Props {
  onClick: () => void;
}

function AddButton({ onClick }: Props) {
  return (
    <Button
      variant="contained"
      size="medium"
      onClick={onClick}
      startIcon={<Add />}
    >
      Add
    </Button>
  );
}

export default AddButton;
