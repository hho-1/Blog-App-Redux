import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Container,
  Grid,
  IconButton,
  Typography,
} from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ChatIcon from "@mui/icons-material/Chat";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { useSelector } from "react-redux";
import UpdateModal from "../components/blog/BlogUpdateModal";
import useBlogCall from "../hooks/useBlogCall";
import CommentsCard from "../components/blog/CommentsCard";
import AddCommentForm from "../components/blog/AddCommentForm";
import useIPAddress from "../hooks/useIPAddress";

const Detail = () => {
  const { currentUser } = useSelector((state) => state.auth);

  const { id } = useParams();
  const { contributions, users, likes, comments } = useSelector(
    (state) => state.blog
  );

  const [info, setInfo] = useState({
    id: "",
    user_id: "",
    title: "",
    image: "",
    publish_date: "",
    category_id: "",
    status_id: "",
    content: "",
    likes: [],
    comments: [],
    comment_count: 0,
    likes_count: 0,
    post_views: 0,
  });

  const [details, setDetails] = useState("");
  const [username, setUsername] = useState("");
  const [likeClicked, setLikeClicked] = useState(false);
  const [commentsInfo, setCommentsInfo] = useState({
    contribution_id: id,
    content: "",
    title: "",
    user_id: "",
    username: "",
    likes_num: 0,
    dislikes_num: 0,
    comment_likes: [],
    comment_dislikes: [],
  });
  const [commentsOpened, setCommentsOpened] = useState(false);
  const [addCommentsOpened, setAddCommentsOpened] = useState(false);
  const [openUpdateModal, setOpenUpdateModal] = useState(false);

  const {
    deleteBlogData,
    getComments,
    getUsers,
    getLikes,
    getContributions,
    postLikesData,
    deleteLikesData,
  } = useBlogCall();
  const { ip } = useIPAddress();
  const navigate = useNavigate();

  const handleOpenUpdateModal = () => setOpenUpdateModal(true);

  const handleModalClose = () => {
    setOpenUpdateModal(false);
    setInfo({
      title: "",
      image: "",
      category_id: "",
      status_id: "",
      content: "",
    });
  };

  const handleAddCommentClose = () => {
    setAddCommentsOpened(false);
    setCommentsInfo({
      contribution_id: id,
      title: "",
      content: "",
      user_id: "",
      username: "",
      likes_num: 0,
      dislikes_num: 0,
      comment_likes: [],
      comment_dislikes: [],
    });
  };

  const handleWriteCommentOpen = () => {
    if (currentUser) {
      setAddCommentsOpened(!addCommentsOpened);
    } else {
      navigate("/auth");
    }
  };

  const userId = users.filter((user) => {
    return user.username === currentUser;
  });

  const relatedComments =
    comments.length && comments.filter((comm) => comm.contribution_id === id);
  const likesOfThisBlog = likes?.filter((like) => like.contribution_id === id);

  useEffect(() => {
    // Bileşen yüklendiğinde gerekli verileri getir
    getContributions();
    getUsers();
    getLikes();
    getComments();
  }, []);

  useEffect(() => {
    // Bağımlılıklar değiştiğinde 'contributions' ve 'users' verileri güncellenmiş olur
    const data = contributions.filter((item) => item.id === id);
    setDetails(data[0]);

    const user = users.find((user) => user._id === data[0]?.user_id);
    setUsername(user?.username || "Deleted User");

    setInfo({
      id: data[0]?.id,
      title: data[0]?.title,
      image: data[0]?.image,
      category_id: data[0]?.category_id,
      status_id: data[0]?.status_id,
      content: data[0]?.content,
      comments: data[0]?.comments,
      likes_count: data[0]?.likes_count,
      date: data[0]?.publish_date.slice(0, 10),
      time: data[0]?.publish_date.slice(11, 19),
    });
  }, [contributions, users, id]);

  useEffect(() => {
    // likes değiştiğinde 'likeClicked' state güncellenir
    const userLiked = likes.some(
      (like) => like.user_id === userId[0]?.id && like.contribution_id === id
    );
    const ipLiked = likes.some(
      (like) => like.differ === ip && like.contribution_id === id
    );

    setLikeClicked(userLiked || ipLiked);
  }, [likes, userId, id, ip]);

  const handleLikeClick = () => {
    setLikeClicked(!likeClicked);

    if (!likeClicked) {
      const likeObject = userId[0]?.id
        ? { contribution_id: id, user_id: userId[0]?.id || "" }
        : { contribution_id: id, differ: ip };
      postLikesData("likes", likeObject);
    } else {
      const likeID = userId[0]?.id
        ? likes.find(
            (like) =>
              like.user_id === userId[0]?.id && like.contribution_id === id
          )._id
        : likes.find(
            (like) => like.differ === ip && like.contribution_id === id
          )._id;
      deleteLikesData("likes", likeID);
    }
  };

  return (
    <Container sx={{ minHeight: "80vh" }}>
      <Card
        sx={{
          width: 745,
          height: 700,
          display: "block",
          mx: "auto",
          marginTop: "2rem",
          backgroundColor: "#faf3e5",
        }}
      >
        <CardMedia
          component="img"
          alt={details?.title}
          height="250"
          sx={{
            width: "fit-content",
            margin: "auto",
            marginTop: "0.5rem",
            marginBottom: "-2rem",
          }}
          image={details?.image}
        />
        <CardContent
          sx={{
            marginTop: "2rem",
            height: 390,
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
          }}
        >
          <Typography
            gutterBottom
            variant="h5"
            component="div"
            sx={{ textAlign: "center" }}
          >
            {details?.title}
          </Typography>
          <p
            style={{
              fontFamily: "Roboto, Helvetica, Arial, sans-serif",
              overflow: "scroll",
              display: "-webkit-box",
              WebkitLineClamp: 12,
              WebkitBoxOrient: "vertical",
              color: "gray",
              fontWeight: "400",
              fontSize: "0.875rem",
              lineHeight: 1.43,
              letterSpacing: "0.01071em",
              marginTop: "0.7rem",
            }}
          >
            {details?.content}
          </p>
          <Grid
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <AccountCircleIcon />
              <Typography variant="body2" color="text.secondary">
                {username}
              </Typography>
            </Box>
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{ marginTop: "2rem", marginBottom: "1rem" }}
            >
              {info?.date} {info?.time}
            </Typography>
          </Grid>
        </CardContent>
        <CardActions
          sx={{
            display: "flex",
            alignItems: "baseline",
            justifyContent: "space-between",
          }}
        >
          <Grid
            item
            xs={8}
            sx={{
              width: "8rem",
              display: "flex",
              alignItems: "center",
              justifyContent: "flex-start",
            }}
          >
            <IconButton
              sx={{ color: likeClicked ? "red" : "default" }}
              onClick={handleLikeClick}
              aria-label="add to favorites"
            >
              <FavoriteIcon />
            </IconButton>
            <Typography sx={{ marginLeft: "-0.4rem" }}>
              {likesOfThisBlog?.length}
            </Typography>
            <IconButton
              sx={{ marginLeft: "0.5rem" }}
              aria-label="comment"
              onClick={() => setCommentsOpened(!commentsOpened)}
            >
              <ChatIcon />
            </IconButton>
            <Typography sx={{ marginLeft: "-0.4rem" }}>
              {details?.comments?.length}
            </Typography>
            <IconButton sx={{ marginLeft: ".5rem" }} aria-label="visibility">
              <VisibilityOutlinedIcon />
            </IconButton>
            <Typography sx={{ marginLeft: "-0.4rem" }}>
              {details?.post_views}
            </Typography>
          </Grid>
          <Grid>
            <Button
              onClick={handleWriteCommentOpen}
              size="medium"
              variant="contained"
              sx={{
                marginBottom: "1.2rem",
                backgroundColor: "#0068e3",
                color: "white",
                "&:hover": { backgroundColor: "#4290f0", color: "#ffcd44" },
              }}
            >
              Write Comment
            </Button>
          </Grid>
          {currentUser === username && (
            <Grid sx={{ width: "8rem" }}>
              <IconButton
                aria-label="edit"
                sx={{
                  marginBottom: "1rem",
                  "&:hover": { color: "green", scale: "1.2" },
                }}
                onClick={handleOpenUpdateModal}
              >
                <EditIcon />
              </IconButton>

              <IconButton
                onClick={() => deleteBlogData("blogs", id)}
                sx={{
                  marginBottom: ".8rem",
                  marginInlineStart: "1rem",
                  "&:hover": { color: "red", scale: "1.2" },
                }}
                aria-label="delete"
              >
                <DeleteIcon />
              </IconButton>
            </Grid>
          )}
        </CardActions>
      </Card>
      {addCommentsOpened && (
        <AddCommentForm
          id={id}
          commentsInfo={commentsInfo}
          setCommentsInfo={setCommentsInfo}
          handleAddCommentClose={handleAddCommentClose}
        />
      )}
      {commentsOpened &&
        relatedComments?.map((comment) => (
          <Grid item key={comment.id} sx={{ marginTop: "1rem" }}>
            <CommentsCard entry={comment} {...comment} ip={ip} />
          </Grid>
        ))}

      <Grid
        item
        xs={4}
        sx={{
          display: "flex",
          justifyContent: "center",
          marginTop: "3rem",
          marginBottom: "3rem",
        }}
      >
        <Button
          size="medium"
          onClick={() => navigate(-1)}
          variant="contained"
          sx={{ "&:hover": { backgroundColor: "#e2e55e" } }}
        >
          Go Back
        </Button>
      </Grid>

      <UpdateModal
        open={openUpdateModal}
        handleClose={handleModalClose}
        info={info}
        setInfo={setInfo}
      />
    </Container>
  );
};

export default Detail;
