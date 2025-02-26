import { IconButton as MuiIconButton, SxProps } from "@mui/material";
import { ReactNode } from "react";

interface Props {
  children: ReactNode;
  size?: "small" | "medium" | "large";
  color?:
    | "inherit"
    | "default"
    | "primary"
    | "secondary"
    | "error"
    | "info"
    | "success"
    | "warning";
  onClick: () => void;
  sx?: SxProps;
}

function IconButton(props: Props) {
  const { children, size, color, onClick, sx } = props;
  return (
    <MuiIconButton
      size={size}
      color={color}
      onClick={onClick}
      sx={{
        "&:focus": {
          outline: "none",
        },
        ...sx,
      }}
    >
      {children}
    </MuiIconButton>
  );
}

export default IconButton;
