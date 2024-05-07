import React, { useState, useEffect } from "react";
import axios from "axios";
import { Card, CardContent, Grid, Button } from "@mui/material"; // Import Material UI components
import "./Dashboard.css";

const Dashboard = () => {
  const [jdList, setJdList] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showFullDescription, setShowFullDescription] = useState(false); // New state variable for controlling description visibility

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
      } catch (error) {
        setError(error.message);
      }
    };

    fetchData();
  }, []);

  // Toggle show full description
  const toggleDescription = () => {
    setShowFullDescription(!showFullDescription);
  };

  // Render UI with the fetched data
  return (
    <Grid container spacing={3}>
      {jdList.map((jdItem, index) => (
        <Grid item xs={12} sm={6} md={4} key={index}>
          <Card className="card">
            <CardContent>
              <p>
                <img src={jdItem.logoUrl} alt="" />
                {jdItem.companyName}
              </p>
              <p>{jdItem.jobRole}</p>
              <div>
                Estimated Salary: &#x20B9;{jdItem.minJdSalary} -{" "}
                {jdItem.maxJdSalary} {jdItem.salaryCurrencyCode}
              </div>
              <div>
                <p>About Company:</p>
                <span>
                  <b>About us</b>
                </span>
                {/* Show full description if `showFullDescription` is true, otherwise show truncated description */}
                <p>
                  {showFullDescription
                    ? jdItem.jobDetailsFromCompany
                    : `${jdItem.jobDetailsFromCompany.substring(0, 100)}...`}
                </p>
                {/* Show "Show More" link only if description is longer than 100 characters */}
                {jdItem.jobDetailsFromCompany.length > 100 && (
                  <div style={{ textAlign: "center" }}>
                    <a href="#" onClick={toggleDescription}>
                      {showFullDescription ? "Show Less" : "Show More"}
                    </a>
                  </div>
                )}
              </div>
              <div>
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
  );
};

export default Dashboard;
