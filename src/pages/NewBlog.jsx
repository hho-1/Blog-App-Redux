import React, { useEffect, useState } from 'react';
import { Button, TextField, Typography, Box, Container, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import { useSelector } from 'react-redux';
import useBlogCall from '../hooks/useBlogCall';



const NewBlog = () => {

  const { categories } = useSelector(state => state.blog);
  const { getCategories, getUsers, getStatus, postBlogData } = useBlogCall();

  const { currentUser } = useSelector(state => state.auth);

  

const [userId, setUserId] = useState("")

useEffect(() => {
  
  getCategories()

  getStatus()
  getUsers()

  const userGetData = users.filter((user) => {return user.username === currentUser})
  
  setUserId(userGetData[0]?.id);
  
// eslint-disable-next-line react-hooks/exhaustive-deps
}, []);

  const [info, setInfo] = useState({
    user_id: userId,
    title: "",
    image: "",
    category_id: "",
    status_id: "",
    content: "",
  });


  const { status, users } = useSelector(state => state.blog)

  
  const handleChange = (e) => {
    setInfo({ ...info, [e.target.name]: (e.target.value), user_id: userId });
    
  };

  
  const handleSubmit = e => {
    e.preventDefault();
    //console.log(info);

    postBlogData("blogs", info);

    setInfo({ 
      user_id: userId,
      title: "",
      image: "",
      category_id: "",
      status_id: "",
      content: "" })
  };

  //const status = ["d", "p"]


  return (
    <Box sx={{ backgroundColor: "primary.backgroundMain", p:"5rem" }}>
      <Container sx={{ height: "68vh" }}>
        <Box sx={{ width: 550, margin: "auto" }}>
          <Box component="form" onSubmit={handleSubmit}>
            <Typography
              sx={{ marginBottom: 4, textAlign: "center", color:"primary.textMain" }}
              variant="h4"
            >
              New Blog
            </Typography>
            <TextField
              fullWidth
              id="title"
              name="title"
              label="Title"
              value={info.title}
              onChange={handleChange}
              required
            />
            <TextField
              sx={{ marginTop: 1 }}
              fullWidth
              id="image"
              name="image"
              label="Image URL"
              value={info?.image}
              onChange={handleChange}
            />
            <FormControl fullWidth sx={{ marginTop: 1 }}>
              <InputLabel id="category">Category</InputLabel>
              <Select
                labelId="category"
                id="category"
                name="category_id"
                value={info?.category_id || ""}
                label="Category"
                required
                onChange={handleChange}
              >
                {categories?.map((item) => (
                  <MenuItem value={item.id} key={item.id}>
                    {item.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <FormControl fullWidth sx={{ marginTop: 1, marginBottom: "1rem" }}>
              <InputLabel id="status">Status</InputLabel>
              <Select
                labelId="status"
                id="status"
                name="status_id"
                value={info?.status_id || ""}
                required
                label="Status"
                onChange={handleChange}
              >
                {status.map((item) => (
                  <MenuItem value={item.id} key={item.id}>
                    {item.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <TextField
              sx={{ marginTop: 1, width: 550 }}
              id="content"
              label="Content"
              name="content"
              multiline
              rows={5}
              value={info?.content}
              onChange={handleChange}
              required
            />

            <Button
              color="primary"
              onClick={handleSubmit}
              variant="contained"
              fullWidth
              type="submit"
              sx={{ marginTop: 3, "&:hover": { backgroundColor: "#57c1ff" } }}
            >
              Add Blog
            </Button>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};


//ReactDOM.render(<RegisterForm />, document.getElementById('root'));
export default NewBlog;