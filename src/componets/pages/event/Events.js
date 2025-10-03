import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Card, Button, Badge } from 'react-bootstrap';
import { FaArrowLeft, FaArrowRight, FaCalendarAlt, FaClock, FaMapMarkerAlt, FaUsers } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { getEvent } from '../../redux/event/thunk';
import { ButtonLoading, DataLoading } from '../../helper/loading/Loaders';

const Events = () => {
  const [activeFilter, setActiveFilter] = useState('all');
  const dispatch = useDispatch();
  const { event, loading } = useSelector(state => state.event || {});
  const [loadingItemId, setLoadingItemId] = useState(null);

  useEffect(() => {
    window.scrollTo(0, 0);
    dispatch(getEvent(activeFilter === 'all' ? 'all' : activeFilter));
  }, [dispatch, activeFilter]);


  const categories = [
    { key: 'all', label: 'All Events', color: 'success' },
    { key: 'Family Fun', label: 'Family Fun', color: 'success' },
    { key: 'Adventure', label: 'Adventure', color: 'success' },
    { key: 'Wellness', label: 'Wellness', color: 'success' },
    { key: 'Workshop', label: 'Workshops', color: 'success' }
  ];

    const handleBook = (item) => {
    setLoadingItemId(item._id);
    setTimeout(() => {
      window.location.href = `/camp/book-event?item=${encodeURIComponent(JSON.stringify(item))}`;
    }, 3000);
  };

  return (
    <div className="">
      {/* Hero Section */}
      <section className="py-5" style={{ background: 'linear-gradient(135deg, #345E40 0%, #4a7c59 100%)' }}>
        <Container>
          <Row className=" mt-4 text-center text-white">
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
                ))
              }
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Events Grid */}
      <section className="py-5">
        <Container>
          <Row className="g-4">
            {loading ? (<div><DataLoading /></div>) : event?.data?.length === 0 ? (
              <div className="text-center w-100">
                <h4 className="text-danger">No events available</h4>
                <p className="text-muted">Check back later for upcoming events</p>
              </div>
            ) : (
              event?.data?.map((event) => (
                <Col xs={12} sm={6} md={6} lg={4} key={event.id}>
                  <Card className="h-100 shadow-sm border-0 overflow-hidden">
                    <div
                      className="card-img-top mb-2"
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
                      <img src={event?.imageUrl} className='img-fluid' alt="event?.name" />
                    </div>
                    <Card.Body className="d-flex flex-column p-3">
                      <div className="d-flex flex-column flex-sm-row justify-content-between align-items-start mb-2">
                        <Badge className="mb-2 bg-success">
                          {event?.type}
                        </Badge>
                        <span className="fw-bold text-success">{event?.price ? `$${event?.price}/person` : 'N/A'}</span>
                      </div>

                      <Card.Title className="h6 h-sm-5 mb-3">{event?.name}</Card.Title>

                      <div className="mb-3 text-muted small">
                        <div className="d-flex align-items-center mb-1">
                          <FaCalendarAlt className="me-2" size={12} />
                          <span className="d-none d-md-inline">
                            {new Date(event.date).toLocaleDateString('en-US', {
                              weekday: 'short',
                              year: 'numeric',
                              month: 'short',
                              day: 'numeric'
                            })}
                          </span>

                        </div>
                        <div className="d-flex align-items-center mb-1">
                          <FaClock className="me-2" size={12} />
                          {event.startTime} - {event.endTime}
                        </div>
                        <div className="d-flex align-items-center mb-1">
                          <FaMapMarkerAlt className="me-2" size={12} />
                          {event.address}
                        </div>
                        <div className="d-flex align-items-center">
                          <FaUsers className="me-2" size={12} />
                          {event.person}
                        </div>
                      </div>

                      <p className="text-muted small flex-grow-1 d-none d-md-block">{event.description}</p>

                      <Button variant="success" size="sm" className="mt-auto w-100" onClick={() => handleBook(event)} disabled={loadingItemId === event._id}>
                        {loadingItemId === event._id ? <ButtonLoading height={20} /> : 'Register Now'}
                      </Button>
                    </Card.Body>
                  </Card>
                </Col>
              )))}
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