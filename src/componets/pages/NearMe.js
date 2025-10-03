import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Card, Button, Form, Badge } from 'react-bootstrap';
import { FaMapMarkerAlt, FaClock, FaPhone, FaGlobe, FaStar, FaFilter, FaLocationArrow } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { getLocation } from '../redux/location/thunk';
import { DataLoading } from '../helper/loading/Loaders';

const NearMe = () => {
  const dispatch = useDispatch();
  const { location, loading } = useSelector(state => state.location || {});
  const [userLocation, setUserLocation] = useState(null);
  const [filter, setFilter] = useState('all');
  const [sortBy, setSortBy] = useState('distance');
  const [locationDistances, setLocationDistances] = useState({});
console.log({location});
  useEffect(() => {
    window.scrollTo(0, 0);
    dispatch(getLocation());
    getCurrentLocation();
  }, [dispatch]);

  const getCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude
          });
        },
        (error) => {
          console.log('Location access denied');
        }
      );
    }
  };

  // Calculate real distance from user location
  const calculateRealDistance = async (userLat, userLng, locationId) => {
    try {
      const response = await fetch('/api/location/user-distance', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userLat, userLng, locationId })
      });
      return response.json();
    } catch (error) {
      console.error('Distance calculation error:', error);
      return null;
    }
  };

  // Calculate distances for all locations when user location is available
  useEffect(() => {
    if (userLocation && location?.data?.length > 0) {
      location.data.forEach(async (locationItem) => {
        const distanceData = await calculateRealDistance(
          userLocation.lat, 
          userLocation.lng, 
          locationItem._id
        );
        if (distanceData) {
          setLocationDistances(prev => ({
            ...prev,
            [locationItem._id]: distanceData.distance
          }));
        }
      });
    }
  }, [userLocation, location?.data]);

  const filteredLocations = location?.data?.filter(item => 
    filter === 'all' || item.type === filter
  ) || [];

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
    <div className="">
      {/* Hero Section */}
      <section className="py-5" style={{ background: 'linear-gradient(135deg, #345E40 0%, #4a7c59 100%)' }}>
        <Container>
          <Row className="text-center mt-4 text-white">
            <Col>
              <h1 className="display-4 fw-bold mb-3">Explore Near Me</h1>
              <p className="lead">Discover amazing attractions, restaurants, and activities around our campground</p>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Attractions Section */}
      <section className="py-4">
        <Container>
          <Row className="mb-4">
            <Col>
              <h2 className="fw-bold text-center mb-3">Top Attractions</h2>
              <p className="text-center text-muted">Must-visit places within easy reach of our campground</p>
              
              {/* Filters */}
              <Row className="justify-content-center mb-4">
                <Col md={8}>
                  <div className="d-flex flex-wrap gap-3 justify-content-center align-items-center">
                    <Button 
                      variant="outline-success" 
                      size="sm"
                      onClick={getCurrentLocation}
                      className="d-flex align-items-center"
                    >
                      <FaLocationArrow className="me-2" />
                      {userLocation ? 'Location Detected' : 'Get My Location'}
                    </Button>
                    
                    <Form.Select 
                      size="sm" 
                      style={{ width: 'auto' }}
                      value={filter}
                      onChange={(e) => setFilter(e.target.value)}
                    >
                      <option value="all">All Categories</option>
                      <option value="Adventure">Adventure</option>
                      <option value="Landmark">Landmark</option>
                      <option value="Cultural">Cultural</option>
                      <option value="Spiritual">Spiritual</option>
                      <option value="Nature">Nature</option>
                      <option value="Wildlife">Wildlife</option>
                    </Form.Select>
                    
                    <Form.Select 
                      size="sm" 
                      style={{ width: 'auto' }}
                      value={sortBy}
                      onChange={(e) => setSortBy(e.target.value)}
                    >
                      <option value="distance">Sort by Distance</option>
                      <option value="name">Sort by Name</option>
                      <option value="type">Sort by Type</option>
                    </Form.Select>
                  </div>
                </Col>
              </Row>
            </Col>
          </Row>
          
          <Row className="g-4">
            {loading ? (
              <div className="text-center w-100"><DataLoading/></div>
            ) : filteredLocations?.length > 0 ? (
              filteredLocations?.map((locationItem) => (
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
                      
                      <Card.Title className="h5 mb-2">{locationItem?.title?.charAt(0).toUpperCase() + locationItem?.title?.slice(1)}</Card.Title>
                      
                      <div className="mb-3 text-muted small">
                        <div className="d-flex align-items-center mb-1">
                          <FaMapMarkerAlt className="me-2" />
                          {userLocation && locationDistances[locationItem._id] 
                            ? `${locationDistances[locationItem._id]} km away`
                            : `${locationItem?.driveTime} mins drive`
                          }
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
                      
                      <div className="d-flex gap-2 mt-auto">
                        <Button 
                          variant="outline-success" 
                          size="sm" 
                          className="flex-fill"
                          onClick={() => window.open(`https://maps.google.com/maps?q=${locationItem?.title}+${locationItem?.city}`, '_blank')}
                        >
                          Get Directions
                        </Button>
                        {userLocation && locationDistances[locationItem._id] && (
                          <Badge bg="info" className="d-flex align-items-center">
                            {locationDistances[locationItem._id]} km
                          </Badge>
                        )}
                      </div>
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