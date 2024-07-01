import { Box, Card, CardActions, CardContent, Grid, IconButton, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt';
import ThumbDownAltIcon from '@mui/icons-material/ThumbDownAlt';
import { useSelector } from 'react-redux';
import useBlogCall from '../../hooks/useBlogCall';

const CommentsCard = ({ip, id, title, content, likes_num, dislikes_num, username, user_id, comment_dislikes, comment_likes, createdAt}) => {

    const date = createdAt?.slice(0,10)
    //console.log(date);
    const time = createdAt?.slice(11,19)
    //console.log(time);

    
    const { currentUser } = useSelector(state => state.auth);

    const { getComments, getCommentLikes, getCommentDislikes, postCommentLikesData, postCommentDislikesData, deleteCommentDislikesData, deleteCommentLikesData } = useBlogCall();
    const { commentLikes, commentDislikes, users } = useSelector(state => state.blog);


    const userId = users.filter((user) => {return user.username === currentUser})
    //console.log(userId[0]?._id)
    

  
    const [thumbsUpClicked, setThumbsUpClicked] = useState(false)
    const [thumbsDownClicked, setThumbsDownClicked] = useState(false)

    useEffect(() => {

      getComments()
      getCommentLikes()
      getCommentDislikes()
    
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    //const { ip } = useIPAddress();

    useEffect(() => {
      
      if(commentLikes?.filter((like) => like.user_id === userId[0]?._id && like.comment_id === id).length){
        
        setThumbsUpClicked(true)
        
      }
      else if(commentDislikes?.filter((dislike) => dislike.user_id === userId[0]?._id && dislike.comment_id === id).length){
        setThumbsDownClicked(true)
      }
      else if(!userId[0]?._id){
        
        console.log(commentLikes)
        console.log(ip)
          if(commentLikes.filter((like) => like.differ === ip && like.comment_id === id).length) {
            setThumbsUpClicked(true)
          }
          else if(commentDislikes.filter((dislike) => dislike.differ === ip && dislike.comment_id === id).length){
            setThumbsDownClicked(true) 
          } 
          else{
            setThumbsUpClicked(false)
            setThumbsDownClicked(false)
            }
      }
      else{
        setThumbsUpClicked(false)
        setThumbsDownClicked(false)
      }
      

    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
  

    const handleThumbsUpButtonClick = () => {
      
      setThumbsUpClicked(!thumbsUpClicked)

      if(!thumbsUpClicked){
        if(thumbsDownClicked){

          setThumbsDownClicked(false) 

          const commentDislikeID = userId[0]?._id ? commentDislikes.filter((dislike) => ((dislike.user_id === userId[0]?._id) && dislike.comment_id === id)) : commentDislikes.filter((dislike) => ((dislike.differ === ip) && dislike.comment_id === id))

          deleteCommentDislikesData("commentdislikes", commentDislikeID[0]?._id)
          
        } 
        const likeObject = userId[0]?._id ? {
          comment_id: id,
          user_id: userId[0]?._id,
        } : {
          comment_id: id,
          differ: ip
        }
        postCommentLikesData("commentlikes", likeObject)
        
      }  
      else{
        const commentLikeID = userId[0]?._id ? commentLikes.filter((like) => ((like.user_id === userId[0]?._id) && like.comment_id === id)) : commentLikes.filter((like) => ((like.differ === ip) && like.comment_id === id))

        deleteCommentLikesData("commentlikes", commentLikeID[0]?._id)
      }

    }

    const handleThumbsDownButtonClick = () => {
      setThumbsDownClicked(!thumbsDownClicked)

      if(!thumbsDownClicked){
        if(thumbsUpClicked){

          setThumbsUpClicked(false) 

          const commentLikeID = userId[0]?._id ? commentLikes.filter((like) => ((like.user_id === userId[0]?._id) && like.comment_id === id)) : commentLikes.filter((like) => ((like.differ === ip) && like.comment_id === id))

          deleteCommentLikesData("commentlikes", commentLikeID[0]?._id)
          
        } 
        const dislikeObject = userId[0]?._id ? {
          comment_id: id,
          user_id: userId[0]?._id,
        } : {
          comment_id: id,
          differ: ip
        }
        postCommentDislikesData("commentdislikes", dislikeObject)
        
      }  
      else{
        const commentDislikeID = userId[0]?._id ? commentDislikes.filter((dislike) => ((dislike.user_id === userId[0]?._id) && dislike.comment_id === id)) : commentDislikes.filter((dislike) => ((dislike.differ === ip) && dislike.comment_id === id))

        deleteCommentDislikesData("commentdislikes", commentDislikeID[0]?._id)
      }
    }

    
  return (
    <Card
      sx={{
        width: 645,
        height: "fitContent",
        mx: "auto",
        backgroundColor: "primary.readComment",
      }}
    >
      <CardContent>
        <Typography gutterBottom variant="h6" component="div" sx={{}}>
          {title}
        </Typography>
        <p
          style={{
            fontFamily: "Roboto, Helvetica, Arial, sans-serif",
            overflow: "scroll",
            //textOverflow: "ellipsis",
            display: "-webkit-box",
            WebkitLineClamp: 3,
            WebkitBoxOrient: "vertical",
            color: "#f89f6c",
            fontWeight: "400",
            fontSize: "0.875rem",
            lineHeight: 1.43,
            letterSpacing: "0.01071em",
            marginTop: "1.0rem",
          }}
        >
          {content}
        </p>
        <Grid
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Box>
            <Box
              sx={{ display: "flex", alignItems: "center", marginTop: "2rem" }}
            >
              <AccountCircleIcon />
              <Typography variant="body2" color="text.secondary">
                {username}
              </Typography>
            </Box>
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{ marginTop: "1rem", marginBottom: "-1rem" }}
            >
              {date} {time}
            </Typography>
          </Box>
          <CardActions>
            {thumbsUpClicked ? (
              <IconButton
                onClick={handleThumbsUpButtonClick}
                sx={{ marginRight: "-0.8rem", color: "green" }}
              >
                <ThumbUpAltIcon />
              </IconButton>
            ) : (
              <IconButton
                onClick={handleThumbsUpButtonClick}
                sx={{ marginRight: "-0.8rem" }}
              >
                <ThumbUpAltIcon />
              </IconButton>
            )}

            <Typography>{likes_num}</Typography>
            {thumbsDownClicked ? (
              <IconButton
                onClick={handleThumbsDownButtonClick}
                sx={{ marginRight: "-0.7rem", color: "red" }}
              >
                <ThumbDownAltIcon />
              </IconButton>
            ) : (
              <IconButton
                onClick={handleThumbsDownButtonClick}
                sx={{ marginRight: "-0.7rem" }}
              >
                <ThumbDownAltIcon />
              </IconButton>
            )}

            <Typography>{dislikes_num}</Typography>
          </CardActions>
        </Grid>
      </CardContent>
    </Card>
  );
}

export default CommentsCard