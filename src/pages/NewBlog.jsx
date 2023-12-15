import React, { useEffect, useState } from 'react';
import { Button, TextField, Typography, Box, Container, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import { useSelector } from 'react-redux';
import useBlogCall from '../hooks/useBlogCall';



const NewBlog = () => {

  const { categories } = useSelector(state => state.blog);
  const { getCategories } = useBlogCall();

  const [info, setInfo] = useState({
    title: "",
    image: "",
    category: 0,
    status: "",
    content: "",
});

useEffect(() => {
  
  getCategories()

  //console.log(categories);
// eslint-disable-next-line react-hooks/exhaustive-deps
}, []);

const { postBlogData } = useBlogCall();


  const handleChange = (e) => {
    setInfo({ ...info, [e.target.name]: (e.target.value) });
  };

  const handleSubmit = e => {
    e.preventDefault();
    console.log(info);

    postBlogData("blogs", info);

    setInfo({ 
      title: "",
      image: "",
      category: "",
      status: "",
      content: "" })

  };

  const status = ["d", "p"]


  return (
    <Container sx={{height:'80vh'}} >
      <Box sx={{width: 550, margin: 'auto', marginTop:'5rem'}}>
          
          <Box component="form" onSubmit={handleSubmit}>
          <Typography sx={{marginBottom: 4, textAlign:'center'}} variant='h4' >
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
            sx={{marginTop:1}}
            fullWidth
            id="image"
            name="image"
            label="Image URL"
            value={info?.image}
            onChange={handleChange}
            
          /> 
          <FormControl fullWidth sx={{marginTop:1}}>
            <InputLabel id="category">Category</InputLabel>
            <Select
              labelId="category"
              id="category"
              name="category"
              value={info?.category || ""}
              label="Category"
              required
              onChange={handleChange}>
                {categories?.map(item => (
                  <MenuItem value={item.id} key={item.id}>{item.name}</MenuItem>
                ))}
            </Select>
        </FormControl>
        <FormControl fullWidth sx={{marginTop:1, marginBottom: '1rem'}}>
            <InputLabel id="status">Status</InputLabel>
            <Select
              labelId="status"
              id="status"
              name="status"
              value={info?.status || ""}
              required
              label="Status"
              onChange={handleChange}>
                {status.map(item => (
                  <MenuItem value={item} key={item}>{item}</MenuItem>
                ))}
            </Select>
        </FormControl>
        <TextField
            sx={{marginTop:1, width:550}}
            id="content"
            label="Content"
            name="content"
            multiline
            rows={5}
            value={info?.content}
            onChange={handleChange}
            required
        />
        
        <Button color="primary" onClick={handleSubmit} variant="contained" fullWidth type="submit" sx={{marginTop: 3, "&:hover": {backgroundColor:'#57c1ff'}}}>
          Add Blog
        </Button>
        
        </Box>
      </Box>
      
    </Container>
  );
};


//ReactDOM.render(<RegisterForm />, document.getElementById('root'));
export default NewBlog;