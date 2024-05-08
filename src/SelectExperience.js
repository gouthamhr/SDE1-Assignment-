import React from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

const SelectExperience = ({ minExperience, handleMinExperienceChange }) => {
  return (
    <FormControl sx={{ m: 1, minWidth: 150 }} size="small">
      <InputLabel id="min-exp-label">Experience</InputLabel>
      <Select
        labelId="min-exp-label"
        id="min-exp-select"
        value={minExperience}
        label="Minimum Experience"
        onChange={handleMinExperienceChange}
      >
        <MenuItem value="">
          <em></em>
        </MenuItem>
        {[...Array(11).keys()].map((years) => (
          <MenuItem key={years} value={years}>
            {years === 0
              ? "No experience"
              : `${years} year${years > 1 ? "s" : ""}`}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default SelectExperience;
