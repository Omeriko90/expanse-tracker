import { Clear, Search } from "@mui/icons-material";
import { OutlinedInput, SxProps } from "@mui/material";
import { useState } from "react";
import IconButton from "./IconButton";
interface Props {
  onChange: (value: string) => void;
  fullWidth?: boolean;
  placeholder?: string;
  style?: SxProps;
}

function SearchInput(props: Props) {
  const { onChange, fullWidth, placeholder, style } = props;
  const [value, setValue] = useState("");

  const handleSearch = (value: string) => {
    setValue(value);
    onChange(value);
  };

  const handleClear = () => {
    setValue("");
    onChange("");
  };

  return (
    <OutlinedInput
      endAdornment={
        value?.length > 0 ? (
          <IconButton onClick={handleClear}>
            <Clear fontSize="small" />
          </IconButton>
        ) : (
          <Search fontSize="small" />
        )
      }
      value={value}
      onChange={(e) => handleSearch(e.target.value)}
      fullWidth={fullWidth}
      placeholder={placeholder || "Search..."}
      sx={{
        height: 40,
        borderRadius: 2,
        backgroundColor: "white",
        ...style,
      }}
    />
  );
}

export default SearchInput;
