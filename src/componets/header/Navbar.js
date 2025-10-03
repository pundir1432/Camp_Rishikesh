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

  const handleBookingClick = () => {
    navigate('/camp/all-booking');
    setAnchorEl(null);
  };

  const handleLogout = () => {
    localStorage.removeItem('camp_booking')
  }

  return (
    <nav className={`navbar navbar-expand-lg fixed-top custom-navbar `}>
      <div className="container-fluid px-lg-5">
        <div className={`navbar-content d-flex w-100 align-items-center px-lg-4 py-2 rounded-pill`} style={{
          backdropFilter: scrolled ? 'blur(10px)' : 'none',
          transition: 'all 0.3s ease',
          background: '#fff',
          maxWidth: '1200px',
          margin: '0 auto'
        }}>
          <a className={`navbar-brand ${getNavTextClass()}`} href="#">
            <img src={logo} alt="logo" className="nav-logo" style={{ objectFit: 'contain' }} />
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
            <ul className="navbar-nav text-dark me-auto ps-lg-5 mb-2 mb-lg-0">
              {["Home", "Events", "Near me", "Gallery", "About", "Contact us"].map((item, i) => {
                const route = item.toLowerCase().replace(/\s+/g, '');
                const isProtected = ["events", "nearme", "gallery"].includes(route);

                return (
                  <li className="nav-item text-dark" key={i}>
                    <a
                      className={`nav-link text-dark nav-link-name ${window.location.pathname.includes(route) ? 'active-link' : ''}`}
                      href={`#${route}`}
                      onClick={(e) => {
                        e.preventDefault();
                        handleMenuClose();
                        if (isProtected) {
                          if (user?.id) {
                            navigate(`/camp/${route}`);
                          } else {
                            navigate('/account/login');
                          }
                        } else {
                          navigate(`/camp/${route}`);
                        }
                      }}
                      style={{
                        transition: 'background-color 0.2s ease',
                        borderRadius: '4px'
                      }}
                      onMouseEnter={(e) => {
                        if (window.innerWidth < 992) {
                          e.target.style.backgroundColor = 'rgba(52, 94, 64, 0.1)';
                        }
                      }}
                      onMouseLeave={(e) => {
                        if (window.innerWidth < 992) {
                          e.target.style.backgroundColor = 'transparent';
                        }
                      }}
                    >
                      {item}
                    </a>
                  </li>
                );
              })}

              {/* Campground Dropdown */}
              <li className="nav-item dropdown">
                <a
                  className="nav-link dropdown-toggle text-dark nav-link-name"
                  href="#"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  Campground
                </a>
                <ul className="dropdown-menu">
                  <li>
                    <a 
                      className="dropdown-item" 
                      href="#"
                      onClick={(e) => {
                        e.preventDefault();
                        handleMenuClose();
                        navigate('/camp/campground');
                      }}
                    >
                      Camp Ground
                    </a>
                  </li>
                  <li>
                    <a 
                      className="dropdown-item" 
                      href="#"
                      onClick={(e) => {
                        e.preventDefault();
                        handleMenuClose();
                        navigate('/camp/rafting');
                      }}
                    >
                      Rafting
                    </a>
                  </li>
                  <li>
                    <a 
                      className="dropdown-item" 
                      href="#"
                      onClick={(e) => {
                        e.preventDefault();
                        handleMenuClose();
                        navigate('/camp/vehicle');
                      }}
                    >
                      Vehicle
                    </a>
                  </li>
                </ul>
              </li>
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
                  <MenuItem onClick={handleBookingClick}>
                    <ListItemIcon>
                      <PersonAdd fontSize="small" />
                    </ListItemIcon>
                    My Booking
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
                  <button className="btn rounded-pill nav-btn btn-outline-dark me-2">
                    Sign up
                  </button>
                  <button type="button" onClick={handleLogin} className="btn rounded-pill nav-btn btn-success text-white">
                    Sign in
                  </button>
                </form>
                <form className="d-flex gap-2 d-md-none">
                  <button className={`btn rounded-pill nav-btn btn-outline-dark`}>
                    Sign up
                  </button>
                  <button type="button" onClick={handleLogin} className="btn rounded-pill nav-btn text-white border-0 btn-success">
                    Sign in
                  </button>
                </form>
              </>
            )}

          </div>
        </div>
      </div>
      <div className={`mobile-nav-overlay ${menuOpen ? 'show' : ''}`} onClick={handleMenuClose}></div>
    </nav>
  );
};

export default Navbar;
