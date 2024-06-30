import React, { useEffect } from 'react'
import useBlogCall from '../hooks/useBlogCall';
import { useSelector } from 'react-redux';
import { useTheme } from '@emotion/react';
import { ListItemButton, Typography } from '@mui/material';


const CategoryBar = ({ setIsFiltered, setCategoryId }) => {
  const { categories } = useSelector((state) => state.blog);
  const { getCategories } = useBlogCall();

  useEffect(() => {
    getCategories();

    //console.log(categories);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleButtonName = (e) => {
    //console.log(e.target.textContent);
    setIsFiltered(true);

    const cat = categories.find((item) => item.name === e.target.textContent);

    setCategoryId(cat.id);
  };

  const theme = useTheme();

  return (
    <div>
      <Typography
        variant="h6"
        sx={{
          backgroundColor: "primary.categoryBackground",
          backgroundRepeat: "repeat",
          backgroundImage: "none",
          backgroundAttachment: "scroll",
        }}
        id="header-3"
        className="header"
      >
        <nav className="header-nav">
          <ul className="menu">
            <li onClick={() => setIsFiltered(false)}>
              <ListItemButton
                sx={{ color: "primary.textSecondary" }}
                component="a"
                href="#"
              >
                All Categories
              </ListItemButton>
            </li>

            {categories?.map((item) => (
              <li onClick={handleButtonName} value={item.name} key={item.id}>
                <ListItemButton
                  sx={{ color: "primary.textSecondary" }}
                  component="a"
                  href="#"
                >
                  {item.name}
                </ListItemButton>
              </li>
            ))}
          </ul>
        </nav>
      </Typography>
    </div>
  );
};

export default CategoryBar