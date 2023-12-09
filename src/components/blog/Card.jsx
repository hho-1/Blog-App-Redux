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


export default function ImgMediaCard({id, publish_date, title, image, content, author, likes, comments, post_views}) {

    const date = publish_date.slice(0,10)
    //console.log(date);
    const time = publish_date.slice(11,19)
    //console.log(time);

    let navigate = useNavigate()

    const [likeClicked, setLikeClicked] = React.useState(false)

    const handleLikeClick = () => {
      setLikeClicked(!likeClicked)
      if(likeClicked) likes = likes + 1 
      else if(!likeClicked) likes = likes - 1
      
    }
    
  return (
    <Card sx={{ width: 345, height: 430, display:'flex', flexDirection:'column', justifyContent:'space-between' }}>
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
                {author}
            </Typography>
        </Box>
        
        
      </CardContent>
      <CardActions>
        <Grid item xs={8} sx={{display:'flex', alignItems:'center', justifyContent:'flex-start', marginInlineStart:'-0.5rem'}}>
            {
              likeClicked ? (<IconButton aria-label="add to favorites" sx={{color:'red'}} onClick={handleLikeClick}>
                <FavoriteIcon />
            </IconButton>) : (<IconButton aria-label="add to favorites" onClick={handleLikeClick}>
                <FavoriteIcon />
            </IconButton>
            )
            }
            
            <Typography sx={{marginInlineStart:'-0.4rem'}}>{likes}</Typography>
            <IconButton aria-label="add to favorites">
                <ChatIcon />
            </IconButton>
            <Typography sx={{marginInlineStart:'-0.4rem'}}>{comments.length}</Typography>
            <IconButton aria-label="add to favorites">
                <VisibilityOutlinedIcon />
            </IconButton>
            <Typography sx={{marginInlineStart:'-0.4rem'}}>{post_views}</Typography>
        </Grid>
        <Grid item xs={4}>
            <Button size="small" onClick={()=>navigate("/blogs/" + id)} variant='contained' sx={{"&:hover": {backgroundColor: '#e2e55e'}}}>Read More</Button>
        </Grid>
        
      </CardActions>
    </Card>
  );
}