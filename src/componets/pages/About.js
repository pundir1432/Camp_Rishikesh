import React, { useEffect } from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import { FaLeaf, FaMountain, FaUsers, FaHeart } from 'react-icons/fa';

const About = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const values = [
    {
      icon: FaLeaf,
      title: "Eco-Friendly",
      description: "We are committed to sustainable camping practices that protect our natural environment."
    },
    {
      icon: FaMountain,
      title: "Adventure",
      description: "Experience the thrill of outdoor adventures in the beautiful landscapes of Rishikesh."
    },
    {
      icon: FaUsers,
      title: "Community",
      description: "Join a community of nature lovers and adventure seekers from around the world."
    },
    {
      icon: FaHeart,
      title: "Comfort",
      description: "Enjoy modern amenities and comfortable accommodations in the heart of nature."
    }
  ];

  return (
    <div className="pt-5 mt-4">
      {/* Hero Section */}
      <section className="py-5" style={{ background: 'linear-gradient(135deg, #345E40 0%, #4a7c59 100%)' }}>
        <Container>
          <Row className="text-center text-white">
            <Col>
              <h1 className="display-4 fw-bold mb-3">About Camp Rishikesh</h1>
              <p className="lead">Your gateway to unforgettable outdoor experiences</p>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Story Section */}
      <section className="py-5">
        <Container>
          <Row className="align-items-center">
            <Col xs={12} lg={6} className="mb-4 mb-lg-0">
              <h2 className="fw-bold mb-4">Our Story</h2>
              <p className="mb-3">
                Nestled in the foothills of the Himalayas, Camp Rishikesh has been providing 
                exceptional outdoor experiences since 2015. What started as a small family 
                business has grown into one of the most trusted camping destinations in Uttarakhand.
              </p>
              <p className="mb-3">
                We believe that everyone deserves to experience the peace and adventure that 
                nature offers. Our carefully designed accommodations and activities cater to 
                both seasoned adventurers and families looking for their first camping experience.
              </p>
              <p>
                Located near the sacred Ganges River and surrounded by lush forests, our 
                campground offers the perfect blend of spiritual tranquility and outdoor excitement.
              </p>
            </Col>
            <Col xs={12} lg={6}>
              <div 
                className="bg-light rounded"
                style={{ 
                  height: '300px',
                  backgroundImage: 'linear-gradient(45deg, #345E40, #4a7c59)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'white'
                }}
              >
                <div className="text-center">
                  <FaMountain size={80} className="mb-3" />
                  <h4>Since 2015</h4>
                  <p>Serving Adventure Seekers</p>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Values Section */}
      <section className="py-5" style={{ backgroundColor: '#f8f9fa' }}>
        <Container>
          <Row className="mb-5">
            <Col className="text-center">
              <h2 className="fw-bold mb-3">Our Values</h2>
              <p className="text-muted">What drives us to provide exceptional camping experiences</p>
            </Col>
          </Row>
          
          <Row className="g-4">
            {values.map((value, index) => (
              <Col xs={12} sm={6} lg={3} key={index}>
                <Card className="h-100 text-center border-0 shadow-sm">
                  <Card.Body className="p-4">
                    <value.icon size={50} className="text-success mb-3" />
                    <Card.Title className="h5 mb-3">{value.title}</Card.Title>
                    <Card.Text className="text-muted small">{value.description}</Card.Text>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </Container>
      </section>

      {/* Stats Section */}
      <section className="py-5">
        <Container>
          <Row className="text-center">
            <Col xs={6} md={3} className="mb-4">
              <h2 className="fw-bold text-success mb-2">500+</h2>
              <p className="text-muted">Happy Campers</p>
            </Col>
            <Col xs={6} md={3} className="mb-4">
              <h2 className="fw-bold text-success mb-2">50+</h2>
              <p className="text-muted">Camping Sites</p>
            </Col>
            <Col xs={6} md={3} className="mb-4">
              <h2 className="fw-bold text-success mb-2">8+</h2>
              <p className="text-muted">Years Experience</p>
            </Col>
            <Col xs={6} md={3} className="mb-4">
              <h2 className="fw-bold text-success mb-2">24/7</h2>
              <p className="text-muted">Support Available</p>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Mission Section */}
      <section className="py-5" style={{ backgroundColor: '#f8f9fa' }}>
        <Container>
          <Row>
            <Col lg={8} className="mx-auto text-center">
              <h2 className="fw-bold mb-4">Our Mission</h2>
              <p className="lead mb-4">
                To provide safe, comfortable, and memorable outdoor experiences that connect 
                people with nature while promoting environmental conservation and sustainable tourism.
              </p>
              <p className="text-muted">
                We are committed to creating a welcoming environment where families, friends, 
                and solo travelers can disconnect from the digital world and reconnect with 
                what truly matters - nature, adventure, and human connection.
              </p>
            </Col>
          </Row>
        </Container>
      </section>
    </div>
  );
};

export default About;