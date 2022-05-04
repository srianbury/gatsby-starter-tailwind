import * as React from "react";
import { useState } from "react";
import { Box, TextField, IconButton } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { navigate } from "gatsby";
import { navigation, QUERY_PARAMS } from "../../../constants";

const SearchBar = () => {
  const [searchBarText, setSearcBarText] = useState("");

  function handleChange(e) {
    setSearcBarText(e.target.value);
  }

  function handleKeyDown(e) {
    if (e.key === "Enter") {
      doSearch(e.target.value);
    }
  }

  function handleClick() {
    doSearch(searchBarText);
  }

  function doSearch(search) {
    if (search.trim() === "") {
      return;
    }
    navigate(`/${navigation.SEARCH}?${QUERY_PARAMS.QUERY}=${search}`);
  }

  return (
    <Box sx={{ display: "flex", alignItems: "flex-end" }}>
      <TextField
        sx={{ ml: 1, flex: 1 }}
        placeholder="Search"
        inputProps={{ "aria-label": "search" }}
        size="small"
        value={searchBarText}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
      />
      <IconButton
        type="submit"
        sx={{ p: "10px" }}
        aria-label="search"
        onClick={handleClick}
      >
        <SearchIcon />
      </IconButton>
    </Box>
  );
};

export { SearchBar };
