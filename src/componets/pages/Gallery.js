import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Modal } from 'react-bootstrap';
import { FaExpand, FaTimes } from 'react-icons/fa';
import { banner_img, tent_img, van_img, cabin_img, vaction1_img, vaction2_img, vaction3_img, vaction4_img, bitmap1_img, bitmap2_img, bitmap3_img } from '../assets/images';
import { useDispatch, useSelector } from 'react-redux';
import { getGallary } from '../redux/gallary/thunk';
import { DataLoading } from '../helper/loading/Loaders';

const Gallery = () => {
  const [showModal, setShowModal] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [activeCategory, setActiveCategory] = useState('all');
  console.log({activeCategory});
  const dispatch = useDispatch();
  const { gallary, loading } = useSelector(state => state.gallary || {});
  useEffect(() => {
    window.scrollTo(0, 0);
    if (activeCategory && activeCategory !== 'all') {
      dispatch(getGallary(activeCategory));
    } else {
      dispatch(getGallary('all'));
    }
  }, [dispatch, activeCategory]);


  const categories = [
    { key: 'all', label: 'All Photos' },
    { key: 'Accommodations', label: 'Accommodations' },
    { key: 'Landscape', label: 'Landscapes' },
    { key: 'Activities', label: 'Activities' }
  ];


  const handleImageClick = (image) => {
    setSelectedImage(image);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedImage(null);
  };

  return (
    <div className="">
      {/* Hero Section */}
      <section className="py-5" style={{ background: 'linear-gradient(135deg, #345E40 0%, #4a7c59 100%)' }}>
        <Container>
          <Row className="text-center mt-4 text-white">
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
                    style={{ fontSize: '12px', padding: '6px 12px' }}
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
            {loading ? (
              <div className="text-center w-100"><DataLoading/></div>
            ) : gallary?.data?.length > 0 ? (
              gallary?.data?.map((image, index) => (
                <Col xs={6} sm={4} md={4} lg={3} key={image._id}>
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
                      src={image?.imageUrl}
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
              ))
            ) : (
              <div className="text-center w-100">
                <h4 className="text-muted">No images available</h4>
                <p className="text-muted">Check back later for gallery updates</p>
              </div>
            )}
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
            <div className='d-flex justify-content-center flex-column  align-items-center'>
              <img
                src={selectedImage?.imageUrl}
                alt={selectedImage.title}
                className="w-75 "
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