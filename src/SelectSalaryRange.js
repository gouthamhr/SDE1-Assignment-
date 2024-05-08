import React from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

const SelectSalaryRange = ({
  selectedSalaryRange,
  handleSalaryRangeChange,
  salaryRanges,
}) => {
  return (
    <FormControl sx={{ m: 1, minWidth: 250 }} size="small">
      <InputLabel id="salary-range-label">Minimum base pay salary</InputLabel>
      <Select
        labelId="salary-range-label"
        id="salary-range-select"
        value={selectedSalaryRange}
        label="Salary Range"
        onChange={handleSalaryRangeChange}
      >
        <MenuItem value="">
          <em>All</em>
        </MenuItem>
        {salaryRanges.map((range, index) => (
          <MenuItem key={index} value={range}>
            {range}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default SelectSalaryRange;
