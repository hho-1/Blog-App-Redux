import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import Feather from '../feather.png';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import useAuthCall from '../hooks/useAuthCall';



const pages = ['Dashboard', 'New Blog', 'About'];
const settings = ['Login','Register'];
const logoutSet = ['Profile', 'My Blogs', 'Favorite Blogs', 'Logout'];

function ResponsiveAppBar({setAuthType}) {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  let navigate = useNavigate()
  const { logout } = useAuthCall();
  const { currentUser } = useSelector(state => state.auth);
  const { user } = useSelector(state => state.auth);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleLeftMenuClick = (e) => {
    
    if(e.target.textContent === 'Dashboard'){
      navigate('/')
    }
    else if(e.target.textContent === 'New Blog'){
      navigate('/newblog')
    }
    else if(e.target.textContent === 'About'){
      navigate('/about')
    }
    setAnchorElNav(null);
  }
  const handleRightMenuClick = (e) => {
    navigate('/auth')
    if(e.target.textContent === 'Login'){
      setAuthType('login')
    }
    else if(e.target.textContent === 'Register'){
      setAuthType('register')
    }
    
    setAnchorElUser(null);
  }

  const handleLogout = (e) => {
    if(e.target.textContent === 'Logout'){
      logout();
    }
    else if(e.target.textContent === 'My Blogs'){
      navigate('/myblogs')
    }
    else if(e.target.textContent === 'Favorite Blogs'){
      navigate('/favorites')
    }
    else if(e.target.textContent === 'Profile'){
      navigate('/profile')
    }


    setAnchorElUser(null);
  }

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Box component="img" src={Feather} sx={{ height: 90, width:90, display: { xs: 'none', md: 'flex' }, mr: 1 }}/>
          <Typography
            variant="h5"
            noWrap
            sx={{
              mr: 4,
              ml: -5,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            myBLOG
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            >
              {pages.map((page) => (
                <MenuItem key={page} onClick={handleLeftMenuClick}>
                  <Typography textAlign="center">{page}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          <Box component="img" src={Feather} sx={{ height: 70, width:70, display: { xs: 'flex', md: 'none' }, mr: 1 }}/>
          <Typography
            variant="h5"
            noWrap
            sx={{
              mr: 2,
              ml: -3,
              display: { xs: 'flex', md: 'none' },
              flexGrow: 1,
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            myBLOG
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {pages.map((page) => (
              <Button
                key={page}
                onClick={handleLeftMenuClick}
                sx={{ my: 2, color: '#002499', display: 'block', fontSize:'1rem', "&:hover": {border: "1px solid #002499"}, }}
              >
                {page}
              </Button>
            ))}
          </Box>
          
          <Typography sx={{ mx: 2, color: '#002499'}}>{currentUser}</Typography>
          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt="Remy Sharp" src={user?.image} />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {currentUser ? <div>{logoutSet.map((log) => (
                              <MenuItem key={log} onClick={handleLogout}>
                                <Typography textAlign="center">{log}</Typography>
                              </MenuItem>
                              ))
                            } 
                            </div>
                            :
                            <div>
                              {settings.map((setting) => (
                                <MenuItem key={setting} onClick={handleRightMenuClick}>
                                  <Typography textAlign="center">{setting}</Typography>
                                </MenuItem>
                              ))}
                              
                            </div>
              }
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default ResponsiveAppBar;