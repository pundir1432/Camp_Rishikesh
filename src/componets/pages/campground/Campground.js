import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Card, Button, Offcanvas, Form } from 'react-bootstrap';
import { FaWifi, FaParking, FaShower, FaFire, FaUtensils, FaSwimmingPool } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { getGround } from '../../redux/ground/thunk';
import { ButtonLoading, DataLoading } from '../../helper/loading/Loaders';

const Campground = () => {
  const dispatch = useDispatch();
  const { ground, loading } = useSelector(state => state.ground || {});
  const [loadingItemId, setLoadingItemId] = useState(null);

  useEffect(() => {
    window.scrollTo(0, 0);
    dispatch(getGround());
  }, [dispatch]);

  const handleBookNow = (item) => {
    setLoadingItemId(item._id);
    setTimeout(() => {
      window.location.href = `/camp/book-now?item=${encodeURIComponent(JSON.stringify(item))}`;
    }, 3000);
  };


  const facilities = [
    { icon: FaWifi, name: "Free WiFi", description: "High-speed internet throughout the campground" },
    { icon: FaParking, name: "Parking", description: "Free parking for all guests" },
    { icon: FaShower, name: "Clean Restrooms", description: "Modern facilities with hot showers" },
    { icon: FaFire, name: "Fire Pits", description: "Designated fire areas for evening gatherings" },
    { icon: FaUtensils, name: "Camp Store", description: "Basic supplies and snacks available" },
    { icon: FaSwimmingPool, name: "Swimming Area", description: "Natural swimming hole nearby" }
  ];

  return (
    <div className="">
      {/* Hero Section */}
        <Container fluid>
          <Row className="text-center  text-white">
            <Col className='position-relative p-0 w-100' style={{ height: '400px' }}>
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
                  objectFit: 'cover',
                  zIndex: 1
                }}
              >
                <source src={require('../../assets/campvideos.mp4')} type="video/mp4" className='rounded' />
              </video>
              <div className="position-relative" style={{ zIndex: 2 , top: '50%', transform: 'translateY(-50%)' }}>
                <h1 className="display-4 fw-bold  mb-3">Our Campground</h1>
                <p className="lead">Experience nature at its finest with our premium camping facilities</p>
              </div>
            </Col>
          </Row>
        </Container>

      {/* Accommodations Section */}
      <section className="py-4">
        <Container>
          <Row className="mb-5">
            <Col className="text-center">
              <h2 className="fw-bold mb-3">Choose Your Stay</h2>
              <p className="text-muted">From luxury tents to cozy cabins, find the perfect accommodation for your adventure</p>
            </Col>
          </Row>

          <Row className="g-4">
            {loading ? (
              <div className="text-center w-100"><DataLoading /></div>
            ) : ground?.data?.length > 0 ? (
              ground?.data?.map((item) => (
                <Col xs={12} sm={6} md={6} lg={3} key={item._id}>
                  <Card className="h-100 shadow-sm border-0">
                    <Card.Img variant="top" src={item.imageUrl} style={{ height: window.innerWidth < 576 ? '180px' : '200px', objectFit: 'cover' }} />
                    <Card.Body className="d-flex flex-column p-3">
                      <div className="d-flex flex-column flex-sm-row justify-content-between align-items-start mb-2">
                        <Card.Title className="h6 h-sm-5 text-success mb-1 mb-sm-0">{item.name}</Card.Title>
                        <span className="fw-bold text-primary">{item.price}</span>
                      </div>
                      <div className="d-flex justify-content-between text-muted small mb-3">
                        <span>Person {item.person}</span>
                        <span>{item.size}</span>
                      </div>
                      <div className="mb-3 flex-grow-1">
                        {item?.facilities?.map((amenity, index) => (
                          <span key={index} className="badge bg-light text-dark me-1 mb-1" style={{ fontSize: '10px' }}>{amenity}</span>
                        ))}
                      </div>
                      <Button variant="success" size="sm" className="mt-auto w-100" onClick={() => handleBookNow(item)} disabled={loadingItemId === item._id}>
                        {loadingItemId === item._id ? <ButtonLoading height={20} /> : 'Book Now'}
                      </Button>
                    </Card.Body>
                  </Card>
                </Col>
              ))
            ) : (
              <div className="text-center w-100">
                <h4 className="text-muted">No accommodations available</h4>
                <p className="text-muted">Check back later for accommodation options</p>
              </div>
            )}
          </Row>
        </Container>
      </section>

      {/* Facilities Section */}
      <section className="py-5" style={{ backgroundColor: '#f8f9fa' }}>
        <Container>
          <Row className="mb-5">
            <Col className="text-center">
              <h2 className="fw-bold mb-3">Campground Facilities</h2>
              <p className="text-muted">Everything you need for a comfortable outdoor experience</p>
            </Col>
          </Row>

          <Row className="g-4">
            {facilities.map((facility, index) => (
              <Col xs={6} sm={4} md={6} lg={4} key={index}>
                <div className="text-center p-3 p-md-4">
                  <facility.icon size={window.innerWidth < 576 ? 30 : 40} className="text-success mb-3" />
                  <h6 className="h6 h-md-5 fw-bold">{facility.name}</h6>
                  <p className="text-muted small d-none d-md-block">{facility.description}</p>
                </div>
              </Col>
            ))}
          </Row>
        </Container>
      </section>

      {/* Rules Section */}
      <section className="py-5">
        <Container>
          <Row>
            <Col lg={6} className="mx-auto">
              <h2 className="fw-bold text-center mb-4">Campground Rules</h2>
              <div className="bg-light p-4 rounded">
                <ul className="list-unstyled">
                  <li className="mb-2">✓ Check-in: 3:00 PM | Check-out: 11:00 AM</li>
                  <li className="mb-2">✓ Quiet hours: 10:00 PM - 7:00 AM</li>
                  <li className="mb-2">✓ Maximum 6 people per site</li>
                  <li className="mb-2">✓ Pets welcome (must be leashed)</li>
                  <li className="mb-2">✓ No loud music or generators after 9:00 PM</li>
                  <li className="mb-2">✓ Fires only in designated fire pits</li>
                  <li className="mb-2">✓ Pack out all trash - Leave No Trace</li>
                </ul>
              </div>
            </Col>
            <Col lg={6} className='mx-auto pt-4 ' style={{ height: '300px' }}>

            </Col>
          </Row>
        </Container>
      </section>


    </div>
  );
};

export default Campground;