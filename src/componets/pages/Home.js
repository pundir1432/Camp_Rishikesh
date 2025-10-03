import React, { useEffect, useState } from 'react';
import { banner_img, bitmap1_img, bitmap2_img, bitmap3_img, bonfire_img, cabin_img, object_img, tent_img, vaction1_img, vaction2_img, vaction3_img, vaction4_img, van_img } from '../assets/images';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import '../styles/Home.css'
import ArrowCircleLeftIcon from '@mui/icons-material/ArrowCircleLeft';
import ArrowCircleRightIcon from '@mui/icons-material/ArrowCircleRight';
import { MdOutlineDateRange } from "react-icons/md";
import { IoMdPersonAdd } from "react-icons/io";
import { IoHome } from "react-icons/io5";
import { WarningAmber } from '@mui/icons-material';
import { FaCampground, FaCaravan, FaFire, FaHiking, FaHome, FaMountain, FaUmbrellaBeach, FaWater } from 'react-icons/fa';
import Alert from '@mui/material/Alert';
import { getUserFromSession } from '../helper/api/apiCore';
import { useDispatch, useSelector } from 'react-redux';
// import { createBookingAction } from '../redux/booking/actions';

const Home = () => {

    const [checkIn, setCheckIn] = useState('');
    const [checkOut, setCheckOut] = useState('');
    const [guests, setGuests] = useState('');
    const [accommodation, setAccommodation] = useState('');
    const [showAlert, setShowAlert] = useState(false);
    const user = getUserFromSession()
    const dispatch = useDispatch()
    const store = useSelector((state) => state)
    const createBooking = store?.createBookingReducer?.data
    console.log(createBooking, 'createBooking');

    const handleBooking = () => {
        if (!checkIn || !checkOut || !guests || !accommodation) {
            setShowAlert(true);
            setTimeout(() => setShowAlert(false), 3000);
        } else {
            const payload = {
                checkIn: checkIn,
                checkOut: checkOut,
                people: guests,
                Accommodation: accommodation,
                // userId:user?.id
            }
            // dispatch(createBookingAction(payload))
            console.log('Booking payload:', payload)
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
                                <Form.Label className='small-para text-color fw-bold d-flex align-items-center'>
                                    <MdOutlineDateRange size={15} className='me-1 fw-bold text-color' />
                                    <span className='d-none d-md-inline'>CHECK IN</span>
                                    <span className='d-md-none'>IN</span>
                                </Form.Label>
                                <Form.Control
                                    type="date"
                                    value={checkIn}
                                    onChange={(e) => setCheckIn(e.target.value)}
                                    style={{ boxShadow: "none", fontSize: "14px", fontFamily: "Inter" }}
                                    className='border-0 fw-bold text-dark border-bottom border-dark rounded-0'
                                />
                            </Form.Group>
                        </Col>

                        <Col xs={6} md={3}>
                            <Form.Group className='text-start' controlId="checkOut">
                                <Form.Label className='small-para text-color fw-bold d-flex align-items-center'>
                                    <MdOutlineDateRange size={15} className='me-1 text-color fw-bold' />
                                    <span className='d-none d-md-inline'>CHECK OUT</span>
                                    <span className='d-md-none'>OUT</span>
                                </Form.Label>
                                <Form.Control
                                    type="date"
                                    value={checkOut}
                                    onChange={(e) => setCheckOut(e.target.value)}
                                    style={{ boxShadow: "none", fontSize: "14px", fontFamily: "Inter" }}
                                    className='border-0 fw-bold text-dark border-bottom border-dark rounded-0'
                                />
                            </Form.Group>
                        </Col>

                        <Col xs={6} md={2}>
                            <Form.Group className='text-start' controlId="guests">
                                <Form.Label className='small-para text-color fw-bold d-flex align-items-center'>
                                    <IoMdPersonAdd size={15} className='me-1 fw-bold text-color' />
                                    <span>GUESTS</span>
                                </Form.Label>
                                <Form.Select
                                    value={guests}
                                    onChange={(e) => setGuests(e.target.value)}
                                    style={{ boxShadow: "none", fontSize: "14px", fontFamily: "Inter" }}
                                    className='border-0 fw-bold text-dark border-bottom border-dark rounded-0'
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
                                <Form.Label className='small-para text-color fw-bold d-flex align-items-center'>
                                    <IoHome size={15} className='me-1 text-color fw-bold' />
                                    <span className='d-none d-md-inline'>ACCOMMODATION</span>
                                    <span className='d-md-none'>TYPE</span>
                                </Form.Label>
                                <Form.Select
                                    value={accommodation}
                                    onChange={(e) => setAccommodation(e.target.value)}
                                    style={{ boxShadow: "none", fontSize: "14px", fontFamily: "Inter" }}
                                    className='border-0 fw-bold text-dark border-bottom border-dark rounded-0'
                                >
                                    <option value="">Select</option>
                                    <option>Camp</option>
                                    <option>Tent</option>
                                    <option>Cabin</option>
                                </Form.Select>
                            </Form.Group>
                        </Col>

                        <Col xs={12} md={2} className="d-grid mt-3 mt-md-0">
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

                    {/* Icon Carousel */}
                    <div className="icon-carousel-container my-5">
                        <div className="icon-carousel">
                            <div className="icon-item">
                                <FaHome size={40} className="text-success mb-2" />
                                <div className='section-name'>25 CARAVAN SITES</div>
                            </div>
                            <div className="icon-item">
                                <FaCampground size={40} className="text-success mb-2" />
                                <div className='section-name'>50 TENT SITES</div>
                            </div>
                            <div className="icon-item">
                                <FaUmbrellaBeach size={40} className="text-success mb-2" />
                                <div className='section-name'>10 GLAMP SITES</div>
                            </div>
                            <div className="icon-item">
                                <FaMountain size={40} className="text-success mb-2" />
                                <div className='section-name'>10 CABIN HOUSES</div>
                            </div>
                            {/* Duplicate for seamless loop */}
                            <div className="icon-item">
                                <FaHome size={40} className="text-success mb-2" />
                                <div className='section-name'>25 CARAVAN SITES</div>
                            </div>
                            <div className="icon-item">
                                <FaCampground size={40} className="text-success mb-2" />
                                <div className='section-name'>50 TENT SITES</div>
                            </div>
                            <div className="icon-item">
                                <FaUmbrellaBeach size={40} className="text-success mb-2" />
                                <div className='section-name'>10 GLAMP SITES</div>
                            </div>
                            <div className="icon-item">
                                <FaMountain size={40} className="text-success mb-2" />
                                <div className='section-name'>10 CABIN HOUSES</div>
                            </div>
                        </div>
                    </div>

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
                    <hr />
                    <Row>
                        <Col lg={12}>
                            <div className="headings">
                                <h3 className='river-rafting-heading'>RIVER RAFTING IN RISHIKESH PRICE</h3>
                                <p className='river-rafting-para'>If you have always been fond of adventure sports and now want to experience a new adventure, then you should keep the plan of River Rafting in Rishikesh price in your wish list. Rishikesh is the most adventurous tourist from India.
                                </p>
                            </div>
                            <div className="icon-carousel-container my-5">
                                <div className="icon-carousel">
                                    <div className="icon-item">
                                        <img src="https://thumbs.dreamstime.com/b/white-water-rafting-19149447.jpg" className='img-fluid rounded-circle' alt="" />
                                        <div className='section-name'>Rafting</div>
                                    </div>
                                    <div className="icon-item">
                                        <img src="https://static.vecteezy.com/system/resources/previews/000/155/972/non_2x/bungee-jumping-vector.jpg" className='img-fluid rounded-circle' alt="" />
                                        <div className='section-name'>Bungee</div>
                                    </div>
                                    <div className="icon-item">
                                        <img src="https://thumbs.dreamstime.com/b/cartoon-character-skydiving-colorful-parachute-displaying-sections-red-yellow-green-blue-wears-jumpsuit-372062027.jpg" className='img-fluid rounded-circle' alt="" />
                                        <div className='section-name'>Paragliding</div>
                                    </div>
                                    <div className="icon-item">
                                        <img src="https://img.freepik.com/free-vector/camping-site-with-trailer-tent-burning-bonfire_107791-15732.jpg?semt=ais_hybrid&w=740&q=80" className='img-fluid rounded-circle' alt="" />
                                        <div className='section-name'>Camping</div>
                                    </div>
                                    {/* Duplicate for seamless loop */}
                                    <div className="icon-item">
                                        <img src="https://thumbs.dreamstime.com/b/white-water-rafting-19149447.jpg" className='img-fluid rounded-circle' alt="" />
                                        <div className='section-name'>Rafting</div>
                                    </div>
                                    <div className="icon-item">
                                        <img src="https://static.vecteezy.com/system/resources/previews/000/155/972/non_2x/bungee-jumping-vector.jpg" className='img-fluid rounded-circle' alt="" />
                                        <div className='section-name'>Bungee</div>
                                    </div>
                                    <div className="icon-item">
                                        <img src="https://thumbs.dreamstime.com/b/cartoon-character-skydiving-colorful-parachute-displaying-sections-red-yellow-green-blue-wears-jumpsuit-372062027.jpg" className='img-fluid rounded-circle' alt="" />
                                        <div className='section-name'>Paragliding</div>
                                    </div>
                                    <div className="icon-item">
                                        <img src="https://img.freepik.com/free-vector/camping-site-with-trailer-tent-burning-bonfire_107791-15732.jpg?semt=ais_hybrid&w=740&q=80" className='img-fluid rounded-circle' alt="" />
                                        <div className='section-name'>Camping</div>
                                    </div>
                                </div>
                            </div>
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
                            <Row className="gy-4 activity-grid">
                                <Col xs={6} sm={6} md={6}>
                                    <div className="d-flex flex-column align-items-start text-center text-md-start">
                                        <FaMountain size={30} className="text-success mb-2 mx-auto mx-md-0" />
                                        <h6 className="fw-bold section-name">Wild Life</h6>
                                        <p className='text-muted small-para d-none d-md-block'>
                                            Lorem Ipsum Dolor Sit Amet, Consectetur Adipiscing Elit.
                                        </p>
                                    </div>
                                </Col>
                                <Col xs={6} sm={6} md={6}>
                                    <div className="d-flex flex-column align-items-start text-center text-md-start">
                                        <FaFire size={30} className="text-success mb-2 mx-auto mx-md-0" />
                                        <h6 className="fw-bold section-name">Bonfire</h6>
                                        <p className='text-muted small-para d-none d-md-block'>
                                            Lorem Ipsum Dolor Sit Amet, Consectetur Adipiscing Elit.
                                        </p>
                                    </div>
                                </Col>
                                <Col xs={6} sm={6} md={6}>
                                    <div className="d-flex flex-column align-items-start text-center text-md-start">
                                        <FaWater size={30} className="text-success mb-2 mx-auto mx-md-0" />
                                        <h6 className="fw-bold section-name">Canoeing</h6>
                                        <p className='text-muted small-para d-none d-md-block'>
                                            Lorem Ipsum Dolor Sit Amet, Consectetur Adipiscing Elit.
                                        </p>
                                    </div>
                                </Col>
                                <Col xs={6} sm={6} md={6}>
                                    <div className="d-flex flex-column align-items-start text-center text-md-start">
                                        <FaHiking size={30} className="text-success mb-2 mx-auto mx-md-0" />
                                        <h6 className="fw-bold section-name">Hiking</h6>
                                        <p className='text-muted small-para d-none d-md-block'>
                                            Lorem Ipsum Dolor Sit Amet, Consectetur Adipiscing Elit.
                                        </p>
                                    </div>
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                </Container>
            </div>
            <section className='bonfire-video' style={{ position: 'relative', height: '500px', overflow: 'hidden' }}>
                <video
                    autoPlay
                    loop
                    muted
                    style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover'
                    }}
                >
                    <source src={require('../assets/bonfire video.mp4')} type="video/mp4" />
                </video>

                <div className="overlay" style={{
                    position: 'absolute',
                    inset: 0,
                    background: 'rgba(0,0,0,0.4)'
                }}></div>

                <div style={{ position: 'relative', zIndex: 2, height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', textAlign: 'center', color: 'white' }}>
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
                        <Col xs={12} sm={6} md={6}>
                            <div className="border shadow vacation-card">
                                <img src={vaction1_img} alt="Bell Glamp One" className="img-fluid w-100" style={{ height: '200px', objectFit: 'cover' }} />
                                <div className="p-3 text-start">
                                    <div className="d-flex flex-column flex-sm-row justify-content-between align-items-start">
                                        <h6 className="text-success section-name fw-bold mb-2 mb-sm-0">Bell Glamp One</h6>
                                        <div className="d-flex gap-2 text-muted small">
                                            <span className='small-para'>1–6 Persons</span>
                                            <span className='small-para'>25m²</span>
                                        </div>
                                    </div>
                                    <p className="small-para mt-2 d-none d-md-block">
                                        Lorem Ipsum Dolor Sit Amet, Consectetur Adipiscing Elit. Maecenas Eu Ipsum Volutpat.
                                    </p>
                                    <Button className="btn rounded bg-color border-0 w-100 w-sm-auto px-4 py-2 fw-semibold" style={{ fontSize: "12px" }}>
                                        CHECK AVAILABILITY
                                    </Button>
                                </div>
                            </div>
                        </Col>

                        <Col xs={12} sm={6} md={6}>
                            <div className="border shadow vacation-card" style={{ borderWidth: "2px" }}>
                                <img src={vaction2_img} alt="Caravan Soler Tent" className="img-fluid w-100" style={{ height: '200px', objectFit: 'cover' }} />
                                <div className="p-3 text-start">
                                    <div className="d-flex flex-column flex-sm-row justify-content-between align-items-start">
                                        <h6 className="text-success section-name fw-bold mb-2 mb-sm-0">Caravan Soler Tent</h6>
                                        <div className="d-flex gap-2 text-muted small">
                                            <span className='small-para'>2–6 Persons</span>
                                            <span className='small-para'>27m</span>
                                        </div>
                                    </div>
                                    <p className="small-para mt-2 d-none d-md-block">
                                        Lorem Ipsum Dolor Sit Amet, Consectetur Adipiscing Elit. Maecenas Eu Ipsum Volutpat.
                                    </p>
                                    <Button className="btn rounded bg-color border-0 w-100 w-sm-auto px-4 py-2 fw-semibold" style={{ fontSize: "12px" }}>
                                        CHECK AVAILABILITY
                                    </Button>
                                </div>
                            </div>
                        </Col>
                        <Col xs={12} sm={6} md={6}>
                            <div className="border shadow vacation-card">
                                <img src={vaction3_img} alt="Glamping Tent" className="img-fluid w-100" style={{ height: '200px', objectFit: 'cover' }} />
                                <div className="p-3 text-start">
                                    <div className="d-flex flex-column flex-sm-row justify-content-between align-items-start">
                                        <h6 className="text-success fw-bold section-name mb-2 mb-sm-0">Glamping Tent</h6>
                                        <div className="d-flex gap-2 text-muted small">
                                            <span className='small-para'>1–6 Persons</span>
                                            <span className='small-para'>17m²</span>
                                        </div>
                                    </div>
                                    <p className="small-para mt-2 d-none d-md-block">
                                        Lorem Ipsum Dolor Sit Amet, Consectetur Adipiscing Elit. Maecenas Eu Ipsum Volutpat.
                                    </p>
                                    <Button className="btn rounded bg-color border-0 w-100 w-sm-auto px-4 py-2 fw-semibold" style={{ fontSize: "12px" }}>
                                        CHECK AVAILABILITY
                                    </Button>
                                </div>
                            </div>
                        </Col>

                        <Col xs={12} sm={6} md={6}>
                            <div className="border shadow vacation-card" style={{ borderWidth: "2px" }}>
                                <img src={vaction4_img} alt="Small Cabin Wood" className="img-fluid w-100" style={{ height: '200px', objectFit: 'cover' }} />
                                <div className="p-3 text-start">
                                    <div className="d-flex flex-column flex-sm-row justify-content-between align-items-start">
                                        <h6 className="text-success fw-bold section-name mb-2 mb-sm-0">Small Cabin Wood</h6>
                                        <div className="d-flex gap-2 text-muted small">
                                            <span className='small-para'>1–6 Persons</span>
                                            <span className='small-para'>25m²</span>
                                        </div>
                                    </div>
                                    <p className="small-para mt-2 d-none d-md-block">
                                        Lorem Ipsum Dolor Sit Amet, Consectetur Adipiscing Elit. Maecenas Eu Ipsum Volutpat.
                                    </p>
                                    <Button className="btn rounded bg-color border-0 w-100 w-sm-auto px-4 py-2 fw-semibold" style={{ fontSize: "12px" }}>
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

                    <Row className="g-4 news-section">
                        <Col xs={12} sm={6} md={4}>
                            <div>
                                <img src={bitmap1_img} className="img-fluid mb-2 w-100" alt="Article 1" style={{ height: '180px', objectFit: 'cover', borderRadius: '8px' }} />
                                <p className="fw-semibold section-name text-start mb-1">
                                    Sed nec lorem scelerisque, viverra ex ut, interdum massa.
                                </p>
                                <p className="text-muted text-start small-para">Read..</p>
                            </div>
                        </Col>
                        <Col xs={12} sm={6} md={4}>
                            <div>
                                <img src={bitmap2_img} className="img-fluid mb-2 w-100" alt="Article 2" style={{ height: '180px', objectFit: 'cover', borderRadius: '8px' }} />
                                <p className="fw-semibold text-start section-name mb-1">
                                    Morbi ligula massa, posuere in finibus ut, varius ac ligula.
                                </p>
                                <p className="text-muted text-start small-para">Read..</p>
                            </div>
                        </Col>
                        <Col xs={12} sm={6} md={4}>
                            <div>
                                <img src={bitmap3_img} className="img-fluid mb-2 w-100" alt="Article 3" style={{ height: '180px', objectFit: 'cover', borderRadius: '8px' }} />
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
