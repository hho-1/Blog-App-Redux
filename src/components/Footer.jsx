import { Box, Typography } from '@mui/material'
import React from 'react'

const Footer = () => {
  return (
    <Box
      sx={{
        height: "8vh",
        backgroundColor: "primary.navbarBackground",
        color: "primary.textMain",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Typography variant="subtitle1">
        Developed by <a style={{color:"skyblue"}} href="https://github.com/hho-1">hho-1</a>
      </Typography>
      <Typography>Copyright ©2024</Typography>
    </Box>
  );
}

export default Footer