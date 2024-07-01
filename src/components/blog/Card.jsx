import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { Box, Grid, IconButton } from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ChatIcon from "@mui/icons-material/Chat";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import useBlogCall from "../../hooks/useBlogCall";
import { useState, useEffect } from "react";
import useIPAddress from "../../hooks/useIPAddress";

export default function ImgMediaCard({
  id,
  createdAt,
  comment_count,
  title,
  image,
  content,
  user_id,
  likes_count,
  post_views,
}) {
  const date = createdAt?.slice(0, 10);
  const time = createdAt?.slice(11, 19);

  const {
    getContributions,
    getUsers,
    getLikes,
    postLikesData,
    deleteLikesData,
    updateBlogPostViews,
  } = useBlogCall();

  const navigate = useNavigate();
  const { currentUser } = useSelector((state) => state.auth);
  const { users, likes } = useSelector((state) => state.blog);
  const { ip } = useIPAddress();
  const [likeClicked, setLikeClicked] = useState(false);

  const username =
    users.find((user) => user._id === user_id)?.username || "Unknown";
  const userId = users.find((user) => user.username === currentUser)?.id;

  useEffect(() => {
    getContributions();
    getUsers();
    getLikes();
  }, []);

  useEffect(() => {
    if (likes.length) {
      const userLiked = likes.some(
        (like) => like.user_id === userId && like.contribution_id === id
      );
      const ipLiked = likes.some(
        (like) => like.differ === ip && like.contribution_id === id
      );
      setLikeClicked(userLiked || ipLiked);
    }
  }, [likes, userId, id, ip]);

  const handleLikeClick = async () => {
    setLikeClicked((prev) => !prev);

    if (!likeClicked) {
      const likeObject = userId
        ? { contribution_id: id, user_id: userId }
        : { contribution_id: id, differ: ip };
      await postLikesData("likes", likeObject);
    } else {
      const likeToDelete = likes.find(
        (like) =>
          (userId ? like.user_id === userId : like.differ === ip) &&
          like.contribution_id === id
      );
      const likeID = likeToDelete?._id; 
      console.log("Deleting like with ID:", likeID); 
      if (likeID) {
        await deleteLikesData("likes", likeID);
      } else {
        console.error("Like ID is undefined. Cannot delete like.");
      }
    }
  };
  //console.log(post_views)

  function increasePostViews(views) {
    
    return Number(views + 1);
  }
  

  function handleReadMoreClick() {
    navigate("/blogs/" + id)
    updateBlogPostViews(`/blogs/${id}`, { post_views: increasePostViews(post_views) });
  }


  return (
    <Card
      sx={{
        width: 345,
        height: 430,
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        margin: "1rem",
        backgroundColor: "primary.backgroundSecondary",
      }}
    >
      <CardMedia
        component="img"
        alt={title}
        height="150"
        sx={{
          width: "fit-content",
          margin: "auto",
          marginTop: "0.5rem",
          marginBottom: "9rem",
        }}
        image={image}
      />
      <CardContent>
        <Typography
          gutterBottom
          variant="h5"
          component="div"
          sx={{ textAlign: "center", marginTop: "-10rem" }}
        >
          {title}
        </Typography>
        <Typography
          sx={{
            fontFamily: "Roboto, Helvetica, Arial, sans-serif",
            overflow: "hidden",
            textOverflow: "ellipsis",
            display: "-webkit-box",
            WebkitLineClamp: 2,
            WebkitBoxOrient: "vertical",
            color: "primary.textMain",
            fontWeight: "400",
            fontSize: "0.875rem",
            lineHeight: 1.43,
            letterSpacing: "0.01071em",
            marginTop: "1.0rem",
          }}
        >
          {content}
        </Typography>
        <Typography
          variant="body2"
          color="text.secondary"
          sx={{ marginTop: "2rem", marginBottom: "1rem" }}
        >
          {date} {time}
        </Typography>
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <AccountCircleIcon />
          <Typography variant="body2" color="text.secondary">
            {username}
          </Typography>
        </Box>
      </CardContent>
      <CardActions>
        <Grid
          item
          xs={8}
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-start",
            marginInlineStart: "-0.5rem",
          }}
        >
          <IconButton
            aria-label="add to favorites"
            sx={{ color: likeClicked ? "red" : "default" }}
            onClick={handleLikeClick}
          >
            <FavoriteIcon />
          </IconButton>
          <Typography sx={{ marginInlineStart: "-0.4rem" }}>
            {likes_count}
          </Typography>
          <IconButton aria-label="add to favorites">
            <ChatIcon />
          </IconButton>
          <Typography sx={{ marginInlineStart: "-0.4rem" }}>
            {comment_count}
          </Typography>
          <IconButton aria-label="add to favorites">
            <VisibilityOutlinedIcon />
          </IconButton>
          <Typography sx={{ marginInlineStart: "-0.4rem" }}>
            {post_views}
          </Typography>
        </Grid>
        <Grid item xs={4}>
          <Button
            onClick={()=>handleReadMoreClick()}
            size="small"
            variant="contained"
            sx={{ "&:hover": { backgroundColor: "primary.buttonHover" } }}
          >
            Read More
          </Button>
        </Grid>
      </CardActions>
    </Card>
  );
}
