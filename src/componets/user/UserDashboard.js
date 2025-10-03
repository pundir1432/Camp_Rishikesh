import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Button, Badge, Tab, Tabs } from 'react-bootstrap';
import { FaCalendarAlt, FaMapMarkerAlt, FaUsers, FaStar, FaWhatsapp, FaDownload } from 'react-icons/fa';
import { getUserFromSession } from '../helper/api/apiCore';

const UserDashboard = () => {
    const [activeTab, setActiveTab] = useState('bookings');
    const [bookings, setBookings] = useState([]);
    const [favorites, setFavorites] = useState([]);
    const user = getUserFromSession();

    useEffect(() => {
        // Fetch user bookings and favorites
        fetchUserData();
    }, []);

    const fetchUserData = () => {
        // Mock data - replace with actual API calls
        setBookings([
            {
                id: 1,
                groundName: 'Luxury Tent',
                checkIn: '2024-01-15',
                checkOut: '2024-01-17',
                guests: 2,
                status: 'confirmed',
                amount: 5000,
                paymentStatus: 'completed'
            }
        ]);
    };

    const getStatusColor = (status) => {
        const colors = {
            confirmed: 'success',
            pending: 'warning',
            cancelled: 'danger',
            completed: 'info'
        };
        return colors[status] || 'secondary';
    };

    const handleWhatsAppSupport = (bookingId) => {
        const message = `Hi! I need help with my booking ID: ${bookingId}`;
        window.open(`https://wa.me/919876543210?text=${encodeURIComponent(message)}`);
    };

    return (
        <div className="user-dashboard pt-5 mt-3">
            <Container>
                <Row className="mb-4">
                    <Col>
                        <h2 className="fw-bold">Welcome back, {user?.name || 'Guest'}!</h2>
                        <p className="text-muted">Manage your bookings and explore new adventures</p>
                    </Col>
                </Row>

                <Tabs activeKey={activeTab} onSelect={setActiveTab} className="mb-4">
                    <Tab eventKey="bookings" title="My Bookings">
                        <Row className="g-4">
                            {bookings.length > 0 ? bookings.map((booking) => (
                                <Col md={6} lg={4} key={booking.id}>
                                    <Card className="h-100 shadow-sm">
                                        <Card.Body>
                                            <div className="d-flex justify-content-between align-items-start mb-3">
                                                <h6 className="fw-bold">{booking.groundName}</h6>
                                                <Badge bg={getStatusColor(booking.status)}>
                                                    {booking.status}
                                                </Badge>
                                            </div>
                                            
                                            <div className="mb-3">
                                                <div className="d-flex align-items-center mb-1">
                                                    <FaCalendarAlt className="me-2 text-muted" size={14} />
                                                    <small>{booking.checkIn} to {booking.checkOut}</small>
                                                </div>
                                                <div className="d-flex align-items-center mb-1">
                                                    <FaUsers className="me-2 text-muted" size={14} />
                                                    <small>{booking.guests} Guests</small>
                                                </div>
                                                <div className="d-flex align-items-center">
                                                    <span className="me-2">💰</span>
                                                    <small>₹{booking.amount}</small>
                                                </div>
                                            </div>

                                            <div className="d-flex gap-2">
                                                <Button 
                                                    size="sm" 
                                                    variant="outline-success"
                                                    onClick={() => handleWhatsAppSupport(booking.id)}
                                                >
                                                    <FaWhatsapp className="me-1" />
                                                    Support
                                                </Button>
                                                <Button size="sm" variant="outline-primary">
                                                    <FaDownload className="me-1" />
                                                    Receipt
                                                </Button>
                                            </div>
                                        </Card.Body>
                                    </Card>
                                </Col>
                            )) : (
                                <Col>
                                    <Card className="text-center p-5">
                                        <Card.Body>
                                            <h5>No bookings yet</h5>
                                            <p className="text-muted">Start your adventure by booking a camp!</p>
                                            <Button variant="success" href="/camp/campground">
                                                Explore Camps
                                            </Button>
                                        </Card.Body>
                                    </Card>
                                </Col>
                            )}
                        </Row>
                    </Tab>

                    <Tab eventKey="favorites" title="Favorites">
                        <Row className="g-4">
                            <Col>
                                <Card className="text-center p-5">
                                    <Card.Body>
                                        <h5>No favorites yet</h5>
                                        <p className="text-muted">Save your favorite camps for quick booking</p>
                                    </Card.Body>
                                </Card>
                            </Col>
                        </Row>
                    </Tab>

                    <Tab eventKey="reviews" title="My Reviews">
                        <Row className="g-4">
                            <Col>
                                <Card className="text-center p-5">
                                    <Card.Body>
                                        <h5>No reviews yet</h5>
                                        <p className="text-muted">Share your experience with other travelers</p>
                                    </Card.Body>
                                </Card>
                            </Col>
                        </Row>
                    </Tab>
                </Tabs>
            </Container>
        </div>
    );
};

export default UserDashboard;