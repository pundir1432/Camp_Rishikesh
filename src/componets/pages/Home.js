import React, { useEffect, useState } from 'react';
import { banner_img, bitmap1_img, bitmap2_img, bitmap3_img, bonfire_img, cabin_img, object_img, tent_img, vaction1_img, vaction2_img, vaction3_img, vaction4_img, van_img } from '../assets/images';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import '../styles/Home.css'
import ArrowCircleLeftIcon from '@mui/icons-material/ArrowCircleLeft';
import ArrowCircleRightIcon from '@mui/icons-material/ArrowCircleRight';
import { CiCalendarDate } from "react-icons/ci";
import { IoPersonOutline } from "react-icons/io5";
import { IoHomeOutline } from "react-icons/io5";
import { CheckCircle, WarningAmber } from '@mui/icons-material';
import { FaCampground, FaCaravan, FaFire, FaHiking, FaHome, FaMountain, FaUmbrellaBeach, FaWater } from 'react-icons/fa';
import Alert from '@mui/material/Alert';

const Home = () => {

    const [checkIn, setCheckIn] = useState('');
    const [checkOut, setCheckOut] = useState('');
    const [guests, setGuests] = useState('');
    const [accommodation, setAccommodation] = useState('');
    const [showAlert, setShowAlert] = useState(false);

    const handleBooking = () => {
        if (!checkIn || !checkOut || !guests || !accommodation) {
            setShowAlert(true);
            setTimeout(() => setShowAlert(false), 3000);
        } else {
            console.log("Booking submitted!");
        }
    };
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <>
            <div id="carouselExampleCaptions" className="carousel slide" data-bs-ride="carousel">
                <div className="carousel-indicators d-none d-md-block">
                    <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="0" className="active" aria-current="true" aria-label="Slide 1"></button>
                    <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="1" aria-label="Slide 2"></button>
                    <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="2" aria-label="Slide 3"></button>
                </div>
                <div className="carousel-inner ">
                    <div className="carousel-item active">
                        <img src={banner_img} className="d-block w-100 h-100" alt="banner carousel image" />
                        <div className="carousel-caption  d-md-block h-50 text-start">
                            <p className='small-para m-0 mb-md-3'>Let’s Make S’more Memories</p>
                            <h5 className='carousel-heading'>Camp is more than just a word, it’s an experience!</h5>
                        </div>
                    </div>
                    <div className="carousel-item">
                        <img src={banner_img} className="d-block w-100" alt="banner carousel image" />
                        <div className="carousel-caption  d-md-block h-50 text-start">
                            <p className='small-para m-0 mb-md-3'>Let’s Make S’more Memories</p>
                            <h5 className='carousel-heading'>Camp is more than just a word, it’s an experience!</h5>
                        </div>
                    </div>
                    <div className="carousel-item">
                        <img src={banner_img} className="d-block w-100" alt="banner carousel image" />
                        <div className="carousel-caption  d-md-block h-50 text-start">
                            <p className='small-para m-0 mb-md-3'>Let’s Make S’more Memories</p>
                            <h5 className='carousel-heading'>Camp is more than just a word, it’s an experience!</h5>
                        </div>
                    </div>
                </div>
                <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="prev">
                    <span className="custom-carousel-icon" aria-hidden="true">
                        <ArrowCircleLeftIcon className='text-white' />
                    </span>
                    <span className="visually-hidden">Previous</span>
                </button>

                <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="next">
                    <span className="custom-carousel-icon" aria-hidden="true">
                        <ArrowCircleRightIcon className='text-white' />
                    </span>
                    <span className="visually-hidden">Next</span>
                </button>

            </div>
            {showAlert && (
                <div
                    style={{
                        position: 'fixed',
                        bottom: 0,
                        left: 0,
                        width: '100%',
                        zIndex: 9999, // Ensure it’s on top
                    }}
                >
                    <Alert
                        severity="warning"
                        icon={<WarningAmber fontSize="inherit" />}
                        className="mb-0 bg-danger text-white rounded-0"
                    >
                        Please login and fill all inputs to continue.
                    </Alert>
                </div>
            )}

            {/* 👇 Booking Form Section Below Carousel */}
            <div className="booking-form-section position-relative">
                <Container className="bg-white shadow p-3 rounded-3">
                    <Row className="g-3 align-items-end">
                        <Col xs={6} md={3}>
                            <Form.Group className='text-start' controlId="checkIn">
                                <Form.Label className='small-para text-color fw-bold'><CiCalendarDate size={20} className='mb-1 text-color' />Check In</Form.Label>
                                <Form.Control
                                    type="date"
                                    value={checkIn}
                                    onChange={(e) => setCheckIn(e.target.value)}
                                    style={{ boxShadow: "none", fontSize: "14px", fontFamily: "Inter" }}
                                    className='border-0 border-bottom border-dark rounded-0'
                                />
                            </Form.Group>
                        </Col>

                        <Col xs={6} md={3}>
                            <Form.Group className='text-start' controlId="checkOut">
                                <Form.Label className='small-para text-color fw-bold'><CiCalendarDate size={20} className='text-color mb-1' />Check Out</Form.Label>
                                <Form.Control
                                    type="date"
                                    value={checkOut}
                                    onChange={(e) => setCheckOut(e.target.value)}
                                    style={{ boxShadow: "none", fontSize: "14px", fontFamily: "Inter" }}
                                    className='border-0 border-bottom border-dark rounded-0'
                                />
                            </Form.Group>
                        </Col>

                        <Col xs={6} md={2}>
                            <Form.Group className='text-start' controlId="guests">
                                <Form.Label className='small-para text-color fw-bold'><IoPersonOutline size={15} className='mb-1 text-color' />Guests</Form.Label>
                                <Form.Select
                                    value={guests}
                                    onChange={(e) => setGuests(e.target.value)}
                                    style={{ boxShadow: "none", fontSize: "14px", fontFamily: "Inter" }}
                                    className='border-0 border-bottom border-dark rounded-0'
                                >
                                    <option value="">Select</option>
                                    <option>1 Guest</option>
                                    <option>2 Guests</option>
                                    <option>3 Guests</option>
                                    <option>4+ Guests</option>
                                </Form.Select>
                            </Form.Group>
                        </Col>

                        <Col xs={6} md={2}>
                            <Form.Group className='text-start' controlId="accommodation">
                                <Form.Label className='small-para text-color fw-bold'><IoHomeOutline size={15} className='text-color mb-1' />Accommodation</Form.Label>
                                <Form.Select
                                    value={accommodation}
                                    onChange={(e) => setAccommodation(e.target.value)}
                                    style={{ boxShadow: "none", fontSize: "14px", fontFamily: "Inter" }}
                                    className='border-0 border-bottom border-dark rounded-0'
                                >
                                    <option value="">Select</option>
                                    <option>Camp</option>
                                    <option>Tent</option>
                                    <option>Cabin</option>
                                </Form.Select>
                            </Form.Group>
                        </Col>

                        <Col md={2} className="d-grid">
                            <Button
                                variant="success"
                                className="fw-semibold"
                                style={{ fontSize: "14px" }}
                                onClick={handleBooking}
                            >
                                Book Now
                            </Button>
                        </Col>
                    </Row>
                </Container>
            </div>

            <div style={{ background: '#f9f8f4', padding: '60px 0' }}>
                <Container className="text-center">
                    <p className="text-success section-name fw-semibold mb-2">ABOUT</p>
                    <h2 className="fw-bold main-heading">
                        Welcome To Glamour  Camping Ground
                    </h2>
                    <p className="mx-auto small-para mt-3" style={{ maxWidth: '700px', color: '#777' }}>
                        Lorem Ipsum Dolor Sit Amet, Consectetur Adipiscing Elit. Integer Egestas Nisi Nec Libero Fermentum, A Varius
                        Tortor Venenatis. Sed Vitae Dolor Interdum, Semper Leo At, Tristique Nisi. Maecenas Vitae Luctus Tortor.
                    </p>

                    {/* Icon Row */}
                    <Row className="text-center my-5 gy-4">
                        <Col xs={6} md={3}>
                            <FaHome size={40} className="text-success mb-2" />
                            <div className='section-name'>25 CARAVAN SITES</div>
                        </Col>
                        <Col xs={6} md={3}>
                            <FaCampground size={40} className="text-success mb-2" />
                            <div className='section-name'>50 TENT SITES</div>
                        </Col>
                        <Col xs={6} md={3}>
                            <FaUmbrellaBeach size={40} className="text-success mb-2" />
                            <div className='section-name'>10 GLAMP SITES</div>
                        </Col>
                        <Col xs={6} md={3}>
                            <FaMountain size={40} className="text-success mb-2" />
                            <div className='section-name'>10 CABIN HOUSES</div>
                        </Col>
                    </Row>

                    {/* Image Cards */}
                    <Row className="text-start gy-4">
                        <Col md={4}>
                            <img src={tent_img} alt="tent" className="img-fluid rounded shadow-sm" />
                            <h6 className="fw-bold section-name mt-3">Camping Area For Tents</h6>
                            <p className='text-muted small-para'>
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer egestas nisi nec libero fermentum.
                            </p>
                        </Col>
                        <Col md={4}>
                            <img src={van_img} alt="rv" className="img-fluid rounded shadow-sm" />
                            <h6 className="fw-bold section-name mt-3">Trailers And RV Spots</h6>
                            <p className='text-muted small-para'>
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer egestas nisi nec libero fermentum.
                            </p>
                        </Col>
                        <Col md={4}>
                            <img src={cabin_img} alt="camper" className="img-fluid rounded shadow-sm" />
                            <h6 className="fw-bold mt-3 section-name">Cabins And Glamping</h6>
                            <p className='text-muted small-para'>
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer egestas nisi nec libero fermentum.
                            </p>
                        </Col>
                    </Row>
                </Container>
            </div>
            <div className='mb-4' style={{ backgroundColor: '#f9f8f4' }}>
                <Container>
                    <Row className="align-items-center gy-4">
                        <Col md={6} className='text-md-start text-center'>
                            <p className="text-success section-name  fw-semibold">ACTIVITY</p>
                            <h2 className="fw-bold text-md-start text-center main-heading mb-4" style={{ maxWidth: 400 }}>
                                Camp Will Be For You <br /> What You Want It To Be.
                            </h2>
                            <img
                                src={object_img}
                                alt="activity illustration"
                                className="img-fluid object-img mt-3"
                            />
                        </Col>

                        <Col md={6}>
                            <Row className="gy-4">
                                <Col xs={6}>
                                    <div className="d-flex flex-column align-items-start">
                                        <FaMountain size={30} className="text-success mb-2" />
                                        <h6 className="fw-bold section-name">Wild Life</h6>
                                        <p className='text-start small-para text-muted'>
                                            Lorem Ipsum Dolor Sit Amet, Consectetur Adipiscing Elit. Integer Egestas Nisi Nec Libero Fermentum.
                                        </p>
                                    </div>
                                </Col>
                                <Col xs={6}>
                                    <div className="d-flex flex-column align-items-start">
                                        <FaFire size={30} className="text-success mb-2" />
                                        <h6 className="fw-bold section-name">Bonfire</h6>
                                        <p className='text-start text-muted small-para'>
                                            Lorem Ipsum Dolor Sit Amet, Consectetur Adipiscing Elit. Integer Egestas Nisi Nec Libero Fermentum.
                                        </p>
                                    </div>
                                </Col>
                                <Col xs={6}>
                                    <div className="d-flex flex-column align-items-start">
                                        <FaWater size={30} className="text-success mb-2" />
                                        <h6 className="fw-bold section-name">Canoeing</h6>
                                        <p className='text-start text-muted small-para'>
                                            Lorem Ipsum Dolor Sit Amet, Consectetur Adipiscing Elit. Integer Egestas Nisi Nec Libero Fermentum.
                                        </p>
                                    </div>
                                </Col>
                                <Col xs={6}>
                                    <div className="d-flex flex-column align-items-start">
                                        <FaHiking size={30} className="text-success mb-2" />
                                        <h6 className="fw-bold section-name">Hiking</h6>
                                        <p className='text-start text-muted small-para'>
                                            Lorem Ipsum Dolor Sit Amet, Consectetur Adipiscing Elit. Integer Egestas Nisi Nec Libero Fermentum.
                                        </p>
                                    </div>
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                </Container>
            </div>
            <section
                className='bonfire-img'>
                <div className="overlay" style={{
                    position: 'absolute',
                    inset: 0,
                    background: 'rgba(0,0,0,0.4)'
                }}></div>

                <div style={{ position: 'relative', zIndex: 2 }}>
                    <h2 className="fw-bold main-heading mb-4">
                        A Bonfire Is Basically Just A <br />
                        Nightclub In The Mountains
                    </h2>
                    <button className="btn btn-outline-success text-white px-4 py-2 text-uppercase fw-semibold" style={{ fontSize: '12px' }}>
                        Check Availability
                    </button>
                </div>
            </section>

            <section className='mt-4 mb-3' style={{ backgroundColor: '#f8f8f5' }}>
                <Container>
                    <p className="text-success fw-semibold text-uppercase small section-name text-center mb-2">Booking</p>
                    <h2 className="text-center fw-bold mb-5 main-heading">Book Your Dream<br />Vacation Now</h2>

                    <Row className="g-4">
                        <Col md={6}>
                            <div className="border shadow">
                                <img src={vaction1_img} alt="Bell Glamp One" className="img-fluid w-100" />
                                <div className="p-3 text-start">
                                    <div className="d-flex justify-content-between">
                                        <h6 className="text-success section-name fw-bold">Bell Glamp One</h6>
                                        <div className="d-flex gap-3 justify-content-between text-muted small">
                                            <span className='small-para'>1–6 Persons</span>
                                            <span className='small-para'>25m²</span>
                                        </div>
                                    </div>
                                    <p className="small-para mt-2 ">
                                        Lorem Ipsum Dolor Sit Amet, Consectetur Adipiscing Elit. Maecenas Eu Ipsum Volutpat, Maximus Lorem Sit Amet, Ullamcorper Odio. Vivamus Eu Ultrices Lorem, Sed Blandit Magna.
                                    </p>
                                    <Button className="btn  rounded bg-color border-0 w-auto px-4 py-2 fw-semibold" style={{ fontSize: "12px" }}>
                                        CHECK AVAILABILITY
                                    </Button>
                                </div>
                            </div>
                        </Col>

                        <Col md={6}>
                            <div className="border shadow" style={{ borderWidth: "2px" }}>
                                <img src={vaction2_img} alt="Caravan Soler Tent" className="img-fluid w-100" />
                                <div className="p-3 text-start">
                                    <div className="d-flex justify-content-between">
                                        <h6 className="text-success section-name fw-bold">Caravan Soler Tent</h6>
                                        <div className="d-flex gap-3 justify-content-between text-muted small">
                                            <span className='small-para'>2–6 Persons</span>
                                            <span className='small-para'>27m</span>
                                        </div>
                                    </div>
                                    <p className="small small-para mt-2">
                                        Lorem Ipsum Dolor Sit Amet, Consectetur Adipiscing Elit. Maecenas Eu Ipsum Volutpat, Maximus Lorem Sit Amet, Ullamcorper Odio. Vivamus Eu Ultrices Lorem, Sed Blandit Magna.
                                    </p>
                                    <Button className="btn  rounded bg-color border-0 w-auto px-4 py-2 fw-semibold" style={{ fontSize: "12px" }}>
                                        CHECK AVAILABILITY
                                    </Button>
                                </div>
                            </div>
                        </Col>
                        <Col md={6}>
                            <div className="border shadow">
                                <img src={vaction3_img} alt="Glamping Tent" className="img-fluid w-100" />
                                <div className="p-3 text-start">
                                    <div className="d-flex justify-content-between">
                                        <h6 className="text-success fw-bold section-name">Glamping Tent</h6>
                                        <div className="d-flex gap-3 justify-content-between text-muted small">
                                            <span className='small-para'>1–6 Persons</span>
                                            <span className='small-para'>17m²</span>
                                        </div>
                                    </div>
                                    <p className="small mt-2 small-para">
                                        Lorem Ipsum Dolor Sit Amet, Consectetur Adipiscing Elit. Maecenas Eu Ipsum Volutpat, Maximus Lorem Sit Amet, Ullamcorper Odio. Vivamus Eu Ultrices Lorem, Sed Blandit Magna.
                                    </p>
                                    <Button className="btn  rounded bg-color border-0 w-auto px-4 py-2 fw-semibold" style={{ fontSize: "12px" }}>
                                        CHECK AVAILABILITY
                                    </Button>
                                </div>
                            </div>
                        </Col>

                        <Col md={6}>
                            <div className="border shadow" style={{ borderWidth: "2px" }}>
                                <img src={vaction4_img} alt="Caravan Soler Tent" className="img-fluid w-100" />
                                <div className="p-3 text-start">
                                    <div className="d-flex justify-content-between">
                                        <h6 className="text-success fw-bold section-name">Small Cabin Wood</h6>
                                        <div className="d-flex gap-3 justify-content-between text-muted small">
                                            <span className='small-para'>1–6 Persons</span>
                                            <span className='small-para'>25m²</span>
                                        </div>
                                    </div>
                                    <p className="small-para text-start mt-2">
                                        Lorem Ipsum Dolor Sit Amet, Consectetur Adipiscing Elit. Maecenas Eu Ipsum Volutpat, Maximus Lorem Sit Amet, Ullamcorper Odio. Vivamus Eu Ultrices Lorem, Sed Blandit Magna.
                                    </p>
                                    <Button className="btn  rounded bg-color border-0 w-auto px-4 py-2 fw-semibold" style={{ fontSize: "12px" }}>
                                        CHECK AVAILABILITY
                                    </Button>
                                </div>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </section>

            <section className='mt-4 mb-3' style={{ backgroundColor: '#f8f8f5' }}>
                <Container>
                    <div className="d-flex justify-content-between align-items-center mb-4">
                        <div>
                            <p className="text-success text-start fw-semibold text-uppercase section-name mb-1">News</p>
                            <h2 className="fw-bold mb-0 section-name">Lastest Articles</h2>
                        </div>
                        <Button className="btn btn-success rounded-pill px-4 py-2 fw-semibold" style={{ fontSize: '12px' }}>
                            EXPLORE
                        </Button>
                    </div>

                    <Row className="g-4">
                        <Col md={4}>
                            <div>
                                <img src={bitmap1_img} className="img-fluid mb-2" alt="Article 1" />
                                <p className="fw-semibold section-name text-start  mb-1">
                                    Sed nec lorem scelerisque, viverra ex ut, interdum massa.
                                </p>
                                <p className="text-muted  text-start small-para">Read..</p>
                            </div>
                        </Col>
                        <Col md={4}>
                            <div>
                                <img src={bitmap2_img} className="img-fluid mb-2" alt="Article 2" />
                                <p className="fw-semibold text-start section-name mb-1">
                                    Morbi ligula massa, posuere in finibus ut, varius ac ligula.
                                </p>
                                <p className="text-muted text-start small-para">Read..</p>
                            </div>
                        </Col>
                        <Col md={4}>
                            <div>
                                <img src={bitmap3_img} className="img-fluid mb-2" alt="Article 3" />
                                <p className="fw-semibold text-start section-name mb-1">
                                    Sed nec lorem scelerisque, viverra ex ut, interdum massa.
                                </p>
                                <p className="text-muted text-start small-para">Read..</p>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </section>



        </>
    );
};

export default Home;
