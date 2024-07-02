/* eslint-disable react-hooks/exhaustive-deps */
import { Box, Container, Grid } from '@mui/material'
import React, { useEffect, useState } from 'react'
import useBlogCall from '../hooks/useBlogCall';
import { useSelector } from 'react-redux';
import ImgMediaCard from '../components/blog/Card';
import CategoryBar from '../components/categoryBar';



const DashBoard = (/* {handleLikeClick, likeClicked, setLikeClicked, likesNum, setLikesNum} */) => {

  const { contributions } = useSelector(state => state.blog);

  const { getContributions, getCategories, getLikes } = useBlogCall();


  useEffect(() => {
    
    getContributions();
    getCategories()
    getLikes()
    // eslint-disable-next-line react-hooks/exhaustive-deps
    
  }, []);

  
  const [isFiltered, setIsFiltered] = useState(false)
  const [categoryId, setCategoryId] = useState("")

  //console.log(isFiltered);
  return (
    <Box sx={{ backgroundColor: "primary.backgroundMain"}}>
      <CategoryBar
        setIsFiltered={setIsFiltered}
        setCategoryId={setCategoryId}
      />
      <Container
        sx={{ height: "fit-content", minHeight: "82vh", paddingBottom:"2rem" }}
      >
        <Grid
          container
          alignItems="center"
          display={"flex"}
          justifyContent="center"
          spacing={3}
          mt={3}
        >
          {isFiltered
            ? contributions?.filter((blog) => {
                  return (
                    blog.category_id === categoryId &&
                    blog.status_id === "6684291731fc068c3f0d26eb"
                  );
                })
                .map((filteredEntry, index) => {
                  return (
                    <ImgMediaCard
                      key={index}
                      {...filteredEntry} /* handleLikeClick={handleLikeClick} likeClicked={likeClicked} setLikeClicked={setLikeClicked} likesNum={likesNum} setLikesNum={setLikesNum} */
                    />
                  );
                })
            : contributions?.filter((blog) => {
                  return blog.status_id === "6684291731fc068c3f0d26eb";
                })
                .map((blog, index) => {
                  return (
                    <ImgMediaCard
                      key={index}
                      {...blog} /* handleLikeClick={handleLikeClick} likeClicked={likeClicked} setLikeClicked={setLikeClicked} likesNum={likesNum} setLikesNum={setLikesNum} */
                    />
                  );
                })}
        </Grid>
      </Container>
    </Box>
  );
}

export default DashBoard