import React from 'react';
import { Row, Col, Card } from 'react-bootstrap';
import { FaShieldAlt, FaCertificate, FaHeadset, FaAward, FaUsers, FaMapMarkerAlt } from 'react-icons/fa';

const TrustBadges = () => {
    const trustElements = [
        {
            icon: FaShieldAlt,
            title: '100% Secure',
            description: 'SSL encrypted payments',
            color: 'success'
        },
        {
            icon: FaCertificate,
            title: 'Certified',
            description: 'Tourism board approved',
            color: 'primary'
        },
        {
            icon: FaHeadset,
            title: '24/7 Support',
            description: 'Always here to help',
            color: 'info'
        },
        {
            icon: FaAward,
            title: 'Top Rated',
            description: '4.8/5 customer rating',
            color: 'warning'
        },
        {
            icon: FaUsers,
            title: '10,000+',
            description: 'Happy customers',
            color: 'success'
        },
        {
            icon: FaMapMarkerAlt,
            title: 'Prime Location',
            description: 'Best spots in Rishikesh',
            color: 'danger'
        }
    ];

    return (
        <div className="trust-badges py-4">
            <div className="text-center mb-4">
                <h4 className="fw-bold">Why Choose Camp Rishikesh?</h4>
                <p className="text-muted">Your safety and satisfaction is our priority</p>
            </div>
            
            <Row className="g-3">
                {trustElements.map((element, index) => (
                    <Col xs={6} md={4} lg={2} key={index}>
                        <Card className="h-100 border-0 text-center trust-card">
                            <Card.Body className="p-3">
                                <element.icon 
                                    size={30} 
                                    className={`text-${element.color} mb-2`} 
                                />
                                <h6 className="fw-bold small">{element.title}</h6>
                                <p className="text-muted small mb-0">{element.description}</p>
                            </Card.Body>
                        </Card>
                    </Col>
                ))}
            </Row>

            <style jsx>{`
                .trust-card {
                    transition: transform 0.2s;
                    background: rgba(255, 255, 255, 0.8);
                }
                .trust-card:hover {
                    transform: translateY(-2px);
                    box-shadow: 0 4px 8px rgba(0,0,0,0.1);
                }
            `}</style>
        </div>
    );
};

export default TrustBadges;