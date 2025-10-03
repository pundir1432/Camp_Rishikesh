import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Tab, Tabs, Card, Badge, Offcanvas, Button, Alert } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { io } from 'socket.io-client';
import { getEventBooking } from '../../redux/event/thunk';
import { getGroundBooking } from '../../redux/ground/thunk';
import { getUserFromSession } from '../../helper/api/apiCore';
import { DataLoading } from '../../helper/loading/Loaders';
import BookingOffcanvas from './BookingOffcanvas';
import ChatBox from './chatbox/ChatBox';
import { IoMdEye, IoIosCalendar, IoIosPeople, IoIosTimer, IoIosPin, IoIosCash, IoIosCall, IoIosChatboxes } from 'react-icons/io';
import axios from 'axios'; // For fetching messages

const socket = io(process.env.REACT_APP_API_URL, {
    withCredentials: true,
    auth: { token: localStorage.getItem('token') }, // Assuming token is stored
});

const AllBooking = () => {
    const [activeTab, setActiveTab] = useState('ground');
    const [showOffcanvas, setShowOffcanvas] = useState(false);
    const [showChat, setShowChat] = useState(false);
    const [selectedBooking, setSelectedBooking] = useState(null);
    const [selectedChatBooking, setSelectedChatBooking] = useState(null);
    const [bookingType, setBookingType] = useState('');
    const [chatType, setChatType] = useState('');
    const [chatMessages, setChatMessages] = useState([]);
    const [newMessage, setNewMessage] = useState('');
    const { ground, loading, error } = useSelector((state) => state.ground);
    const event = useSelector((state) => state.event);
    const eventLoading = useSelector((state) => state.event?.loading);
    const dispatch = useDispatch();
    const user = getUserFromSession();

    useEffect(() => {
        dispatch(getEventBooking(user?.id));
        dispatch(getGroundBooking(user?.id));
    }, [dispatch, activeTab]);

    useEffect(() => {
        // Handle Socket.IO connection
        socket.on('connect', () => {
            console.log('Connected to Socket.IO server');
        });

        socket.on('receiveMessage', (message) => {
            setChatMessages((prev) => [...prev, message]);
        });

        socket.on('disconnect', () => {
            console.log('Disconnected from Socket.IO server');
        });

        return () => {
            socket.off('receiveMessage');
            socket.off('connect');
            socket.off('disconnect');
        };
    }, []);

    const handleChat = async (item, type) => {
        setSelectedChatBooking(item);
        setChatType(type);
        setShowChat(true);

        socket.emit('joinBooking', item._id);

        try {
            const response = await axios.get(
                `${process.env.REACT_APP_API_URL}/api/messages/booking/${item._id}`,
                {
                    headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
                    withCredentials: true,
                }
            );
            setChatMessages(response.data);
        } catch (err) {
            console.error('Error fetching messages:', err);
        }
    };

    const handleSendMessage = (e) => {
        e.preventDefault();
        if (newMessage.trim() && selectedChatBooking) {
            const messageData = {
                bookingId: selectedChatBooking._id,
                text: newMessage,
                sender: 'user',
                userId: user.id, // From getUserFromSession()
            };
            socket.emit('sendMessage', messageData);
            setNewMessage('');
        }
    };
    const handleView = (item, type) => {
        setSelectedBooking(item);
        setBookingType(type);
        setShowOffcanvas(true);
    };

    const handleClose = () => {
        setShowOffcanvas(false);
        setSelectedBooking(null);
        setBookingType('');
    };

    const handleCloseChat = () => {
        setShowChat(false);
        setSelectedChatBooking(null);
        setChatType('');
        setChatMessages([]);
        setNewMessage('');
    };

    const getStatusVariant = (status) => {
        switch (status) {
            case 'confirmed':
                return 'success';
            case 'pending':
                return 'warning';
            case 'cancelled':
                return 'danger';
            default:
                return 'secondary';
        }
    };

    const renderGroundCard = (item, index) => (
        <Card key={index} className="mb-3 shadow-sm border-0 hover-shadow" style={{ transition: 'box-shadow 0.3s ease' }}>
            <Card.Header className="bg-light d-flex justify-content-between align-items-center">
                <div className="d-flex align-items-center">
                    <IoIosCash className="me-2 text-primary" size={20} />
                    <strong className="text-primary">Booking #{index + 1}</strong>
                </div>
                <Badge bg={getStatusVariant(item.status)} className="text-uppercase">
                    {item.status}
                </Badge>
            </Card.Header>
            <Card.Body className="pt-2">
                <Row className="g-2">
                    <Col xs={6}>
                        <div className="text-center">
                            <IoIosPin className="text-muted mb-1" size={16} />
                            <div className="small fw-semibold">{item.groundName}</div>
                            <div className="text-muted small">Ground</div>
                        </div>
                    </Col>
                    <Col xs={3}>
                        <div className="text-center">
                            <IoIosCalendar className="text-muted mb-1" size={16} />
                            <div className="small fw-semibold">{item.checkIn}</div>
                            <div className="text-muted small">Check-in</div>
                        </div>
                    </Col>
                    <Col xs={3}>
                        <div className="text-center">
                            <IoIosCalendar className="text-muted mb-1" size={16} />
                            <div className="small fw-semibold">{item.checkOut}</div>
                            <div className="text-muted small">Check-out</div>
                        </div>
                    </Col>
                    <Col xs={4} className="mt-2">
                        <div className="d-flex align-items-center justify-content-center">
                            <IoIosPeople className="text-muted me-1" size={16} />
                            <span className="small fw-semibold">{item.guests}</span>
                            <span className="text-muted small ms-1">Guests</span>
                        </div>
                    </Col>
                    <Col xs={4} className="mt-2">
                        <div className="d-flex align-items-center justify-content-center">
                            <IoIosTimer className="text-muted me-1" size={16} />
                            <span className="small fw-semibold">{item.startTime} - {item.endTime}</span>
                        </div>
                    </Col>
                    <Col xs={4} className="mt-2">
                        <div className="text-center">
                            <div className="fw-bold text-success">₹{item.totalAmount}</div>
                            <div className="text-muted small">Total</div>
                        </div>
                    </Col>
                </Row>
            </Card.Body>
            <Card.Footer className="bg-transparent border-0 pt-0">
                <div className="d-flex gap-2">
                    <Button
                        variant="outline-primary"
                        size="sm"
                        className="flex-fill rounded-pill"
                        onClick={() => handleView(item, 'ground')}
                    >
                        <IoMdEye className="me-1" size={16} /> View
                    </Button>
                    <Button
                        variant="outline-success"
                        size="sm"
                        className="rounded-pill"
                        onClick={() => handleChat(item, 'ground')}
                    >
                        <IoIosChatboxes size={16} />
                    </Button>
                </div>
            </Card.Footer>
        </Card>
    );

    const renderEventCard = (item, index) => (
        <Card
            key={index}
            className={`mb-3 shadow-sm border-0 hover-shadow ${item.status === 'cancelled' ? 'opacity-50' : ''}`}
            style={{ transition: 'box-shadow 0.3s ease' }}
        >
            <Card.Header
                className={`d-flex justify-content-between align-items-center ${item.status === 'cancelled' ? 'bg-light text-muted' : 'bg-light'}`}
            >
                <div className="d-flex align-items-center">
                    <IoIosCash className={`me-2 ${item.status === 'cancelled' ? 'text-muted' : 'text-primary'}`} size={20} />
                    <strong className={item.status === 'cancelled' ? 'text-muted' : 'text-primary'}>Booking #{index + 1}</strong>
                </div>
                <Badge bg={getStatusVariant(item.status)} className="text-uppercase">
                    {item.status}
                </Badge>
            </Card.Header>
            <Card.Body className="pt-2">
                <Row className="g-2">
                    <Col xs={6}>
                        <div className="text-center">
                            <IoIosPin className="text-muted mb-1" size={16} />
                            <div className="small fw-semibold">{item.eventName}</div>
                            <div className="text-muted small">Event</div>
                        </div>
                    </Col>
                    <Col xs={3}>
                        <div className="text-center">
                            <IoIosCalendar className="text-muted mb-1" size={16} />
                            <div className="small fw-semibold">{new Date(item.eventDate).toLocaleDateString()}</div>
                            <div className="text-muted small">Date</div>
                        </div>
                    </Col>
                    <Col xs={3}>
                        <div className="text-center">
                            <IoIosPeople className="text-muted mb-1" size={16} />
                            <div className="small fw-semibold">{item.person}</div>
                            <div className="text-muted small">{item.personType}</div>
                        </div>
                    </Col>
                    <Col xs={6} className="mt-2">
                        <div className="text-center">
                            <div className="fw-bold text-success">₹{item.eventPrice}</div>
                            <div className="text-muted small">Total</div>
                        </div>
                    </Col>
                </Row>
            </Card.Body>
            <Card.Footer className="bg-transparent border-0 pt-0">
                <div className="d-flex gap-2">
                    <Button
                        variant="outline-primary"
                        size="sm"
                        className="flex-fill rounded-pill"
                        onClick={() => handleView(item, 'event')}
                        disabled={item.status === 'cancelled'}
                    >
                        <IoMdEye className="me-1" size={16} /> {item.status === 'cancelled' ? 'Cancelled' : 'View'}
                    </Button>
                    <Button
                        variant="outline-success"
                        size="sm"
                        className="rounded-pill"
                        onClick={() => handleChat(item, 'event')}
                        disabled={item.status === 'cancelled'}
                    >
                        <IoIosChatboxes size={16} />
                    </Button>
                </div>
            </Card.Footer>
        </Card>
    );

    return (
        <div className="pt-5 mt-4">
            <Container>
                <Row>
                    <Col>
                        <div className="d-flex justify-content-between align-items-center mb-4">
                            <h2 className="fw-bold mb-0">
                                <IoIosCash className="me-2 text-primary" size={28} /> My Bookings
                            </h2>
                            <div className="text-muted small">
                                Total: {ground?.data?.length + event?.event?.data?.length || 0} bookings
                            </div>
                        </div>

                        <Alert variant="info" className="mb-4">
                            <div className="d-flex align-items-center">
                                <IoIosCall className="me-2" size={20} />
                                <strong className="me-2">Need Help? </strong> For booking inquiries or support, contact Admin:{' '}
                                <a href="tel:+919876543210" className="fw-bold text-decoration-none">
                                    +91 98765 43210
                                </a>
                            </div>
                        </Alert>

                        <Tabs
                            activeKey={activeTab}
                            onSelect={(k) => setActiveTab(k)}
                            className="mb-4"
                            variant="pills"
                            justify
                        >
                            <Tab
                                eventKey="ground"
                                title={
                                    <span>
                                        <IoIosPin className="me-1" size={16} /> Ground Bookings
                                        <Badge bg="secondary" className="ms-1">
                                            {ground?.data?.length || 0}
                                        </Badge>
                                    </span>
                                }
                            >
                                <div className="row g-3">
                                    {loading ? (
                                        <Col xs={12} className="text-center py-4">
                                            <DataLoading />
                                        </Col>
                                    ) : ground?.data?.length > 0 ? (
                                        ground.data.map((item, index) => (
                                            <Col xs={12} md={6} lg={4} key={index}>
                                                {renderGroundCard(item, index)}
                                            </Col>
                                        ))
                                    ) : (
                                        <Col xs={12} className="text-center text-muted py-4">
                                            <div className="py-5">
                                                <IoIosPin className="text-muted mb-3" size={48} />
                                                <h5>No ground bookings found</h5>
                                                <p className="text-muted">Get started by booking your first ground!</p>
                                            </div>
                                        </Col>
                                    )}
                                </div>
                            </Tab>

                            <Tab
                                eventKey="event"
                                title={
                                    <span>
                                        <IoIosCalendar className="me-1" size={16} /> Event Bookings
                                        <Badge bg="secondary" className="ms-1">
                                            {event?.event?.data?.length || 0}
                                        </Badge>
                                    </span>
                                }
                            >
                                <div className="row g-3">
                                    {eventLoading ? (
                                        <Col xs={12} className="text-center py-4">
                                            <DataLoading />
                                        </Col>
                                    ) : event?.event?.data?.length > 0 ? (
                                        event.event.data.map((item, index) => (
                                            <Col xs={12} md={6} lg={4} key={index}>
                                                {renderEventCard(item, index)}
                                            </Col>
                                        ))
                                    ) : (
                                        <Col xs={12} className="text-center text-muted py-4">
                                            <div className="py-5">
                                                <IoIosCalendar className="text-muted mb-3" size={48} />
                                                <h5>No event bookings found</h5>
                                                <p className="text-muted">Get started by booking your first event!</p>
                                            </div>
                                        </Col>
                                    )}
                                </div>
                            </Tab>
                        </Tabs>
                    </Col>
                </Row>
            </Container>

            <Offcanvas show={showOffcanvas} onHide={handleClose} placement="end">
                <Offcanvas.Header closeButton className="bg-light">
                    <Offcanvas.Title className="fw-bold">
                        {bookingType === 'ground' ? (
                            <>
                                <IoIosPin className="me-2 text-primary" size={20} />
                                Ground Booking Details
                            </>
                        ) : (
                            <>
                                <IoIosCalendar className="me-2 text-primary" size={20} />
                                Event Booking Details
                            </>
                        )}
                    </Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body>
                    {selectedBooking && <BookingOffcanvas booking={selectedBooking} type={bookingType} />}
                </Offcanvas.Body>
            </Offcanvas>

            <ChatBox
                showChat={showChat}
                handleCloseChat={handleCloseChat}
                chatType={chatType}
                selectedChatBooking={selectedChatBooking}
                chatMessages={chatMessages}
                handleSendMessage={handleSendMessage}
                newMessage={newMessage}
                setNewMessage={setNewMessage}
            />

            <style jsx>{`
        .hover-shadow:hover {
          box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.15) !important;
        }
        .nav-pills .nav-link.active {
          background-color: #0d6efd !important;
          border-color: #0d6efd !important;
        }
        .nav-pills .nav-link {
          border-radius: 0.5rem !important;
        }
      `}</style>
        </div>
    );
};

export default AllBooking;