import React from "react";
import TextField from "@mui/material/TextField";

const SearchBar = ({ searchValue, handleSearchChange }) => {
  return (
    <TextField
      id="company-search"
      label="Search Company Name"
      variant="outlined"
      value={searchValue}
      onChange={handleSearchChange}
      size="small"
      sx={{
        width: "20%",
        marginTop: "8px",
      }}
    />
  );
};

export default SearchBar;
