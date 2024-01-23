// App.js
import React, { useState, useEffect } from "react";
import axios from "axios";
import styled from "styled-components";
import {
  createTheme,
  ThemeProvider,
  CssBaseline,
  Container,
  Typography,
  Paper,
  Grid,
} from "@mui/material";
import Notification from "./Notification";
import "./App.css"; // Import the CSS file

const theme = createTheme({
  palette: {
    primary: {
      main: "#2196f3", // Blue color
    },
    background: {
      default: "#f5f5f5", // Light gray background
    },
  },
});

const StyledContainer = styled(Container)`
  && {
    margin-top: 20px;
    text-align: center;
    background-color: ${theme.palette.background.default};
  }
`;

const StyledPaper = styled(Paper)`
  && {
    padding: 20px;
    margin-bottom: 20px;
  }
`;

const App = () => {
  const [posts, setPosts] = useState([]);
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    // Fetch data from JSONPlaceholder API
    axios
      .get("https://jsonplaceholder.typicode.com/posts")
      .then((response) => setPosts(response.data))
      .catch((error) => console.error("Error fetching posts:", error));

    // WebSocket connection for real-time notifications
    const ws = new WebSocket("wss://echo.websocket.org");

    ws.onmessage = (event) => {
      const newNotification = { message: event.data }; // Assuming data is a string
      setNotifications((prevNotifications) => [
        ...prevNotifications,
        newNotification,
      ]);
    };

    // Close WebSocket connection on component unmount
    return () => {
      ws.close();
    };
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <StyledContainer maxWidth="lg">
        <StyledPaper elevation={3}>
          <Typography variant="h4" component="h1" gutterBottom color="primary">
            Blog Posts
          </Typography>
          <Grid container spacing={2}>
            {posts.map((post) => (
              <Grid item xs={12} key={post.id} className="grid-item">
                {" "}
                {/* Add the class for styling */}
                <StyledPaper elevation={2}>
                  <Typography variant="h6">{post.title}</Typography>
                </StyledPaper>
              </Grid>
            ))}
          </Grid>
        </StyledPaper>
        <StyledPaper elevation={3}>
          <Typography variant="h4" component="h2" gutterBottom color="primary">
            Notifications
          </Typography>
          <Notification notifications={notifications} />
        </StyledPaper>
      </StyledContainer>
    </ThemeProvider>
  );
};

export default App;
