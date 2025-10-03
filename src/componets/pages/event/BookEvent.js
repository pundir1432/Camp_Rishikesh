import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Form, Button, Alert } from 'react-bootstrap';
import { FaArrowLeft, FaCalendarAlt, FaUsers, FaUser, FaPhone, FaEnvelope } from 'react-icons/fa';
import { useNavigate, useLocation } from 'react-router-dom';
import { useForm, useWatch } from 'react-hook-form';
import '../../styles/BookNow.css';
import { getUserFromSession } from '../../helper/api/apiCore';
import { useDispatch, useSelector } from 'react-redux';
import { bookEvent } from '../../redux/event/thunk';
import { ButtonLoading } from '../../helper/loading/Loaders';
import PaymentOptions from '../../payment/PaymentOptions';

const BookEvent = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [selectedEvent, setSelectedEvent] = useState(null);
    const { loading } = useSelector(state => state.event || {});
    const user = getUserFromSession();
    const dispatch = useDispatch();
    const [showAlert, setShowAlert] = useState(false);
    const [showPayment, setShowPayment] = useState(false);

    const { register, handleSubmit, formState: { errors }, setValue, clearErrors, control } = useForm({
        defaultValues: {
            firstName: '',
            lastName: '',
            email: '',
            phone: '',
            person: '1',
            personType: '',
            address: '',
            city: '',
            state: '',
            zipCode: ''
        }
    });

    // Use useWatch to track form values dynamically
    const formValues = useWatch({ control });

    useEffect(() => {
        const urlParams = new URLSearchParams(location.search);
        const eventData = urlParams.get('item');
        if (eventData) {
            try {
                setSelectedEvent(JSON.parse(decodeURIComponent(eventData)));
            } catch (error) {
                console.error('Error parsing event data:', error);
            }
        }
    }, [location]);

    const onSubmit = (data) => {
        const registrationData = {
            userId: user?.id || 'N/A',
            eventId: selectedEvent?._id || 'N/A',
            ...data,
            eventName: selectedEvent?.name || 'N/A',
            eventDate: selectedEvent?.date || 'N/A',
            eventPrice: selectedEvent?.price || 'N/A'
        };

        dispatch(bookEvent(registrationData)).unwrap().then((res) => {
            if (res?.status === 201 || res?.status === 200) {
                if (selectedEvent?.price && selectedEvent.price > 0) {
                    setShowPayment(true);
                } else {
                    setShowAlert(true);
                    setTimeout(() => {
                        setShowAlert(false);
                        navigate('/camp/events');
                    }, 3000);
                }
            }
        });
    };

    const getTotalAmount = () => {
        const price = selectedEvent?.price ? parseFloat(selectedEvent.price) : 0;
        const persons = parseInt(formValues.person) || 1;
        return price * persons;
    };

    const handleInputChange = (e, fieldName) => {
        let value = e.target.value;

        if (['firstName', 'lastName', 'city', 'state'].includes(fieldName)) {
            value = value.replace(/[^a-zA-Z\s]/g, ''); 
        }

        if (fieldName === 'phone') {
            value = value.replace(/[^0-9]/g, '').slice(0, 10); 
        }

        if (fieldName === 'zipCode') {
            value = value.replace(/[^0-9]/g, ''); 
        }

        setValue(fieldName, value);
        if (value) clearErrors(fieldName); 
    };

    if (!selectedEvent) {
        return <div className="text-center py-5">Loading...</div>;
    }

    return (
        <div className="book-now-page pt-5 mt-3">
            <Container>
                {showAlert && (
                    <Alert variant="success" className="mb-4">
                        Event registration confirmed! Redirecting to events page...
                    </Alert>
                )}

                <Row>
                    <Col>
                        <Button
                            className="border-0 bg-transparent text-dark"
                            onClick={() => navigate('/camp/events')}
                        >
                            <FaArrowLeft className="me-2" />
                            Back to Events
                        </Button>
                        <h2 className="fw-bold">Event Registration</h2>
                        <p className="text-muted">Register for {selectedEvent.name}</p>
                    </Col>
                </Row>

                <Row>
                    <Col lg={8}>
                        <Card className="shadow-sm border-0 mb-4">
                            <Card.Header className="bg-success text-white">
                                <h5 className="mb-0">
                                    <FaUser className="me-2" />
                                    Registration Form
                                </h5>
                            </Card.Header>
                            <Card.Body className="p-4">
                                <Form onSubmit={handleSubmit(onSubmit)}>
                                    <div className="mb-4">
                                        <h6 className="fw-bold text-success mb-3">Personal Information</h6>
                                        <Row>
                                            <Col md={6}>
                                                <Form.Group className="mb-3">
                                                    <Form.Label className="fw-semibold">First Name *</Form.Label>
                                                    <Form.Control
                                                        type="text"
                                                        {...register('firstName', {
                                                            required: 'First name is required',
                                                            pattern: {
                                                                value: /^[a-zA-Z\s]+$/,
                                                                message: 'Only letters and spaces are allowed'
                                                            }
                                                        })}
                                                        onChange={(e) => handleInputChange(e, 'firstName')}
                                                        placeholder="Enter your first name"
                                                        className={`form-control-modern form-control py-2 ${errors.firstName ? 'is-invalid' : ''}`}
                                                    />
                                                    {errors.firstName && <div className="invalid-feedback">{errors.firstName.message}</div>}
                                                </Form.Group>
                                            </Col>
                                            <Col md={6}>
                                                <Form.Group className="mb-3">
                                                    <Form.Label className="fw-semibold">Last Name *</Form.Label>
                                                    <Form.Control
                                                        type="text"
                                                        {...register('lastName', {
                                                            required: 'Last name is required',
                                                            pattern: {
                                                                value: /^[a-zA-Z\s]+$/,
                                                                message: 'Only letters and spaces are allowed'
                                                            }
                                                        })}
                                                        onChange={(e) => handleInputChange(e, 'lastName')}
                                                        placeholder="Enter your last name"
                                                        className={`form-control-modern form-control py-2 ${errors.lastName ? 'is-invalid' : ''}`}
                                                    />
                                                    {errors.lastName && <div className="invalid-feedback">{errors.lastName.message}</div>}
                                                </Form.Group>
                                            </Col>
                                        </Row>

                                        <Row>
                                            <Col md={6}>
                                                <Form.Group className="mb-3">
                                                    <Form.Label className="fw-semibold">
                                                        <FaEnvelope className="me-2" />Email Address *
                                                    </Form.Label>
                                                    <Form.Control
                                                        type="email"
                                                        {...register('email', {
                                                            required: 'Email is required',
                                                            pattern: {
                                                                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                                                                message: 'Please enter a valid email address'
                                                            }
                                                        })}
                                                        onChange={(e) => handleInputChange(e, 'email')}
                                                        placeholder="Enter your email"
                                                        className={`form-control-modern form-control py-2 ${errors.email ? 'is-invalid' : ''}`}
                                                    />
                                                    {errors.email && <div className="invalid-feedback">{errors.email.message}</div>}
                                                </Form.Group>
                                            </Col>
                                            <Col md={6}>
                                                <Form.Group className="mb-3">
                                                    <Form.Label className="fw-semibold">
                                                        <FaPhone className="me-2" />Phone Number *
                                                    </Form.Label>
                                                    <Form.Control
                                                        type="tel"
                                                        {...register('phone', {
                                                            required: 'Phone number is required',
                                                            pattern: {
                                                                value: /^\d{10}$/,
                                                                message: 'Phone number must be exactly 10 digits'
                                                            }
                                                        })}
                                                        onChange={(e) => handleInputChange(e, 'phone')}
                                                        placeholder="Enter 10-digit phone number"
                                                        className={`form-control-modern form-control py-2 ${errors.phone ? 'is-invalid' : ''}`}
                                                        maxLength={10}
                                                    />
                                                    {errors.phone && <div className="invalid-feedback">{errors.phone.message}</div>}
                                                </Form.Group>
                                            </Col>
                                        </Row>

                                        <Row>
                                            <Col md={6}>
                                                <Form.Group className="mb-3">
                                                    <Form.Label className="fw-semibold">
                                                        <FaUsers className="me-2" />Number of Persons *
                                                    </Form.Label>
                                                    <Form.Select
                                                        {...register('person', { required: 'Number of persons is required' })}
                                                        onChange={(e) => handleInputChange(e, 'person')}
                                                        className={`form-control-modern form-control py-2 ${errors.person ? 'is-invalid' : ''}`}
                                                    >
                                                        <option value="">Select number</option>
                                                        <option value="1">1 Person</option>
                                                        <option value="2">2 Persons</option>
                                                        <option value="3">3 Persons</option>
                                                        <option value="4">4 Persons</option>
                                                        <option value="5">5 Persons</option>
                                                        <option value="6">6 Persons</option>
                                                    </Form.Select>
                                                    {errors.person && <div className="invalid-feedback">{errors.person.message}</div>}
                                                </Form.Group>
                                            </Col>
                                            <Col md={6}>
                                                <Form.Group className="mb-3">
                                                    <Form.Label className="fw-semibold">Registration Type *</Form.Label>
                                                    <Form.Select
                                                        {...register('personType', {
                                                            required: 'Registration type is required'
                                                        })}
                                                        onChange={(e) => handleInputChange(e, 'personType')}
                                                        className={`form-control-modern form-control py-2 ${errors.personType ? 'is-invalid' : ''}`}
                                                    >
                                                        <option value="">Select type</option>
                                                        <option value="child">Child</option>
                                                        <option value="couple">Couple</option>
                                                        <option value="family">Family</option>
                                                    </Form.Select>
                                                    {errors.personType && <div className="invalid-feedback">{errors.personType.message}</div>}
                                                </Form.Group>
                                            </Col>
                                        </Row>
                                    </div>

                                    <div className="mb-4">
                                        <h6 className="fw-bold text-success mb-3">Address Information</h6>
                                        <Form.Group className="mb-3">
                                            <Form.Label className="fw-semibold">Address *</Form.Label>
                                            <Form.Control
                                                type="text"
                                                {...register('address', {
                                                    required: 'Address is required'
                                                })}
                                                onChange={(e) => handleInputChange(e, 'address')}
                                                placeholder="Enter your full address"
                                                className={`form-control-modern form-control py-2 ${errors.address ? 'is-invalid' : ''}`}
                                            />
                                            {errors.address && <div className="invalid-feedback">{errors.address.message}</div>}
                                        </Form.Group>

                                        <Row>
                                            <Col md={4}>
                                                <Form.Group className="mb-3">
                                                    <Form.Label className="fw-semibold">City *</Form.Label>
                                                    <Form.Control
                                                        type="text"
                                                        {...register('city', {
                                                            required: 'City is required',
                                                            pattern: {
                                                                value: /^[a-zA-Z\s]+$/,
                                                                message: 'Only letters and spaces are allowed'
                                                            }
                                                        })}
                                                        onChange={(e) => handleInputChange(e, 'city')}
                                                        placeholder="City"
                                                        className={`form-control-modern form-control py-2 ${errors.city ? 'is-invalid' : ''}`}
                                                    />
                                                    {errors.city && <div className="invalid-feedback">{errors.city.message}</div>}
                                                </Form.Group>
                                            </Col>
                                            <Col md={4}>
                                                <Form.Group className="mb-3">
                                                    <Form.Label className="fw-semibold">State *</Form.Label>
                                                    <Form.Control
                                                        type="text"
                                                        {...register('state', {
                                                            required: 'State is required',
                                                            pattern: {
                                                                value: /^[a-zA-Z\s]+$/,
                                                                message: 'Only letters and spaces are allowed'
                                                            }
                                                        })}
                                                        onChange={(e) => handleInputChange(e, 'state')}
                                                        placeholder="State"
                                                        className={`form-control-modern form-control py-2 ${errors.state ? 'is-invalid' : ''}`}
                                                    />
                                                    {errors.state && <div className="invalid-feedback">{errors.state.message}</div>}
                                                </Form.Group>
                                            </Col>
                                            <Col md={4}>
                                                <Form.Group className="mb-3">
                                                    <Form.Label className="fw-semibold">ZIP Code *</Form.Label>
                                                    <Form.Control
                                                        type="text"
                                                        {...register('zipCode', {
                                                            required: 'ZIP code is required',
                                                            pattern: {
                                                                value: /^\d+$/,
                                                                message: 'Only numbers are allowed'
                                                            }
                                                        })}
                                                        onChange={(e) => handleInputChange(e, 'zipCode')}
                                                        placeholder="ZIP Code"
                                                        className={`form-control-modern form-control py-2 ${errors.zipCode ? 'is-invalid' : ''}`}
                                                    />
                                                    {errors.zipCode && <div className="invalid-feedback">{errors.zipCode.message}</div>}
                                                </Form.Group>
                                            </Col>
                                        </Row>
                                    </div>

                                    <div className="d-flex justify-content-between gap-4">
                                        <Button
                                            variant="secondary"
                                            size="lg"
                                            className="w-100 py-1 fw-semibold"
                                            disabled={loading}
                                            onClick={() => navigate('/camp/events')}
                                        >
                                            Cancel
                                        </Button>
                                        <Button
                                            type="submit"
                                            variant="success"
                                            size="lg"
                                            className="w-100 py-1 fw-semibold"
                                            disabled={loading}
                                        >
                                            {loading ? <ButtonLoading height={12} /> : 'Register'}
                                        </Button>
                                    </div>
                                </Form>
                            </Card.Body>
                        </Card>
                    </Col>

                    <Col lg={4}>
                        <Card className="shadow-sm border-0 sticky-top" style={{ top: '100px' }}>
                            <Card.Body className="p-0">
                                <div
                                    className="w-100 card-img-top"
                                    style={{
                                        height: '200px',
                                        background: `linear-gradient(45deg, #345E40, #4a7c59)`,
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        color: 'white',
                                        fontSize: '3rem'
                                    }}
                                >
                                    {selectedEvent.imageUrl ? (
                                        <img src={selectedEvent.imageUrl} alt={selectedEvent.name} className="w-100 h-100" style={{ objectFit: 'cover' }} />
                                    ) : (
                                        <FaCalendarAlt />
                                    )}
                                </div>

                                <div className="p-4">
                                    <h5 className="fw-bold text-success mb-2">{selectedEvent.name}</h5>
                                    <p className="text-muted mb-3">{selectedEvent.type}</p>

                                    <div className="mb-3">
                                        <h6 className="fw-semibold mb-2">Event Details</h6>
                                        <div className="small text-muted">
                                            <div className="d-flex align-items-center mb-1">
                                                <FaCalendarAlt className="me-2" size={12} />
                                                {new Date(selectedEvent.date).toLocaleDateString()}
                                            </div>
                                            <div className="d-flex align-items-center mb-1">
                                                <span className="me-2">🕐</span>
                                                {selectedEvent.startTime} - {selectedEvent.endTime}
                                            </div>
                                            <div className="d-flex align-items-center">
                                                <span className="me-2">📍</span>
                                                {selectedEvent.address}
                                            </div>
                                        </div>
                                    </div>

                                    <hr />

                                    <div className="booking-summary">
                                        <div className="d-flex justify-content-between mb-2">
                                            <span>Price per person</span>
                                            <span className="fw-semibold">
                                                {selectedEvent.price ? `₹${selectedEvent.price}` : 'Free'}
                                            </span>
                                        </div>

                                        {formValues.person && selectedEvent.price && (
                                            <>
                                                <div className="d-flex justify-content-between mb-2">
                                                    <span>Number of persons</span>
                                                    <span className="fw-semibold">{formValues.person}</span>
                                                </div>

                                                <hr />

                                                <div className="d-flex justify-content-between">
                                                    <span className="fw-bold">Total</span>
                                                    <span className="fw-bold text-success h5">₹{getTotalAmount()}</span>
                                                </div>
                                            </>
                                        )}
                                    </div>
                                </div>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>

            {/* Payment Modal */}
            {showPayment && (
                <PaymentOptions
                    bookingData={{
                        userId: user?.id || 'N/A',
                        eventId: selectedEvent?._id || 'N/A',
                        firstName: formValues.firstName,
                        lastName: formValues.lastName,
                        email: formValues.email,
                        phone: formValues.phone,
                        person: formValues.person,
                        eventName: selectedEvent?.name || 'N/A',
                        groundName: selectedEvent?.name || 'N/A' // For compatibility with PaymentOptions
                    }}
                    totalAmount={getTotalAmount()}
                    onPaymentSuccess={(paymentData) => {
                        dispatch(bookEvent({
                            ...paymentData,
                            eventId: selectedEvent?._id,
                            eventName: selectedEvent?.name,
                            eventDate: selectedEvent?.date,
                            eventPrice: selectedEvent?.price
                        })).unwrap().then((res) => {
                            setShowPayment(false);
                            setShowAlert(true);
                            setTimeout(() => {
                                setShowAlert(false);
                                navigate('/camp/events');
                            }, 3000);
                        });
                    }}
                    onClose={() => setShowPayment(false)}
                />
            )}
        </div>
    );
};

export default BookEvent;