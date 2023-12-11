import Box from "@mui/material/Box"
import Button from "@mui/material/Button"
import TextField from "@mui/material/TextField"
import Modal from "@mui/material/Modal"
import { Typography } from "@mui/material"
import { useEffect } from "react"
import useAuthCall from "../../hooks/useAuthCall"

export default function UpdateModal({ open, handleClose, info, setInfo }) {
  const { putUserData } = useAuthCall()
  const { getUser } = useAuthCall();

    //let navigate = useNavigate()

    useEffect(() => {
      getUser()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

  const handleChange = (e) => {
    const { name, value } = e.target
    setInfo({ ...info, [name]: (value) })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    putUserData(info)
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
                        Update User 
                    </Typography>
                    <TextField
                        fullWidth
                        id="username"
                        name="username"
                        label="Username"
                        value={info?.username || ""}
                        onChange={handleChange}
                        required
                    />
                    <TextField
                        sx={{marginTop:1}}
                        fullWidth
                        id="first_name"
                        name="first_name"
                        label="first_name"
                        value={info?.first_name || ""}
                        onChange={handleChange}
                        required
            
                    /> 
                    <TextField
                        sx={{marginTop:1}}
                        fullWidth
                        id="last_name"
                        name="last_name"
                        label="last_name"
                        value={info?.last_name || ""}
                        onChange={handleChange}
                        required
            
                    /> 
                    <TextField
                        sx={{marginTop:1}}
                        fullWidth
                        id="email"
                        name="email"
                        label="email"
                        value={info?.email || ""}
                        onChange={handleChange}
                        required
            
                    /> 
                    <TextField
                        sx={{marginTop:1}}
                        fullWidth
                        id="image"
                        name="image"
                        label="image"
                        value={info?.image || ""}
                        onChange={handleChange}
            
                    /> 
                    
                    
                    <TextField
                      sx={{marginTop:1, width:450}}
                      id="bio"
                      label="bio"
                      name="bio"
                      multiline
                      rows={2}
                      value={info?.bio || ""}
                      onChange={handleChange}
                            
                    />

                    <Button color="primary" variant="contained" fullWidth type="submit" sx={{marginTop: 2, "&:hover": {backgroundColor:'#57c1ff'}}}>
                      Update User
                    </Button>
                            
                </Box>
            </Box>
        </Box>
        
      </Modal>
    </Box>
  )
}
