import React, { useEffect } from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { FaWifi, FaParking, FaShower, FaFire, FaUtensils, FaSwimmingPool } from 'react-icons/fa';
import { tent_img, van_img, cabin_img, vaction1_img, vaction2_img, vaction3_img, vaction4_img } from '../assets/images';

const Campground = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const accommodations = [
    {
      id: 1,
      name: "Luxury Tent",
      image: tent_img,
      price: "$89/night",
      capacity: "2-4 persons",
      size: "25m²",
      amenities: ["WiFi", "Private Bathroom", "Fire Pit", "Parking"]
    },
    {
      id: 2,
      name: "RV Site",
      image: van_img,
      price: "$65/night",
      capacity: "2-6 persons",
      size: "30m²",
      amenities: ["Electric Hookup", "Water", "Sewer", "WiFi"]
    },
    {
      id: 3,
      name: "Cabin Deluxe",
      image: cabin_img,
      price: "$120/night",
      capacity: "4-6 persons",
      size: "40m²",
      amenities: ["Kitchen", "AC", "WiFi", "Private Deck"]
    },
    {
      id: 4,
      name: "Bell Tent",
      image: vaction1_img,
      price: "$75/night",
      capacity: "2-4 persons",
      size: "20m²",
      amenities: ["Shared Bathroom", "Fire Pit", "WiFi"]
    }
  ];

  const facilities = [
    { icon: FaWifi, name: "Free WiFi", description: "High-speed internet throughout the campground" },
    { icon: FaParking, name: "Parking", description: "Free parking for all guests" },
    { icon: FaShower, name: "Clean Restrooms", description: "Modern facilities with hot showers" },
    { icon: FaFire, name: "Fire Pits", description: "Designated fire areas for evening gatherings" },
    { icon: FaUtensils, name: "Camp Store", description: "Basic supplies and snacks available" },
    { icon: FaSwimmingPool, name: "Swimming Area", description: "Natural swimming hole nearby" }
  ];

  return (
    <div className="pt-5 mt-4">
      {/* Hero Section */}
      <section className="py-5" style={{ background: 'linear-gradient(135deg, #345E40 0%, #4a7c59 100%)' }}>
        <Container>
          <Row className="text-center text-white">
            <Col>
              <h1 className="display-4 fw-bold mb-3">Our Campground</h1>
              <p className="lead">Experience nature at its finest with our premium camping facilities</p>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Accommodations Section */}
      <section className="py-5">
        <Container>
          <Row className="mb-5">
            <Col className="text-center">
              <h2 className="fw-bold mb-3">Choose Your Stay</h2>
              <p className="text-muted">From luxury tents to cozy cabins, find the perfect accommodation for your adventure</p>
            </Col>
          </Row>
          
          <Row className="g-4">
            {accommodations.map((item) => (
              <Col xs={12} sm={6} md={6} lg={3} key={item.id}>
                <Card className="h-100 shadow-sm border-0">
                  <Card.Img variant="top" src={item.image} style={{ height: window.innerWidth < 576 ? '180px' : '200px', objectFit: 'cover' }} />
                  <Card.Body className="d-flex flex-column p-3">
                    <div className="d-flex flex-column flex-sm-row justify-content-between align-items-start mb-2">
                      <Card.Title className="h6 h-sm-5 text-success mb-1 mb-sm-0">{item.name}</Card.Title>
                      <span className="fw-bold text-primary">{item.price}</span>
                    </div>
                    <div className="d-flex justify-content-between text-muted small mb-3">
                      <span>{item.capacity}</span>
                      <span>{item.size}</span>
                    </div>
                    <div className="mb-3 flex-grow-1">
                      {item.amenities.map((amenity, index) => (
                        <span key={index} className="badge bg-light text-dark me-1 mb-1" style={{fontSize: '10px'}}>{amenity}</span>
                      ))}
                    </div>
                    <Button variant="success" size="sm" className="mt-auto w-100">Book Now</Button>
                  </Card.Body>
                </Card>
              </Col>
            ))}
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
            <Col lg={8} className="mx-auto">
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
          </Row>
        </Container>
      </section>
    </div>
  );
};

export default Campground;