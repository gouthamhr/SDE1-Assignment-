import React from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

const SelectJobRole = ({ selectedJobRole, handleJobRoleChange, jobRoles }) => {
  return (
    <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
      <InputLabel id="job-role-label">Role</InputLabel>
      <Select
        labelId="job-role-label"
        id="job-role-select"
        value={selectedJobRole}
        label="Job Role"
        onChange={handleJobRoleChange}
      >
        <MenuItem value="">
          <em>All</em>
        </MenuItem>
        {jobRoles.map((role, index) => (
          <MenuItem key={index} value={role}>
            {role}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default SelectJobRole;
