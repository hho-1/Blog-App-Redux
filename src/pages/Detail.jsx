import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
//import useAxios from '../hooks/useAxios';
import { Box, Button, Card, CardActions, CardContent, CardMedia, Grid, IconButton, Typography } from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ChatIcon from '@mui/icons-material/Chat';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
// import axios from 'axios';
//import { useDispatch } from 'react-redux';
import useBlogCall from '../hooks/useBlogCall';

const Detail = () => {

    const { id } = useParams();
    const [details, setDetails] = useState("");


    const { getContributions } = useBlogCall();

    //const { axiosWithToken } = useAxios();

    let navigate = useNavigate()

    useEffect(() => {        //axios ile setDetails birlikte useEffect disinda olursa sonsuz döngü olur
        const blogs = getContributions()
        //console.log(blogs);
        setDetails(Object.entries(blogs).filter((item) => item.id === id))
        
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
  return (
    <Card sx={{ width: 745, height: 630, display:'flex', flexDirection:'column', justifyContent:'space-between' }}>
      <CardMedia
        component="img"
        alt={details.title}
        height="300"
        sx={{width:'fit-content', margin:'auto', marginTop:'0.5rem', marginBottom:'9rem'}}
        image={details.image}
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div" sx={{textAlign:'center', marginTop:'-10rem'}}>
            {details.title}
        </Typography>
        <p style={{
            fontFamily: "Roboto, Helvetica, Arial, sans-serif",
            overflow: "hidden",
            textOverflow: "ellipsis",
            display: "-webkit-box",
            WebkitLineClamp: 2,
            WebkitBoxOrient: "vertical",
            color:'gray',
            fontWeight: '400',
            fontSize:'0.875rem',
            lineHeight: 1.43,
            letterSpacing: "0.01071em",
            marginTop:'1.0rem'
        }}>
            {details.content}
        </p>
        <Typography variant="body2" color="text.secondary" sx={{marginTop:'2rem', marginBottom:'1rem'}}>
            {details.date}  {details.time}
        </Typography>
        <Box sx={{display:'flex', alignItems:'center'}} >
            <AccountCircleIcon/>
            <Typography variant="body2" color="text.secondary">
                {details.author}
            </Typography>
        </Box>
        
        
      </CardContent>
      <CardActions>
        <Grid item xs={8} sx={{display:'flex', alignItems:'center', justifyContent:'flex-start', marginInlineStart:'-0.5rem'}}>
            <IconButton aria-label="add to favorites">
                <FavoriteIcon />
            </IconButton>
            <Typography sx={{marginInlineStart:'-0.4rem'}}>{details.likes}</Typography>
            <IconButton aria-label="add to favorites">
                <ChatIcon />
            </IconButton>
            {/* <Typography sx={{marginInlineStart:'-0.4rem'}}>{details.comments.length}</Typography> */}
            <IconButton aria-label="add to favorites">
                <VisibilityOutlinedIcon />
            </IconButton>
            <Typography sx={{marginInlineStart:'-0.4rem'}}>{details.post_views}</Typography>
        </Grid>
        <Grid item xs={4}>
            <Button size="small" onClick={()=>navigate("/details/" + id)} variant='contained' sx={{"&:hover": {backgroundColor: '#e2e55e'}}}>Read More</Button>
        </Grid>
        
      </CardActions>
    </Card>
  )
}

export default Detail