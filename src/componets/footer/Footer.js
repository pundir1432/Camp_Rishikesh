import React from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import { FaTwitter, FaInstagram, FaTiktok, FaFlickr, FaArrowUp } from 'react-icons/fa';
import ArrowRightAltIcon from '@mui/icons-material/ArrowRightAlt';
import { useNavigate } from 'react-router-dom';

const Footer = () => {
  const navigate = useNavigate();

  const handleNavigation = (route) => {
    navigate(`/camp/${route}`);
  };

  return (
    <div className="bg-success text-white py-5 footer">
      <Container>
        <Row className="align-items-start">
          <Col xs={12} md={7} className="mb-4 mb-md-0">
            <h2 className="fw-bold mb-3 text-center text-md-start" style={{fontSize: 'clamp(1.5rem, 4vw, 2rem)'}}>
              SUBSCRIBE TO OUR<br className="d-none d-md-block" /> NEWSLETTER
            </h2>
            <Form className="d-flex flex-column flex-md-row border-bottom pb-1">
              <Form.Control
                type="email"
                placeholder="Enter Your Email Address"
                className="bg-transparent border-0 text-white me-md-2 mb-2 mb-md-0"
                style={{ outline: 'none', boxShadow: 'none', fontSize: '16px' }}
              />
              <Button variant="link" className="text-white d-flex align-items-center justify-content-center text-decoration-none p-0">
                Subscribe <ArrowRightAltIcon className='ms-2'/>
              </Button>
            </Form>
            <small className="d-block mt-3 text-center text-md-start">© 2024 Camp Rishikesh. All rights reserved.</small>
          </Col>

          <Col xs={12} md={5} className='text-center text-md-start pt-md-4'>
            <Row>
              <Col xs={12} md={12}>
                <h6 className="fw-bold mb-3">Quick Links</h6>
                <ul className="list-unstyled d-flex flex-wrap justify-content-center justify-content-md-start gap-2 gap-md-3">
                  <li className='nav-item'>
                    <button 
                      className="btn btn-link nav-link text-white p-0 small" 
                      onClick={() => handleNavigation('home')}
                    >
                      Home
                    </button>
                  </li>
                  <li className='nav-item'>
                    <button 
                      className="btn btn-link nav-link text-white p-0 small" 
                      onClick={() => handleNavigation('campground')}
                    >
                      Campground
                    </button>
                  </li>
                  <li className='nav-item'>
                    <button 
                      className="btn btn-link nav-link text-white p-0 small" 
                      onClick={() => handleNavigation('about')}
                    >
                      About
                    </button>
                  </li>
                  <li className='nav-item'>
                    <button 
                      className="btn btn-link nav-link text-white p-0 small" 
                      onClick={() => handleNavigation('contactus')}
                    >
                      Contact
                    </button>
                  </li>
                </ul>
              </Col>
              <Col xs={12} md={12}>
                <h6 className="fw-bold mt-3 mb-3">Contact Info</h6>
                <p className="mb-1 small">Camp Rishikesh</p>
                <p className="mb-1 small">Near Laxman Jhula, Rishikesh</p>
                <p className="mb-3 small">info@camprishikesh.com</p>
                <div className="d-flex gap-3 justify-content-center justify-content-md-start">
                  <a href="#" className="text-white"><FaTwitter size={20} /></a>
                  <a href="#" className="text-white"><FaInstagram size={20} /></a>
                  <a href="#" className="text-white"><FaTiktok size={20} /></a>
                  <a href="#" className="text-white"><FaFlickr size={20} /></a>
                </div>
              </Col>
            </Row>
            {/* Scroll to Top */}
            <div className="mt-4 text-center text-md-end">
              <Button
                variant="outline-light"
                size="sm"
                className="rounded-circle"
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                title="Back to top"
              >
                <FaArrowUp />
              </Button>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Footer;
