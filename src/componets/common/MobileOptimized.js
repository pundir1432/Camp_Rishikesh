import React, { useState, useEffect } from 'react';
import { Button, Offcanvas, Nav } from 'react-bootstrap';
import { FaBars, FaHome, FaCampground, FaCalendarAlt, FaUser, FaQuestionCircle } from 'react-icons/fa';

const MobileOptimized = () => {
    const [isMobile, setIsMobile] = useState(false);
    const [showMenu, setShowMenu] = useState(false);

    useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.innerWidth <= 768);
        };
        
        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    const menuItems = [
        { icon: FaHome, label: 'Home', path: '/camp/home' },
        { icon: FaCampground, label: 'Campground', path: '/camp/campground' },
        { icon: FaCalendarAlt, label: 'Events', path: '/camp/events' },
        { icon: FaUser, label: 'Dashboard', path: '/camp/user-dashboard' },
        { icon: FaQuestionCircle, label: 'FAQ', path: '/camp/faq' }
    ];

    if (!isMobile) return null;

    return (
        <>
            {/* Mobile Menu Button */}
            <Button
                variant="success"
                className="position-fixed top-0 start-0 m-3 d-md-none"
                style={{ zIndex: 1040 }}
                onClick={() => setShowMenu(true)}
            >
                <FaBars />
            </Button>

            {/* Mobile Menu */}
            <Offcanvas show={showMenu} onHide={() => setShowMenu(false)} placement="start">
                <Offcanvas.Header closeButton className="bg-success text-white">
                    <Offcanvas.Title>Camp Rishikesh</Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body className="p-0">
                    <Nav className="flex-column">
                        {menuItems.map((item, index) => (
                            <Nav.Link
                                key={index}
                                href={item.path}
                                className="d-flex align-items-center p-3 border-bottom"
                                onClick={() => setShowMenu(false)}
                            >
                                <item.icon className="me-3" />
                                {item.label}
                            </Nav.Link>
                        ))}
                    </Nav>
                </Offcanvas.Body>
            </Offcanvas>

            {/* Mobile Bottom Navigation */}
            <div className="mobile-bottom-nav d-md-none">
                <div className="position-fixed bottom-0 start-0 w-100 bg-white border-top" style={{ zIndex: 1030 }}>
                    <div className="d-flex justify-content-around py-2">
                        {menuItems.slice(0, 4).map((item, index) => (
                            <a
                                key={index}
                                href={item.path}
                                className="text-decoration-none text-center p-2 flex-fill"
                                style={{ color: '#6c757d' }}
                            >
                                <item.icon size={20} className="d-block mb-1" />
                                <small>{item.label}</small>
                            </a>
                        ))}
                    </div>
                </div>
            </div>

            <style jsx>{`
                .mobile-bottom-nav a:hover {
                    color: #28a745 !important;
                }
                .mobile-bottom-nav a.active {
                    color: #28a745 !important;
                }
            `}</style>
        </>
    );
};

export default MobileOptimized;