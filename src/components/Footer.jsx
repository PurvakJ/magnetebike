// Footer.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { FaFacebook, FaWhatsapp, FaInstagram, FaUserShield, FaStar, FaTimes, FaCheckCircle, FaShieldAlt, FaTruck, FaUndoAlt, FaQuestionCircle, FaShippingFast, FaCalendarAlt, FaClipboardList } from 'react-icons/fa';
import { useAuth } from '../contexts/AuthContext';
import './Footer.css';

const Footer = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const [isMobile, setIsMobile] = useState(false);
  const [activeModal, setActiveModal] = useState(null); // 'warranty', 'faqs', 'shipping', 'returns'

  // Check if mobile view
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Close modal on ESC key
  useEffect(() => {
    const handleEsc = (event) => {
      if (event.key === 'Escape') {
        setActiveModal(null);
      }
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, []);

  // Keyboard shortcut handler (Ctrl + Shift + A)
  useEffect(() => {
    const handleKeyDown = (event) => {
      // Check for Ctrl + Shift + A
      if (event.ctrlKey && event.shiftKey && event.key === 'A') {
        event.preventDefault();
        if (isAuthenticated) {
          navigate('/admin/dashboard');
        } else {
          navigate('/admin/login');
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [navigate, isAuthenticated]);

  const handleAdminClick = () => {
    if (isAuthenticated) {
      navigate('/admin/dashboard');
    } else {
      navigate('/admin/login');
    }
  };

  const handleClientClick = () => {
    navigate('/client');
  };

  const handleSocialClick = (platform) => {
    // Add your social media URLs here
    const socialLinks = {
      facebook: 'https://www.facebook.com/people/Multi-brand-E-Bikes/100077273002057/?ref=PROFILE_EDIT_xav_ig_profile_page_web#',
      instagram: 'https://www.instagram.com/multi_brand_e_bikes/',
      whatsapp: 'https://wa.me/919914839612'
    };
    window.open(socialLinks[platform], '_blank');
  };

  // Modal handlers
  const openModal = (modalName) => {
    setActiveModal(modalName);
    document.body.style.overflow = 'hidden';
  };

  const closeModal = () => {
    setActiveModal(null);
    document.body.style.overflow = 'auto';
  };

  // FAQ Data
  const faqsData = [
    {
      question: "What is the maximum speed of Magnet eBikes?",
      answer: "Our Magnet eBikes can reach speeds up to 28 mph (45 km/h) depending on the model and local regulations. The Class 3 models offer pedal-assist up to 28 mph."
    },
    {
      question: "How long does the battery last on a single charge?",
      answer: "The battery range varies by model and riding conditions. On average, you can expect 40-60 miles (65-95 km) per full charge. Our premium models offer up to 80 miles (130 km) with extended range batteries."
    },
    {
      question: "How long does it take to fully charge the battery?",
      answer: "A full charge typically takes 4-6 hours. The battery can be charged on or off the bike, and we recommend charging it after each ride for optimal battery health."
    },
    {
      question: "Are Magnet eBikes waterproof?",
      answer: "Our eBikes are water-resistant (IP65 rating), meaning they can handle light rain and splashes. However, we don't recommend riding through deep water or heavy downpours, and the bike should be stored in a dry place."
    },
    {
      question: "Do I need a license to ride an eBike?",
      answer: "In most areas, no license is required for Class 1 and Class 2 eBikes (20 mph max). Class 3 eBikes (28 mph) may have additional requirements. Please check your local regulations."
    },
    {
      question: "What maintenance does an eBike require?",
      answer: "Regular maintenance includes keeping the battery charged, checking tire pressure, lubricating the chain, and ensuring brakes are functioning properly. We recommend a professional service every 6 months or 500 miles."
    },
    {
      question: "Can I ride the eBike without battery power?",
      answer: "Yes! Magnet eBikes function as regular bicycles when the battery is depleted or turned off. The motor doesn't create additional resistance when not in use."
    },
    {
      question: "What is the weight capacity of your eBikes?",
      answer: "Our standard models support up to 275 lbs (125 kg), while our heavy-duty models can support up to 350 lbs (159 kg). Please check individual product specifications for exact ratings."
    }
  ];

  // Warranty Data
  const warrantyData = {
    duration: "1 Year Comprehensive Warranty",
    coverage: [
      "Frame and fork defects",
      "Motor and electrical components",
      "Battery (500 charge cycles or 1 year)",
      "Controller and display unit",
      "Throttle and sensors",
      "Charger"
    ],
    exclusions: [
      "Normal wear and tear (tires, brake pads, chain, spokes)",
      "Damage from accidents, misuse, or neglect",
      "Unauthorized modifications or repairs",
      "Water damage beyond IP65 rating",
      "Cosmetic damage (scratches, paint chips)",
      "Commercial or rental use"
    ],
    process: "To file a warranty claim, contact our support team with your order number and photos/videos of the issue. We'll respond within 48 hours."
  };

  // Shipping Data
  const shippingData = {
    freeShippingThreshold: "50 km radius from our service centers",
    standardRate: "$49.99 for orders under $500",
    expressRate: "$79.99 for expedited delivery (2-3 business days)",
    deliveryTime: "5-7 business days for standard shipping",
    assembly: "Bikes come 85% pre-assembled. Final assembly (handlebars, pedals, front wheel) required.",
    restrictions: "Currently shipping within continental US only. Hawaii, Alaska, and international shipping available with additional fees."
  };

  // Returns Data
  const returnsData = {
    policy: "No Return Policy on Used Bikes",
    message: "Due to safety and hygiene regulations, we do not accept returns on eBikes that have been ridden or used.",
    exceptions: [
      "Manufacturing defects covered under warranty",
      "Damaged during shipping (must report within 48 hours)",
      "Wrong item shipped"
    ],
    inspection: "All bikes undergo thorough quality inspection before shipping. We highly recommend test riding at our showroom before purchase.",
    restockingFee: "For unopened/unused bikes, a 15% restocking fee applies for returns within 14 days of delivery."
  };

  return (
    <>
      <footer className="footer">
        <div className="footer-container">
          <div className="footer-section">
            <h3>Magnet eBike</h3>
            <p>Revolutionizing urban mobility with powerful electric bikes.</p>
            <div className="social-icons">
              <FaFacebook onClick={() => handleSocialClick('facebook')} />
              <FaInstagram onClick={() => handleSocialClick('instagram')} />
              <FaWhatsapp onClick={() => handleSocialClick('whatsapp')} />
            </div>
          </div>

          <div className="footer-section">
            <h4>Quick Links</h4>
            <ul>
              <li><Link to="/">Home</Link></li>
              <li><Link to="/products">Products</Link></li>
              <li><Link to="/client">Reviews</Link></li>
              <li><Link to="/about">About Us</Link></li>
              <li><Link to="/contact">Contact</Link></li>
            </ul>
          </div>

          <div className="footer-section">
            <h4>Support</h4>
            <ul>
              <li>
                <button 
                  className="footer-link-button"
                  onClick={() => openModal('warranty')}
                >
                  Warranty
                </button>
              </li>
              <li>
                <button 
                  className="footer-link-button"
                  onClick={() => openModal('faqs')}
                >
                  FAQs
                </button>
              </li>
              <li>
                <button 
                  className="footer-link-button"
                  onClick={() => openModal('shipping')}
                >
                  Shipping Info
                </button>
              </li>
              <li>
                <button 
                  className="footer-link-button"
                  onClick={() => openModal('returns')}
                >
                  Returns
                </button>
              </li>
            </ul>
          </div>

          <div className="footer-section">
            <h4>Contact Info</h4>
            <p>📍 Near PNB Bank Opposite Goyal Furniture House Goniana Mandi, Bathinda, India 151201</p>
            <p>📞 +91 99148-39612</p>
            
            {/* Mobile Buttons */}
            {isMobile && (
              <>
                <div className="admin-mobile-link" onClick={handleAdminClick}>
                  <FaUserShield className="mobile-icon" />
                  <span>{isAuthenticated ? 'Admin Dashboard' : 'Admin Login'}</span>
                </div>
                <div className="client-mobile-link" onClick={handleClientClick}>
                  <FaStar className="mobile-icon" />
                  <span>Write a Review</span>
                </div>
              </>
            )}
          </div>
        </div>
        <div className="footer-bottom">
          <p>&copy; 2026 Magnet eBike. All rights reserved.</p>
        </div>
      </footer>

      {/* Warranty Modal */}
      {activeModal === 'warranty' && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-container" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <div className="modal-title">
                <FaShieldAlt className="modal-icon warranty-icon" />
                <h2>Warranty Information</h2>
              </div>
              <button className="modal-close" onClick={closeModal}>
                <FaTimes />
              </button>
            </div>
            <div className="modal-body">
              <div className="warranty-badge">
                <FaCalendarAlt />
                <span>{warrantyData.duration}</span>
              </div>
              
              <div className="info-section">
                <h3><FaCheckCircle /> What's Covered</h3>
                <ul>
                  {warrantyData.coverage.map((item, index) => (
                    <li key={index}>{item}</li>
                  ))}
                </ul>
              </div>
              
              <div className="info-section excluded">
                <h3><FaTimes /> What's Not Covered</h3>
                <ul>
                  {warrantyData.exclusions.map((item, index) => (
                    <li key={index}>{item}</li>
                  ))}
                </ul>
              </div>
              
              <div className="info-section process">
                <h3><FaClipboardList /> How to Claim</h3>
                <p>{warrantyData.process}</p>
              </div>
              
              <div className="info-note">
                <p>⚠️ Warranty is non-transferable and applies only to the original purchaser. Proof of purchase required.</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* FAQs Modal */}
      {activeModal === 'faqs' && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-container modal-large" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <div className="modal-title">
                <FaQuestionCircle className="modal-icon faq-icon" />
                <h2>Frequently Asked Questions</h2>
              </div>
              <button className="modal-close" onClick={closeModal}>
                <FaTimes />
              </button>
            </div>
            <div className="modal-body faqs-body">
              {faqsData.map((faq, index) => (
                <div className="faq-item-modal" key={index}>
                  <div className="faq-question-modal">
                    <span className="faq-q-mark">Q:</span>
                    <strong>{faq.question}</strong>
                  </div>
                  <div className="faq-answer-modal">
                    <span className="faq-a-mark">A:</span>
                    <p>{faq.answer}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Shipping Info Modal */}
      {activeModal === 'shipping' && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-container" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <div className="modal-title">
                <FaShippingFast className="modal-icon shipping-icon" />
                <h2>Shipping Information</h2>
              </div>
              <button className="modal-close" onClick={closeModal}>
                <FaTimes />
              </button>
            </div>
            <div className="modal-body">
              <div className="shipping-badge free-shipping">
                <FaTruck />
                <span>Free Shipping Within {shippingData.freeShippingThreshold}</span>
              </div>
              
              <div className="info-section">
                <h3>Shipping Rates</h3>
                <ul className="shipping-rates-list">
                  <li><strong>Standard Shipping:</strong> {shippingData.standardRate}</li>
                  <li><strong>Express Shipping:</strong> {shippingData.expressRate}</li>
                  <li><strong>Free Shipping:</strong> {shippingData.freeShippingThreshold}</li>
                </ul>
              </div>
              
              <div className="info-section">
                <h3>Delivery Information</h3>
                <ul>
                  <li><strong>Delivery Time:</strong> {shippingData.deliveryTime}</li>
                  <li><strong>Assembly Required:</strong> {shippingData.assembly}</li>
                  <li><strong>Shipping Restrictions:</strong> {shippingData.restrictions}</li>
                </ul>
              </div>
              
              <div className="info-note shipping-note-modal">
                <p>📦 Customers are responsible for shipping charges unless free shipping applies. Shipping fees are non-refundable.</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Returns Modal - No Return Policy */}
      {activeModal === 'returns' && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-container" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <div className="modal-title">
                <FaUndoAlt className="modal-icon returns-icon" />
                <h2>Return Policy</h2>
              </div>
              <button className="modal-close" onClick={closeModal}>
                <FaTimes />
              </button>
            </div>
            <div className="modal-body">
              <div className="no-return-badge">
                <FaTimes />
                <span>{returnsData.policy}</span>
              </div>
              
              <div className="info-section policy-message-modal">
                <p>{returnsData.message}</p>
              </div>
              
              <div className="info-section exceptions">
                <h3>Exceptions (Limited Cases)</h3>
                <ul>
                  {returnsData.exceptions.map((item, index) => (
                    <li key={index}>{item}</li>
                  ))}
                </ul>
              </div>
              
              <div className="info-section">
                <h3>Important Notes</h3>
                <ul>
                  <li>{returnsData.inspection}</li>
                  <li><strong>Restocking Fee:</strong> {returnsData.restockingFee}</li>
                  <li>Customer pays return shipping for approved returns</li>
                  <li>Original packaging must be intact for unopened returns</li>
                </ul>
              </div>
              
              <div className="info-note return-note">
                <p>⚠️ We strongly recommend test riding at our showroom before purchase to ensure the bike meets your expectations.</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Footer;