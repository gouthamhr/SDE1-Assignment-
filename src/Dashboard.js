import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Card, CardContent, Grid } from '@mui/material'; // Import Material UI components
import './Dashboard.css';
const Dashboard = () => {
  const [jdList, setJdList] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const body = {
          "limit": 10,
          "offset": 0
        };

        const response = await axios.post("https://api.weekday.technology/adhoc/getSampleJdJSON", body);
        setJdList(response.data.jdList); // Assuming data is in the format { jdList: [...] }
        setLoading(false); // Set loading to false after data is fetched
      } catch (error) {
        setError(error.message);
      }
    };

    fetchData();
  }, []);
console.log(jdList)
  // If there's an error, display it
  if (error) {
    return <div>Error: {error}</div>;
  }

  // If data is still loading, display loading message
  if (loading) {
    return <div>Loading...</div>;
  }

  // Render UI with the fetched data
  return (
    <Grid container spacing={3}> {/* Use Grid container for responsive layout */}
      {jdList.map((jdItem, index) => (
        <Grid item xs={12} sm={6} md={4} key={index}> {/* Adjust column width based on screen size */}
          <Card className="card">
            <CardContent>
              <p>JdUid: {jdItem.jdUid}</p>
              <p>JdLink: {jdItem.jdLink}</p>
              <p>JobDetailsFromCompany: {jdItem.jobDetailsFromCompany}</p>
              <p>MaxJdSalary: {jdItem.maxJdSalary}</p>
              <p>MinJdSalary: {jdItem.minJdSalary}</p>
              {/* Render other properties as needed */}
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};

export default Dashboard;
