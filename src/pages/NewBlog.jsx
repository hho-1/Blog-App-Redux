import React, { useEffect, useState } from 'react';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { Button, TextField, Typography, Box, Container, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import { useSelector } from 'react-redux';
import useBlogCall from '../hooks/useBlogCall';


const validationSchema = yup.object({
  title: yup
    .string('Enter title')
    .required('Title is required'),
  imageURL: yup
    .string('Enter image')
    .required('Image is required'),
  category_id: yup
    .string('Choose category')
    .required('Category is required'),
  status_id: yup
    .string('Choose status')
    .required('Status is required'),
  content: yup
    .string('Enter content here')
    .required('Content is required'),
  
});

const NewBlog = () => {

  const { categories } = useSelector(state => state.blog);
  const { getCategories } = useBlogCall();

  const [info, setInfo] = useState({
    title: "",
    imageURL: "",
    category_id: "",
    status_id: "",
    content: "",
});

useEffect(() => {
  
  getCategories()
// eslint-disable-next-line react-hooks/exhaustive-deps
}, []);

const { postStockData } = useBlogCall();

  const formik = useFormik({
    initialValues: info,
    validationSchema: validationSchema,
    onSubmit: (values, actions) => {
      //alert(JSON.stringify(values, null, 2));
      
      actions.resetForm();
      actions.setSubmitting(false);
    },
  });

  const handleChange = e => {
    
    setInfo({ ...info, [e.target.name]: (e.target.value) });
    console.log(info);
  };
  const handleSubmit = e => {
    e.preventDefault();
    console.log(info);

    postStockData("blogs", info);

  };

  const status = ["d", "p"]

  return (
    <Container sx={{height:'75vh'}} >
      <Box sx={{width: 450, margin: 'auto', marginTop:'5rem'}}>
        <form onSubmit={formik.handleSubmit}>
        
        <Typography sx={{marginBottom: 4, textAlign:'center'}} variant='h4' >
          New Blog 
        </Typography>
        <TextField
          fullWidth
          id="title"
          name="title"
          label="Title"
          value={formik.values.title}
          onChange={handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.title && Boolean(formik.errors.title)}
          helperText={formik.touched.title && formik.errors.title}
        />
        <TextField
          sx={{marginTop:1}}
          fullWidth
          id="imageURL"
          name="imageURL"
          label="Image URL"
          value={formik.values.imageURL}
          onChange={handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.imageURL && Boolean(formik.errors.imageURL)}
          helperText={formik.touched.imageURL && formik.errors.imageURL}
        />
        <FormControl fullWidth sx={{marginTop:1}}>
          <InputLabel id="category-label">Category</InputLabel>
            <Select
              labelId="category-label"
              id="category"
              name="category_id"
              value={formik.values.category_id}
              label="Category"
              required
              onChange={handleChange}>
                {categories?.map(item => (
                  <MenuItem value={item.id} key={item.id}>{item.name}</MenuItem>
                ))}
            </Select>
        </FormControl>
        <FormControl fullWidth sx={{marginTop:1}}>
            <InputLabel id="status-label">Status</InputLabel>
            <Select
              labelId="status-label"
              id="status"
              name="status"
              value={info.status_id}
              required
              label="Status"
              onChange={handleChange}>
                {status.map(item => (
                  <MenuItem value={item} key={item}>{item}</MenuItem>
                ))}
            </Select>
        </FormControl>
        <TextField
          sx={{marginTop:1, width:450}}
          id="content"
          label="Content"
          multiline
          rows={2}
          value={formik.values.content}
          onChange={handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.content && Boolean(formik.errors.content)}
          helperText={formik.touched.content && formik.errors.content}
          
        />
      
       
        <Button color="primary" onSubmit={handleSubmit} variant="contained" fullWidth type="submit" sx={{marginTop: 3, "&:hover": {backgroundColor:'#57c1ff'}}}>
          Add Blog
        </Button>
        
      </form>
      </Box>
      
    </Container>
  );
};


//ReactDOM.render(<RegisterForm />, document.getElementById('root'));
export default NewBlog;