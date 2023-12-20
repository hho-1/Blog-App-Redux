import { Box, Card, CardActions, CardContent, Grid, IconButton, Typography } from '@mui/material'
import React from 'react'
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';
//import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt';
//import ThumbDownAltIcon from '@mui/icons-material/ThumbDownAlt';
import ThumbDownOffAltIcon from '@mui/icons-material/ThumbDownOffAlt';

const CommentsCard = ({commentTitle, content, time_stamp, user, likes_num, dislikes_num}) => {

    const date = time_stamp.slice(0,10)
    //console.log(date);
    const time = time_stamp.slice(11,19)
    //console.log(time);

    
  return (
    <Card sx={{ width: 645, height: 'fitContent', mx:'auto', backgroundColor:'beige'}}>
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
                <Box>
                  <Box sx={{display:'flex', alignItems:'center', marginTop:'2rem'}} >
                    <AccountCircleIcon/>
                    <Typography variant="body2" color="text.secondary">
                        {user}
                    </Typography>
                  </Box>
                  <Typography variant="body2" color="text.secondary" sx={{marginTop:'1rem', marginBottom:'-1rem'}}>
                    {date}  {time}
                  </Typography>
                </Box>
                <CardActions>
                  <IconButton sx={{marginRight:'-0.3rem'}}>
                    <ThumbUpOffAltIcon/>
                  </IconButton>
                    <Typography >0</Typography>
                  <IconButton sx={{marginRight:'-0.7rem'}}>
                    <ThumbDownOffAltIcon/>
                  </IconButton>
                  <Typography>0</Typography>
                </CardActions>
            </Grid>
          
        </CardContent>
        
        
        </Card>
  )
}

export default CommentsCard