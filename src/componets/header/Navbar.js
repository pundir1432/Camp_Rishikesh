import React, { useEffect, useState } from 'react';
import '../styles/NavFoot.css';
import { logo } from '../assets/images';
import { useNavigate } from 'react-router-dom';
import { getUserFromSession } from '../helper/api/apiCore';
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Tooltip from '@mui/material/Tooltip';
import PersonAdd from '@mui/icons-material/PersonAdd';
import Settings from '@mui/icons-material/Settings';
import Logout from '@mui/icons-material/Logout';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate()
  const isLargeScreen = () => window.innerWidth >= 992;
  const user = getUserFromSession()
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  useEffect(() => {
    window.scrollTo(0, 0);
    const handleScroll = () => {
      if (isLargeScreen()) {
        setScrolled(window.scrollY > 20);
      }
    };

    window.addEventListener('scroll', handleScroll);

    const collapse = document.getElementById('navbarSupportedContent');
    if (collapse) {
      collapse.addEventListener('show.bs.collapse', () => setMenuOpen(true));
      collapse.addEventListener('hide.bs.collapse', () => setMenuOpen(false));
    }

    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (collapse) {
        collapse.removeEventListener('show.bs.collapse', () => setMenuOpen(true));
        collapse.removeEventListener('hide.bs.collapse', () => setMenuOpen(false));
      }
    };
  }, []);

  const handleMenuClose = () => {
    const collapse = document.getElementById('navbarSupportedContent');
    if (collapse.classList.contains('show')) {
      collapse.classList.remove('show');
    }
    setMenuOpen(false);
  };

  const getNavTextClass = () => {
    return isLargeScreen()
      ? scrolled
        ? 'text-dark'
        : 'text-white'
      : 'text-dark';
  };

  const handleLogin = (e) => {
    e.preventDefault()
    navigate('/account/login')
  }


  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    localStorage.removeItem('camp_booking')

  }

  const handleProtectedNav = (route) => {
    if (!user?.id) {
      navigate('/account/login');
    } else {
      navigate(`/${route}`);
    }
  };

  return (
    <nav className={`navbar navbar-expand-lg fixed-top custom-navbar ${scrolled ? 'navbar-scrolled' : ''}`}>
      <div className="container-fluid">
        <a className={`navbar-brand ${getNavTextClass()}`} href="#">
          <img src={logo} alt="logo" className="img-fluid nav-logo" />
        </a>

        <button
          className="navbar-toggler border-0"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          style={{ boxShadow: 'none' }}
        >
          <span className="navbar-toggler-icon text-white"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            {["Home", "Campground", "Events", "Near me", "Gallery", "About", "Contact us"].map((item, i) => {
              const route = item.toLowerCase().replace(/\s+/g, '');
              const isProtected = ["events", "nearme", "gallery"].includes(route);

              return (
                <li className="nav-item" key={i}>
                  <a
                    className={`nav-link nav-link-name active ${getNavTextClass()}`}
                    href={`#${route}`} 
                    onClick={(e) => {
                      if (isProtected) {
                        e.preventDefault();
                        if (user?.id) {
                          navigate(`/${route}`);
                        } else {
                          navigate('/account/login');
                        }
                      }
                    }}
                  >
                    {item}
                  </a>
                </li>
              );
            })}


          </ul>
          {user?.id ? (
            <>
              <Box sx={{ display: 'flex', alignItems: 'center', textAlign: 'center' }}>
                <Tooltip title="Account settings">
                  <IconButton
                    onClick={handleClick}
                    size="small"
                    sx={{ ml: 2 }}
                    aria-controls={open ? 'account-menu' : undefined}
                    aria-haspopup="true"
                    aria-expanded={open ? 'true' : undefined}
                  >
                    <Avatar sx={{ width: 32, height: 32 }}>
                      {user?.firstName?.charAt(0).toUpperCase() || 'U'}
                    </Avatar>
                  </IconButton>

                </Tooltip>
              </Box>
              <Menu
                anchorEl={anchorEl}
                id="account-menu"
                open={open}
                onClose={handleClose}
                onClick={handleClose}
                slotProps={{
                  paper: {
                    elevation: 0,
                    sx: {
                      overflow: 'visible',
                      filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                      mt: 1.5,
                      '& .MuiAvatar-root': {
                        width: 32,
                        height: 32,
                        ml: -0.5,
                        mr: 1,
                      },
                      '&::before': {
                        content: '""',
                        display: 'block',
                        position: 'absolute',
                        top: 0,
                        right: 14,
                        width: 10,
                        height: 10,
                        bgcolor: 'background.paper',
                        transform: 'translateY(-50%) rotate(45deg)',
                        zIndex: 0,
                      },
                    },
                  },
                }}
                transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
              >
                <MenuItem onClick={handleClose}>
                  <Avatar sx={{ width: 32, height: 32 }}>
                    {user?.firstName?.charAt(0).toUpperCase() || 'U'}
                  </Avatar> My account
                </MenuItem>
                <Divider />
                <MenuItem onClick={handleClose}>
                  <ListItemIcon>
                    <PersonAdd fontSize="small" />
                  </ListItemIcon>
                  Add another account
                </MenuItem>
                <MenuItem onClick={handleClose}>
                  <ListItemIcon>
                    <Settings fontSize="small" />
                  </ListItemIcon>
                  Settings
                </MenuItem>
                <MenuItem onClick={() => handleLogout()}>
                  <ListItemIcon>
                    <Logout fontSize="small" />
                  </ListItemIcon>
                  Logout
                </MenuItem>
              </Menu>
            </>
          ) : (
            <>
              <form className="d-flex justify-content-center gap-2 d-none d-md-block">
                <button className={`btn rounded-pill nav-btn ${scrolled && isLargeScreen() ? 'btn-outline-dark me-2' : 'text-white'}`}>
                  Sign up
                </button>
                <button onClick={handleLogin} className={`btn rounded-pill nav-btn ${scrolled && isLargeScreen() ? 'btn-success text-white' : 'text-white'}`}>
                  Sign in
                </button>
              </form>
              <form className="d-flex gap-2 d-md-none">
                <button className={`btn rounded-pill nav-btn btn-outline-dark`}>
                  Sign up
                </button>
                <button onClick={handleLogin} className={`btn rounded-pill nav-btn text-white border-0 btn-success`}>
                  Sign in
                </button>
              </form>
            </>
          )}

        </div>
      </div>
      <div className={`mobile-nav-overlay ${menuOpen ? 'show' : ''}`} onClick={handleMenuClose}></div>
    </nav>
  );
};

export default Navbar;
