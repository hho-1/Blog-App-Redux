/* eslint-disable react/style-prop-object */
import { Box, Button, Card, CardContent, CardMedia, Container, Grid, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import UpdateModal from '../components/auth/UserUpdateModal';
import { useParams } from 'react-router-dom';

const Profile = () => {

  const {id} = useParams()

  const { users } = useSelector(state => state.blog);
  const { user } = useSelector(state => state.auth);

  const relatedUser = users.filter((userr) => userr._id === id)
  

  const [info, setInfo] = useState({
    id: id,
    username: "",
    first_name: "",
    last_name: "",
    email: "",
    bio: "",
    image:""
  });

  const [openUpdateModal, setOpenUpdateModal] = useState(false);
    const handleOpenUpdateModal = () => setOpenUpdateModal(true);
    
    const handleModalClose = () => {
      
      setOpenUpdateModal(false);
      setInfo({
        username: "",
        first_name: "",
        last_name: "",
        email: "",
        bio: "",
        image:""
      });
    };
    useEffect(() => {        //axios ile setDetails birlikte useEffect disinda olursa sonsuz döngü olur
        
      // const data = contributions.filter((item) => {return item.id === Number(id)})
      // setDetails(data[0])
      //console.log(data);

      setInfo({
        id: id,
        username: relatedUser[0]?.username,
        first_name: relatedUser[0]?.first_name,
        last_name: relatedUser[0]?.last_name,
        email: relatedUser[0]?.email,
        bio: relatedUser[0]?.bio,
        image: relatedUser[0]?.image
      });
      
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Box
      sx={{ backgroundColor: "primary.backgroundMain", paddingTop: "10rem" }}
    >
      <Container sx={{ minHeight: "68vh" }}>
        <Card sx={{ minHeight: "50vh", width: "25vw", mx: "auto" }}>
          <CardMedia
            component="img"
            alt={relatedUser[0]?.username}
            height="130em"
            sx={{ width: "fit-content", margin: "auto", marginTop: "0.5rem" }}
            image={relatedUser[0]?.image}
          />
          <CardContent>
            <Typography sx={{ wordWrap: "break-word" }} variant="h5">
              <span style={{ color: "red" }}>User ID:</span>{" "}
              {relatedUser[0]?.id}
            </Typography>
            <Typography sx={{ wordWrap: "break-word" }} variant="h5">
              <span style={{ color: "red" }}>Username:</span>{" "}
              {relatedUser[0]?.username}
            </Typography>
            <Typography sx={{ wordWrap: "break-word" }} variant="h5">
              <span style={{ color: "red" }}>First Name:</span>{" "}
              {relatedUser[0]?.first_name || ""}
            </Typography>
            <Typography sx={{ wordWrap: "break-word" }} variant="h5">
              <span style={{ color: "red" }}>Last Name:</span>{" "}
              {relatedUser[0]?.last_name || ""}
            </Typography>
            <Typography sx={{ wordWrap: "break-word" }} variant="h5">
              <span style={{ color: "red" }}>Email:</span>{" "}
              {relatedUser[0]?.email || ""}
            </Typography>
            <Typography sx={{ wordWrap: "break-word" }} variant="h5">
              <span style={{ color: "red" }}>Bio:</span>{" "}
              {relatedUser[0]?.bio || ""}
            </Typography>
          </CardContent>
          <Grid item xs={4} sx={{ display:"flex", justifyContent:"center" }}>
            <Button
              size="medium"
              variant="contained"
              sx={{ "&:hover": { backgroundColor: "primary.buttonHover" } }}
              onClick={handleOpenUpdateModal}
            >
              Edit
            </Button>
          </Grid>
        </Card>
        <UpdateModal
          open={openUpdateModal}
          handleClose={handleModalClose}
          info={info}
          setInfo={setInfo}
          user={user}
        />
      </Container>
    </Box>
  );
}

export default Profile