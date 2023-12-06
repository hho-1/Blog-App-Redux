import { Button, FormControl, InputLabel, MenuItem, Select, TextField } from '@mui/material'
import React from 'react'

const NewBlogForm = ({
    values,
    handleChange,
    errors,
    touched,
    handleBlur,
    info,
    categories,
    status
  }) => {
  return (
    <div>
        <TextField
            fullWidth
            id="title"
            name="title"
            label="Title"
            value={values.title}
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched.title && Boolean(errors.title)}
            helperText={errors.title}
          />
          <TextField
            sx={{marginTop:1}}
            fullWidth
            id="imageURL"
            name="imageURL"
            label="Image URL"
            value={values.imageURL}
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched.imageURL && Boolean(errors.imageURL)}
            helperText={errors.imageURL}
          /> 
          <FormControl fullWidth sx={{marginTop:1}}>
            <InputLabel id="category">Category</InputLabel>
            <Select
              labelId="category"
              id="category"
              name="category_id"
              value={info?.category_id || ""}
              label="Category"
              required
              onChange={handleChange}>
                {categories?.map(item => (
                  <MenuItem value={item.id} key={item.id}>{item.name}</MenuItem>
                ))}
            </Select>
        </FormControl>
        <FormControl fullWidth sx={{marginTop:1}}>
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
          sx={{marginTop:1, width:450}}
          id="content"
          label="Content"
          name="content"
          multiline
          rows={2}
          value={values.content}
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched.content && Boolean(errors.content)}
            helperText={errors.content}
          
        />
      
       
        <Button color="primary" variant="contained" fullWidth type="submit" sx={{marginTop: 3, "&:hover": {backgroundColor:'#57c1ff'}}}>
          Add Blog
        </Button>
    </div>
  )
}

export default NewBlogForm