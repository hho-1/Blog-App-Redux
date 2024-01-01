/* eslint-disable react/style-prop-object */
import { Button, Card, CardContent, CardMedia, Container, Grid, Typography } from '@mui/material';
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
    <Container sx={{height:'82vh'}}>
      <Card sx={{height:'50vh', width: '20vw', marginTop: '10rem', mx:'auto'}}>
        <CardMedia
          component="img"
          alt={relatedUser[0]?.username}
          height="130em"
          sx={{width:'fit-content', margin:'auto', marginTop:'0.5rem'}}
          image={relatedUser[0]?.image}
        />
        <CardContent>
          <Typography variant='h5'><span style={{color:'red'}}>User ID:</span> {relatedUser[0]?.id}</Typography>
          <Typography variant='h5'><span style={{color:'red'}}>Username:</span> {relatedUser[0]?.username}</Typography>
          <Typography variant='h5'><span style={{color:'red'}}>First Name:</span> {relatedUser[0]?.first_name || ""}</Typography>
          <Typography variant='h5'><span style={{color:'red'}}>Last Name:</span> {relatedUser[0]?.last_name || ""}</Typography>
          <Typography variant='h5'><span style={{color:'red'}}>Email:</span> {relatedUser[0]?.email || ""}</Typography>
          <Typography variant='h5'><span style={{color:'red'}}>Bio:</span> {relatedUser[0]?.bio || ""}</Typography>
        </CardContent>
        <Grid item xs={4} sx={{marginInline: '8vw', marginTop:'4rem'}}>
          <Button size="medium"  variant='contained' sx={{"&:hover": {backgroundColor: '#e2e55e'}}}  onClick={handleOpenUpdateModal}>Edit</Button>
        </Grid>
      </Card>
      <UpdateModal open={openUpdateModal} handleClose={handleModalClose} info={info} setInfo={setInfo} user={user}/>
    </Container>
    
  )
}

export default Profile