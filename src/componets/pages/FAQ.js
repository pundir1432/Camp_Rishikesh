import React, { useState } from 'react';
import { Container, Row, Col, Accordion, Card, Button } from 'react-bootstrap';
import { FaQuestionCircle, FaWhatsapp, FaPhone, FaEnvelope } from 'react-icons/fa';

const FAQ = () => {
    const [activeKey, setActiveKey] = useState('0');

    const faqData = [
        {
            category: 'Booking & Reservations',
            questions: [
                {
                    question: 'How do I make a booking?',
                    answer: 'You can book online through our website or contact us via WhatsApp. Select your preferred dates, package, and complete the payment process.'
                },
                {
                    question: 'Can I modify or cancel my booking?',
                    answer: 'Yes, you can modify your booking up to 48 hours before check-in. Cancellations are subject to our cancellation policy. Contact us for assistance.'
                },
                {
                    question: 'What is your cancellation policy?',
                    answer: 'Free cancellation up to 7 days before check-in. 50% refund for cancellations 3-7 days before. No refund for cancellations within 3 days.'
                }
            ]
        },
        {
            category: 'Payment & Pricing',
            questions: [
                {
                    question: 'What payment methods do you accept?',
                    answer: 'We accept online payments via Razorpay (UPI, cards, net banking) and also offer WhatsApp booking with flexible payment options.'
                },
                {
                    question: 'Are there any hidden charges?',
                    answer: 'No hidden charges. The price shown includes accommodation, basic amenities, and taxes. Additional services like meals are clearly mentioned.'
                },
                {
                    question: 'Do you offer group discounts?',
                    answer: 'Yes! Groups of 8+ people get 10% discount, and groups of 15+ get 15% discount. Contact us for custom group packages.'
                }
            ]
        },
        {
            category: 'Facilities & Amenities',
            questions: [
                {
                    question: 'What facilities are included?',
                    answer: 'All packages include accommodation, basic furniture, shared bathrooms, WiFi, parking, and access to common areas. Specific amenities vary by package.'
                },
                {
                    question: 'Is food included in the package?',
                    answer: 'Basic packages include breakfast. Full meal packages are available at additional cost. You can also cook your own food in designated areas.'
                },
                {
                    question: 'What should I bring?',
                    answer: 'Bring personal toiletries, comfortable clothes, sunscreen, and any specific items you need. Bedding and basic amenities are provided.'
                }
            ]
        },
        {
            category: 'Safety & Guidelines',
            questions: [
                {
                    question: 'What safety measures do you have?',
                    answer: 'We have 24/7 security, first aid facilities, emergency contacts, and trained staff. All activities follow strict safety protocols.'
                },
                {
                    question: 'Are pets allowed?',
                    answer: 'Yes, well-behaved pets are welcome with prior notice. Additional cleaning charges may apply. Pets must be leashed in common areas.'
                },
                {
                    question: 'What are the check-in/check-out times?',
                    answer: 'Check-in: 2:00 PM onwards, Check-out: 11:00 AM. Early check-in or late check-out may be available on request.'
                }
            ]
        }
    ];

    const contactOptions = [
        {
            icon: FaWhatsapp,
            title: 'WhatsApp',
            value: '+91 98765 43210',
            action: () => window.open('https://wa.me/919876543210?text=Hi! I have a question about Camp Rishikesh.'),
            color: 'success'
        },
        {
            icon: FaPhone,
            title: 'Call Us',
            value: '+91 98765 43210',
            action: () => window.open('tel:+919876543210'),
            color: 'primary'
        },
        {
            icon: FaEnvelope,
            title: 'Email',
            value: 'info@camprishikesh.com',
            action: () => window.open('mailto:info@camprishikesh.com'),
            color: 'info'
        }
    ];

    return (
        <div className="faq-page pt-5 mt-3">
            {/* Hero Section */}
            <section className="py-5" style={{ background: 'linear-gradient(135deg, #345E40 0%, #4a7c59 100%)' }}>
                <Container>
                    <Row className="text-center text-white">
                        <Col>
                            <FaQuestionCircle size={60} className="mb-3" />
                            <h1 className="display-4 fw-bold mb-3">Frequently Asked Questions</h1>
                            <p className="lead">Find answers to common questions about Camp Rishikesh</p>
                        </Col>
                    </Row>
                </Container>
            </section>

            {/* FAQ Content */}
            <section className="py-5">
                <Container>
                    <Row>
                        <Col lg={8} className="mx-auto">
                            {faqData.map((category, categoryIndex) => (
                                <div key={categoryIndex} className="mb-5">
                                    <h3 className="fw-bold text-success mb-4">{category.category}</h3>
                                    <Accordion defaultActiveKey="0">
                                        {category.questions.map((faq, faqIndex) => (
                                            <Accordion.Item 
                                                eventKey={faqIndex.toString()} 
                                                key={faqIndex}
                                                className="mb-3 border-0 shadow-sm"
                                            >
                                                <Accordion.Header className="fw-semibold">
                                                    {faq.question}
                                                </Accordion.Header>
                                                <Accordion.Body className="text-muted">
                                                    {faq.answer}
                                                </Accordion.Body>
                                            </Accordion.Item>
                                        ))}
                                    </Accordion>
                                </div>
                            ))}
                        </Col>
                    </Row>
                </Container>
            </section>

            {/* Contact Section */}
            <section className="py-5" style={{ backgroundColor: '#f8f9fa' }}>
                <Container>
                    <Row>
                        <Col lg={8} className="mx-auto text-center">
                            <h3 className="fw-bold mb-4">Still have questions?</h3>
                            <p className="text-muted mb-4">
                                Can't find the answer you're looking for? Our friendly team is here to help!
                            </p>
                            
                            <Row className="g-3 justify-content-center">
                                {contactOptions.map((option, index) => (
                                    <Col md={4} key={index}>
                                        <Card 
                                            className="h-100 border-0 shadow-sm contact-card"
                                            style={{ cursor: 'pointer' }}
                                            onClick={option.action}
                                        >
                                            <Card.Body className="text-center p-4">
                                                <option.icon 
                                                    size={30} 
                                                    className={`text-${option.color} mb-3`} 
                                                />
                                                <h6 className="fw-bold">{option.title}</h6>
                                                <p className="text-muted small mb-3">{option.value}</p>
                                                <Button 
                                                    variant={`outline-${option.color}`} 
                                                    size="sm"
                                                    className="w-100"
                                                >
                                                    Contact Now
                                                </Button>
                                            </Card.Body>
                                        </Card>
                                    </Col>
                                ))}
                            </Row>
                        </Col>
                    </Row>
                </Container>
            </section>

            <style jsx>{`
                .contact-card {
                    transition: transform 0.2s;
                }
                .contact-card:hover {
                    transform: translateY(-5px);
                }
                .accordion-button:not(.collapsed) {
                    background-color: rgba(40, 167, 69, 0.1);
                    color: #28a745;
                }
            `}</style>
        </div>
    );
};

export default FAQ;