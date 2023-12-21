import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { Box, Button, Card, CardActions, CardContent, CardMedia, Container, Grid, IconButton, Typography } from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ChatIcon from '@mui/icons-material/Chat';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { useSelector } from 'react-redux';
import UpdateModal from '../components/blog/BlogUpdateModal';
import useBlogCall from '../hooks/useBlogCall';
import CommentsCard from '../components/blog/CommentsCard';
import AddCommentForm from '../components/blog/AddCommentForm';


const Detail = () => {

  const { currentUser } = useSelector(state => state.auth);

  let navigate = useNavigate()

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
    const { users } = useSelector(state => state.blog);

    const { deleteBlogData, getComments, getUsers } = useBlogCall()
    

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

    const [username, setUsername] = useState("")


    useEffect(() => {        //axios ile setDetails birlikte useEffect disinda olursa sonsuz döngü olur
        
        const data = contributions.filter((item) => {return item.id === id})
        setDetails(data[0])
        //console.log(data);

        const username = users.filter((user) => {return user._id === data[0].user_id})
        setUsername(username[0]?.username);

        getComments()
        getUsers()

        setInfo({
          id: data[0]?.id,
          title: data[0]?.title,
          image: data[0]?.image,
          category: data[0]?.category,
          status: data[0]?.status,
          content: data[0]?.content,
          comments: data[0]?.comments,
          date: data[0]?.publish_date.slice(0,10),
          time: data[0]?.publish_date.slice(11,19),
        });
        
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
//-------------------------------------------------------------------------------

    

    const [commentsInfo, setCommentsInfo] = useState({
      contribution_id: id,
      title: "",
      content: "",
      nickname: "",
      status_id: ""
    })
    const [commentsOpened, setCommentsOpened] = useState(false)

    const [addCommentsOpened, setAddCommentsOpened] = useState(false)

    const handleAddCommentClose = () => {
      
      setAddCommentsOpened(false);
      setCommentsInfo({
        contribution_id: id,
        title: "",
        content: "",
        nickname: "",
        status_id: ""
      });
    };

    const handleWriteCommentOpen = () => {
      if(currentUser){
        setAddCommentsOpened(!addCommentsOpened)
      }
      else{
        navigate('/auth')
      }
      
    }


  return (
    <Container sx={{minHeight:'80vh'}}>
      <Card sx={{ width: 745, height: 700, display:'block', mx:'auto', marginTop: '2rem', backgroundColor:'#faf3e5' }}>
        <CardMedia
          component="img"
          alt={details?.title}
          height="250"
          sx={{width:'fit-content', margin:'auto', marginTop:'0.5rem', marginBottom:'-2rem'}}
          image={details?.image}
        />
        <CardContent sx={{marginTop:'2rem', height: 390, display:'flex', flexDirection:'column', justifyContent:'space-between'}}>
          <Typography gutterBottom variant="h5" component="div" sx={{textAlign:'center'}}>
            {details?.title}
          </Typography>
          <p style={{
            fontFamily: "Roboto, Helvetica, Arial, sans-serif",
            overflow: "scroll",
            //textOverflow: "ellipsis",
            display: "-webkit-box",
            WebkitLineClamp: 12,
            WebkitBoxOrient: "vertical",
            color:'gray',
            fontWeight: '400',
            fontSize:'0.875rem',
            lineHeight: 1.43,
            letterSpacing: "0.01071em",
            marginTop:'0.7rem'
          }}>
            {details?.content}
          </p>
          <Grid sx={{display:'flex', alignItems:'center', justifyContent:'space-between'}}>
            <Box sx={{display:'flex', alignItems:'center'}} >
              <AccountCircleIcon/>
              <Typography variant="body2" color="text.secondary">
                {username}
              </Typography>
            </Box>
            <Typography variant="body2" color="text.secondary" sx={{marginTop:'2rem', marginBottom:'1rem'}}>
              {info?.date}  {info?.time}
            </Typography>
          </Grid>
          
        </CardContent>
        <CardActions sx={{display:'flex', alignItems:'baseline', justifyContent:'space-between'}}>
          <Grid item xs={8} sx={{width: '8rem', display:'flex', alignItems:'center', justifyContent:'flex-start'}}>
            {
              likeClicked ? (
                <IconButton sx={{color:'red'}} onClick={handleLikeClick} aria-label="add to favorites">
                  <FavoriteIcon />
                </IconButton>)
                : 
                (
                <IconButton onClick={handleLikeClick} aria-label="add to favorites">
                  <FavoriteIcon />
                </IconButton>)
            }
            <Typography sx={{marginLeft:'-0.4rem'}}>{details?.likes}</Typography>
            <IconButton sx={{marginLeft:'0.5rem'}} aria-label="comment">
                <ChatIcon onClick={()=>setCommentsOpened(!commentsOpened)}/>
            </IconButton>
            <Typography sx={{marginLeft:'-0.4rem'}}>{details?.comments?.length}</Typography>
            <IconButton sx={{marginLeft:'.5rem'}} aria-label="visibility">
                <VisibilityOutlinedIcon />
            </IconButton>
            <Typography sx={{marginLeft:'-0.4rem'}}>{details?.post_views}</Typography>
          </Grid>
          <Grid>
            <Button onClick={handleWriteCommentOpen} size="medium" variant='contained' sx={{marginBottom:'1.2rem', backgroundColor:'#0068e3', color:'white', "&:hover": {backgroundColor: '#4290f0', color:'#ffcd44'}}}>
              Write Comment
            </Button>
          </Grid>
          { (currentUser === username) &&
          <Grid sx={{width: '8rem'}}>
            <IconButton aria-label="edit" sx={{ marginBottom:'1rem', "&:hover": {color: 'green', scale:'1.2'}}} onClick={handleOpenUpdateModal}>
                <EditIcon />
            </IconButton>
            
            <IconButton onClick={() => deleteBlogData("blogs", id)} sx={{marginBottom:'.8rem', marginInlineStart:'1rem', "&:hover": {color: 'red', scale:'1.2'} }} aria-label="delete">
                <DeleteIcon />
            </IconButton>
          </Grid>
          }
        </CardActions>
      </Card>
      {
        addCommentsOpened && <AddCommentForm commentsInfo={commentsInfo} setCommentsInfo={setCommentsInfo} handleAddCommentClose={handleAddCommentClose}/>
      }
     {
      commentsOpened && (details?.comments?.map((comment) => (
        <Grid  item key={comment.id} sx={{marginTop: '1rem'}}>
          <CommentsCard entry={comment} {...comment}/>
        </Grid>
      ))
        
      )
    }
    <Grid item xs={4} sx={{marginTop:'3rem', marginLeft:'27vw', marginBottom:'3rem'}}>
        <Button size="medium" onClick={()=>navigate(-1)} variant='contained' sx={{"&:hover": {backgroundColor: '#e2e55e'}}}>Go Back</Button>
    </Grid>
    <UpdateModal open={openUpdateModal} handleClose={handleModalClose} info={info} setInfo={setInfo} />
    
  </Container>
    
  )
}

//'&:nth-child(odd)':{backgroundColor:'beige'}

export default Detail

