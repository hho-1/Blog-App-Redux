import { Button, Container, FormControl, Grid, InputLabel, MenuItem, Select, TextField } from '@mui/material'
import React, { useEffect } from 'react'
import useBlogCall from '../../hooks/useBlogCall';
import { useSelector } from 'react-redux';


const AddCommentForm = ({commentsInfo, setCommentsInfo, handleAddCommentClose}) => {

    //const status = ["d", "p"]

    const { status } = useSelector(state => state.blog)

    const { postBlogData, getStatus } = useBlogCall();

    //console.log(status);
    
    useEffect(() => {
      getStatus()

      const statusData = status.map((stat) => {return stat.id})
      console.log(statusData);
      
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    

    const handleChange = (e) => {
        setCommentsInfo({ ...commentsInfo, [e.target.name]: e.target.value })
    }
    const handleSubmitComment = (e) => {
        e.preventdefault()
        handleAddCommentClose()

        console.log(commentsInfo);

        postBlogData("comments", commentsInfo);

        setCommentsInfo({
            title: "",
            content: "",
            nickname: "",
            status_id: ""
          });
    }

  return (
    <Container sx={{display:'flex', justifyContent:'center', }}>
        <Grid component="form" sx={{width: 650, backgroundColor:'#f8e8ba', padding:'1rem', margin:'1.5rem 0'}}>
            <TextField
                fullWidth
                id="title"
                name="title"
                label="Title"
                value={commentsInfo?.title || ""}
                onChange={handleChange}
                required
            />
            
            <TextField
                sx={{marginTop:1}}
                fullWidth
                id="nickname"
                name="nickname"
                label="Nickname"
                value={commentsInfo?.nickname}
                onChange={handleChange}
                required
            /> 
            <FormControl fullWidth sx={{marginTop:1}}>
                <InputLabel id="status">Status</InputLabel>
                <Select
                  labelId="status"
                  id="status"
                  name="status_id"
                  value={commentsInfo.status_id || ""}
                  label="Status"
                  required
                  onChange={handleChange}>
                    {status.map(item => (
                      <MenuItem value={item.id} key={item.id}>{item.name}</MenuItem>
                    ))}
                </Select>
            </FormControl>
            <TextField
                sx={{marginTop:1}}
                fullWidth
                id="content"
                name="content"
                label="Content"
                multiline
                rows={2}
                value={commentsInfo?.content}
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