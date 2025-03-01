import {
  Autocomplete,
  Box,
  SxProps,
  TextField,
  Theme,
  Typography,
} from "@mui/material";
import {
  Controller,
  FieldValues,
  UseControllerProps,
  useFormContext,
} from "react-hook-form";
import { Option } from "../../../types";

interface FormTextInputProps<T extends FieldValues>
  extends UseControllerProps<T> {
  label?: string;
  options: Option[];
  fullWidth?: boolean;
  required?: boolean;
  type?: string;
  sx?: SxProps<Theme>;
}

function FormSelectInput<T extends FieldValues>(props: FormTextInputProps<T>) {
  const { name, label, fullWidth, options, sx = {} } = props;
  const { control } = useFormContext();

  return (
    <Controller
      control={control}
      name={name}
      render={({ field, fieldState, ...props }) => {
        const selectedOption = {
          label: options.find((op) => op.id === field.value)?.label || "",
          id: field.value,
        };
        return (
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "baseline",
              ...sx,
            }}
          >
            <Autocomplete
              options={options}
              {...field}
              fullWidth={fullWidth}
              freeSolo={false}
              value={selectedOption}
              multiple={false}
              onChange={(_e, value) => field.onChange(value?.id)}
              {...props}
              isOptionEqualToValue={(option) => option.id === field.value}
              getOptionLabel={(option) => option.label}
              renderInput={(params) => (
                <TextField {...params} fullWidth label={label} />
              )}
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
        );
      }}
    />
  );
}

export default FormSelectInput;
