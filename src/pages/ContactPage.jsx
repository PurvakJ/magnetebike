import React, { useState } from 'react';
import { bookAppointment } from '../services/api';
import { FaMapMarkerAlt, FaPhone, FaClock } from 'react-icons/fa';
import './Contact.css';

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await bookAppointment(formData);
      setSubmitted(true);
      setFormData({ name: '', email: '', phone: '', message: '' });
      setTimeout(() => setSubmitted(false), 5000);
    } catch (error) {
      alert('Error sending message. Please try again.');
    }
  };

  return (
    <div className="contact-page">
      <div className="container">
        <h1 className="page-title">Contact Us</h1>
        
        <div className="contact-grid">
          <div className="contact-info">
            <h2>Get in Touch</h2>
            <p>Have questions? We'd love to hear from you. Send us a message and we'll respond as soon as possible.</p>
            
            <div className="info-item">
              <FaMapMarkerAlt className="info-icon" />
              <div>
                <h3>Visit Us</h3>
                <p>Near PNB Bank Opposite Goyal Furniture House Goniana Mandi, Bathinda, India 151201</p>
              </div>
            </div>

            <div className="info-item">
              <FaPhone className="info-icon" />
              <div>
                <h3>Call Us</h3>
                <p>+91 99148-39612<br />Mon-Sun 9am-6pm</p>
              </div>
            </div>


            <div className="info-item">
              <FaClock className="info-icon" />
              <div>
                <h3>Business Hours</h3>
                <p>Monday - Friday: 9am - 6pm<br />Saturday-Sunday: 10am - 4pm</p>
              </div>
            </div>
          </div>

          <div className="contact-form-container">
            <form onSubmit={handleSubmit} className="contact-form">
              {submitted && (
                <div className="success-message">
                  Message sent successfully! We'll get back to you soon.
                </div>
              )}
              
              <div className="form-group">
                <label htmlFor="name">Name *</label>
                <input
                  type="text"
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="email">Email *</label>
                <input
                  type="email"
                  id="email"
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="phone">Phone *</label>
                <input
                  type="tel"
                  id="phone"
                  value={formData.phone}
                  onChange={(e) => setFormData({...formData, phone: e.target.value})}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="message">Message *</label>
                <textarea
                  id="message"
                  rows="5"
                  value={formData.message}
                  onChange={(e) => setFormData({...formData, message: e.target.value})}
                  required
                />
              </div>

              <button type="submit" className="btn btn-primary btn-large">
                Send Message
              </button>
            </form>
          </div>
        </div>

        {/* Map Section */}
        <div className="map-section">
  <h2>Find Us</h2>
  <div className="map-container">
    <iframe
      title="Multibrand E Bikes Location"
      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3444.189530424846!2d74.91484687657046!3d30.317126374787435!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3917354941543225%3A0x1b347be890e502ee!2sMultibrand%20E%20Bikes!5e0!3m2!1sen!2sin!4v1775468568678!5m2!1sen!2sin"
      width="100%"
      height="400"
      style={{ border: 0 }}
      allowFullScreen
      loading="lazy"
      referrerPolicy="no-referrer-when-downgrade"
    ></iframe>
  </div>
</div>
      </div>
    </div>
  );
};

export default ContactPage;