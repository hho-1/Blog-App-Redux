import { Box, Container, Typography } from '@mui/material'
import React from 'react'

const About = () => {
  return (
    <Container sx={{height:'51vh'}}>
      <Box>
        <Typography sx={{textAlign:'center', marginTop:'20rem'}} variant='h5' >
            This Blog App has been designed by <a href='https://github.com/hho-1'>hho-1</a> in 2023. 
          </Typography>
      </Box>
    </Container>
  )
  
}

export default About