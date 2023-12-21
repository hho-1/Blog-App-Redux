/* eslint-disable react-hooks/exhaustive-deps */
import { Container, Grid } from '@mui/material'
import React, { useEffect, useState } from 'react'
import useBlogCall from '../hooks/useBlogCall';
import { useSelector } from 'react-redux';
import ImgMediaCard from '../components/blog/Card';
import CategoryBar from '../components/categoryBar';



const DashBoard = () => {

  const { contributions } = useSelector(state => state.blog);

  const { getContributions } = useBlogCall();
  const { getCategories } = useBlogCall();

  

  useEffect(() => {
    
    getContributions();
    getCategories()
    // eslint-disable-next-line react-hooks/exhaustive-deps
    
  }, []);

  const [buttonName, setButtonName] = useState('all')
  const [isFiltered, setIsFiltered] = useState(false)

  //console.log(contributions);
  return (
    <>
    <CategoryBar setButtonName={setButtonName } setIsFiltered={setIsFiltered}/>
    <Container sx={{height:'fit-content', minHeight:'82vh', marginBottom:'2rem'}}>
      
      <Grid
        container
        alignItems="center"
        display={"flex"}
        justifyContent="center"
        spacing={3}
        mt={3}>
        {isFiltered ? (contributions.filter((blog) => {
                return blog.category_name === buttonName;
              }).map((filteredEntry, index) => {return <ImgMediaCard key={index} {...filteredEntry}/>})
            ) 
            : 
            (
              contributions.map((blog, index) => {
                
                return <ImgMediaCard key={index} {...blog}/>
              })
            )
        }
      </Grid>

    </Container>
    </>
  )
}

export default DashBoard