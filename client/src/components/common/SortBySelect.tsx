import { Autocomplete, Box, TextField, Typography } from "@mui/material";
import { SORT_BY_OPTIONS } from "../../constants";
import { useDispatch, useSelector } from "react-redux";
import { SortDirection, State } from "../../types";
import { ArrowDownward, ArrowUpward } from "@mui/icons-material";
import { setSortBy, setSortDirection } from "../../reducers/global";

function SortBySelect() {
  const dispatch = useDispatch();
  const { sortBy, sortDirection } = useSelector((state: State) => state.global);
  const isAscDirection = sortDirection === SortDirection.ASC;

  const handleChange = (value: string) => {
    let newDirection = SortDirection.DESC;
    if (sortBy === value) {
      newDirection = isAscDirection ? SortDirection.DESC : SortDirection.ASC;
    } else {
      dispatch(setSortBy(value));
    }
    dispatch(setSortDirection(newDirection));
  };

  const DirectionComponent = isAscDirection ? (
    <ArrowUpward
      color="disabled"
      sx={{
        width: 16,
        height: 16,
      }}
    />
  ) : (
    <ArrowDownward
      color="disabled"
      sx={{
        width: 16,
        height: 16,
      }}
    />
  );

  return (
    <Autocomplete
      options={SORT_BY_OPTIONS}
      defaultValue={SORT_BY_OPTIONS[0]}
      multiple={false}
      freeSolo={false}
      disableClearable
      disableCloseOnSelect
      fullWidth
      renderOption={(props, option) => {
        const { key, ...optionProps } = props;
        const isSelected = sortBy === option.id;
        return (
          <Box
            key={key}
            component="li"
            {...optionProps}
            onClick={() => handleChange(option.id)}
            sx={{
              display: "flex",
              justifyContent: "space-between !important",
            }}
          >
            <Typography>{option.label}</Typography>
            {isSelected && DirectionComponent}
          </Box>
        );
      }}
      renderInput={(params) => (
        <TextField {...params} fullWidth label="Sort by" />
      )}
    />
  );
}

export default SortBySelect;
