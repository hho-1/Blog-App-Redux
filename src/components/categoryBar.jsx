import React, { useEffect } from 'react'
import useBlogCall from '../hooks/useBlogCall';
import { useSelector } from 'react-redux';


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

  return (
    <div>
      <header id="header-3" className="header">
        <nav className="header-nav">
          <ul className="menu">
            <li onClick={() => setIsFiltered(false)}>
              <a href="#">All Categories</a>
            </li>

            {categories?.map((item) => (
              <li onClick={handleButtonName} value={item.name} key={item.id}>
                <a href="#">{item.name}</a>
              </li>
            ))}
          </ul>
        </nav>
      </header>
    </div>
  );
};

export default CategoryBar