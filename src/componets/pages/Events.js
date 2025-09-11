import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Card, Button, Badge } from 'react-bootstrap';
import { FaCalendarAlt, FaClock, FaMapMarkerAlt, FaUsers } from 'react-icons/fa';

const Events = () => {
  const [activeFilter, setActiveFilter] = useState('all');

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const events = [
    {
      id: 1,
      title: "Sunrise Yoga Session",
      date: "2024-02-15",
      time: "6:00 AM - 7:30 AM",
      location: "Lakeside Pavilion",
      category: "wellness",
      price: "Free",
      capacity: "20 people",
      description: "Start your day with peaceful yoga overlooking the beautiful lake.",
      image: "/api/placeholder/300/200"
    },
    {
      id: 2,
      title: "Campfire Stories & S'mores",
      date: "2024-02-16",
      time: "7:00 PM - 9:00 PM",
      location: "Main Fire Pit",
      category: "family",
      price: "$15/person",
      capacity: "30 people",
      description: "Gather around the fire for stories, songs, and delicious s'mores.",
      image: "/api/placeholder/300/200"
    },
    {
      id: 3,
      title: "Nature Photography Workshop",
      date: "2024-02-17",
      time: "9:00 AM - 12:00 PM",
      location: "Forest Trail",
      category: "workshop",
      price: "$45/person",
      capacity: "12 people",
      description: "Learn to capture the beauty of nature with professional photographer guidance.",
      image: "/api/placeholder/300/200"
    },
    {
      id: 4,
      title: "Guided Hiking Adventure",
      date: "2024-02-18",
      time: "8:00 AM - 2:00 PM",
      location: "Mountain Trail",
      category: "adventure",
      price: "$35/person",
      capacity: "15 people",
      description: "Explore scenic mountain trails with our experienced guides.",
      image: "/api/placeholder/300/200"
    },
    {
      id: 5,
      title: "Outdoor Cooking Class",
      date: "2024-02-19",
      time: "4:00 PM - 6:00 PM",
      location: "Outdoor Kitchen",
      category: "workshop",
      price: "$55/person",
      capacity: "10 people",
      description: "Master the art of cooking delicious meals over an open fire.",
      image: "/api/placeholder/300/200"
    },
    {
      id: 6,
      title: "Stargazing Night",
      date: "2024-02-20",
      time: "8:00 PM - 10:00 PM",
      location: "Observatory Deck",
      category: "family",
      price: "$20/person",
      capacity: "25 people",
      description: "Discover constellations and planets with telescopes and expert guidance.",
      image: "/api/placeholder/300/200"
    }
  ];

  const categories = [
    { key: 'all', label: 'All Events', color: 'secondary' },
    { key: 'family', label: 'Family Fun', color: 'primary' },
    { key: 'adventure', label: 'Adventure', color: 'success' },
    { key: 'wellness', label: 'Wellness', color: 'info' },
    { key: 'workshop', label: 'Workshops', color: 'warning' }
  ];

  const filteredEvents = activeFilter === 'all' 
    ? events 
    : events.filter(event => event.category === activeFilter);

  const getCategoryColor = (category) => {
    const cat = categories.find(c => c.key === category);
    return cat ? cat.color : 'secondary';
  };

  return (
    <div className="pt-5 mt-4">
      {/* Hero Section */}
      <section className="py-5" style={{ background: 'linear-gradient(135deg, #345E40 0%, #4a7c59 100%)' }}>
        <Container>
          <Row className="text-center text-white">
            <Col>
              <h1 className="display-4 fw-bold mb-3">Upcoming Events</h1>
              <p className="lead">Join us for exciting activities and memorable experiences</p>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Filter Section */}
      <section className="py-4" style={{ backgroundColor: '#f8f9fa' }}>
        <Container>
          <Row>
            <Col>
              <div className="d-flex flex-wrap justify-content-center gap-2">
                {categories.map((category) => (
                  <Button
                    key={category.key}
                    variant={activeFilter === category.key ? category.color : 'outline-secondary'}
                    size="sm"
                    onClick={() => setActiveFilter(category.key)}
                    className="rounded-pill"
                  >
                    {category.label}
                  </Button>
                ))}
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Events Grid */}
      <section className="py-5">
        <Container>
          <Row className="g-4">
            {filteredEvents.map((event) => (
              <Col xs={12} sm={6} md={6} lg={4} key={event.id}>
                <Card className="h-100 shadow-sm border-0 overflow-hidden">
                  <div 
                    className="card-img-top"
                    style={{
                      height: window.innerWidth < 576 ? '150px' : '200px',
                      background: `linear-gradient(45deg, #345E40, #4a7c59)`,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: 'white',
                      fontSize: window.innerWidth < 576 ? '2rem' : '3rem'
                    }}
                  >
                    <FaCalendarAlt />
                  </div>
                  <Card.Body className="d-flex flex-column p-3">
                    <div className="d-flex flex-column flex-sm-row justify-content-between align-items-start mb-2">
                      <Badge bg={getCategoryColor(event.category)} className="mb-2">
                        {categories.find(c => c.key === event.category)?.label}
                      </Badge>
                      <span className="fw-bold text-success">{event.price}</span>
                    </div>
                    
                    <Card.Title className="h6 h-sm-5 mb-3">{event.title}</Card.Title>
                    
                    <div className="mb-3 text-muted small">
                      <div className="d-flex align-items-center mb-1">
                        <FaCalendarAlt className="me-2" size={12} />
                        <span className="d-none d-md-inline">
                          {new Date(event.date).toLocaleDateString('en-US', { 
                            weekday: 'long', 
                            year: 'numeric', 
                            month: 'long', 
                            day: 'numeric' 
                          })}
                        </span>
                        <span className="d-md-none">
                          {new Date(event.date).toLocaleDateString('en-US', { 
                            month: 'short', 
                            day: 'numeric' 
                          })}
                        </span>
                      </div>
                      <div className="d-flex align-items-center mb-1">
                        <FaClock className="me-2" size={12} />
                        {event.time}
                      </div>
                      <div className="d-flex align-items-center mb-1">
                        <FaMapMarkerAlt className="me-2" size={12} />
                        {event.location}
                      </div>
                      <div className="d-flex align-items-center">
                        <FaUsers className="me-2" size={12} />
                        {event.capacity}
                      </div>
                    </div>
                    
                    <p className="text-muted small flex-grow-1 d-none d-md-block">{event.description}</p>
                    
                    <Button variant="success" size="sm" className="mt-auto w-100">
                      Register Now
                    </Button>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </Container>
      </section>

      {/* CTA Section */}
      <section className="py-5" style={{ backgroundColor: '#f8f9fa' }}>
        <Container>
          <Row>
            <Col lg={8} className="mx-auto text-center">
              <h2 className="fw-bold mb-3">Don't See What You're Looking For?</h2>
              <p className="text-muted mb-4">
                We're always planning new events and activities. Contact us to suggest an event or 
                inquire about private group activities.
              </p>
              <Button variant="success" size="lg" className="rounded-pill px-4">
                Contact Event Coordinator
              </Button>
            </Col>
          </Row>
        </Container>
      </section>
    </div>
  );
};

export default Events;