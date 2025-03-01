import { Close } from "@mui/icons-material";
import IconButton from "./IconButton";

interface Props {
  onClick: () => void
}

function CloseButton({onClick}: Props) {

  return (
    <IconButton sx={{width: 24,height: 24}} onClick={onClick}>
      <Close sx={{width: 20,height: 20}}/>
    </IconButton>
  );
}

export default CloseButton;
