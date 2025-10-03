import React, { useState } from 'react';
import { Button, Dropdown } from 'react-bootstrap';
import { FaWhatsapp, FaQuestionCircle, FaCalendarAlt, FaCreditCard, FaExclamationTriangle } from 'react-icons/fa';

const WhatsAppWidget = () => {
    const [isOpen, setIsOpen] = useState(false);

    const supportOptions = [
        {
            icon: FaQuestionCircle,
            title: 'General Inquiry',
            message: 'Hi! I have a general question about Camp Rishikesh.'
        },
        {
            icon: FaCalendarAlt,
            title: 'Booking Help',
            message: 'Hi! I need help with booking a camp.'
        },
        {
            icon: FaCreditCard,
            title: 'Payment Issue',
            message: 'Hi! I have a payment related query.'
        },
        {
            icon: FaExclamationTriangle,
            title: 'Emergency',
            message: 'Hi! This is an emergency. Please respond immediately.'
        }
    ];

    const handleWhatsAppClick = (message) => {
        const phoneNumber = '919876543210';
        const encodedMessage = encodeURIComponent(message);
        window.open(`https://wa.me/${phoneNumber}?text=${encodedMessage}`, '_blank');
        setIsOpen(false);
    };

    return (
        <div className="whatsapp-widget">
            <div className="position-fixed bottom-0 end-0 p-3" style={{ zIndex: 1050 }}>
                <Dropdown show={isOpen} onToggle={setIsOpen} drop="up">
                    <Dropdown.Toggle
                        as={Button}
                        variant="success"
                        className="rounded-circle p-3 shadow-lg whatsapp-btn"
                        style={{ width: '60px', height: '60px' }}
                    >
                        <FaWhatsapp size={24} />
                    </Dropdown.Toggle>

                    <Dropdown.Menu className="shadow-lg border-0 p-2" style={{ minWidth: '280px' }}>
                        <div className="p-2 border-bottom">
                            <h6 className="fw-bold text-success mb-1">
                                <FaWhatsapp className="me-2" />
                                Quick Support
                            </h6>
                            <small className="text-muted">Choose your query type</small>
                        </div>
                        
                        {supportOptions.map((option, index) => (
                            <Dropdown.Item
                                key={index}
                                className="p-3 border-0"
                                onClick={() => handleWhatsAppClick(option.message)}
                            >
                                <div className="d-flex align-items-center">
                                    <option.icon className="text-success me-3" size={18} />
                                    <div>
                                        <div className="fw-semibold small">{option.title}</div>
                                    </div>
                                </div>
                            </Dropdown.Item>
                        ))}
                        
                        <div className="p-2 border-top text-center">
                            <small className="text-muted">
                                Usually replies within minutes
                            </small>
                        </div>
                    </Dropdown.Menu>
                </Dropdown>
            </div>

            <style jsx="true">{`
                .whatsapp-btn {
                    animation: pulse 2s infinite;
                    border: none !important;
                }
                
                @keyframes pulse {
                    0% {
                        box-shadow: 0 0 0 0 rgba(37, 211, 102, 0.7);
                    }
                    70% {
                        box-shadow: 0 0 0 10px rgba(37, 211, 102, 0);
                    }
                    100% {
                        box-shadow: 0 0 0 0 rgba(37, 211, 102, 0);
                    }
                }
                
                .dropdown-item:hover {
                    background-color: rgba(40, 167, 69, 0.1);
                }
            `}</style>
        </div>
    );
};

export default WhatsAppWidget;