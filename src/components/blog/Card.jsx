import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { Box, Grid, IconButton } from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ChatIcon from '@mui/icons-material/Chat';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import useBlogCall from '../../hooks/useBlogCall';
import { useState } from 'react';
import { useEffect } from 'react';
import useIPAddress from '../../hooks/useIPAddress';


export default function ImgMediaCard({ id, createdAt, comment_count, title, image, content, user_id, likes_count, post_views}) {

    const date = createdAt?.slice(0,10)
    //console.log(date);
    const time = createdAt?.slice(11,19)
    //console.log(time);

    const { getContributions, getUsers, getLikes, postLikesData, deleteLikesData } = useBlogCall();


    let navigate = useNavigate()

    const { currentUser } = useSelector(state => state.auth);

    const { users } = useSelector(state => state.blog);
    const { likes } = useSelector(state => state.blog);

    const { ip } = useIPAddress();

    const username = users.filter((user) => {return user._id === user_id}).map((user) => {return user.username})
    const userId = users.filter((user) => {return user.username === currentUser})


    const [likeClicked, setLikeClicked] = useState(false)

    /* const [likesInfo, setLikesInfo] = useState({
      contribution_id: id,
      user_id: "",
      differ: ""
    }) */

    useEffect(() => {

      getContributions();
      getUsers()
      getLikes()
    
      
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    //console.log(likes)
    useEffect(() => {
      
      if(likes?.filter((like) => like.user_id === userId[0]?.id && like.contribution_id === id).length){
        
        setLikeClicked(true)
        
      }
      else if(!userId[0]?.id){
        
        if(likes?.filter((like) => like.differ === ip && like.contribution_id === id).length) setLikeClicked(true)
        else setLikeClicked(false)
      }

      
    
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [likes])

    

    const handleLikeClick = () => {

      setLikeClicked(!likeClicked)
      
      if(!likeClicked) {
        
        const likeObject = userId[0]?.id ? {
          contribution_id: id,
          user_id: userId[0]?.id || "",
        } : {
          contribution_id: id,
          differ: userId[0]?.id ? "" : ip
        }
        /* setLikesInfo({
          contribution_id: id,
          user_id: userId[0]?.id || "",
          differ: userId[0]?.id ? "" : ip
        }) */
        postLikesData("likes", likeObject)
      }
      else{
        const likeID = userId[0]?.id ? likes.filter((like) => ((like.user_id === userId[0]?.id)) && like.contribution_id === id) : likes.filter((like) => ((like.differ === ip) && like.contribution_id === id))
        //console.log(likes)
        //console.log(likeID)
        deleteLikesData("likes", likeID[0]?._id)
      }
      
    }

  return (
    <Card sx={{ width: 345, height: 430, display:'flex', flexDirection:'column', justifyContent:'space-between', margin:'1rem' }}>
      <CardMedia
        component="img"
        alt={title}
        height="150"
        sx={{width:'fit-content', margin:'auto', marginTop:'0.5rem', marginBottom:'9rem'}}
        image={image}
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div" sx={{textAlign:'center', marginTop:'-10rem'}}>
            {title}
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
            {content}
        </p>
        <Typography variant="body2" color="text.secondary" sx={{marginTop:'2rem', marginBottom:'1rem'}}>
            {date}  {time}
        </Typography>
        <Box sx={{display:'flex', alignItems:'center'}} >
            <AccountCircleIcon/>
            <Typography variant="body2" color="text.secondary">
                {username}
            </Typography>
        </Box>
        
        
      </CardContent>
      <CardActions>
        <Grid item xs={8} sx={{display:'flex', alignItems:'center', justifyContent:'flex-start', marginInlineStart:'-0.5rem'}}>
            {
              (likeClicked) ? (<IconButton aria-label="add to favorites" sx={{color:'red'}} onClick={handleLikeClick}>
                <FavoriteIcon/>
            </IconButton>) : (<IconButton aria-label="add to favorites"  onClick={handleLikeClick}>
                <FavoriteIcon/>
            </IconButton>
            )
            }
            
            <Typography sx={{marginInlineStart:'-0.4rem'}}>{likes_count}</Typography>
            <IconButton aria-label="add to favorites">
                <ChatIcon />
            </IconButton>
            <Typography sx={{marginInlineStart:'-0.4rem'}}>{comment_count}</Typography>
            <IconButton aria-label="add to favorites">
                <VisibilityOutlinedIcon />
            </IconButton>
            <Typography sx={{marginInlineStart:'-0.4rem'}}>{post_views}</Typography>
        </Grid>
        <Grid item xs={4}>
            <Button onClick={()=>navigate("/blogs/" + id)} size="small" variant='contained' sx={{"&:hover": {backgroundColor: '#e2e55e'}}}>Read More</Button>
        </Grid>
        
      </CardActions>
    </Card>
  );
}