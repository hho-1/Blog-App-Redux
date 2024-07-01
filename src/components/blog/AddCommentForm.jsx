import { Button, Container, Grid, TextField } from '@mui/material'
import React from 'react'
import useBlogCall from '../../hooks/useBlogCall';
import { useSelector } from 'react-redux';



const AddCommentForm = ({id, commentsInfo, setCommentsInfo, handleAddCommentClose}) => {

    const { postCommentData } = useBlogCall();

    const { currentUser } = useSelector(state => state.auth);
    const { users } = useSelector(state => state.blog);

    const userId = users.filter((user) => {return user.username === currentUser})

    //console.log(commentsInfo);
    

    const handleChange = (e) => {
        setCommentsInfo({...commentsInfo, [e.target.name]: e.target.value, user_id: userId[0]?._id, username: userId[0]?.username})
    }
    const handleSubmitComment = (e) => {
        e.preventDefault()
        handleAddCommentClose()

        console.log(commentsInfo);

        postCommentData("comments", commentsInfo);

        setCommentsInfo({
            contribution_id: id,
            content: "",
            title: "",
            user_id: "",
            username: "",
            likes_num: 0,
            dislikes_num: 0,
            comment_likes: [],
            comment_dislikes: []
        });
    }

  return (
    <Container sx={{ display: "flex", justifyContent: "center" }}>
      <Grid
        component="form"
        sx={{
          width: 650,
          backgroundColor: "primary.addComment",
          padding: "1rem",
          margin: "1.5rem 0",
        }}
      >
        <TextField
          sx={{ marginTop: 1 }}
          fullWidth
          id="title"
          name="title"
          label="Title"
          value={commentsInfo?.title || ""}
          onChange={handleChange}
        />
        <TextField
          sx={{ marginTop: 1 }}
          fullWidth
          id="content"
          name="content"
          label="Content"
          multiline
          rows={4}
          value={commentsInfo?.content || ""}
          onChange={handleChange}
          required
        />

        <Button
          onClick={handleSubmitComment}
          variant="contained"
          fullWidth
          type="submit"
          sx={{
              marginTop: 3,
              color: "primary.textMain",
            backgroundColor: "primary.buttonColor",
            "&:hover": { backgroundColor: "primary.buttonHover" },
          }}
        >
          Add Comment
        </Button>
      </Grid>
    </Container>
  );
}

export default AddCommentForm