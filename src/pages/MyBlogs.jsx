/* eslint-disable react-hooks/exhaustive-deps */
import { Button, Container, Grid } from '@mui/material'
import React, { useEffect, useState } from 'react'
import useBlogCall from '../hooks/useBlogCall';
import { useSelector } from 'react-redux';
import ImgMediaCard from '../components/blog/Card';
import { useNavigate } from 'react-router-dom';

const MyBlogs = () => {

  const { currentUser } = useSelector(state => state.auth);

  const [myBlogs, setMyBlogs] = useState([])
  
  const { contributions } = useSelector(state => state.blog);

  const { getContributions } = useBlogCall();

  let navigate = useNavigate()

  useEffect(() => {
    
    getContributions();

    const data = contributions.filter(function(entry){
      return entry.author === currentUser              //"muhittin"
    })
    // console.log(data);
    setMyBlogs(data)
    //console.log(myBlogs);

    // eslint-disable-next-line react-hooks/exhaustive-deps
    
  }, []);

  return (
    <Container sx={{height:'fit-content', minHeight:'82vh', marginBottom:'2rem'}}>
      <Grid
        container
        alignItems="center"
        display={"flex"}
        justifyContent="center"
        spacing={3}
        mt={3}>
        {myBlogs?.map(item => (
          <Grid item key={item.id}>
            <ImgMediaCard entry={item} {...item}/>
          </Grid>
        ))}
        <Grid item xs={4} sx={{marginTop:'3rem', marginLeft:'14vw', marginBottom:'3rem'}}>
          <Button size="medium" onClick={()=>navigate(-1)} variant='contained' sx={{"&:hover": {backgroundColor: '#e2e55e'}}}>Go Back</Button>
        </Grid>
      </Grid>

    </Container>
  )
}

export default MyBlogs