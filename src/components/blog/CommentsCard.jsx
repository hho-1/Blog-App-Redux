import { Box, Card, CardActions, CardContent, Grid, IconButton, Typography } from '@mui/material'
import React, { useState } from 'react'
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
//import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt';
import ThumbDownAltIcon from '@mui/icons-material/ThumbDownAlt';
//import ThumbDownOffAltIcon from '@mui/icons-material/ThumbDownOffAlt';

const CommentsCard = ({title, content, publish_date, likes_num, dislikes_num, username}) => {

    const date = publish_date?.slice(0,10)
    //console.log(date);
    const time = publish_date?.slice(11,19)
    //console.log(time);

    const [thumbsUpClicked, setThumbsUpClicked] = useState(false)
    const [thumbsDownClicked, setThumbsDownClicked] = useState(false)

    const handleThumbsUpButtonClick = () => {
      setThumbsUpClicked(!thumbsUpClicked)
      if(thumbsDownClicked){
        setThumbsDownClicked(false) 
        dislikes_num -= 1}  

      thumbsUpClicked ? (likes_num += 1) : (likes_num -= 1)
    }

    const handleThumbsDownButtonClick = () => {
      setThumbsDownClicked(!thumbsDownClicked)

      if(thumbsUpClicked){
        setThumbsUpClicked(false) 
        likes_num -= 1}

      thumbsDownClicked ? (dislikes_num += 1) : (dislikes_num -= 1)
    }

    
  return (
    <Card sx={{ width: 645, height: 'fitContent', mx:'auto', backgroundColor:'beige'}}>
          <CardContent>
            <Typography gutterBottom variant="h6" component="div" sx={{}}>
              {title}
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
                        {username}
                    </Typography>
                  </Box>
                  <Typography variant="body2" color="text.secondary" sx={{marginTop:'1rem', marginBottom:'-1rem'}}>
                    {date}  {time}
                  </Typography>
                </Box>
                <CardActions>
                  {
                    thumbsUpClicked ? (
                      <IconButton onClick={handleThumbsUpButtonClick} sx={{marginRight:'-0.3rem', color:'green'}}>
                        <ThumbUpAltIcon/>
                      </IconButton>
                    ):
                    (
                      <IconButton onClick={handleThumbsUpButtonClick} sx={{marginRight:'-0.3rem'}}>
                        <ThumbUpAltIcon/>
                      </IconButton>
                    )
                  }
                  
                  <Typography>{likes_num}</Typography>
                  {
                    thumbsDownClicked ? (
                      <IconButton onClick={handleThumbsDownButtonClick} sx={{marginRight:'-0.7rem', color:'red'}}>
                        <ThumbDownAltIcon/>
                      </IconButton>
                    ) 
                    : (
                      <IconButton onClick={handleThumbsDownButtonClick} sx={{marginRight:'-0.7rem'}}>
                        <ThumbDownAltIcon/>
                      </IconButton>
                    )
                  }
                  
                  <Typography>{dislikes_num}</Typography>
                </CardActions>
            </Grid>
          
        </CardContent>
        
        
        </Card>
  )
}

export default CommentsCard