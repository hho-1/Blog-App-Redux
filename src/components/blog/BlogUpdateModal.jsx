import Box from "@mui/material/Box"
import Button from "@mui/material/Button"
import TextField from "@mui/material/TextField"
import Modal from "@mui/material/Modal"
import InputLabel from "@mui/material/InputLabel"
import MenuItem from "@mui/material/MenuItem"
import FormControl from "@mui/material/FormControl"
import Select from "@mui/material/Select"
import { useSelector } from "react-redux"
import useBlogCall from "../../hooks/useBlogCall"
import { Typography } from "@mui/material"
import { useEffect } from "react"

export default function UpdateModal({ open, handleClose, info, setInfo }) {
  const { putBlogData } = useBlogCall()
  const { categories } = useSelector((state) => state.blog)
  const { getCategories } = useBlogCall();

    //let navigate = useNavigate()

    const status = ["d", "p"]
    useEffect(() => {
        getCategories()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

  const handleChange = (e) => {
    const { name, value } = e.target
    setInfo({ ...info, [name]: (value) })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    putBlogData("blogs", info)
    //navigate("/blogs/" + info.id)
    handleClose()
    setInfo({})
  }
  
  return (
    <Box>
      <Modal
        open={open}
        onClose={() => {
            setInfo({})
          handleClose()
        }}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={{width: 500, height: 550, margin:'auto', backgroundColor:'white'}}>
            <Box sx={{width: 450, margin: 'auto', marginTop:'10rem', backgroundColor:'white'}}>
          
                <Box component="form" onSubmit={handleSubmit}>
                    <Typography sx={{marginBottom: 4, textAlign:'center'}} variant='h4' >
                        Update Blog 
                    </Typography>
                    <TextField
                        fullWidth
                        id="title"
                        name="title"
                        label="Title"
                        value={info?.title || ""}
                        onChange={handleChange}
                        required
                    />
                    <TextField
                        sx={{marginTop:1}}
                        fullWidth
                        id="image"
                        name="image"
                        label="Image URL"
                        value={info?.image || ""}
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
                      rows={4}
                      value={info?.content || ""}
                      onChange={handleChange}
                      required
                            
                    />

                    <Button color="primary" variant="contained" fullWidth type="submit" sx={{marginTop: 3, "&:hover": {backgroundColor:'#57c1ff'}}}>
                      Add Blog
                    </Button>
                            
                </Box>
            </Box>
        </Box>
        
      </Modal>
    </Box>
  )
}
