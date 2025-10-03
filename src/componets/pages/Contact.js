import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Form, Button, Card } from 'react-bootstrap';
import { FaPhone, FaEnvelope, FaMapMarkerAlt, FaClock, FaFacebook, FaInstagram, FaTwitter } from 'react-icons/fa';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission here
    console.log('Form submitted:', formData);
    alert('Thank you for your message! We will get back to you soon.');
    setFormData({
      name: '',
      email: '',
      phone: '',
      subject: '',
      message: ''
    });
  };

  const contactInfo = [
    {
      icon: FaPhone,
      title: "Phone",
      details: ["+91 98765 43210", "+91 98765 43211"],
      description: "Call us for immediate assistance"
    },
    {
      icon: FaEnvelope,
      title: "Email",
      details: ["info@camprishikesh.com", "bookings@camprishikesh.com"],
      description: "Send us an email anytime"
    },
    {
      icon: FaMapMarkerAlt,
      title: "Address",
      details: ["Camp Rishikesh", "Near Laxman Jhula", "Rishikesh, Uttarakhand 249302"],
      description: "Visit us at our location"
    },
    {
      icon: FaClock,
      title: "Office Hours",
      details: ["Mon - Sun: 8:00 AM - 8:00 PM", "Emergency: 24/7"],
      description: "We're here when you need us"
    }
  ];

  const faqs = [
    {
      question: "What is the check-in and check-out time?",
      answer: "Check-in is at 3:00 PM and check-out is at 11:00 AM. Early check-in and late check-out may be available upon request."
    },
    {
      question: "Do you allow pets?",
      answer: "Yes, we welcome pets! They must be kept on a leash at all times and owners are responsible for cleaning up after them."
    },
    {
      question: "What amenities are included?",
      answer: "All sites include access to clean restrooms, hot showers, WiFi, fire pits, and parking. Some accommodations include additional amenities."
    },
    {
      question: "Is there a cancellation policy?",
      answer: "Cancellations made 48 hours before arrival receive a full refund. Cancellations within 48 hours are subject to a 50% charge."
    },
    {
      question: "Do you provide camping equipment?",
      answer: "We offer equipment rental including tents, sleeping bags, and camping chairs. Please contact us in advance to reserve equipment."
    }
  ];

  return (
    <div className="pt-5 mt-4">
      {/* Hero Section */}
      <section className="py-5" style={{ background: 'linear-gradient(135deg, #345E40 0%, #4a7c59 100%)' }}>
        <Container>
          <Row className="text-center text-white">
            <Col>
              <h1 className="display-4 fw-bold mb-3">Contact Us</h1>
              <p className="lead">Get in touch with us for bookings, questions, or just to say hello!</p>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Contact Info Cards */}
      <section className="py-5">
        <Container>
          <Row className="g-4 mb-5">
            {contactInfo.map((info, index) => (
              <Col xs={12} sm={6} md={6} lg={3} key={index}>
                <Card className="h-100 text-center border-0 shadow-sm">
                  <Card.Body className="p-3 p-md-4">
                    <info.icon size={40} className="text-success mb-3" />
                    <Card.Title className="h6 h-md-5 mb-3">{info.title}</Card.Title>
                    {info.details.map((detail, idx) => (
                      <p key={idx} className="mb-1 fw-semibold small">{detail}</p>
                    ))}
                    <p className="text-muted small mt-2 d-none d-md-block">{info.description}</p>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </Container>
      </section>

      {/* Contact Form & Map */}
      <section className="py-5" style={{ backgroundColor: '#f8f9fa' }}>
        <Container>
          <Row className="g-5">
            {/* Contact Form */}
            <Col lg={6}>
              <Card className="border-0 shadow-sm">
                <Card.Body className="p-4">
                  <h3 className="fw-bold mb-4">Send us a Message</h3>
                  <Form onSubmit={handleSubmit}>
                    <Row className="g-3">
                      <Col xs={12} md={6}>
                        <Form.Group>
                          <Form.Label>Full Name *</Form.Label>
                          <Form.Control
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleInputChange}
                            required
                            placeholder="Your full name"
                            style={{ fontSize: '16px' }}
                          />
                        </Form.Group>
                      </Col>
                      <Col xs={12} md={6}>
                        <Form.Group>
                          <Form.Label>Email Address *</Form.Label>
                          <Form.Control
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            required
                            placeholder="your@email.com"
                            style={{ fontSize: '16px' }}
                          />
                        </Form.Group>
                      </Col>
                      <Col xs={12} md={6}>
                        <Form.Group>
                          <Form.Label>Phone Number</Form.Label>
                          <Form.Control
                            type="tel"
                            name="phone"
                            value={formData.phone}
                            onChange={handleInputChange}
                            placeholder="+91 98765 43210"
                            style={{ fontSize: '16px' }}
                          />
                        </Form.Group>
                      </Col>
                      <Col xs={12} md={6}>
                        <Form.Group>
                          <Form.Label>Subject *</Form.Label>
                          <Form.Select
                            name="subject"
                            value={formData.subject}
                            onChange={handleInputChange}
                            required
                            style={{ fontSize: '16px' }}
                          >
                            <option value="">Select a subject</option>
                            <option value="booking">Booking Inquiry</option>
                            <option value="general">General Question</option>
                            <option value="complaint">Complaint</option>
                            <option value="suggestion">Suggestion</option>
                            <option value="other">Other</option>
                          </Form.Select>
                        </Form.Group>
                      </Col>
                      <Col xs={12}>
                        <Form.Group>
                          <Form.Label>Message *</Form.Label>
                          <Form.Control
                            as="textarea"
                            rows={5}
                            name="message"
                            value={formData.message}
                            onChange={handleInputChange}
                            required
                            placeholder="Tell us how we can help you..."
                            style={{ fontSize: '16px', resize: 'vertical' }}
                          />
                        </Form.Group>
                      </Col>
                      <Col xs={12}>
                        <Button type="submit" variant="success" size="lg" className="w-100">
                          Send Message
                        </Button>
                      </Col>
                    </Row>
                  </Form>
                </Card.Body>
              </Card>
            </Col>

            {/* Map Placeholder */}
            <Col lg={6}>
              <Card className="border-0 shadow-sm h-100">
                <Card.Body className="p-0">
                  <div
                    className="bg-light d-flex align-items-center justify-content-center h-100 rounded"
                    style={{ minHeight: '400px' }}
                  >
                    <div className="text-center text-muted">
                      <FaMapMarkerAlt size={48} className="mb-3" />
                      <h4>Find Us Here</h4>
                      <p>Interactive map coming soon</p>
                      <div className="mt-3">
                        <p className="fw-semibold">Camp Rishikesh</p>
                        <p>Near Laxman Jhula<br />Rishikesh, Uttarakhand 249302</p>
                      </div>
                    </div>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </section>

      {/* FAQ Section */}
      <section className="py-5">
        <Container>
          <Row>
            <Col lg={6} className="mx-auto">
              <h2 className="fw-bold text-center mb-5">Frequently Asked Questions</h2>
              <div className="accordion" id="faqAccordion">
                {faqs.map((faq, index) => (
                  <div className="accordion-item border-0 mb-3 shadow-sm" key={index}>
                    <h2 className="accordion-header">
                      <button
                        className="accordion-button collapsed fw-semibold"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target={`#faq${index}`}
                        aria-expanded="false"
                      >
                        {faq.question}
                      </button>
                    </h2>
                    <div
                      id={`faq${index}`}
                      className="accordion-collapse collapse"
                      data-bs-parent="#faqAccordion"
                    >
                      <div className="accordion-body text-muted">
                        {faq.answer}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </Col>
            <Col lg={6} className="mx-auto text-center mt-4">
              <Row>
                <Col className="text-center">
                  <h3 className="fw-bold mb-3">Follow Us</h3>
                  <p className="text-muted mb-4">Stay connected for updates, photos, and special offers</p>
                  <div className="d-flex justify-content-center gap-3 mb-4">
                    <a href="#" className="btn btn-outline-primary rounded-circle p-3">
                      <FaFacebook size={20} />
                    </a>
                    <a href="#" className="btn btn-outline-danger rounded-circle p-3">
                      <FaInstagram size={20} />
                    </a>
                    <a href="#" className="btn btn-outline-info rounded-circle p-3">
                      <FaTwitter size={20} />
                    </a>
                  </div>
                  <Button variant="success" size="lg" className="rounded-pill px-4">
                    Book Your Stay Now
                  </Button>
                </Col>
              </Row>
            </Col>
          </Row>
        </Container>
      </section>

    </div>
  );
};

export default Contact;