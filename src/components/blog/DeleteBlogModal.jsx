import { Box, Button, Grid, Modal, Typography } from "@mui/material";
import React from "react";
import useBlogCall from "../../hooks/useBlogCall";
import { useNavigate, useParams } from "react-router-dom";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
    bgcolor: "primary.addComment",
  color:"primary.textMain",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const DeleteBlogModal = ({ open, handleClose }) => {
    const { deleteBlogData } = useBlogCall();
    const { id } = useParams();
    const navigate = useNavigate();

    function handleBlogDelete() {
        deleteBlogData("blogs", id)
        navigate(-1)
    }
  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Are you sure to delete this blog?
          </Typography>
          <Grid sx={{ display: "flex", justifyContent: "space-evenly", marginTop:"1rem" }}>
            <Button
              sx={{
                backgroundColor: "tomato",
                color: "primary.textMain",
                ":hover": { bgcolor: "red" },
              }}
              onClick={handleBlogDelete}
            >
              Yes
            </Button>
                      <Button
                          onClick={handleClose}
              sx={{
                backgroundColor: "darkBlue",
                color: "white",
                ":hover": { bgcolor: "blue" },
              }}
            >
              No
            </Button>
          </Grid>
        </Box>
      </Modal>
    </div>
  );
};

export default DeleteBlogModal;
