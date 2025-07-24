import React, { useEffect, useState } from 'react';
import '../styles/NavFoot.css';
import { logo } from '../assets/images';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate()
  const isLargeScreen = () => window.innerWidth >= 992;

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
            {["Home", "Campground", "Events", "Near me", "Gallery", "About", "Contact us"].map((item, i) => (
              <li className="nav-item" key={i}>
                <a className={`nav-link nav-link-name active ${getNavTextClass()}`} href="#">
                  {item}
                </a>
              </li>
            ))}
          </ul>
          <form className="d-flex justify-content-center gap-2 d-none d-md-block">
            <button className={`btn rounded-pill nav-btn ${scrolled && isLargeScreen() ? 'btn-outline-dark me-2' : 'text-white'}`}>
              Sign up
            </button>
            <button onClick={(e) => handleLogin(e)} className={`btn rounded-pill nav-btn ${scrolled && isLargeScreen() ? 'btn-success text-white' : 'text-white'}`}>
              Sign in
            </button>
          </form>
          <form className="d-flex gap-2 d-md-none">
            <button className={`btn rounded-pill nav-btn btn-outline-dark `}>
              Sign up
            </button>
            <button onClick={(e) => handleLogin(e)} className={`btn rounded-pill nav-btn text-white border-0 btn-success`}>
              Sign in
            </button>
          </form>
        </div>
      </div>
      <div className={`mobile-nav-overlay ${menuOpen ? 'show' : ''}`} onClick={handleMenuClose}></div>
    </nav>
  );
};

export default Navbar;
