import React, { useState, useEffect } from "react";
import axios from "axios";
import { Card, CardContent, Grid, Button } from "@mui/material";
import SelectExperience from "./SelectExperience";
import SelectJobRole from "./SelectJobRole";
import SelectLocation from "./SelectLocation";
import SelectSalaryRange from "./SelectSalaryRange";
import SearchBar from "./SearchBar";
import "./Dashboard.css";

const Dashboard = () => {
  const [jdList, setJdList] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showFullDescription, setShowFullDescription] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [minExperience, setMinExperience] = useState("");
  const [selectedJobRole, setSelectedJobRole] = useState(""); // State for selected job role
  const [jobRoles, setJobRoles] = useState([]); // State for job roles
  const [selectedLocation, setSelectedLocation] = useState(""); // State for selected location
  const [locations, setLocations] = useState([]); // State for locations
  const [selectedSalaryRange, setSelectedSalaryRange] = useState(""); // State for selected salary range
  const [salaryRanges, setSalaryRanges] = useState([]);
  const [companySearch, setCompanySearch] = useState("");

  const handleMinExperienceChange = (e) => {
    setMinExperience(e.target.value);
  };

  const handleJobRoleChange = (e) => {
    setSelectedJobRole(e.target.value);
  };

  const handleLocationChange = (e) => {
    setSelectedLocation(e.target.value);
  };
  const handleSalaryRangeChange = (e) => {
    setSelectedSalaryRange(e.target.value);
  };
  const handleCompanySearchChange = (e) => {
    setCompanySearch(e.target.value);
  };
  useEffect(() => {
    const fetchData = async () => {
      try {
        const body = {
          limit: 100,
          offset: 0,
        };

        const response = await axios.post(
          "https://api.weekday.technology/adhoc/getSampleJdJSON",
          body
        );
        setJdList(response.data.jdList);
        setLoading(false);

        // Extract unique job roles from the response
        const roles = Array.from(
          new Set(response.data.jdList.map((jd) => jd.jobRole))
        );
        setJobRoles(roles);
        // Extract unique locations from the response
        const locs = Array.from(
          new Set(response.data.jdList.map((jd) => jd.location))
        );
        setLocations(locs);
        const ranges = Array.from(
          new Set(
            response.data.jdList.map(
              (jd) => `${jd.minJdSalary} - ${jd.maxJdSalary}`
            )
          )
        );
        setSalaryRanges(ranges);
      } catch (error) {
        setError(error.message);
      }
    };

    fetchData();
  }, []);

  const toggleDescription = () => {
    setShowFullDescription(!showFullDescription);
  };
  return (
    <div>
      <div className="search-container">
        <SelectExperience
          minExperience={minExperience}
          handleMinExperienceChange={handleMinExperienceChange}
        />
        {/* Include the SelectJobRole component */}
        <SelectJobRole
          selectedJobRole={selectedJobRole}
          handleJobRoleChange={handleJobRoleChange}
          jobRoles={jobRoles}
        />
        <SelectLocation
          selectedLocation={selectedLocation}
          handleLocationChange={handleLocationChange}
          locations={locations}
        />
        <SelectSalaryRange
          selectedSalaryRange={selectedSalaryRange}
          handleSalaryRangeChange={handleSalaryRangeChange}
          salaryRanges={salaryRanges}
        />
        <SearchBar
          searchValue={companySearch}
          handleSearchChange={handleCompanySearchChange}
        />
      </div>
      <Grid container spacing={3}>
        {jdList
          .filter((jdItem) =>
            jdItem.jobRole.toLowerCase().includes(searchQuery.toLowerCase())
          )
          .filter((jdItem) => {
            if (minExperience !== "") {
              return jdItem.minExp === minExperience;
            }
            return true;
          })
          .filter((jdItem) => {
            if (selectedJobRole !== "") {
              return jdItem.jobRole === selectedJobRole;
            }
            return true;
          })
          .filter((jdItem) => {
            if (selectedLocation !== "") {
              return jdItem.location === selectedLocation;
            }
            return true;
          })
          .filter((jdItem) => {
            if (selectedSalaryRange !== "") {
              const [minSalary, maxSalary] = selectedSalaryRange.split(" - ");
              return (
                jdItem.minJdSalary >= minSalary &&
                jdItem.maxJdSalary <= maxSalary
              );
            }
            return true;
          })
          .filter((jdItem) => {
            if (companySearch !== "") {
              return jdItem.companyName
                .toLowerCase()
                .includes(companySearch.toLowerCase());
            }
            return true;
          })
          .map((jdItem, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Card className="card">
                <CardContent>
                  <div className="company-container">
                    <img src={jdItem.logoUrl} alt="" className="image" />
                    <div>
                      <p className="company-name">{jdItem.companyName}</p>
                      <p className="job-role">{jdItem.jobRole}</p>
                      <p className="location">{jdItem.location}</p>
                    </div>
                  </div>
                  <div className="salary">
                    Estimated Salary: &#x20B9;{jdItem.minJdSalary} -{" "}
                    {jdItem.maxJdSalary} {jdItem.salaryCurrencyCode} ✅
                  </div>
                  <div className="description">
                    <p>About Company:</p>
                    <span>
                      <b>About us</b>
                    </span>
                    <p>
                      {showFullDescription
                        ? jdItem.jobDetailsFromCompany
                        : `${jdItem.jobDetailsFromCompany.substring(
                            0,
                            100
                          )}...`}
                    </p>
                    {jdItem.jobDetailsFromCompany.length > 100 && (
                      <div style={{ textAlign: "center" }}>
                        <a href="#" onClick={toggleDescription}>
                          {showFullDescription ? "Show Less" : "View job"}
                        </a>
                      </div>
                    )}
                  </div>
                  <div className="experience">
                    <p>Minimum Experience</p>
                    <span>{jdItem.minExp} years</span>
                  </div>
                  <div className="b">
                    <Button
                      variant="contained"
                      sx={{
                        bgcolor: "lightgreen",
                        "&:hover": { bgcolor: "lightgreen" },
                      }}
                      className="button"
                    >
                      <span className="button_name">&#9889;Easy Apply</span>
                    </Button>
                  </div>
                  <div className="b">
                    <Button variant="contained" className="button">
                      <span className="button_name">Unlock referral asks</span>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </Grid>
          ))}
      </Grid>
    </div>
  );
};

export default Dashboard;
