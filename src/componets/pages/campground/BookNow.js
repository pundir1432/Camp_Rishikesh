import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Form, Button, Alert } from 'react-bootstrap';
import { FaArrowLeft, FaCalendarAlt, FaUsers, FaMapMarkerAlt, FaUser, FaPhone, FaEnvelope } from 'react-icons/fa';
import { useNavigate, useLocation } from 'react-router-dom';
import { useForm, useWatch } from 'react-hook-form';
import '../../styles/BookNow.css';
import { getUserFromSession } from '../../helper/api/apiCore';
import { useDispatch, useSelector } from 'react-redux';
import { bookGround } from '../../redux/ground/thunk';
import { ButtonLoading } from '../../helper/loading/Loaders';
import PaymentOptions from '../../payment/PaymentOptions';
import TrustBadges from '../../common/TrustBadges';

const BookNow = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [selectedItem, setSelectedItem] = useState(null);
    const { ground, loading } = useSelector(state => state.ground);
    console.log({ selectedItem });
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
            address: '',
            city: '',
            state: '',
            zipCode: '',
            checkIn: '',
            checkOut: '',
            startTime: '',
            endTime: '',
            guests: '1',
            specialRequests: '',
            emergencyName: '',
            emergencyPhone: '',
            emergencyRelation: ''
        }
    });

    // Use useWatch to track form values dynamically
    const formValues = useWatch({ control });

    useEffect(() => {
        const urlParams = new URLSearchParams(location.search);
        const itemData = urlParams.get('item');
        if (itemData) {
            try {
                setSelectedItem(JSON.parse(decodeURIComponent(itemData)));
            } catch (error) {
                console.error('Error parsing item data:', error);
                navigate('/camp/campground');
            }
        } else {
            navigate('/camp/campground');
        }
    }, [location, navigate]);

    const onSubmit = (data) => {
        const bookingData = {
            userId: user?.id || 'N/A',
            groundId: selectedItem?._id || 'N/A',
            firstName: data.firstName,
            lastName: data.lastName,
            email: data.email,
            phone: data.phone,
            address: data.address,
            city: data.city,
            state: data.state,
            zipCode: data.zipCode,
            checkIn: data.checkIn,
            checkOut: data.checkOut,
            startTime: data.startTime,
            endTime: data.endTime,
            guests: data.guests,
            emergencyName: data.emergencyName,
            emergencyPhone: data.emergencyPhone,
            emergencyRelation: data.emergencyRelation,
            specialRequests: data.specialRequests,
            groundName: selectedItem?.name || 'N/A',
            totalAmount: getTotal()
        };

        dispatch(bookGround(bookingData)).unwrap().then((res) => {
            if (res?.status === 201 || res?.status === 200) {
                setShowPayment(true);
            }
        }).catch((error) => {
            console.error('Booking error:', error);
        })
    };

    const handleInputChange = (e, fieldName) => {
        let value = e.target.value;

        if (['firstName', 'lastName', 'city', 'state', 'emergencyName'].includes(fieldName)) {
            value = value.replace(/[^a-zA-Z\s]/g, '');
        }

        if (['phone', 'emergencyPhone'].includes(fieldName)) {
            value = value.replace(/[^0-9]/g, '').slice(0, 10);
        }

        if (fieldName === 'zipCode') {
            value = value.replace(/[^0-9]/g, '');
        }

        setValue(fieldName, value);
        if (value) clearErrors(fieldName);
    };

    const calculateNights = () => {
        if (formValues.checkIn && formValues.checkOut) {
            const checkIn = new Date(formValues.checkIn);
            const checkOut = new Date(formValues.checkOut);
            const diffTime = Math.abs(checkOut - checkIn);
            const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
            return diffDays;
        }
        return 0;
    };

    const getTotal = () => {
        const nights = calculateNights();
        const guests = parseInt(formValues.guests) || 1;
        const pricePerNight = selectedItem?.price ?
            (typeof selectedItem.price === 'string' ?
                parseInt(selectedItem.price.replace(/[^0-9]/g, '')) :
                parseInt(selectedItem.price)) : 0;
        return nights * pricePerNight * guests;
    };

    if (!selectedItem) {
        return <div className="text-center py-5">Loading...</div>;
    }

    const getTotalAmount = () => {
        const price = selectedItem?.price ? parseFloat(selectedItem.price) : 0;
        const persons = parseInt(formValues.guests) || 1;
        return price * persons;
    };

    return (
        <div className="book-now-page pt-5 mt-3">
            <Container>
                {showAlert && (
                    <Alert variant="success" className="mb-4">
                        Booking confirmed! Redirecting to home page...
                    </Alert>
                )}

                <Row className="">
                    <Col>
                        <Button
                            className="border-0 bg-transparent text-dark"
                            onClick={() => navigate('/camp/campground')}
                        >
                            <FaArrowLeft className="me-2" />
                            Back
                        </Button>
                        <h2 className="fw-bold">Complete Your Booking</h2>
                        <p className="text-muted">You're just one step away from your perfect camping experience</p>
                    </Col>
                </Row>

                <Row>
                    <Col lg={8}>
                        <Card className="shadow-sm border-0 mb-4">
                            <Card.Header className="bg-success text-white">
                                <h5 className="mb-0">
                                    <FaUser className="me-2" />
                                    Complete Booking Form
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

                                    <div className="mb-4">
                                        <h6 className="fw-bold text-success mb-3">
                                            <FaCalendarAlt className="me-2" />
                                            Booking Details
                                        </h6>
                                        <Row>
                                            <Col md={6}>
                                                <Form.Group className="mb-3">
                                                    <Form.Label className="fw-semibold">Check-in Date *</Form.Label>
                                                    <Form.Control
                                                        type="date"
                                                        {...register('checkIn', { required: 'Check-in date is required' })}
                                                        onChange={(e) => {
                                                            setValue('checkIn', e.target.value);
                                                            clearErrors('checkIn');
                                                        }}
                                                        className={`form-control-modern form-control py-2 ${errors.checkIn ? 'is-invalid' : ''}`}
                                                    />
                                                    {errors.checkIn && <div className="invalid-feedback">{errors.checkIn.message}</div>}
                                                </Form.Group>
                                            </Col>
                                            <Col md={6}>
                                                <Form.Group className="mb-3">
                                                    <Form.Label className="fw-semibold">Check-out Date *</Form.Label>
                                                    <Form.Control
                                                        type="date"
                                                        {...register('checkOut', { required: 'Check-out date is required' })}
                                                        onChange={(e) => {
                                                            setValue('checkOut', e.target.value);
                                                            clearErrors('checkOut');
                                                        }}
                                                        className={`form-control-modern form-control py-2 ${errors.checkOut ? 'is-invalid' : ''}`}
                                                    />
                                                    {errors.checkOut && <div className="invalid-feedback">{errors.checkOut.message}</div>}
                                                </Form.Group>
                                            </Col>
                                        </Row>

                                        <Row>
                                            <Col md={6}>
                                                <Form.Group className="mb-3">
                                                    <Form.Label className="fw-semibold">Start Time *</Form.Label>
                                                    <Form.Control
                                                        type="time"
                                                        {...register('startTime', { required: 'Start time is required' })}
                                                        onChange={(e) => handleInputChange(e, 'startTime')}
                                                        className={`form-control-modern form-control py-2 ${errors.startTime ? 'is-invalid' : ''}`}
                                                    />
                                                    {errors.startTime && <div className="invalid-feedback">{errors.startTime.message}</div>}
                                                </Form.Group>
                                            </Col>
                                            <Col md={6}>
                                                <Form.Group className="mb-3">
                                                    <Form.Label className="fw-semibold">End Time *</Form.Label>
                                                    <Form.Control
                                                        type="time"
                                                        {...register('endTime', { required: 'End time is required' })}
                                                        onChange={(e) => handleInputChange(e, 'endTime')}
                                                        className={`form-control-modern form-control py-2 ${errors.endTime ? 'is-invalid' : ''}`}
                                                    />
                                                    {errors.endTime && <div className="invalid-feedback">{errors.endTime.message}</div>}
                                                </Form.Group>
                                            </Col>
                                        </Row>

                                        <Form.Group className="mb-3">
                                            <Form.Label className="fw-semibold">
                                                <FaUsers className="me-2" />
                                                Number of Guests *
                                            </Form.Label>
                                            <Form.Select
                                                {...register('guests', { required: 'Number of guests is required' })}
                                                onChange={(e) => {
                                                    setValue('guests', e.target.value);
                                                    clearErrors('guests');
                                                }}
                                                className={`form-control-modern form-control py-2 ${errors.guests ? 'is-invalid' : ''}`}
                                            >
                                                <option value="">Select number</option>
                                                <option value="1">1 Guest</option>
                                                <option value="2">2 Guests</option>
                                                <option value="3">3 Guests</option>
                                                <option value="4">4 Guests</option>
                                                <option value="5">5 Guests</option>
                                                <option value="6">6 Guests</option>
                                            </Form.Select>
                                            {errors.guests && <div className="invalid-feedback">{errors.guests.message}</div>}
                                        </Form.Group>
                                    </div>

                                    <div className="mb-4">
                                        <h6 className="fw-bold text-success mb-3">Emergency Contact</h6>
                                        <Row>
                                            <Col md={6}>
                                                <Form.Group className="mb-3">
                                                    <Form.Label className="fw-semibold">Contact Name *</Form.Label>
                                                    <Form.Control
                                                        type="text"
                                                        {...register('emergencyName', {
                                                            required: 'Emergency contact name is required',
                                                            pattern: {
                                                                value: /^[a-zA-Z\s]+$/,
                                                                message: 'Only letters and spaces are allowed'
                                                            }
                                                        })}
                                                        onChange={(e) => handleInputChange(e, 'emergencyName')}
                                                        placeholder="Emergency contact name"
                                                        className={`form-control-modern form-control py-2 ${errors.emergencyName ? 'is-invalid' : ''}`}
                                                    />
                                                    {errors.emergencyName && <div className="invalid-feedback">{errors.emergencyName.message}</div>}
                                                </Form.Group>
                                            </Col>
                                            <Col md={6}>
                                                <Form.Group className="mb-3">
                                                    <Form.Label className="fw-semibold">Contact Phone *</Form.Label>
                                                    <Form.Control
                                                        type="tel"
                                                        {...register('emergencyPhone', {
                                                            required: 'Emergency contact phone is required',
                                                            pattern: {
                                                                value: /^\d{10}$/,
                                                                message: 'Phone number must be exactly 10 digits'
                                                            }
                                                        })}
                                                        onChange={(e) => handleInputChange(e, 'emergencyPhone')}
                                                        placeholder="Emergency contact phone"
                                                        className={`form-control-modern form-control py-2 ${errors.emergencyPhone ? 'is-invalid' : ''}`}
                                                        maxLength={10}
                                                    />
                                                    {errors.emergencyPhone && <div className="invalid-feedback">{errors.emergencyPhone.message}</div>}
                                                </Form.Group>
                                            </Col>
                                        </Row>

                                        <Form.Group className="mb-3">
                                            <Form.Label className="fw-semibold">Relationship *</Form.Label>
                                            <Form.Select
                                                {...register('emergencyRelation', { required: 'Relationship is required' })}
                                                onChange={(e) => handleInputChange(e, 'emergencyRelation')}
                                                className={`form-control-modern form-control py-2 ${errors.emergencyRelation ? 'is-invalid' : ''}`}
                                            >
                                                <option value="">Select relationship</option>
                                                <option value="parent">Parent</option>
                                                <option value="spouse">Spouse</option>
                                                <option value="sibling">Sibling</option>
                                                <option value="friend">Friend</option>
                                                <option value="child">Child</option>
                                                <option value="other">Other</option>
                                            </Form.Select>
                                            {errors.emergencyRelation && <div className="invalid-feedback">{errors.emergencyRelation.message}</div>}
                                        </Form.Group>
                                    </div>

                                    <div className="mb-4">
                                        <h6 className="fw-bold text-success mb-3">Additional Information</h6>
                                        <Form.Group className="mb-3">
                                            <Form.Label className="fw-semibold">Special Requests</Form.Label>
                                            <Form.Control
                                                as="textarea"
                                                rows={4}
                                                {...register('specialRequests')}
                                                onChange={(e) => handleInputChange(e, 'specialRequests')}
                                                placeholder="Any special requirements, dietary restrictions, accessibility needs, etc..."
                                                className="form-control-modern form-control py-2"
                                                maxLength={500}
                                            />
                                            <div className="text-end text-muted small mt-1">
                                                {formValues.specialRequests?.length || 0}/500 characters
                                            </div>
                                        </Form.Group>
                                    </div>

                                    <div className="d-flex justify-content-between gap-4">
                                        <Button
                                            variant="secondary"
                                            size="lg"
                                            className="w-100 py-1 fw-semibold"
                                            onClick={() => navigate('/camp/campground')}
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
                                            {loading ? <ButtonLoading height={12} /> : 'Complete Booking'}
                                        </Button>
                                    </div>
                                </Form>
                            </Card.Body>
                        </Card>
                    </Col>

                    <Col lg={4}>
                        <Card className="shadow-sm border-0 sticky-top" style={{ top: '100px' }}>
                            <Card.Body className="p-0">
                                <img
                                    src={selectedItem.imageUrl}
                                    alt={selectedItem.name}
                                    className="w-100 card-img-top"
                                    style={{ height: '200px', objectFit: 'cover' }}
                                />

                                <div className="p-4">
                                    <h5 className="fw-bold text-success mb-2">{selectedItem.name}</h5>
                                    <p className="text-muted mb-3">
                                        Person {selectedItem.person} • {selectedItem.size}
                                    </p>

                                    <div className="mb-3">
                                        <h6 className="fw-semibold mb-2">Facilities</h6>
                                        <div className="d-flex flex-wrap gap-1">
                                            {selectedItem.facilities?.map((facility, index) => (
                                                <span key={index} className="badge bg-light text-dark border">
                                                    {facility}
                                                </span>
                                            ))}
                                        </div>
                                    </div>

                                    <hr />

                                    <div className="booking-summary">
                                        <div className="d-flex justify-content-between mb-2">
                                            <span>Price per night</span>
                                            <span className="fw-semibold">{selectedItem.price}</span>
                                        </div>

                                        {calculateNights() > 0 && (
                                            <>
                                                <div className="d-flex justify-content-between mb-2">
                                                    <span>Number of nights</span>
                                                    <span className="fw-semibold">{calculateNights()}</span>
                                                </div>

                                                <div className="d-flex justify-content-between mb-2">
                                                    <span>Guests</span>
                                                    <span className="fw-semibold">{formValues.guests}</span>
                                                </div>

                                                <hr />

                                                <div className="d-flex justify-content-between">
                                                    <span className="fw-bold">Total</span>
                                                    <span className="fw-bold text-success h5">₹{getTotal()}</span>
                                                </div>
                                            </>
                                        )}
                                    </div>
                                </div>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>

                {/* Trust Badges */}
                <Row className="mt-5">
                    <Col>
                        <TrustBadges />
                    </Col>
                </Row>
            </Container>

            {/* Payment Modal */}
            {showPayment && (
                <PaymentOptions
                    bookingData={{
                        userId: user?.id || 'N/A',
                        groundId: selectedItem?._id || 'N/A',
                        firstName: formValues.firstName,
                        lastName: formValues.lastName,
                        email: formValues.email,
                        phone: formValues.phone,
                        checkIn: formValues.checkIn,
                        checkOut: formValues.checkOut,
                        guests: formValues.guests,
                        groundName: selectedItem?.name || 'N/A'
                    }}
                    totalAmount={getTotal()}
                    onPaymentSuccess={(paymentData) => {
                        setShowPayment(false);
                        setShowAlert(true);
                        setTimeout(() => {
                            setShowAlert(false);
                            navigate('/camp/user-dashboard');
                        }, 3000);
                    }}
                    onClose={() => setShowPayment(false)}
                />
            )}
        </div>
    );
};

export default BookNow;