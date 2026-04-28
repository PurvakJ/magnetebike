import React from 'react';
import { useNavigate } from 'react-router-dom';
import './About.css';

const AboutPage = () => {
  const navigate = useNavigate();

  const handleShopNow = () => {
    navigate('/products');
  };
  

  return (
    <div className="about-page">
      <div className="about-hero">
        <div className="container">
          <h1 className="fade-in-up">About Magnet eBike</h1>
          <p className="fade-in-up delay-1">Revolutionizing the way you commute</p>
        </div>
      </div>

      <div className="container">
        <div className="about-section">
          <div className="about-content">
            <h2>Our Story</h2>
            <p>
              Founded in 2025, Magnet eBike was born from a simple idea: retail electric biking 
              accessible, exciting, and practical for everyone. We saw a gap in the market for 
              high-quality e-bikes that don't break the bank, and we set out to fill it.
            </p>
            <p>
              Today, we're proud to offer a range of electric bikes that combine cutting-edge 
              technology with sleek design. Our bikes are built to handle city streets, mountain 
              trails, and everything in between. With over 10,000 happy customers and counting, 
              we're just getting started on our journey to transform urban mobility.
            </p>
            <div className="stats-container">

              <div className="stat">
                <div className="stat-number">50+</div>
                <div className="stat-label">Cities Served</div>
              </div>
              <div className="stat">
                <div className="stat-number">4.7</div>
                <div className="stat-label">Customer Rating</div>
              </div>
            </div>
          </div>
          <div className="about-image">
            <img src="https://i.postimg.cc/L8LqxrNb/cool-motorcycle-outdoors.jpg" alt="Magnet eBike" />
          </div>
        </div>

        <div className="mission-section">
          <div className="mission-card">
            <div className="mission-icon">🎯</div>
            <h3>Our Mission</h3>
            <p>To provide sustainable, efficient, and enjoyable transportation solutions that reduce carbon footprint and enhance urban mobility.</p>
          </div>
          <div className="mission-card">
            <div className="mission-icon">👁️</div>
            <h3>Our Vision</h3>
            <p>A world where every commute is an adventure, and every ride contributes to a cleaner planet.</p>
          </div>
          <div className="mission-card">
            <div className="mission-icon">💎</div>
            <h3>Our Values</h3>
            <p>Innovation, Sustainability, Quality, and Customer Satisfaction drive everything we do.</p>
          </div>
        </div>

        <div className="journey-section">
  <h2>Our Journey</h2>
  <div className="timeline">

    <div className="timeline-item">
      <div className="timeline-year">2016</div>
      <div className="timeline-content">
        <h3>Shop Established</h3>
        <p>Our e-bike retail shop was established in 2016 with the goal of bringing eco-friendly electric mobility to customers.</p>
      </div>
    </div>

    <div className="timeline-item">
      <div className="timeline-year">2018</div>
      <div className="timeline-content">
        <h3>Expanding Product Range</h3>
        <p>We expanded our collection by offering multiple brands of electric bikes, giving customers more choices and better technology.</p>
      </div>
    </div>

    <div className="timeline-item">
      <div className="timeline-year">2021</div>
      <div className="timeline-content">
        <h3>Growing Customer Base</h3>
        <p>Our shop became a trusted destination for electric bikes, serving customers from different regions with reliable products.</p>
      </div>
    </div>

    <div className="timeline-item">
      <div className="timeline-year">2024</div>
      <div className="timeline-content">
        <h3>Serving Customers Across India</h3>
        <p>Today we proudly sell a wide range of electric bikes in retail and provide support to customers all across India.</p>
      </div>
    </div>

  </div>
</div>

<div className="team-section">
  <h2>Meet the Owner</h2>

  <div className="team-grid">
    <div className="team-member">
      <div className="member-image">
        <img 
          src="https://i.postimg.cc/HkySBkGD/cropped-circle-image.png" 
          alt="Chirag Singla - Owner"
        />

      </div>

      <h3>Chirag Singla</h3>
      <p>Owner</p>

      <div className="member-bio">
        Chirag Singla is the owner of the shop and manages all operations including sales,
        customer support, and product selection. Since 2016, he has been dedicated to
        providing high-quality electric bikes and helping customers across India adopt
        eco-friendly transportation.
      </div>
    </div>
  </div>
</div>

        <div className="values-section">
          <h2>Why Choose Magnet eBike?</h2>
          <div className="values-grid">
            <div className="value-item">
              <div className="value-icon">🔋</div>
              <h3>Long Battery Life</h3>
              <p>Up to 60 miles range on a single charge</p>
            </div>
            <div className="value-item">
              <div className="value-icon">⚡</div>
              <h3>Powerful Motor</h3>
              <p>750W motor for smooth acceleration</p>
            </div>
            <div className="value-item">
              <div className="value-icon">🛡️</div>
              <h3>2 Year Warranty</h3>
              <p>Comprehensive coverage on all components</p>
            </div>
            <div className="value-item">
              <div className="value-icon">🚚</div>
              <h3>Free Shipping</h3>
              <p>Free delivery across all major cities</p>
            </div>
          </div>
        </div>

        <div className="cta-section">
          <h2>Ready to Start Your Journey?</h2>
          <p>Join thousands of satisfied riders who have switched to Magnet eBike</p>
          <button className="cta-button" onClick={handleShopNow}>
            Shop Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;