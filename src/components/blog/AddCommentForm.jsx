import { Button, Container, Grid, TextField } from '@mui/material'
import React from 'react'
import useBlogCall from '../../hooks/useBlogCall';
import { useSelector } from 'react-redux';



const AddCommentForm = ({id, commentsInfo, setCommentsInfo, handleAddCommentClose}) => {

    const { postCommentData } = useBlogCall();

    const { currentUser } = useSelector(state => state.auth);

    //console.log(commentsInfo);
    

    const handleChange = (e) => {
        setCommentsInfo({ ...commentsInfo, [e.target.name]: e.target.value, contribution_id: id })
    }
    const handleSubmitComment = (e) => {
        e.preventDefault()
        handleAddCommentClose()

        console.log(commentsInfo);

        postCommentData("comments", commentsInfo);

        setCommentsInfo({
            contribution_id: id,
            content: "",
            title: ""
        });
    }

  return (
    <Container sx={{display:'flex', justifyContent:'center', }}>
        <Grid component="form" sx={{width: 650, backgroundColor:'#f8e8ba', padding:'1rem', margin:'1.5rem 0'}}>
            
            <TextField
                
                fullWidth
                id="username"
                name="username"
                label="Username"
                value={currentUser}
                onChange={handleChange}
                required
                disabled
            />
            <TextField
                sx={{marginTop:1}}
                fullWidth
                id="title"
                name="title"
                label="Title"
                value={commentsInfo?.title || ""}
                onChange={handleChange}
            />
            <TextField
                sx={{marginTop:1}}
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
      
       
            <Button onClick={handleSubmitComment} color="secondary" variant="contained" fullWidth type="submit" sx={{marginTop: 3, "&:hover": {backgroundColor:'#57c1ff'}}}>
                Add Comment
            </Button>

        </Grid>
    </Container>
  )
}

export default AddCommentForm