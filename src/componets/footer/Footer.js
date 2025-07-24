import React from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import { FaTwitter, FaInstagram, FaTiktok, FaFlickr, FaArrowUp } from 'react-icons/fa';
import ArrowRightAltIcon from '@mui/icons-material/ArrowRightAlt';

const Footer = () => {
  return (
    <div className="bg-success text-white py-5">
      <Container>
        <Row className="align-items-center">
          <Col md={7} className="mb-4 ps-md-5 mb-md-0">
            <h2 className="fw-bold mb-3 text-start">SUBSCRIBE TO OUR<br />NEWSLETTER</h2>
            <Form className="d-flex border-bottom pb-1">
              <Form.Control
                type="email"
                placeholder="Enter Your Email Address"
                className="bg-transparent border-0 text-white me-2"
                style={{ outline: 'none', boxShadow: 'none' }}
              />
              <Button variant="link" className="text-white d-flex text-decoration-none p-0">
                Subscribe <ArrowRightAltIcon className='ms-4'/>
              </Button>
            </Form>
            <small className="d-block mt-3 text-start">Copyright Doctcreativemarket</small>
          </Col>

          <Col md={5} className='text-start pt-4'>
            <Row>
              <Col xs={12} md={12}>
                <h6 className="fw-bold mb-3">Sitemap</h6>
                <ul className="list-unstyled d-flex justify-content-between">
                  <li className='nav-item'><a class="nav-link nav-link-name active" aria-current="page" href="#">Home</a></li>
                  <li className='nav-item'><a class="nav-link nav-link-name active" aria-current="page" href="#">Campingground</a></li>
                  <li className='nav-item'><a class="nav-link nav-link-name active" aria-current="page" href="#">Near me</a></li>
                  <li className='nav-item'><a class="nav-link nav-link-name active" aria-current="page" href="#">About</a></li>
                </ul>
              </Col>
              <Col xs={12} md={12}>
                <h6 className="fw-bold mt-3 mb-3">Contact</h6>
                <p className="mb-1">Doctcreativemarket.com</p>
                <p className="mb-3">Info@Doctcreativemarket.com</p>
                <div className="d-flex gap-3 fs-5">
                  <FaTwitter />
                  <FaInstagram />
                  <FaTiktok />
                  <FaFlickr />
                </div>
              </Col>
            </Row>
            {/* Scroll to Top */}
            <div className="mt-4 text-end">
              <Button
                variant="outline-light"
                size="sm"
                className="rounded-circle"
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
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
