import { Clear, Search } from "@mui/icons-material";
import { OutlinedInput, SxProps } from "@mui/material";
import { debounce } from "lodash";
import { useCallback, useState } from "react";
import IconButton from "./IconButton";
interface Props {
  onChange: (value: string) => void;
  fullWidth?: boolean;
  placeholder?: string;
  withDebounce?: boolean;
  style?: SxProps;
}

function SearchInput(props: Props) {
  const { onChange, fullWidth, placeholder, withDebounce, style } = props;
  const [value, setValue] = useState("");

  const debouncedSearch = useCallback(
    debounce((searchTerm: string) => {
      onChange(searchTerm);
    }, 500),
    []
  );

  const handleSearch = (value: string) => {
    setValue(value);
    if (withDebounce) {
      debouncedSearch(value);
    } else {
      onChange(value);
    }
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
