import { Box, Card, CardContent, Grid, Typography } from '@mui/material'
import React from 'react'
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

const CommentsCard = ({commentTitle, content, time_stamp, user}) => {

    const date = time_stamp.slice(0,10)
    //console.log(date);
    const time = time_stamp.slice(11,19)
    //console.log(time);
  return (
    <Card sx={{ width: 645, height: 'fitContent', mx:'auto', backgroundColor: 'beige'}}>
          <CardContent>
            <Typography gutterBottom variant="h5" component="div" sx={{}}>
              {commentTitle}
            </Typography>
            <p style={{
              fontFamily: "Roboto, Helvetica, Arial, sans-serif",
              overflow: "scroll",
              //textOverflow: "ellipsis",
              display: "-webkit-box",
              WebkitLineClamp: 3,
              WebkitBoxOrient: "vertical",
              color:'gray',
              fontWeight: '400',
              fontSize:'0.875rem',
              lineHeight: 1.43,
              letterSpacing: "0.01071em",
              marginTop:'1.0rem'
            }}>
              {content}
            </p>
            <Grid sx={{display:'flex', alignItems:'center', justifyContent:'space-between'}}>
                <Box sx={{display:'flex', alignItems:'center'}} >
                    <AccountCircleIcon/>
                    <Typography variant="body2" color="text.secondary">
                        {user}
                    </Typography>
                </Box>
                <Typography variant="body2" color="text.secondary" sx={{marginTop:'2rem', marginBottom:'1rem'}}>
                    {date}  {time}
                </Typography>
            </Grid>
          
        </CardContent>
        
        </Card>
  )
}

export default CommentsCard