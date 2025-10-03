import React from 'react'
import { ListGroup, Badge, Row, Col } from 'react-bootstrap'
import { IoIosCalendar, IoIosCall, IoIosCash, IoIosMail, IoIosPeople, IoIosPerson, IoIosPin, IoIosTimer } from 'react-icons/io';
import { FaLocationDot } from "react-icons/fa6";
import { FaHashtag, FaRegCreditCard } from 'react-icons/fa';

const BookingOffcanvas = ({ booking, type }) => {
  if (!booking) return null;

  const isGround = type === 'ground';

  const getStatusVariant = (status) => {
    switch (status) {
      case 'confirmed': return 'success';
      case 'pending': return 'warning';
      case 'cancelled': return 'danger';
      default: return 'secondary';
    }
  };

  return (
    <div className="p-3">
      <Row className="mb-3">
        <Col>
          <div className="d-flex align-items-center">
            <div className={`rounded-circle d-flex align-items-center justify-content-center me-3 p-2 ${isGround ? 'bg-primary text-white' : 'bg-success text-white'}`} style={{ width: '50px', height: '50px' }}>
              {isGround ? <IoIosPin size={24} /> : <IoIosCalendar size={24} />}
            </div>
            <div>
              <h5 className="mb-1 fw-bold">{isGround ? booking.groundName : booking.eventName}</h5>
              <Badge bg={getStatusVariant(booking.status)} className="text-uppercase">
                {booking.status}
              </Badge>
            </div>
          </div>
        </Col>
      </Row>

      <ListGroup variant="flush" className="border-0">
        {/* Booking ID */}
        <ListGroup.Item className="border-0 p-2 bg-light">
          <Row className="g-0 align-items-center">
            <Col xs={2}><FaHashtag className="text-muted" size={18} /></Col>
            <Col xs={10}>
              <div className="fw-semibold text-dark">Booking ID</div>
              <small className='text-dark'>{booking._id}</small>
            </Col>
          </Row>
        </ListGroup.Item>

        {/* Personal Info */}
        <ListGroup.Item className="border-0 p-2">
          <Row className="g-0 align-items-center ">
            <Col xs={2}><IoIosPerson className="text-muted" size={18} /></Col>
            <Col xs={10}>
              <div className="fw-semibold">Full Name</div>
              <small>{booking.firstName} {booking.lastName}</small>
            </Col>
          </Row>
        </ListGroup.Item>
        <ListGroup.Item className="border-0 p-2 bg-light">
          <Row className="g-0 align-items-center text-dark">
            <Col xs={2}><IoIosMail className="text-muted" size={18} /></Col>
            <Col xs={10}>
              <div className="fw-semibold">Email</div>
              <small>{booking.email}</small>
            </Col>
          </Row>
        </ListGroup.Item>
        <ListGroup.Item className="border-0 p-2">
          <Row className="g-0 align-items-center">
            <Col xs={2}><IoIosCall className="text-muted" size={18} /></Col>
            <Col xs={10}>
              <div className="fw-semibold">Phone</div>
              <small>{booking.phone}</small>
            </Col>
          </Row>
        </ListGroup.Item>

        {isGround ? (
          <>
            {/* Ground Specific Details */}
            <ListGroup.Item className="border-0 p-2 bg-light">
              <Row className="g-0 align-items-center text-dark">
                <Col xs={2}><FaHashtag className="text-muted" size={18} /></Col>
                <Col xs={10}>
                  <div className="fw-semibold">Ground ID</div>
                  <small>{booking.groundId}</small>
                </Col>
              </Row>
            </ListGroup.Item>
            <ListGroup.Item className="border-0 p-2">
              <Row className="g-0 align-items-center">
                <Col xs={2}><IoIosPin className="text-muted" size={18} /></Col>
                <Col xs={10}>
                  <div className="fw-semibold">Ground Name</div>
                  <small>{booking.groundName}</small>
                </Col>
              </Row>
            </ListGroup.Item>
            <ListGroup.Item className="border-0 p-2 bg-light">
              <Row className="g-0 align-items-center text-dark">
                <Col xs={2}><IoIosTimer className="text-muted" size={18} /></Col>
                <Col xs={10}>
                  <div className="fw-semibold">Time Slot</div>
                  <small>{booking.startTime} - {booking.endTime}</small>
                </Col>
              </Row>
            </ListGroup.Item>
            <ListGroup.Item className="border-0 p-2">
              <Row className="g-0 align-items-center">
                <Col xs={2}><IoIosCalendar className="text-muted" size={18} /></Col>
                <Col xs={10}>
                  <div className="fw-semibold">Dates</div>
                  <small>Check-in: {booking.checkIn} | Check-out: {booking.checkOut}</small>
                </Col>
              </Row>
            </ListGroup.Item>
            <ListGroup.Item className="border-0 p-2 bg-light">
              <Row className="g-0 align-items-center text-dark">
                <Col xs={2}><IoIosPeople className="text-muted" size={18} /></Col>
                <Col xs={10}>
                  <div className="fw-semibold">Number of Guests</div>
                  <small>{booking.guests}</small>
                </Col>
              </Row>
            </ListGroup.Item>
            <ListGroup.Item className="border-0 p-2">
              <Row className="g-0 align-items-center">
                <Col xs={2}><FaLocationDot className="text-muted" size={18} /></Col>
                <Col xs={10}>
                  <div className="fw-semibold">Full Address</div>
                  <small>{booking.address}, {booking.city}, {booking.state}, {booking.zipCode}</small>
                </Col>
              </Row>
            </ListGroup.Item>
            <ListGroup.Item className="border-0 p-2 bg-light">
              <Row className="g-0 align-items-center text-dark">
                <Col xs={2}><IoIosPerson className="text-muted" size={18} /></Col>
                <Col xs={10}>
                  <div className="fw-semibold">Emergency Contact</div>
                  <small>{booking.emergencyName} ({booking.emergencyRelation}) - {booking.emergencyPhone}</small>
                </Col>
              </Row>
            </ListGroup.Item>
            {booking.specialRequests && (
              <ListGroup.Item className="border-0 p-2">
                <Row className="g-0 align-items-start">
                  <Col xs={2}><div className="mt-1">📝</div></Col>
                  <Col xs={10}>
                    <div className="fw-semibold">Special Requests</div>
                    <small>{booking.specialRequests}</small>
                  </Col>
                </Row>
              </ListGroup.Item>
            )}
          </>
        ) : (
          <>
            {/* Event Specific Details */}
            <ListGroup.Item className="border-0 p-2 bg-light">
              <Row className="g-0 align-items-center text-dark">
                <Col xs={2}><FaHashtag className="text-muted" size={18} /></Col>
                <Col xs={10}>
                  <div className="fw-semibold">Event ID</div>
                  <small>{booking.eventId?._id || booking.eventId}</small>
                </Col>
              </Row>
            </ListGroup.Item>
            <ListGroup.Item className="border-0 p-2">
              <Row className="g-0 align-items-center">
                <Col xs={2}><IoIosPin className="text-muted" size={18} /></Col>
                <Col xs={10}>
                  <div className="fw-semibold">Event Name</div>
                  <small>{booking.eventName}</small>
                </Col>
              </Row>
            </ListGroup.Item>
            {booking.eventId?.type && (
              <ListGroup.Item className="border-0 p-2 bg-light">
                <Row className="g-0 align-items-center text-dark">
                  <Col xs={2}><IoIosCalendar className="text-muted" size={18} /></Col>
                  <Col xs={10}>
                    <div className="fw-semibold">Event Type</div>
                    <small>{booking.eventId.type}</small>
                  </Col>
                </Row>
              </ListGroup.Item>
            )}
            <ListGroup.Item className="border-0 p-2">
              <Row className="g-0 align-items-center">
                <Col xs={2}><IoIosCalendar className="text-muted" size={18} /></Col>
                <Col xs={10}>
                  <div className="fw-semibold">Event Date</div>
                  <small>{new Date(booking.eventDate).toLocaleDateString()}</small>
                </Col>
              </Row>
            </ListGroup.Item>
            <ListGroup.Item className="border-0 p-2 bg-light">
              <Row className="g-0 align-items-center text-dark">
                <Col xs={2}><IoIosPeople className="text-muted" size={18} /></Col>
                <Col xs={10}>
                  <div className="fw-semibold">Number of Persons</div>
                  <small>{booking.person} {booking.personType}s</small>
                </Col>
              </Row>
            </ListGroup.Item>
            <ListGroup.Item className="border-0 p-2">
              <Row className="g-0 align-items-center">
                <Col xs={2}><FaLocationDot className="text-muted" size={18} /></Col>
                <Col xs={10}>
                  <div className="fw-semibold">Full Address</div>
                  <small>{booking.address}, {booking.city}, {booking.state}, {booking.zipCode}</small>
                </Col>
              </Row>
            </ListGroup.Item>
          </>
        )}

        {/* Common: Total Amount */}
        <ListGroup.Item className="border-0 p-2 bg-primary text-white fw-bold text-center mt-3">
          <IoIosCash className="me-2" size={18} /> Total Amount: ₹{isGround ? booking.totalAmount : booking.eventPrice}
        </ListGroup.Item>

        {/* Common: Created At */}
        <ListGroup.Item className="border-0 p-2 text-center text-muted small">
          <div>Booking created: {new Date(booking.createdAt).toLocaleString()}</div>
        </ListGroup.Item>

        {/* User ID (if needed for admin/debug) */}
        {booking.userId && (
          <ListGroup.Item className="border-0 p-2 bg-secondary text-white small">
            <Row className="g-0 align-items-center">
              <Col xs={2}><FaRegCreditCard className="text-white" size={18} /></Col>
              <Col xs={10}>
                <div className="fw-semibold">User ID</div>
                <small>{booking.userId._id}</small>
                {booking.userId.name && <small className="d-block">Name: {booking.userId.name}</small>}
                {booking.userId.email && <small className="d-block">Email: {booking.userId.email}</small>}
              </Col>
            </Row>
          </ListGroup.Item>
        )}
      </ListGroup>
    </div>
  )
}

export default BookingOffcanvas