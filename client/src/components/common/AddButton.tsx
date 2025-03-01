import { Add } from "@mui/icons-material";
import { Button } from "@mui/material";
import useIsMobile from "../../hooks/useIsMobile";
import IconButton from "./IconButton";

interface Props {
  onClick: () => void;
}

function AddButton({ onClick }: Props) {
  const isMobile = useIsMobile()
  return (isMobile ?
    <IconButton onClick={onClick} size="small">
      <Add color='primary' sx={{width: 32, height: 32}}/>
    </IconButton>
    :
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
