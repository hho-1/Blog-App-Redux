import { Box, Typography } from '@mui/material'
import React from 'react'

const Footer = () => {
  return (
    <Box sx={{height:'8vh', backgroundColor:'#ffcd44', display:'flex', flexDirection:'column', justifyContent:'center', alignItems:'center'}}>
      <Typography variant='subtitle1'>Developed by <a href="https://github.com/hho-1">hho-1</a></Typography>
      <Typography>Copyright ©2023</Typography>
      
    </Box>
  )
}

export default Footer