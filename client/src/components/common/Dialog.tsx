import {
  Box,
  DialogContent,
  DialogTitle,
  Dialog as MuiDialog,
  Theme,
  Typography,
} from "@mui/material";
import CloseButton from "./CloseButton";
import useIsMobile from "src/hooks/useIsMobile";

interface Props {
  title: string;
  onClose: () => void;
  children: JSX.Element;
}

function Dialog({ onClose, title, children }: Props) {
  const isMobile = useIsMobile();
  return (
    <MuiDialog
      maxWidth="md"
      fullScreen={isMobile}
      fullWidth
      open
      onClose={onClose}
    >
      <Box
        sx={{
          display: "flex",
          padding: ({ spacing }: Theme) => `${spacing(2)} ${spacing(3)}`,
        }}
      >
        <CloseButton onClick={onClose} />
        <Box
          sx={{
            display: "flex",
            width: "100%",
            justifyContent: "center",
          }}
        >
          <Typography variant="h4">{title}</Typography>
        </Box>
      </Box>
      <DialogContent>{children}</DialogContent>
    </MuiDialog>
  );
}

export default Dialog;
