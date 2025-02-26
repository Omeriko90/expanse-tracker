import { Delete, Edit } from "@mui/icons-material";
import { Box, IconButton } from "@mui/material";

interface Props {
  onUpdateClick: () => void;
  onDeleteClick: () => void;
}

function ActionButtons({ onUpdateClick, onDeleteClick }: Props) {
  return (
    <Box>
      <IconButton color="primary" size="small" onClick={onUpdateClick}>
        <Edit sx={{ width: 16, height: 16 }} />
      </IconButton>
      <IconButton color="error" size="small" onClick={onDeleteClick}>
        <Delete sx={{ width: 16, height: 16 }} />
      </IconButton>
    </Box>
  );
}

export default ActionButtons;
