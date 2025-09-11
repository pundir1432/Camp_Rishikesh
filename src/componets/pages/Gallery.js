import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Modal } from 'react-bootstrap';
import { FaExpand, FaTimes } from 'react-icons/fa';
import { banner_img, tent_img, van_img, cabin_img, vaction1_img, vaction2_img, vaction3_img, vaction4_img, bitmap1_img, bitmap2_img, bitmap3_img } from '../assets/images';

const Gallery = () => {
  const [showModal, setShowModal] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [activeCategory, setActiveCategory] = useState('all');

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const galleryImages = [
    { id: 1, src: banner_img, category: 'landscape', title: 'Mountain View', description: 'Beautiful mountain landscape at sunrise' },
    { id: 2, src: tent_img, category: 'accommodation', title: 'Luxury Tent', description: 'Comfortable tent accommodation' },
    { id: 3, src: van_img, category: 'accommodation', title: 'RV Site', description: 'Spacious RV camping site' },
    { id: 4, src: cabin_img, category: 'accommodation', title: 'Cozy Cabin', description: 'Rustic cabin in the woods' },
    { id: 5, src: vaction1_img, category: 'accommodation', title: 'Bell Tent', description: 'Glamping bell tent experience' },
    { id: 6, src: vaction2_img, category: 'accommodation', title: 'Safari Tent', description: 'Luxury safari-style tent' },
    { id: 7, src: vaction3_img, category: 'accommodation', title: 'Family Tent', description: 'Perfect for family camping' },
    { id: 8, src: vaction4_img, category: 'accommodation', title: 'Wooden Cabin', description: 'Traditional wooden cabin' },
    { id: 9, src: bitmap1_img, category: 'activities', title: 'Hiking Trail', description: 'Scenic hiking trails' },
    { id: 10, src: bitmap2_img, category: 'activities', title: 'Campfire', description: 'Evening campfire gathering' },
    { id: 11, src: bitmap3_img, category: 'landscape', title: 'Forest View', description: 'Dense forest surroundings' }
  ];

  const categories = [
    { key: 'all', label: 'All Photos' },
    { key: 'accommodation', label: 'Accommodations' },
    { key: 'landscape', label: 'Landscapes' },
    { key: 'activities', label: 'Activities' }
  ];

  const filteredImages = activeCategory === 'all' 
    ? galleryImages 
    : galleryImages.filter(img => img.category === activeCategory);

  const handleImageClick = (image) => {
    setSelectedImage(image);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedImage(null);
  };

  return (
    <div className="pt-5 mt-4">
      {/* Hero Section */}
      <section className="py-5" style={{ background: 'linear-gradient(135deg, #345E40 0%, #4a7c59 100%)' }}>
        <Container>
          <Row className="text-center text-white">
            <Col>
              <h1 className="display-4 fw-bold mb-3">Photo Gallery</h1>
              <p className="lead">Discover the beauty of our campground through these stunning images</p>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Filter Tabs */}
      <section className="py-4" style={{ backgroundColor: '#f8f9fa' }}>
        <Container>
          <Row>
            <Col>
              <div className="d-flex flex-wrap justify-content-center gap-2">
                {categories.map((category) => (
                  <button
                    key={category.key}
                    className={`btn ${activeCategory === category.key ? 'btn-success' : 'btn-outline-secondary'} rounded-pill btn-sm`}
                    onClick={() => setActiveCategory(category.key)}
                    style={{fontSize: '12px', padding: '6px 12px'}}
                  >
                    {category.label}
                  </button>
                ))}
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Gallery Grid */}
      <section className="py-5">
        <Container>
          <Row className="g-3">
            {filteredImages.map((image, index) => (
              <Col xs={6} sm={4} md={4} lg={3} key={image.id}>
                <div 
                  className="gallery-item position-relative overflow-hidden rounded shadow-sm"
                  style={{ 
                    height: window.innerWidth < 576 ? '150px' : '250px', 
                    cursor: 'pointer',
                    transition: 'transform 0.3s ease'
                  }}
                  onClick={() => handleImageClick(image)}
                >
                  <img
                    src={image.src}
                    alt={image.title}
                    className="w-100 h-100"
                    style={{ objectFit: 'cover' }}
                  />
                  <div 
                    className="gallery-overlay position-absolute top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center"
                    style={{
                      background: 'rgba(0,0,0,0.5)',
                      opacity: 0,
                      transition: 'opacity 0.3s ease'
                    }}
                  >
                    <FaExpand className="text-white" size={window.innerWidth < 576 ? 16 : 24} />
                  </div>
                </div>
              </Col>
            ))}
          </Row>
        </Container>
      </section>

      {/* Image Modal */}
      <Modal show={showModal} onHide={handleCloseModal} size="lg" centered>
        <Modal.Header className="border-0 pb-0">
          <button
            type="button"
            className="btn-close"
            onClick={handleCloseModal}
            aria-label="Close"
          ></button>
        </Modal.Header>
        <Modal.Body className="p-0">
          {selectedImage && (
            <div>
              <img
                src={selectedImage.src}
                alt={selectedImage.title}
                className="w-100"
                style={{ maxHeight: '70vh', objectFit: 'contain' }}
              />
              <div className="p-4">
                <h4 className="fw-bold">{selectedImage.title}</h4>
                <p className="text-muted">{selectedImage.description}</p>
              </div>
            </div>
          )}
        </Modal.Body>
      </Modal>

      {/* CTA Section */}
      <section className="py-5" style={{ backgroundColor: '#f8f9fa' }}>
        <Container>
          <Row>
            <Col lg={8} className="mx-auto text-center">
              <h2 className="fw-bold mb-3">Ready to Create Your Own Memories?</h2>
              <p className="text-muted mb-4">
                Book your stay today and experience the beauty of nature firsthand.
              </p>
              <button className="btn btn-success btn-lg rounded-pill px-4">
                Book Your Stay
              </button>
            </Col>
          </Row>
        </Container>
      </section>

      <style jsx>{`
        .gallery-item:hover .gallery-overlay {
          opacity: 1 !important;
        }
      `}</style>
    </div>
  );
};

export default Gallery;