import { Box, Container, Typography } from '@mui/material'
import React from 'react'

const About = () => {
  return (
    <Container sx={{height:'83vh'}}>
      <Box>
        <Typography sx={{marginBottom: 4, textAlign:'center'}} variant='h4' >
            About
          </Typography>
      </Box>
    </Container>
  )
}

export default About