import React, { useState } from 'react';
import { Card, Button, Row, Col, Modal, Alert } from 'react-bootstrap';
import { FaCreditCard, FaWhatsapp, FaShieldAlt, FaCheckCircle } from 'react-icons/fa';

const PaymentOptions = ({ bookingData, totalAmount, onPaymentSuccess, onClose }) => {
    const [loading, setLoading] = useState(false);

    const handleRazorpayPayment = () => {
        setLoading(true);

        if (!window.Razorpay) {
            alert('Payment gateway is loading. Please try again in a moment.');
            setLoading(false);
            return;
        }

        const options = {
            key: process.env.REACT_APP_RAZORPAY_KEY || 'rzp_test_your_key_id',
            amount: totalAmount * 100,
            currency: 'INR',
            name: 'Camp Rishikesh',
            description: `Booking for ${bookingData.groundName}`,
            handler: async function (response) {
                try {
                    const verifyResponse = await fetch('/api/payment/verify', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({
                            razorpay_order_id: response.razorpay_order_id,
                            razorpay_payment_id: response.razorpay_payment_id,
                            razorpay_signature: response.razorpay_signature
                        })
                    });
                    
                    const result = await verifyResponse.json();
                    
                    if (result.success) {
                        onPaymentSuccess({
                            ...bookingData,
                            paymentId: response.razorpay_payment_id,
                            paymentMethod: 'razorpay',
                            paymentStatus: 'completed'
                        });
                    } else {
                        alert('Payment verification failed');
                    }
                } catch (error) {
                    console.error('Payment verification error:', error);
                    alert('Payment verification failed');
                }
                setLoading(false);
            },
            prefill: {
                name: `${bookingData.firstName} ${bookingData.lastName}`,
                email: bookingData.email,
                contact: bookingData.phone
            },
            theme: { color: '#28a745' },
            modal: {
                ondismiss: function () {
                    setLoading(false);
                }
            }
        };

        try {
            const rzp = new window.Razorpay(options);
            rzp.open();
        } catch (error) {
            console.error('Razorpay error:', error);
            alert('Payment gateway error. Please try WhatsApp booking.');
            setLoading(false);
        }
    };

    const handleWhatsAppBooking = () => {
        const message = `🏕️ *Camp Rishikesh Booking*

📋 *Details:*
• Package: ${bookingData.groundName}
• Check-in: ${bookingData.checkIn}
• Guests: ${bookingData.guests}
• Amount: ₹${totalAmount}

👤 *Contact:*
• Name: ${bookingData.firstName} ${bookingData.lastName}
• Phone: ${bookingData.phone}

Hi! I want to book this package.`;

        window.open(`https://wa.me/919876543210?text=${encodeURIComponent(message)}`);

        onPaymentSuccess({
            ...bookingData,
            paymentMethod: 'whatsapp',
            paymentStatus: 'pending'
        });
    };

    return (
        <Modal show={true} onHide={onClose} size="lg" centered>
            <Modal.Header closeButton className="bg-success text-white">
                <Modal.Title>
                    <FaShieldAlt className="me-2" />
                    Payment Method
                </Modal.Title>
            </Modal.Header>
            <Modal.Body className="p-4">
                <div className="text-center mb-4">
                    <h4 className="text-success">Total: ₹{totalAmount}</h4>
                </div>

                <Row className="g-3">
                    <Col md={6}>
                        <Card className="h-100 text-center">
                            <Card.Body className="p-4">
                                <FaCreditCard size={40} className="text-primary mb-3" />
                                <h5>Pay Online</h5>
                                <p className="text-muted small">Instant confirmation</p>
                                <Button
                                    variant="primary"
                                    className="w-100"
                                    onClick={handleRazorpayPayment}
                                    disabled={loading}
                                >
                                    {loading ? 'Processing...' : 'Pay Now'}
                                </Button>
                            </Card.Body>
                        </Card>
                    </Col>

                    <Col md={6}>
                        <Card className="h-100 text-center">
                            <Card.Body className="p-4">
                                <FaWhatsapp size={40} className="text-success mb-3" />
                                <h5>WhatsApp</h5>
                                <p className="text-muted small">Chat before payment</p>
                                <Button
                                    variant="success"
                                    className="w-100"
                                    onClick={handleWhatsAppBooking}
                                >
                                    <FaWhatsapp className="me-2" />
                                    Chat & Book
                                </Button>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Modal.Body>
        </Modal>
    );
};

export default PaymentOptions;