import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
//import useAxios from '../hooks/useAxios';
import { Box, Card, CardActions, CardContent, CardMedia, Container, Grid, IconButton, Typography } from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ChatIcon from '@mui/icons-material/Chat';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
// import axios from 'axios';
//import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import UpdateModal from '../components/blog/UpdateModal';
import useBlogCall from '../hooks/useBlogCall';
//import useBlogCall from '../hooks/useBlogCall';

const Detail = () => {

  const [info, setInfo] = useState({
    title: "",
    image: "",
    category: 0,
    status: "",
    content: "",
    likes: 0,
    comments: 0,
    post_views: 0
  });

    const { id } = useParams();
    //console.log(id);

    const [likeClicked, setLikeClicked] = React.useState(false)

    const handleLikeClick = () => {
      setLikeClicked(!likeClicked)
      if(likeClicked) info.likes += 1 
      else if(!likeClicked) info.likes -= 1
      
    }

    //const { getContributions } = useBlogCall();
    
    const [details, setDetails] = useState("");

    const { contributions } = useSelector(state => state.blog);

    const { deleteBlogData } = useBlogCall()
    
    

    const [openUpdateModal, setOpenUpdateModal] = useState(false);
    const handleOpenUpdateModal = () => setOpenUpdateModal(true);
    
    const handleModalClose = () => {
      
      setOpenUpdateModal(false);
      setInfo({
        title: "",
        image: "",
        category: 0,
        status: "",
        content: "",
      });
    };


    useEffect(() => {        //axios ile setDetails birlikte useEffect disinda olursa sonsuz döngü olur
        
        const data = contributions.filter((item) => {return item.id === Number(id)})
        setDetails(data[0])
        //console.log(data);

        setInfo({
          id: data[0].id,
          title: data[0].title,
          image: data[0].image,
          category: data[0].category,
          status: data[0].status,
          content: data[0].content
        });
        
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

  return (
    <Container sx={{height:'80vh'}}>
      <Card sx={{ width: 745, height: 700, display:'flex', flexDirection:'column', justifyContent:'space-between', mx:'auto', marginTop: '2rem' }}>
        <CardMedia
          component="img"
          alt={details.title}
          height="250"
          sx={{width:'fit-content', margin:'auto', marginTop:'0.5rem', marginBottom:'-2rem'}}
          image={details.image}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div" sx={{textAlign:'center'}}>
            {details.title}
          </Typography>
          <p style={{
            fontFamily: "Roboto, Helvetica, Arial, sans-serif",
            overflow: "hidden",
            textOverflow: "ellipsis",
            display: "-webkit-box",
            WebkitLineClamp: 12,
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
        <CardActions sx={{display:'flex', alignItems:'center', justifyContent:'space-between'}}>
          <Grid item xs={8} sx={{display:'flex', alignItems:'center', justifyContent:'flex-start', marginInlineStart:'-0.5rem'}}>
            <IconButton onClick={handleLikeClick} aria-label="add to favorites">
                <FavoriteIcon />
            </IconButton>
            <Typography sx={{marginInlineStart:'-0.4rem'}}>{details.likes}</Typography>
            <IconButton sx={{marginInlineStart:'1rem'}} aria-label="comment">
                <ChatIcon />
            </IconButton>
            {/* <Typography sx={{marginInlineStart:'-0.4rem'}}>{details[0].comments.length}</Typography> */}
            <IconButton sx={{marginInlineStart:'.5rem'}} aria-label="visibility">
                <VisibilityOutlinedIcon />
            </IconButton>
            <Typography sx={{marginInlineStart:'-0.4rem'}}>{details.post_views}</Typography>
          </Grid>
          <Grid>
            <IconButton aria-label="edit" sx={{"&:hover": {color: 'green', scale:'1.2'}}} onClick={handleOpenUpdateModal}>
                <EditIcon />
            </IconButton>
            
            <IconButton onClick={() => deleteBlogData("blogs", id)} sx={{marginInlineStart:'1rem', "&:hover": {color: 'red', scale:'1.2'} }} aria-label="delete">
                <DeleteIcon />
            </IconButton>
          </Grid>
          
          
        
        </CardActions>
        
    </Card>
    <UpdateModal open={openUpdateModal} handleClose={handleModalClose} info={info} setInfo={setInfo} />
  </Container>
    
  )
}

export default Detail