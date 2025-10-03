import React, { useState } from 'react';
import { Card, Badge, Button, Modal, Row, Col, Alert } from 'react-bootstrap';
import { FaCalendarAlt, FaUsers, FaWhatsapp, FaDownload, FaEdit, FaTimes } from 'react-icons/fa';

const BookingStatus = ({ booking, onModify, onCancel }) => {
    const [showDetails, setShowDetails] = useState(false);
    const [showCancelModal, setShowCancelModal] = useState(false);

    const getStatusColor = (status) => {
        const colors = {
            confirmed: 'success',
            pending: 'warning',
            cancelled: 'danger',
            completed: 'info'
        };
        return colors[status] || 'secondary';
    };

    const handleWhatsAppContact = () => {
        const message = `Hi! I need help with booking ID: ${booking.id}`;
        window.open(`https://wa.me/919876543210?text=${encodeURIComponent(message)}`);
    };

    const canModify = () => {
        const checkInDate = new Date(booking.checkIn);
        const now = new Date();
        const hoursDiff = (checkInDate - now) / (1000 * 60 * 60);
        return hoursDiff > 48 && booking.status === 'confirmed';
    };

    const canCancel = () => {
        const checkInDate = new Date(booking.checkIn);
        const now = new Date();
        const hoursDiff = (checkInDate - now) / (1000 * 60 * 60);
        return hoursDiff > 24 && ['confirmed', 'pending'].includes(booking.status);
    };

    return (
        <>
            <Card className="h-100 shadow-sm">
                <Card.Body>
                    <div className="d-flex justify-content-between align-items-start mb-3">
                        <div>
                            <h6 className="fw-bold mb-1">{booking.groundName}</h6>
                            <small className="text-muted">ID: {booking.id}</small>
                        </div>
                        <Badge bg={getStatusColor(booking.status)}>
                            {booking.status}
                        </Badge>
                    </div>

                    <div className="mb-3">
                        <div className="d-flex align-items-center mb-2">
                            <FaCalendarAlt className="text-muted me-2" size={14} />
                            <small>{booking.checkIn} to {booking.checkOut}</small>
                        </div>
                        <div className="d-flex align-items-center mb-2">
                            <FaUsers className="text-muted me-2" size={14} />
                            <small>{booking.guests} Guests</small>
                        </div>
                        <div className="d-flex align-items-center">
                            <span className="text-muted me-2">💰</span>
                            <small>₹{booking.amount}</small>
                        </div>
                    </div>

                    <div className="d-flex flex-wrap gap-2">
                        <Button size="sm" variant="outline-info" onClick={() => setShowDetails(true)}>
                            Details
                        </Button>
                        <Button size="sm" variant="outline-success" onClick={handleWhatsAppContact}>
                            <FaWhatsapp className="me-1" />
                            Support
                        </Button>
                        <Button size="sm" variant="outline-primary">
                            <FaDownload className="me-1" />
                            Receipt
                        </Button>
                        {canModify() && (
                            <Button size="sm" variant="outline-warning" onClick={() => onModify(booking)}>
                                <FaEdit className="me-1" />
                                Modify
                            </Button>
                        )}
                        {canCancel() && (
                            <Button size="sm" variant="outline-danger" onClick={() => setShowCancelModal(true)}>
                                <FaTimes className="me-1" />
                                Cancel
                            </Button>
                        )}
                    </div>
                </Card.Body>
            </Card>

            {/* Details Modal */}
            <Modal show={showDetails} onHide={() => setShowDetails(false)} size="lg" centered>
                <Modal.Header closeButton>
                    <Modal.Title>Booking Details</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Row>
                        <Col md={6}>
                            <h6 className="fw-bold text-success mb-3">Booking Info</h6>
                            <div className="mb-2"><strong>ID:</strong> {booking.id}</div>
                            <div className="mb-2"><strong>Package:</strong> {booking.groundName}</div>
                            <div className="mb-2"><strong>Check-in:</strong> {booking.checkIn}</div>
                            <div className="mb-2"><strong>Check-out:</strong> {booking.checkOut}</div>
                            <div className="mb-2"><strong>Guests:</strong> {booking.guests}</div>
                        </Col>
                        <Col md={6}>
                            <h6 className="fw-bold text-success mb-3">Payment Info</h6>
                            <div className="mb-2"><strong>Amount:</strong> ₹{booking.amount}</div>
                            <div className="mb-2">
                                <strong>Status:</strong> 
                                <Badge bg={booking.paymentStatus === 'completed' ? 'success' : 'warning'} className="ms-2">
                                    {booking.paymentStatus}
                                </Badge>
                            </div>
                        </Col>
                    </Row>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowDetails(false)}>Close</Button>
                    <Button variant="success" onClick={handleWhatsAppContact}>
                        <FaWhatsapp className="me-2" />Contact Support
                    </Button>
                </Modal.Footer>
            </Modal>

            {/* Cancel Modal */}
            <Modal show={showCancelModal} onHide={() => setShowCancelModal(false)} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Cancel Booking</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Alert variant="warning">
                        <strong>Cancel booking {booking.id}?</strong>
                    </Alert>
                    <p>Package: <strong>{booking.groundName}</strong></p>
                    <p>Check-in: <strong>{booking.checkIn}</strong></p>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowCancelModal(false)}>Keep</Button>
                    <Button variant="danger" onClick={() => {
                        onCancel(booking.id);
                        setShowCancelModal(false);
                    }}>Cancel Booking</Button>
                </Modal.Footer>
            </Modal>
        </>
    );
};

export default BookingStatus;