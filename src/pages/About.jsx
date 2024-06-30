import { Box, Container, Typography } from '@mui/material'
import React from 'react'

const About = () => {
  return (
    <Box sx={{ backgroundColor: "primary.backgroundMain", p:"20rem" }}>
      <Container sx={{ height: "19vh" }}>
        <Box>
          <Typography
            sx={{ textAlign: "center", color: "primary.textMain" }}
            variant="h5"
          >
            This Blog App has been designed by{" "}
            <a href="https://github.com/hho-1">hho-1</a> in 2024.
          </Typography>
        </Box>
      </Container>
    </Box>
  );
  
}

export default About