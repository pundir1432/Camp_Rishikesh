import React, { useEffect, useRef } from 'react';
import { Container, Row, Col, Button, Carousel } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import '../../styles/Vehicle.css';
import { boat, vehicle_banner } from '../../assets/images'; // Consider replacing with a rafting banner image
import { DataLoading } from '../../helper/loading/Loaders';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';
import { getRafting } from '../../redux/vehiclewithrafting/thunk'; // Assuming this thunk fetches rafting data

// VehicleCarousel component (renamed mentally to RaftingCarousel, but keeping same structure)
const RaftingCarousel = ({ raftings, sectionName, renderRaftingCard }) => {
  const carouselRef = useRef(null);

  const handleNext = () => {
    carouselRef.current?.next();
  };

  const handlePrev = () => {
    carouselRef.current?.prev();
  };

  if (!raftings || raftings.length === 0) {
    return <div className="text-center py-5 text-gray-500">No {sectionName} Available</div>;
  }

  // Group raftings into sets of 3 for each slide
  const slides = [];
  for (let i = 0; i < raftings.length; i += 3) {
    slides.push(raftings.slice(i, i + 3));
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
              {slide.map((rafting) => (
                <Col xs={12} md={4} key={rafting._id} className="mb-4 d-flex justify-content-center">
                  {renderRaftingCard(rafting)}
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
      {/* Conditionally render navigation buttons only if raftings length > 3 */}
      {raftings.length > 3 && (
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

const Rafting = () => {
  const dispatch = useDispatch();
  const { rafting, loading } = useSelector((state) => state.rafting || { rafting: { data: [] }, loading: false });

  useEffect(() => {
    dispatch(getRafting()).unwrap().catch((error) => {
      console.error('Failed to fetch rafting:', error);
    });
  }, [dispatch]);

  const renderRaftingCard = (rafting) => (
    <div className="custom-vehicle-card w-100 p-0 rounded shadow-sm text-center">
      {rafting?.imageUrls && rafting?.imageUrls?.length > 0 ? (
        <div style={{ height: '250px', overflow: 'hidden', position: 'relative' }}>
          <Carousel
            interval={null}
            indicators={rafting.imageUrls.length > 1}
            controls={rafting.imageUrls.length > 1}
            className="vehicle-image-carousel"
          >
            {rafting.imageUrls.map((imgUrl, idx) => (
              <Carousel.Item key={idx}>
                <img
                  src={imgUrl}
                  alt={rafting?.name || `Rafting Image ${idx + 1}`}
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
      <div className="d-flex ps-2 pe-2 justify-content-between align-items-center">
        <h4 className="mt-3 product-name">{rafting.name || 'N/A'}</h4>
      </div>
      {/* Additional rafting-specific details */}
      <div className="ps-2 pe-2 mb-3">
        <div className="d-flex justify-content-between text-muted small mb-1">
          <p className='product-para mb-0 text-dark'>Price:</p>
          <span className='product-para mb-0 '>${rafting.price || 'N/A'}</span>
        </div>

        <div className="d-flex justify-content-between text-muted small mb-1">
          <p className='product-para mb-0 text-dark'>Distance:</p>
          <span className='product-para mb-0 '>{rafting.distance || 'N/A'} km</span>
        </div>

        <div className="d-flex justify-content-between text-muted small mb-1">
          <p className='product-para mb-0 text-dark'>Duration:</p>
          <span className='product-para mb-0 '>{rafting.duration || 'N/A'} hours</span>
        </div>

        <div className="d-flex justify-content-between text-muted small mb-1">
          <p className='product-para mb-0 text-dark'>Grade:</p>
          <span className='product-para mb-0 '>{rafting.rapid || 'N/A'}</span>
        </div>

        <div className="d-flex justify-content-between text-muted small mb-1">
          <p className='product-para mb-0 text-dark'>Level:</p>
          <span className='product-para mb-0 '>{rafting.level || 'N/A'}</span>
        </div>

        <div className="d-flex justify-content-between text-muted small mb-1">
          <p className='product-para mb-0 text-dark'>Location:</p>
          <span className='product-para mb-0 '>{rafting.location || 'N/A'}</span>
        </div>
      </div>
      <p className="text-muted text-start ps-2 pe-2 product-para">{rafting?.description}</p>
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

  const raftingData = rafting?.data || [];

  return (
    <>
      {/* Banner Section - Adapted for Rafting */}
      <section className="vehicle-banner py-5">
        <Container>
          <Row className="align-items-center">
            <Col lg={6}>
              <div className="banner-content">
                <h1>Rafting Adventures</h1>
                <p className='text-muted product-para'>Experience thrilling rafting in Rishikesh with our premium services. Choose from various grades and durations for your adventure.</p>
                <Button variant="success">Book Now</Button>
              </div>
            </Col>
            <Col lg={6} className="d-flex justify-content-center align-items-center">
              <div className="banner-image">
                <img src={boat} alt="Rafting Adventure" className="img-fluid" />
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Rafting Section */}
      {loading ? (
        <DataLoading height={80} />
      ) : (
        <section className="rafting-section py-3">
          <Container className='d-flex flex-column align-items-center'>
            <div className="text-center w-50 mb-3">
              <h2 className="main-heading m-0">Rafting Packages</h2>
              <p className='text-muted product-para'>Discover exciting rafting options tailored for all skill levels. From beginner-friendly rides to extreme adventures – book your spot today!</p>
            </div>
            <RaftingCarousel
              raftings={raftingData}
              sectionName="Rafting Packages"
              renderRaftingCard={renderRaftingCard}
            />
          </Container>
        </section>
      )}
    </>
  );
};

export default Rafting;