import { Box, SxProps, TextField, Theme, Typography } from "@mui/material";
import {
  Control,
  Controller,
  FieldValues,
  UseControllerProps,
} from "react-hook-form";

interface FormTextInputProps<T extends FieldValues>
  extends UseControllerProps<T> {
  control: Control<T>;
  label?: string;
  placeholder?: string;
  required?: boolean;
  fullWidth?: boolean;
  type?: string;
  sx?: SxProps<Theme>;
  onBlur?: () => void;
}

function FormTextInput<T extends FieldValues>(props: FormTextInputProps<T>) {
  const {
    control,
    name,
    label,
    placeholder,
    required,
    fullWidth,
    type,
    sx = {},
    onBlur,
  } = props;
  return (
    <Controller
      control={control}
      name={name}
      render={({ field, fieldState, ...props }) => (
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "baseline",
            ...sx,
          }}
        >
          <TextField
            label={label}
            {...field}
            onBlur={onBlur}
            fullWidth={fullWidth}
            placeholder={placeholder}
            required={required}
            type={type || "text"}
            {...props}
          />
          {fieldState.error && (
            <Typography
              variant="caption"
              color="error"
              sx={{ paddingInlineStart: 1, paddingTop: 0.5 }}
            >
              {fieldState.error.message}
            </Typography>
          )}
        </Box>
      )}
    />
  );
}

export default FormTextInput;
