import { useState } from "react";
import {
  AppBar,
  Box,
  Collapse,
  Theme,
  Toolbar,
  Typography,
} from "@mui/material";
import { useDispatch } from "react-redux";
import { setSearch } from "../reducers/global";
import SearchInput from "./common/SearchInput";
import { debounce } from "lodash";
import { Search } from "@mui/icons-material";
import IconButton from "./common/IconButton";

function AppHeader() {
  const [isCollapseOpen, setIsCollapseOpen] = useState(false);
  const dispatch = useDispatch();

  const handleSearch = debounce(
    (value: string) => dispatch(setSearch(value)),
    500
  );

  const handleMobileSearchClick = () => {
    setIsCollapseOpen((prevState) => !prevState);
  };

  return (
    <>
      <AppBar
        position="sticky"
        sx={{
          background: "rgba(255,255,255,0.6)",
          backdropFilter: "blur(8px)",
          borderBottom: ({ palette }: Theme) => `1px solid ${palette.divider}`,
          boxShadow: "none",
          color: "#000",
        }}
      >
        <Toolbar
          sx={{
            justifyContent: { xs: "space-between", md: "initial" },
            paddingLeft: { md: 5 },
            paddingRight: { md: 5 },
          }}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              flex: 1,
              paddingBlock: { xs: 2, md: 0 },
            }}
          >
            <Typography
              variant="h4"
              noWrap
              sx={{ display: "block", color: "#927AF4FF" }}
            >
              Expense Tracker
            </Typography>
          </Box>
          <Box
            sx={{
              display: { xs: "none", md: "flex" },
              alignItems: "center",
              width: 300,
            }}
          >
            <SearchInput
              fullWidth
              onChange={handleSearch}
              withDebounce
              style={{ background: "#F3F4F6FF" }}
            />
          </Box>
          <Box sx={{ display: { xs: "block", md: "none" } }}>
            <IconButton onClick={() => handleMobileSearchClick()}>
              <Search />
            </IconButton>
          </Box>
        </Toolbar>
        {isCollapseOpen && (
          <Collapse
            in
            timeout="auto"
            unmountOnExit
            sx={{ paddingInline: 2, paddingBottom: 2 }}
          >
            <SearchInput
              fullWidth
              onChange={handleSearch}
              withDebounce
              style={{ background: "#F3F4F6FF" }}
            />
          </Collapse>
        )}
      </AppBar>
    </>
  );
}

export default AppHeader;
