import {
  Control,
  Controller,
  FieldValues,
  UseControllerProps,
  useFormContext,
} from "react-hook-form";
import { Box, SxProps, Theme, Typography } from "@mui/material";
import { DateTimePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
interface FormDateInputProps<T extends FieldValues>
  extends UseControllerProps<T> {
  label?: string;
  placeholder?: string;
  required?: boolean;
  fullWidth?: boolean;
  sx?: SxProps<Theme>;
}

function FormDateInput<T extends FieldValues>(props: FormDateInputProps<T>) {
  const { name, label, required, sx = {} } = props;
  const { control } = useFormContext();
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Controller
        name={name}
        rules={{ required: required }}
        control={control}
        render={({ field, fieldState, ...props }) => (
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "baseline",
              ...sx,
            }}
          >
            <Typography variant="body1">{label}</Typography>
            <DateTimePicker
              {...field}
              value={dayjs(field.value)}
              {...props}
              slotProps={{ field: { sx: { width: "100%" } } }}
              label="Date"
              views={["year", "month", "day", "hours", "minutes"]}
              format="DD/MM/YYYY hh:mm:ss"
              viewRenderers={{
                seconds: null,
              }}
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
    </LocalizationProvider>
  );
}

export default FormDateInput;
