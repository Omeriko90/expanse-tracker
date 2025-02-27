import {
  Autocomplete,
  Box,
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
import { Option } from "../../../types";

interface FormTextInputProps<T extends FieldValues>
  extends UseControllerProps<T> {
  control: Control<T>;
  label?: string;
  options: Option[];
  fullWidth?: boolean;
  type?: string;
  sx?: SxProps<Theme>;
}

function FormSelectInput<T extends FieldValues>(props: FormTextInputProps<T>) {
  const { control, name, label, fullWidth, options, sx = {} } = props;

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
              disableClearable
              disableCloseOnSelect
              freeSolo={false}
              value={selectedOption}
              multiple={false}
              renderOption={(props, option) => {
                const { key, ...optionProps } = props;
                return (
                  <Box
                    key={key}
                    component="li"
                    {...optionProps}
                    onClick={() => field.onChange(option.id)}
                  >
                    <Typography>{option.label}</Typography>
                  </Box>
                );
              }}
              renderInput={(params) => (
                <TextField {...params} fullWidth label={label} />
              )}
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
        );
      }}
    />
  );
}

export default FormSelectInput;
