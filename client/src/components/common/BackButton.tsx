import { ArrowBack } from "@mui/icons-material";
import IconButton from "./IconButton";
import { useHistory } from "react-router-dom";

function BackButton() {
  const history = useHistory();
  const handleBackClick = () => history.goBack();

  return (
    <IconButton onClick={handleBackClick}>
      <ArrowBack />
    </IconButton>
  );
}

export default BackButton;
