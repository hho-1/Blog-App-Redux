/* eslint-disable react-hooks/exhaustive-deps */
import { Container, Grid } from '@mui/material'
import React, { useEffect } from 'react'
import useBlogCall from '../hooks/useBlogCall';
import { useSelector } from 'react-redux';
import ImgMediaCard from '../components/blog/Card';

const DashBoard = () => {

  //const [data, setData] = useState([])
const { contributions } = useSelector(state => state.blog);
  const { getContributions } = useBlogCall();
  
  

  

  useEffect(() => {
    
    getContributions();
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
        {contributions?.map(entry => (
          <Grid item key={entry.id}>
            <ImgMediaCard entry={entry}/>
          </Grid>
        ))}
      </Grid>

    </Container>
  )
}

export default DashBoard