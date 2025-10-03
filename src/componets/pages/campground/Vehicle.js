import React, { useEffect, useRef } from 'react';
import { Container, Row, Col, Button, Carousel } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { getVehicle } from '../../redux/vehiclewithrafting/thunk';
import '../../styles/Vehicle.css';
import { vehicle_banner } from '../../assets/images';
import { DataLoading } from '../../helper/loading/Loaders';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';

// VehicleCarousel component
const VehicleCarousel = ({ vehicles, sectionName, renderVehicleCard }) => {
    const carouselRef = useRef(null);

    const handleNext = () => {
        carouselRef.current?.next();
    };

    const handlePrev = () => {
        carouselRef.current?.prev();
    };

    if (!vehicles || vehicles.length === 0) {
        return <div className="text-center py-5 text-gray-500">No {sectionName} Available</div>;
    }

    // Group vehicles into sets of 3 for each slide
    const slides = [];
    for (let i = 0; i < vehicles.length; i += 3) {
        slides.push(vehicles.slice(i, i + 3));
    }

    return (
        <div className="vehicle-carousel-container w-100">
            <Carousel
                ref={carouselRef}
                interval={null}
                indicators={true}
                controls={false}
                className="vehicle-carousel"
                prevIcon={<span className="custom-prev-icon"><FaArrowLeft /></span>}
                nextIcon={<span className="custom-next-icon"><FaArrowRight /></span>}
            >
                {slides.map((slide, index) => (
                    <Carousel.Item key={index}>
                        <Row className="justify-content-center">
                            {slide.map((vehicle) => (
                                <Col xs={12} md={4} key={vehicle._id} className="mb-4 d-flex justify-content-center">
                                    {renderVehicleCard(vehicle)}
                                </Col>
                            ))}
                            {slide.length < 3 &&
                                Array.from({ length: 3 - slide.length }).map((_, idx) => (
                                    <Col xs={12} md={4} key={`empty-${idx}`} className="mb-4"></Col>
                                ))}
                        </Row>
                    </Carousel.Item>
                ))}
            </Carousel>
            {/* Conditionally render navigation buttons only if vehicles length > 3 */}
            {vehicles.length > 3 && (
                <div className="carousel-navigation">
                    <Button className="custom-nav-btn border-0 bg-success prev-btn" onClick={handlePrev}>
                        <FaArrowLeft />
                    </Button>
                    <Button className="custom-nav-btn border-0 bg-success ms-3 next-btn" onClick={handleNext}>
                        <FaArrowRight />
                    </Button>
                </div>
            )}
        </div>
    );
};

const Vehicle = () => {
    const dispatch = useDispatch();
    const { vehicle, loading } = useSelector((state) => state.vehicle || { vehicle: { data: [] }, loading: false });

    useEffect(() => {
        dispatch(getVehicle()).unwrap().catch((error) => {
            console.error('Failed to fetch vehicles:', error);
        });
    }, [dispatch]);

    // Filter vehicles by type
    const scootyVehicles = vehicle?.data?.filter((v) => v.type === 'Scooty') || [];
    const bikeVehicles = vehicle?.data?.filter((v) => v.type === 'Motorcycle') || [];
    const carVehicles = vehicle?.data?.filter((v) => !['Scooty', 'Motorcycle'].includes(v.type)) || [];

    const renderVehicleCard = (vehicle) => (
        <div className="custom-vehicle-card w-100 p-0 rounded shadow-sm text-center">
            {vehicle?.imageUrls && vehicle?.imageUrls?.length > 0 ? (
                <div style={{ height: '250px', overflow: 'hidden', position: 'relative' }}>
                    <Carousel
                        interval={null}
                        indicators={vehicle.imageUrls.length > 1}
                        controls={vehicle.imageUrls.length > 1}
                        className="vehicle-image-carousel"
                    >
                        {vehicle.imageUrls.map((imgUrl, idx) => (
                            <Carousel.Item key={idx}>
                                <img
                                    src={imgUrl}
                                    alt={vehicle?.name || `Vehicle Image ${idx + 1}`}
                                    className="d-block w-100 rounded"
                                    style={{ height: '250px', objectFit: 'cover' }}
                                    onError={(e) => {
                                        e.target.src = 'https://via.placeholder.com/300x250?text=No+Image';
                                    }}
                                />
                            </Carousel.Item>
                        ))}
                    </Carousel>
                </div>
            ) : (
                <div
                    className="bg-gray-100 rounded flex items-center justify-center text-gray-500 text-sm"
                    style={{ height: '250px' }}
                >
                    No Image
                </div>
            )}
            <div className="d-flex  ps-2 pe-2 justify-content-between align-items-center">
                <h4 className="mt-3 product-name">{vehicle.name || 'N/A'}</h4>
                <p className="mt-3  product-price">${vehicle.price || 'N/A'} Day</p>
            </div>
            <p className=" text-muted text-start ps-2 pe-2 product-para">{vehicle?.description}</p>
            <div className="d-flex ps-2 pe-2 justify-content-between gap-3 align-items-center">
                <Button variant="outline-secondary" className="w-100 learn-more-btn">
                    Detail
                </Button>
                <Button variant="outline-success" className="w-100 learn-more-btn">
                    Book
                </Button>
            </div>
        </div>
    );

    return (
        <>
            {/* Banner Section */}
            <section className="vehicle-banner py-5">
                <Container>
                    <Row className="align-items-center">
                        <Col lg={6}>
                            <div className="banner-content">
                                <h1>Vehicle Rental Services</h1>
                                <p className='text-muted product-para'>Explore Rishikesh with our premium vehicle rental services. From bikes for adventure seekers to comfortable cars for family trips.</p>
                                <Button variant="success">Book Now</Button>
                            </div>
                        </Col>
                        <Col lg={6} className="d-flex justify-content-center align-items-center">
                            <div className="banner-image">
                                <img src={vehicle_banner} alt="Vehicle Rental" className="img-fluid" />
                            </div>
                        </Col>
                    </Row>
                </Container>
            </section>

            {/* Scooty Section */}
            {loading ? (
                <DataLoading height={80} />
            ) : (
                <>
                    <section className="scooty-section py-3">
                        <Container className='d-flex flex-column align-items-center'>
                            <div className="text-center w-50 mb-3 ">
                                <h2 className="main-heading m-0">Scooty Rentals</h2>
                                <p className='text-muted product-para'>Affordable scooty rentals for city rides and short trips. Enjoy comfortable, fuel-efficient scooters with easy booking and flexible timings</p>
                            </div>
                            <VehicleCarousel
                                vehicles={scootyVehicles}
                                sectionName="Scooty Rentals"
                                renderVehicleCard={renderVehicleCard}
                            />
                        </Container>
                    </section>

                    <section className="bike-section py-3">
                        <Container className='d-flex flex-column align-items-center'>
                            <div className="text-center w-50 mb-3 ">
                                <h2 className="main-heading m-0">Bike Rentals</h2>
                                <p className='text-muted product-para'>Ride your favorite bike and experience freedom on the road. Ideal for city commuting, touring, or weekend trips – all bikes are fully serviced, fuel-efficient, and ready to ride</p>
                            </div>
                            <VehicleCarousel
                                vehicles={bikeVehicles}
                                sectionName="Bike Rentals"
                                renderVehicleCard={renderVehicleCard}
                            />
                        </Container>
                    </section>

                    <section className="car-section py-3">
                        <Container className='d-flex flex-column align-items-center'>
                            <div className="text-center w-50 mb-3 ">
                                <h2 className="main-heading m-0 ">Car Rentals</h2>
                                <p className='text-muted product-para'>Travel in comfort with our car rental service. Choose from a range of well-maintained cars for city trips, family outings, or long journeys – easy booking, flexible timings, and full support included</p>
                            </div>
                            <VehicleCarousel
                                vehicles={carVehicles}
                                sectionName="Car Rentals"
                                renderVehicleCard={renderVehicleCard}
                            />
                        </Container>
                    </section>
                </>
            )}
        </>
    );
};

export default Vehicle;