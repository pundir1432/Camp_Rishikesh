import React, { useEffect } from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { FaMapMarkerAlt, FaClock, FaPhone, FaGlobe, FaStar } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { getLocation } from '../redux/location/thunk';
import { PageLoading } from '../helper/loading/Loaders';

const NearMe = () => {
  const dispatch = useDispatch();
  const { location, loading } = useSelector(state => state.location || {});
console.log({location});
  useEffect(() => {
    window.scrollTo(0, 0);
    dispatch(getLocation());
  }, [dispatch]);

  const attractions = [
    {
      id: 1,
      name: "Rishikesh River Rafting",
      category: "Adventure",
      distance: "2.5 km",
      duration: "15 min drive",
      rating: 4.8,
      description: "Experience thrilling white water rafting on the Ganges River with professional guides.",
      phone: "+91 98765 43210",
      website: "www.rishikeshrafting.com",
      image: "/api/placeholder/300/200"
    },
    {
      id: 2,
      name: "Laxman Jhula",
      category: "Landmark",
      distance: "3.2 km",
      duration: "20 min drive",
      rating: 4.6,
      description: "Famous suspension bridge over the Ganges, perfect for photography and spiritual walks.",
      phone: "N/A",
      website: "N/A",
      image: "/api/placeholder/300/200"
    },
    {
      id: 3,
      name: "Beatles Ashram",
      category: "Cultural",
      distance: "4.1 km",
      duration: "25 min drive",
      rating: 4.5,
      description: "Historic ashram where The Beatles stayed in 1968, now a meditation and art center.",
      phone: "+91 98765 43211",
      website: "www.beatlesashram.org",
      image: "/api/placeholder/300/200"
    },
    {
      id: 4,
      name: "Triveni Ghat",
      category: "Spiritual",
      distance: "3.8 km",
      duration: "22 min drive",
      rating: 4.7,
      description: "Sacred bathing ghat where three rivers meet, famous for evening Ganga Aarti ceremony.",
      phone: "N/A",
      website: "N/A",
      image: "/api/placeholder/300/200"
    },
    {
      id: 5,
      name: "Neer Garh Waterfall",
      category: "Nature",
      distance: "8.5 km",
      duration: "45 min drive + 20 min trek",
      rating: 4.4,
      description: "Beautiful waterfall perfect for swimming and picnics, surrounded by lush greenery.",
      phone: "N/A",
      website: "N/A",
      image: "/api/placeholder/300/200"
    },
    {
      id: 6,
      name: "Parmarth Niketan Ashram",
      category: "Spiritual",
      distance: "3.5 km",
      duration: "18 min drive",
      rating: 4.9,
      description: "Largest ashram in Rishikesh offering yoga classes, meditation, and spiritual programs.",
      phone: "+91 98765 43212",
      website: "www.parmarth.org",
      image: "/api/placeholder/300/200"
    },
    {
      id: 7,
      name: "Rajaji National Park",
      category: "Wildlife",
      distance: "15 km",
      duration: "1 hour drive",
      rating: 4.3,
      description: "Wildlife sanctuary home to elephants, tigers, leopards, and diverse bird species.",
      phone: "+91 98765 43213",
      website: "www.rajajipark.gov.in",
      image: "/api/placeholder/300/200"
    },
    {
      id: 8,
      name: "Kunjapuri Temple",
      category: "Spiritual",
      distance: "12 km",
      duration: "50 min drive",
      rating: 4.6,
      description: "Hilltop temple offering panoramic views of the Himalayas and sunrise/sunset views.",
      phone: "N/A",
      website: "N/A",
      image: "/api/placeholder/300/200"
    }
  ];

  const restaurants = [
    {
      id: 1,
      name: "Chotiwala Restaurant",
      cuisine: "North Indian",
      distance: "3.0 km",
      rating: 4.2,
      priceRange: "₹₹",
      phone: "+91 98765 43214"
    },
    {
      id: 2,
      name: "Little Buddha Cafe",
      cuisine: "Multi-cuisine",
      distance: "3.5 km",
      rating: 4.5,
      priceRange: "₹₹",
      phone: "+91 98765 43215"
    },
    {
      id: 3,
      name: "Pyramid Cafe",
      cuisine: "Continental",
      distance: "4.0 km",
      rating: 4.3,
      priceRange: "₹₹₹",
      phone: "+91 98765 43216"
    }
  ];

  const getCategoryColor = (category) => {
    const colors = {
      'Adventure': 'danger',
      'Landmark': 'primary',
      'Cultural': 'warning',
      'Spiritual': 'info',
      'Nature': 'success',
      'Wildlife': 'dark'
    };
    return colors[category] || 'secondary';
  };

  return (
    <div className="pt-5 mt-3">
      {/* Hero Section */}
      <section className="py-5" style={{ background: 'linear-gradient(135deg, #345E40 0%, #4a7c59 100%)' }}>
        <Container>
          <Row className="text-center text-white">
            <Col>
              <h1 className="display-4 fw-bold mb-3">Explore Near Me</h1>
              <p className="lead">Discover amazing attractions, restaurants, and activities around our campground</p>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Attractions Section */}
      <section className="py-5">
        <Container>
          <Row className="mb-4">
            <Col>
              <h2 className="fw-bold text-center mb-3">Top Attractions</h2>
              <p className="text-center text-muted">Must-visit places within easy reach of our campground</p>
            </Col>
          </Row>
          
          <Row className="g-4">
            {loading ? (
              <div className="text-center w-100"><PageLoading/></div>
            ) : location?.data?.length > 0 ? (
              location?.data?.map((locationItem) => (
                <Col xs={12} sm={6} lg={4} key={locationItem._id}>
                  <Card className="h-100 shadow-sm border-0">
                    <img 
                      src={locationItem?.imageUrl}
                      alt={locationItem?.title}
                      className="card-img-top img-fluid"
                      style={{ height: '180px', objectFit: 'cover' }}
                    />
                    <Card.Body className="d-flex flex-column">
                      <div className="d-flex justify-content-between align-items-start mb-2">
                        <span className={`badge bg-${getCategoryColor(locationItem?.type)} mb-2`}>
                          {locationItem?.type}
                        </span>
                      </div>
                      
                      <Card.Title className="h5 mb-2">{locationItem?.title}</Card.Title>
                      
                      <div className="mb-3 text-muted small">
                        <div className="d-flex align-items-center mb-1">
                          <FaMapMarkerAlt className="me-2" />
                          {locationItem?.distance} away
                        </div>
                        <div className="d-flex align-items-center mb-1">
                          <FaClock className="me-2" />
                          {locationItem?.driveTime}
                        </div>
                        <div className="d-flex align-items-center mb-1">
                          <FaMapMarkerAlt className="me-2" />
                          {locationItem?.city}, {locationItem?.state}
                        </div>
                        {locationItem?.link && (
                          <div className="d-flex align-items-center">
                            <FaGlobe className="me-2" />
                            <a href={locationItem?.link} target="_blank" rel="noopener noreferrer" className="text-decoration-none small">
                              Visit Website
                            </a>
                          </div>
                        )}
                      </div>
                      
                      <p className="text-muted small flex-grow-1">{locationItem?.description}</p>
                      
                      <Button variant="outline-success" size="sm" className="mt-auto">
                        Get Directions
                      </Button>
                    </Card.Body>
                  </Card>
                </Col>
              ))
            ) : (
              <div className="text-center w-100">
                <h4 className="text-muted">No locations available</h4>
                <p className="text-muted">Check back later for nearby attractions</p>
              </div>
            )}
          </Row>
        </Container>
      </section>

      {/* Restaurants Section */}
      <section className="py-5" style={{ backgroundColor: '#f8f9fa' }}>
        <Container>
          <Row className="mb-4">
            <Col>
              <h2 className="fw-bold text-center mb-3">Nearby Restaurants</h2>
              <p className="text-center text-muted">Great dining options close to our campground</p>
            </Col>
          </Row>
          
          <Row className="g-4">
            {restaurants.map((restaurant) => (
              <Col xs={12} sm={6} lg={4} key={restaurant.id}>
                <Card className="shadow-sm border-0">
                  <Card.Body className="p-3">
                    <div className="d-flex flex-column flex-sm-row justify-content-between align-items-start mb-2">
                      <Card.Title className="h6 h-sm-5 mb-1 mb-sm-0">{restaurant.name}</Card.Title>
                      <div className="d-flex align-items-center text-warning">
                        <FaStar className="me-1" size={14} />
                        <small>{restaurant.rating}</small>
                      </div>
                    </div>
                    
                    <div className="d-flex justify-content-between align-items-center mb-2">
                      <span className="badge bg-secondary">{restaurant.cuisine}</span>
                      <span className="text-success fw-bold">{restaurant.priceRange}</span>
                    </div>
                    
                    <div className="text-muted small mb-3">
                      <div className="d-flex align-items-center mb-1">
                        <FaMapMarkerAlt className="me-2" />
                        {restaurant.distance} away
                      </div>
                      <div className="d-flex align-items-center">
                        <FaPhone className="me-2" />
                        {restaurant.phone}
                      </div>
                    </div>
                    
                    <Button variant="outline-success" size="sm" className="w-100">
                      View Menu & Directions
                    </Button>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </Container>
      </section>

      {/* Map Section */}
      <section className="py-5">
        <Container>
          <Row>
            <Col>
              <h2 className="fw-bold text-center mb-4">Interactive Map</h2>
              <div 
                className="bg-light rounded d-flex align-items-center justify-content-center"
                style={{ height: '400px' }}
              >
                <div className="text-center text-muted">
                  <FaMapMarkerAlt size={48} className="mb-3" />
                  <h4>Interactive Map Coming Soon</h4>
                  <p>Explore all nearby attractions on our interactive map</p>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
    </div>
  );
};

export default NearMe;