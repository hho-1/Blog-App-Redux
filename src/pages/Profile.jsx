/* eslint-disable react/style-prop-object */
import { Button, Card, CardContent, CardMedia, Container, Grid, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import UpdateModal from '../components/auth/UserUpdateModal';

const Profile = () => {

  const { user } = useSelector(state => state.auth);

  const [info, setInfo] = useState({
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
        username: user?.username,
        first_name: user?.first_name,
        last_name: user?.last_name,
        email: user?.email,
        bio: user?.bio,
        image: user?.image
      });
      
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Container sx={{height:'82vh'}}>
      <Card sx={{height:'50vh', width: '20vw', marginTop: '10rem', mx:'auto'}}>
        <CardMedia
          component="img"
          alt={user?.username}
          height="130em"
          sx={{width:'fit-content', margin:'auto', marginTop:'0.5rem'}}
          image={user?.image}
        />
        <CardContent>
          <Typography variant='h5'><span style={{color:'red'}}>User ID:</span> {user?.id}</Typography>
          <Typography variant='h5'><span style={{color:'red'}}>Username:</span> {user?.username}</Typography>
          <Typography variant='h5'><span style={{color:'red'}}>First Name:</span> {user?.first_name || ""}</Typography>
          <Typography variant='h5'><span style={{color:'red'}}>Last Name:</span> {user?.last_name || ""}</Typography>
          <Typography variant='h5'><span style={{color:'red'}}>Email:</span> {user?.email || ""}</Typography>
          <Typography variant='h5'><span style={{color:'red'}}>Bio:</span> {user?.bio || ""}</Typography>
        </CardContent>
        <Grid item xs={4} sx={{marginInline: '8vw', marginTop:'4rem'}}>
          <Button size="medium"  variant='contained' sx={{"&:hover": {backgroundColor: '#e2e55e'}}}  onClick={handleOpenUpdateModal}>Edit</Button>
        </Grid>
      </Card>
      <UpdateModal open={openUpdateModal} handleClose={handleModalClose} info={info} setInfo={setInfo} />
    </Container>
    
  )
}

export default Profile