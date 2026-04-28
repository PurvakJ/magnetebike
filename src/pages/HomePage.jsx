import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getProducts, getReviews, bookAppointment, addReview } from '../services/api';
import './Home.css';

const HomePage = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [appointmentData, setAppointmentData] = useState({ name: '', phone: '', message: '' });
  const [reviewData, setReviewData] = useState({ name: '', rating: 5, comment: '' });
  const [currentSlide, setCurrentSlide] = useState(0);
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [hoveredRating, setHoveredRating] = useState(0); // For star hover effect
  // Add these new state variables inside your HomePage component
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [showProductModal, setShowProductModal] = useState(false);

  // Add this function to open product modal
  const openProductModal = (product) => {
    setSelectedProduct(product);
    setShowProductModal(true);
    document.body.style.overflow = 'hidden';
  };

  // Add this function to close product modal
  const closeProductModal = () => {
    setShowProductModal(false);
    setSelectedProduct(null);
    document.body.style.overflow = 'auto';
  };

  // Add keyboard event listener for modal
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && showProductModal) {
        closeProductModal();
      }
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'auto';
    };
  }, [showProductModal]);

  // Updated Carousel images with new URLs
  const carouselImages = [
    {
      url: 'https://i.postimg.cc/mkxZDBxB/Whats-App-Image-2026-04-05-at-19-51-20-2.jpg',
      title: 'Urban Ride Style',
      subtitle: 'Enjoy the freedom of city rides',
      ctaText: 'Explore Urban Series',
      ctaLink: '/products?category=urban'
    },
    {
      url: 'https://i.postimg.cc/RhrCF4rv/Whats-App-Image-2026-04-05-at-19-51-21-2.jpg',
      title: 'Retro Scooter Vibes',
      subtitle: 'Classic style meets modern confidence',
      ctaText: 'Discover Retro Collection',
      ctaLink: '/products?category=retro'
    },
    {
      url: 'https://i.postimg.cc/05JbqHgk/Gemini-Generated-Image-ggbgn3ggbgn3ggbg.jpg',
      title: 'Street Fashion Ride',
      subtitle: 'Ride bold with attitude and style',
      ctaText: 'Shop Street Edition',
      ctaLink: '/products?category=street'
    },
    {
      url: 'https://i.postimg.cc/MZjv8rkz/Gemini-Generated-Image-9t9syv9t9syv9t9s.jpg',
      title: 'Retro City Cruise',
      subtitle: 'Timeless scooter design for urban life',
      ctaText: 'View Retro Models',
      ctaLink: '/products?category=retro'
    },
    {
      url: 'https://i.postimg.cc/C5D1HdCQ/Gemini-Generated-Image-gpq26igpq26igpq2.jpg',
      title: 'Summer Ride Moments',
      subtitle: 'Feel the breeze and enjoy the journey',
      ctaText: 'Summer Collection',
      ctaLink: '/products?category=summer'
    },
    {
      url: 'https://i.postimg.cc/qqnRXgcb/Gemini-Generated-Image-hyfcx1hyfcx1hyfc.jpg',
      title: 'Electric Freedom',
      subtitle: 'Eco-friendly commuting made stylish',
      ctaText: 'Go Electric',
      ctaLink: '/products'
    },
    {
      url: 'https://i.postimg.cc/JhnzYpcs/Gemini-Generated-Image-ievzitievzitievz.jpg',
      title: 'Modern Commuter',
      subtitle: 'Designed for the daily journey',
      ctaText: 'Commuter Series',
      ctaLink: '/products?category=commuter'
    },
    {
      url: 'https://i.postimg.cc/QMtdYfkW/Gemini-Generated-Image-lwji9rlwji9rlwji.jpg',
      title: 'Night Rider',
      subtitle: 'Illuminate the streets with style',
      ctaText: 'Night Edition',
      ctaLink: '/products?category=night'
    },
    {
      url: 'https://i.postimg.cc/zBHX83c2/Gemini-Generated-Image-miny62miny62miny.jpg',
      title: 'Adventure Awaits',
      subtitle: 'Take the scenic route',
      ctaText: 'Adventure Series',
      ctaLink: '/products'
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
      setProducts(productsRes.data); // Remove .slice(0, 3) to get all products
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

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % carouselImages.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + carouselImages.length) % carouselImages.length);
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
                      {/* See Product Button on Carousel */}
                      <button 
                        className="btn btn-carousel"
                        onClick={() => navigate(image.ctaLink)}
                      >
                        {image.ctaText || 'See Product'} →
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          {/* Navigation Arrows */}
          <button className="carousel-arrow prev" onClick={prevSlide} aria-label="Previous slide">
            ‹
          </button>
          <button className="carousel-arrow next" onClick={nextSlide} aria-label="Next slide">
            ›
          </button>
          
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
{/* Featured Products Section - All Products */}
<section className="featured-products">
  <div className="products-fullwidth">
    <h2 className="section-title">Featured Products</h2>
    <div className="products-flex-row">
      {products.map((product) => (
        <div 
          key={product.id} 
          className="product-card"
          onClick={() => openProductModal(product)}
        >
          <div className="product-image-wrapper">
            <img src={product.image || 'https://via.placeholder.com/300'} alt={product.name} />
            <div className="product-overlay">
              <span className="view-icon">👁️</span>
              <span>Click to view details</span>
            </div>
          </div>
          <h3>{product.name}</h3>
          <p>{product.description}</p>
          <div className="price">₹{product.price}</div>
          <button className="btn-see-product">View Product →</button>
        </div>
      ))}
    </div>
  </div>
</section>

{/* Product Modal - Full Screen Preview */}
{showProductModal && selectedProduct && (
  <div className="product-modal-overlay" onClick={closeProductModal}>
    <div className="product-modal-container">
      <button className="modal-close-btn" onClick={closeProductModal}>✕</button>
      
      <div className="product-modal-content">
        <div className="product-modal-image">
          <img src={selectedProduct.image || 'https://via.placeholder.com/500'} alt={selectedProduct.name} />
        </div>
        
        <div className="product-modal-details">
          <h2>{selectedProduct.name}</h2>
          <div className="product-modal-price">₹{selectedProduct.price}</div>
          
          <div className="product-modal-description">
            <h3>Product Details</h3>
            <p>{selectedProduct.description}</p>
          </div>
          
          <div className="product-modal-specs">
            <h3>Specifications</h3>
            <ul>
              <li><strong>Battery:</strong> 48V 20Ah Lithium-ion</li>
              <li><strong>Range:</strong> Up to 60 miles</li>
              <li><strong>Motor:</strong> 750W Brushless</li>
              <li><strong>Max Speed:</strong> 28 mph</li>
              <li><strong>Charging Time:</strong> 4-6 hours</li>
            </ul>
          </div>
          
        </div>
      </div>
    </div>
  </div>
)}

      {/* Features Section */}
      <section className="features">
        <div className="container">
          <h2 className="section-title">Why Choose Magnet eBike?</h2>
          <div className="features-grid">
            <div className="feature">
              <div className="feature-icon">⚡</div>
              <h3>Powerful Motor</h3>
              <p>250W brushless motor for smooth acceleration</p>
            </div>
            <div className="feature">
              <div className="feature-icon">🔋</div>
              <h3>Long Range Battery</h3>
              <p>50 to 120 miles on a single charge</p>
            </div>
            <div className="feature">
              <div className="feature-icon">🛡️</div>
              <h3>Durable Frame</h3>
              <p>Iron frame for strength and durablity</p>
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