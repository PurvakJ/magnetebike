import React, { useState, useEffect } from 'react';
import { getReviews, addReview } from '../services/api';
import { FaStar, FaRegStar, FaUser, FaCalendarAlt } from 'react-icons/fa';
import './Client.css';

const ClientPage = () => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [hoverRating, setHoverRating] = useState(0);
  const [formData, setFormData] = useState({
    name: '',
    rating: 5,
    comment: ''
  });
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    fetchReviews();
  }, []);

  const fetchReviews = async () => {
    try {
      const response = await getReviews();
      setReviews(response.data);
    } catch (error) {
      console.error('Error fetching reviews:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setErrorMessage('');
    
    try {
      await addReview(formData);
      setSuccessMessage('Thank you for your review! It has been submitted.');
      setFormData({ name: '', rating: 5, comment: '' });
      setHoverRating(0);
      fetchReviews(); // Refresh reviews
      
      setTimeout(() => setSuccessMessage(''), 3000);
    } catch (error) {
      setErrorMessage('Error submitting review. Please try again.');
      setTimeout(() => setErrorMessage(''), 3000);
    } finally {
      setSubmitting(false);
    }
  };

  const handleRatingClick = (rating) => {
    setFormData({ ...formData, rating });
  };

  const renderStars = (rating, interactive = false, size = "normal") => {
    const starSize = size === "large" ? "1.5rem" : "1rem";
    const starClass = interactive ? "star interactive" : "star";
    
    return [...Array(5)].map((_, i) => {
      const starValue = i + 1;
      const isFilled = interactive 
        ? (hoverRating >= starValue || formData.rating >= starValue)
        : rating >= starValue;
      
      return interactive ? (
        <FaStar
          key={i}
          className={`${starClass} ${isFilled ? 'filled' : ''}`}
          style={{ fontSize: starSize, cursor: 'pointer' }}
          onClick={() => handleRatingClick(starValue)}
          onMouseEnter={() => setHoverRating(starValue)}
          onMouseLeave={() => setHoverRating(0)}
        />
      ) : (
        isFilled ? 
          <FaStar key={i} className="star filled" style={{ fontSize: starSize }} /> : 
          <FaRegStar key={i} className="star" style={{ fontSize: starSize }} />
      );
    });
  };

  const averageRating = reviews.length > 0 
    ? (reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length).toFixed(1)
    : 0;

  // Calculate rating distribution for future use (e.g., adding a rating breakdown chart)
  // This can be uncommented and used later if you want to display a rating distribution bar chart
  /*
  const ratingDistribution = [5, 4, 3, 2, 1].map(rating => ({
    stars: rating,
    count: reviews.filter(r => Math.floor(r.rating) === rating).length,
    percentage: reviews.length > 0 ? (reviews.filter(r => Math.floor(r.rating) === rating).length / reviews.length) * 100 : 0
  }));
  */

  // Alternative: If you want to display the rating distribution, uncomment the above and add this JSX:
  // <div className="rating-distribution">
  //   {ratingDistribution.map((item) => (
  //     <div key={item.stars} className="rating-bar">
  //       <span className="rating-stars">{item.stars} ★</span>
  //       <div className="bar-container">
  //         <div className="bar" style={{ width: `${item.percentage}%` }}></div>
  //       </div>
  //       <span className="rating-count">{item.count}</span>
  //     </div>
  //   ))}
  // </div>

  return (
    <div className="client-page">
      <div className="client-hero">
        <div className="container">
          <h1>Customer Reviews</h1>
          <p>See what our customers are saying about Magnet eBike</p>
        </div>
      </div>

      <div className="container">
        {/* Stats Section */}
        <div className="reviews-stats">
          <div className="stat-card">
            <div className="stat-number">{reviews.length}</div>
            <div className="stat-label">Total Reviews</div>
          </div>
          <div className="stat-card">
            <div className="stat-number">{averageRating}</div>
            <div className="stat-label">Average Rating</div>
            <div className="stars-display">{renderStars(Math.round(averageRating))}</div>
          </div>
          <div className="stat-card">
            <div className="stat-number">98%</div>
            <div className="stat-label">Would Recommend</div>
          </div>
        </div>

        {/* Review Form */}
        <div className="review-form-container">
          <h2>Share Your Experience</h2>
          <p>Your feedback helps us improve and helps other customers make informed decisions.</p>
          
          {successMessage && <div className="success-message">{successMessage}</div>}
          {errorMessage && <div className="error-message">{errorMessage}</div>}
          
          <form onSubmit={handleSubmit} className="client-review-form">
            <div className="form-group">
              <label>Your Name *</label>
              <input
                type="text"
                placeholder="Enter your name"
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                required
              />
            </div>

            <div className="form-group">
              <label>Rating *</label>
              <div className="star-rating-selector">
                <div className="stars-container">
                  {renderStars(formData.rating, true, "large")}
                </div>
                <div className="rating-text">
                  {formData.rating === 5 && "Excellent! I love it!"}
                  {formData.rating === 4 && "Very Good! I like it"}
                  {formData.rating === 3 && "Good - It's okay"}
                  {formData.rating === 2 && "Fair - Needs improvement"}
                  {formData.rating === 1 && "Poor - Not satisfied"}
                </div>
              </div>
            </div>

            <div className="form-group">
              <label>Your Review *</label>
              <textarea
                placeholder="Tell us about your experience with Magnet eBike..."
                rows="5"
                value={formData.comment}
                onChange={(e) => setFormData({...formData, comment: e.target.value})}
                required
              />
            </div>

            <button type="submit" className="btn btn-primary" disabled={submitting}>
              {submitting ? 'Submitting...' : 'Submit Review'}
            </button>
          </form>
        </div>

        {/* All Reviews Section */}
        <div className="all-reviews">
          <h2>Customer Testimonials</h2>
          
          {loading ? (
            <div className="loading-container">
              <div className="spinner"></div>
            </div>
          ) : reviews.length === 0 ? (
            <div className="no-reviews">
              <p>No reviews yet. Be the first to share your experience!</p>
            </div>
          ) : (
            <div className="reviews-list">
              {reviews.map((review, index) => (
                <div key={index} className="review-item">
                  <div className="review-header">
                    <div className="reviewer-info">
                      <FaUser className="reviewer-icon" />
                      <div>
                        <h3>{review.name}</h3>
                        <div className="review-rating">
                          {renderStars(review.rating)}
                        </div>
                      </div>
                    </div>
                    <div className="review-date">
                      <FaCalendarAlt />
                      <span>Verified Customer</span>
                    </div>
                  </div>
                  <p className="review-comment">{review.comment}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ClientPage;