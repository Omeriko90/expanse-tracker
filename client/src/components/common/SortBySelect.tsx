import { MenuItem, Select, Typography } from "@mui/material";
import { SORT_BY_OPTIONS } from "../../constants";
import { useDispatch, useSelector } from "react-redux";
import { SortDirection, State } from "../../types";
import { ArrowDownward, ArrowUpward } from "@mui/icons-material";
import {
  setNoMoreData,
  setSortBy,
  setSortDirection,
} from "../../reducers/global";

function SortBySelect() {
  const dispatch = useDispatch();
  const { sortBy, sortDirection, noMoreData } = useSelector(
    (state: State) => state.global
  );
  const isAscDirection = sortDirection === SortDirection.ASC;

  const handleChange = (value: string) => {
    let newDirection = SortDirection.DESC;

    if (sortBy === value) {
      newDirection = isAscDirection ? SortDirection.DESC : SortDirection.ASC;
    } else {
      dispatch(setSortBy(value));
    }
    dispatch(setSortDirection(newDirection));
    if (noMoreData) {
      dispatch(setNoMoreData(false));
    }
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
    <Select
      value={sortBy}
      fullWidth
      renderValue={(selected: string) => {
        const selectedOption = SORT_BY_OPTIONS.find((op) => op.id === selected);
        return (
          <Typography sx={{ textAlign: "start" }}>
            {selectedOption?.label || SORT_BY_OPTIONS[0].label}
          </Typography>
        );
      }}
    >
      {SORT_BY_OPTIONS.map((option) => {
        const isSelected = sortBy === option.id;
        return (
          <MenuItem
            selected={isSelected}
            sx={{ justifyContent: "space-between" }}
            onClick={() => handleChange(option.id)}
          >
            <Typography>{option.label}</Typography>
            {isSelected && DirectionComponent}
          </MenuItem>
        );
      })}
    </Select>
  );
}

export default SortBySelect;
