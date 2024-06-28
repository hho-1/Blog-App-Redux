/* eslint-disable react-hooks/exhaustive-deps */
import { Button, Container, Grid } from '@mui/material'
import React, { useEffect, useState } from 'react'
import useBlogCall from '../hooks/useBlogCall';
import { useSelector } from 'react-redux';
import ImgMediaCard from '../components/blog/Card';
import { useNavigate } from 'react-router-dom';

const FavoriBlogs = () => {

  const { currentUser } = useSelector(state => state.auth);

  const [favoriBlogs, setFavoriBlogs] = useState([])
  
  const { contributions } = useSelector(state => state.blog);
  const { users } = useSelector(state => state.blog);
  const { likes } = useSelector(state => state.blog);

  const { getContributions, getUsers, getLikes } = useBlogCall();

  let navigate = useNavigate()

  useEffect(() => {
    
    getContributions();
    getUsers()
    getLikes()

    bringFavorites()

    // eslint-disable-next-line react-hooks/exhaustive-deps
    
  }, []);

  async function bringFavorites() {
    let blogs = []
    const data = await users.filter(function (user) {
      return user.username === currentUser; //"testUser1"
    });
    //console.log(users);

    const userLikes = await likes.filter((like) => {
      return like.user_id === data[0]._id;
    });
    //console.log(userLikes);

    for (let i = 0; i < userLikes.length; i++) {
      blogs.push(...contributions.filter((blog) => {
      return blog._id === userLikes[i].contribution_id;
    }))
    }
 
    //console.log(blogs);
    setFavoriBlogs(blogs);
    //console.log(favoriBlogs);
  }

  return (
    <Container sx={{height:'fit-content', minHeight:'82vh', marginBottom:'2rem'}}>
      <Grid
        container
        alignItems="center"
        display={"flex"}
        justifyContent="center"
        spacing={3}
        mt={3}>
        {favoriBlogs?.map((item,index) => (
          <Grid item key={index}>
            <ImgMediaCard entry={item} {...item}/>
          </Grid>
        ))}
        
      </Grid>
      <Grid item xs={4} sx={{marginTop:'3rem', marginLeft:'27vw', marginBottom:'3rem'}}>
        <Button size="medium" onClick={()=>navigate(-1)} variant='contained' sx={{"&:hover": {backgroundColor: '#e2e55e'}}}>Go Back</Button>
      </Grid>
    </Container>
  )
}

export default FavoriBlogs