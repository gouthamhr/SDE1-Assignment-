import React from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

const SelectLocation = ({
  selectedLocation,
  handleLocationChange,
  locations,
}) => {
  return (
    <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
      <InputLabel id="location-label">Remote</InputLabel>
      <Select
        labelId="location-label"
        id="location-select"
        value={selectedLocation}
        label="Location"
        onChange={handleLocationChange}
      >
        <MenuItem value="">
          <em>All</em>
        </MenuItem>
        {locations.map((location, index) => (
          <MenuItem key={index} value={location}>
            {location}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default SelectLocation;
