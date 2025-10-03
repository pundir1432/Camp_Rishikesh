import React, { useState } from 'react';
import { Card, Button, Form, Row, Col, Badge, Modal } from 'react-bootstrap';
import { FaStar, FaUser, FaCalendarAlt } from 'react-icons/fa';

const ReviewSystem = ({ groundId, reviews = [] }) => {
    const [showReviewModal, setShowReviewModal] = useState(false);
    const [rating, setRating] = useState(0);
    const [reviewText, setReviewText] = useState('');
    const [hoveredStar, setHoveredStar] = useState(0);

    const handleStarClick = (starValue) => {
        setRating(starValue);
    };

    const handleSubmitReview = () => {
        const newReview = {
            rating,
            text: reviewText,
            groundId,
            date: new Date().toISOString(),
            userName: 'Current User'
        };
        console.log('New Review:', newReview);
        setShowReviewModal(false);
        setRating(0);
        setReviewText('');
    };

    const renderStars = (rating, interactive = false) => {
        return [...Array(5)].map((_, index) => {
            const starValue = index + 1;
            return (
                <FaStar
                    key={index}
                    className={`${starValue <= (interactive ? (hoveredStar || rating) : rating) 
                        ? 'text-warning' : 'text-muted'} ${interactive ? 'star-interactive' : ''}`}
                    style={{ cursor: interactive ? 'pointer' : 'default' }}
                    onClick={interactive ? () => handleStarClick(starValue) : undefined}
                    onMouseEnter={interactive ? () => setHoveredStar(starValue) : undefined}
                    onMouseLeave={interactive ? () => setHoveredStar(0) : undefined}
                />
            );
        });
    };

    const averageRating = reviews.length > 0 
        ? (reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length).toFixed(1)
        : 0;

    return (
        <div className="review-system">
            <Card className="mb-4">
                <Card.Header className="d-flex justify-content-between align-items-center">
                    <div>
                        <h5 className="mb-0">Reviews & Ratings</h5>
                        {reviews.length > 0 && (
                            <div className="d-flex align-items-center mt-2">
                                {renderStars(Math.round(averageRating))}
                                <span className="ms-2 fw-bold">{averageRating}</span>
                                <span className="ms-1 text-muted">({reviews.length} reviews)</span>
                            </div>
                        )}
                    </div>
                    <Button 
                        variant="success" 
                        size="sm"
                        onClick={() => setShowReviewModal(true)}
                    >
                        Write Review
                    </Button>
                </Card.Header>
                <Card.Body>
                    {reviews.length > 0 ? (
                        <Row className="g-3">
                            {reviews.map((review, index) => (
                                <Col md={6} key={index}>
                                    <Card className="h-100 border-0 bg-light">
                                        <Card.Body className="p-3">
                                            <div className="d-flex justify-content-between align-items-start mb-2">
                                                <div className="d-flex align-items-center">
                                                    <FaUser className="text-muted me-2" />
                                                    <small className="fw-semibold">{review.userName}</small>
                                                </div>
                                                <div className="d-flex align-items-center">
                                                    {renderStars(review.rating)}
                                                </div>
                                            </div>
                                            <p className="small mb-2">{review.text}</p>
                                            <div className="d-flex align-items-center text-muted">
                                                <FaCalendarAlt className="me-1" size={12} />
                                                <small>{new Date(review.date).toLocaleDateString()}</small>
                                            </div>
                                        </Card.Body>
                                    </Card>
                                </Col>
                            ))}
                        </Row>
                    ) : (
                        <div className="text-center py-4">
                            <p className="text-muted">No reviews yet. Be the first to review!</p>
                        </div>
                    )}
                </Card.Body>
            </Card>

            {/* Review Modal */}
            <Modal show={showReviewModal} onHide={() => setShowReviewModal(false)} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Write a Review</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group className="mb-3">
                            <Form.Label>Rating *</Form.Label>
                            <div className="d-flex align-items-center">
                                {renderStars(rating, true)}
                                <span className="ms-2 text-muted">
                                    {rating > 0 ? `${rating} star${rating > 1 ? 's' : ''}` : 'Select rating'}
                                </span>
                            </div>
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Your Review *</Form.Label>
                            <Form.Control
                                as="textarea"
                                rows={4}
                                value={reviewText}
                                onChange={(e) => setReviewText(e.target.value)}
                                placeholder="Share your experience..."
                                maxLength={500}
                            />
                            <div className="text-end text-muted small mt-1">
                                {reviewText.length}/500 characters
                            </div>
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowReviewModal(false)}>
                        Cancel
                    </Button>
                    <Button 
                        variant="success" 
                        onClick={handleSubmitReview}
                        disabled={!rating || !reviewText.trim()}
                    >
                        Submit Review
                    </Button>
                </Modal.Footer>
            </Modal>

            <style jsx>{`
                .star-interactive:hover {
                    transform: scale(1.1);
                    transition: transform 0.2s;
                }
            `}</style>
        </div>
    );
};

export default ReviewSystem;