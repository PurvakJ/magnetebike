import React, { useState, useEffect } from 'react';
import { getProducts, getReviews, bookAppointment, addReview } from '../services/api';
import './Home.css';

const HomePage = () => {
  const [products, setProducts] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [appointmentData, setAppointmentData] = useState({ name: '', phone: '', message: '' });
  const [reviewData, setReviewData] = useState({ name: '', rating: 5, comment: '' });
  const [currentSlide, setCurrentSlide] = useState(0);
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [hoveredRating, setHoveredRating] = useState(0); // For star hover effect

  // Carousel images
  const carouselImages = [
    {
      url: 'https://i.postimg.cc/RZXH0sMd/attractive-woman-riding-motorbike-street-summer-vacation-style-traveling-smiling-happy-having-fun-st.jpg',
      title: 'Urban Ride Style',
      subtitle: 'Enjoy the freedom of city rides'
    },
    {
      url: 'https://i.postimg.cc/jd6fpqm9/beautiful-woman-with-long-brown-hair-dressed-trendy-clothes-posing-with-white-retro-italian-scooter.jpg',
      title: 'Retro Scooter Vibes',
      subtitle: 'Classic style meets modern confidence'
    },
    {
      url: 'https://i.postimg.cc/8Pdv2k9B/girl-sunglasses-wearing-leather-jacket-ripped-jeans-sitting-black-classic-scooter-old-narrow-street.jpg',
      title: 'Street Fashion Ride',
      subtitle: 'Ride bold with attitude and style'
    },
    {
      url: 'https://i.postimg.cc/1XX9JBxy/retro-moto-scooter-street-urban-style-(1).jpg',
      title: 'Retro City Cruise',
      subtitle: 'Timeless scooter design for urban life'
    },
    {
      url: 'https://i.postimg.cc/VkDCNGY6/scooter_parked_urban_street_sustainable_transport_eco_mobility.jpg',
      title: 'Summer Ride Moments',
      subtitle: 'Feel the breeze and enjoy the journey'
    }
  ];

  useEffect(() => {
    fetchData();
    const timer = setInterval(() => {
      setCurrentSlide((prevSlide) => (prevSlide + 1) % carouselImages.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [carouselImages.length]);

  const fetchData = async () => {
    try {
      const [productsRes, reviewsRes] = await Promise.all([
        getProducts(),
        getReviews()
      ]);
      setProducts(productsRes.data.slice(0, 3));
      setReviews(reviewsRes.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handleAppointmentSubmit = async (e) => {
    e.preventDefault();
    try {
      await bookAppointment(appointmentData);
      alert('Appointment booked successfully!');
      setAppointmentData({ name: '', phone: '', message: '' });
    } catch (error) {
      alert('Error booking appointment');
    }
  };

  const handleReviewSubmit = async (e) => {
    e.preventDefault();
    try {
      await addReview(reviewData);
      alert('Review added successfully!');
      setReviewData({ name: '', rating: 5, comment: '' });
      setShowReviewForm(false);
      fetchData(); // Refresh reviews
    } catch (error) {
      alert('Error adding review');
    }
  };

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  // Get top 3 reviews (highest rated, then newest)
  const getTopReviews = () => {
    return [...reviews]
      .sort((a, b) => {
        if (a.rating !== b.rating) {
          return b.rating - a.rating;
        }
        return (b.id || 0) - (a.id || 0);
      })
      .slice(0, 3);
  };

  // Star Rating Component
  const StarRating = ({ rating, onRatingChange, onHover, hoveredRating }) => {
    return (
      <div className="star-rating">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            type="button"
            className={`star-btn ${star <= (hoveredRating || rating) ? 'active' : ''}`}
            onClick={() => onRatingChange(star)}
            onMouseEnter={() => onHover(star)}
            onMouseLeave={() => onHover(0)}
            aria-label={`Rate ${star} stars`}
          >
            ★
          </button>
        ))}
      </div>
    );
  };

  return (
    <div className="homepage">

      {/* Image Carousel */}
      <section className="carousel-section">
        <div className="carousel-container">
          <div className="carousel-slides">
            {carouselImages.map((image, index) => (
              <div
                key={index}
                className={`carousel-slide ${index === currentSlide ? 'active' : ''}`}
                style={{ transform: `translateX(-${currentSlide * 100}%)` }}
              >
                <div className="carousel-image-wrapper">
                  <img src={image.url} alt={image.title} className="carousel-image" />
                  <div className="carousel-overlay">
                    <div className="carousel-content">
                      <h2>{image.title}</h2>
                      <p>{image.subtitle}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          {/* Dots Navigation */}
          <div className="carousel-dots">
            {carouselImages.map((_, index) => (
              <button
                key={index}
                className={`carousel-dot ${index === currentSlide ? 'active' : ''}`}
                onClick={() => goToSlide(index)}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products Section - Single row flex layout */}
      <section className="featured-products">
        <div className="container">
          <h2 className="section-title">Featured Products</h2>
          <div className="products-flex-row">
            {products.map((product) => (
              <div key={product.id} className="product-card">
                <div className="product-image-wrapper">
                  <img src={product.image || 'https://via.placeholder.com/300'} alt={product.name} />
                </div>
                <h3>{product.name}</h3>
                <p>{product.description}</p>
                <div className="price">₹{product.price}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features">
        <div className="container">
          <h2 className="section-title">Why Choose Magnet eBike?</h2>
          <div className="features-grid">
            <div className="feature">
              <div className="feature-icon">⚡</div>
              <h3>Powerful Motor</h3>
              <p>750W brushless motor for smooth acceleration</p>
            </div>
            <div className="feature">
              <div className="feature-icon">🔋</div>
              <h3>Long Range Battery</h3>
              <p>Up to 60 miles on a single charge</p>
            </div>
            <div className="feature">
              <div className="feature-icon">🛡️</div>
              <h3>Durable Frame</h3>
              <p>Aluminum alloy frame for strength and lightness</p>
            </div>
          </div>
        </div>
      </section>

      {/* Reviews Section */}
      <section className="reviews">
        <div className="container">
          <h2 className="section-title">Customer Reviews</h2>
          <div className="reviews-grid">
            {getTopReviews().map((review, index) => (
              <div key={index} className="review-card">
                <div className="rating">{'⭐'.repeat(review.rating)}</div>
                <p className="comment">"{review.comment}"</p>
                <h4>- {review.name}</h4>
              </div>
            ))}
          </div>
          <div className="review-action">
            <button 
              className="btn btn-outline"
              onClick={() => setShowReviewForm(!showReviewForm)}
            >
              {showReviewForm ? 'Cancel' : 'Write a Review'}
            </button>
          </div>
          
          {showReviewForm && (
            <form onSubmit={handleReviewSubmit} className="review-form">
              <h3>Share Your Experience</h3>
              <input
                type="text"
                placeholder="Your Name"
                value={reviewData.name}
                onChange={(e) => setReviewData({...reviewData, name: e.target.value})}
                required
              />
              
              {/* Star Rating System */}
              <div className="form-group">
                <label>Your Rating</label>
                <StarRating 
                  rating={reviewData.rating}
                  onRatingChange={(rating) => setReviewData({...reviewData, rating})}
                  onHover={setHoveredRating}
                  hoveredRating={hoveredRating}
                />
              </div>
              
              <textarea
                placeholder="Your Review"
                value={reviewData.comment}
                onChange={(e) => setReviewData({...reviewData, comment: e.target.value})}
                required
              />
              
              <div className="submit-center">
                <button type="submit" className="btn btn-primary">Submit Review</button>
              </div>
            </form>
          )}
        </div>
      </section>

      {/* Test Ride Booking Section */}
      <section className="booking">
        <div className="container">
          <h2 className="section-title">Book a Test Ride</h2>
          <div className="booking-wrapper">
            <div className="booking-info">
              <p>Experience the thrill of riding a Magnet eBike. Book your test ride today and feel the difference!</p>
              <div className="booking-highlights">
                <span>✓ Free Test Ride</span>
                <span>✓ No Obligation</span>
                <span>✓ Expert Guidance</span>
              </div>
            </div>
            <form onSubmit={handleAppointmentSubmit} className="booking-form">
              <input
                type="text"
                placeholder="Your Name"
                value={appointmentData.name}
                onChange={(e) => setAppointmentData({...appointmentData, name: e.target.value})}
                required
              />
              <input
                type="tel"
                placeholder="Phone Number"
                value={appointmentData.phone}
                onChange={(e) => setAppointmentData({...appointmentData, phone: e.target.value})}
                required
              />
              <textarea
                placeholder="Message (optional)"
                value={appointmentData.message}
                onChange={(e) => setAppointmentData({...appointmentData, message: e.target.value})}
              />
              <button type="submit" className="btn btn-primary">Book Test Ride</button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;