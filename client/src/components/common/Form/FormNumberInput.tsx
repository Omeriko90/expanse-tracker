import {
  Box,
  InputAdornment,
  SxProps,
  TextField,
  Theme,
  Typography,
} from "@mui/material";
import {
  Control,
  Controller,
  FieldValues,
  UseControllerProps,
} from "react-hook-form";

interface FormTextInputProps<T extends FieldValues>
  extends UseControllerProps<T> {
  control: Control<T>;
  placeholder?: string;
  required?: boolean;
  fullWidth?: boolean;
  sx?: SxProps<Theme>;
  onBlur?: () => void;
}

function FormAmountInput<T extends FieldValues>(props: FormTextInputProps<T>) {
  const {
    control,
    name,
    placeholder,
    required,
    fullWidth,
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
            label="Amount"
            {...field}
            onBlur={onBlur}
            slotProps={{
              input: {
                startAdornment: (
                  <InputAdornment position="start">$</InputAdornment>
                ),
              },
            }}
            fullWidth={fullWidth}
            placeholder={placeholder}
            required={required}
            type="number"
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

export default FormAmountInput;
