import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import ProductsPage from './pages/ProductsPage';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';
import ClientPage from './pages/ClientPage';
import AdminLogin from './pages/AdminLogin';
import AdminDashboard from './pages/AdminDashboard';
import ProtectedRoute from './components/ProtectedRoute';
import './App.css';

// ScrollToTop component to scroll to top on route change
const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth'
    });
  }, [pathname]);

  return null;
};

// Floating Action Buttons Component
const FloatingButtons = () => {
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [showShareMenu, setShowShareMenu] = useState(false);

  // Check scroll position to show/hide scroll to top button
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setShowScrollTop(true);
      } else {
        setShowScrollTop(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Scroll to top function
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  // Share functionality
  const shareContent = async (platform) => {
    const currentUrl = window.location.href;
    const pageTitle = document.title || 'Magnet eBike';
    const shareText = `Check out ${pageTitle} - Electric Bikes for Modern Riders!`;

    let shareUrl = '';

    switch(platform) {
      case 'whatsapp':
        shareUrl = `https://wa.me/?text=${encodeURIComponent(shareText + ' ' + currentUrl)}`;
        window.open(shareUrl, '_blank', 'noopener,noreferrer');
        break;
      case 'instagram':
        // Instagram doesn't have a direct share URL, but we can copy to clipboard
        try {
          await navigator.clipboard.writeText(currentUrl);
          alert('Link copied to clipboard! You can now paste it on Instagram.');
        } catch (err) {
          alert('Unable to copy link. Please copy manually: ' + currentUrl);
        }
        break;
      case 'facebook':
        shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(currentUrl)}`;
        window.open(shareUrl, '_blank', 'noopener,noreferrer', 'width=600,height=400');
        break;
      case 'twitter':
        shareUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(currentUrl)}`;
        window.open(shareUrl, '_blank', 'noopener,noreferrer', 'width=600,height=400');
        break;
      case 'linkedin':
        shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(currentUrl)}`;
        window.open(shareUrl, '_blank', 'noopener,noreferrer', 'width=600,height=400');
        break;
      case 'copy':
        try {
          await navigator.clipboard.writeText(currentUrl);
          alert('Link copied to clipboard!');
        } catch (err) {
          alert('Unable to copy link. Please copy manually: ' + currentUrl);
        }
        break;
      default:
        // Native share API for mobile devices
        if (navigator.share) {
          navigator.share({
            title: pageTitle,
            text: shareText,
            url: currentUrl,
          }).catch((error) => console.log('Error sharing:', error));
        } else {
          alert('Share not supported. You can copy the link: ' + currentUrl);
        }
    }
    setShowShareMenu(false);
  };

  return (
    <div className="floating-buttons">
      {/* Share Button */}
      <div className="floating-btn-container">
        <button 
          className="floating-btn share-btn"
          onClick={() => setShowShareMenu(!showShareMenu)}
          aria-label="Share"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M18 16.08C17.24 16.08 16.56 16.38 16.04 16.85L8.91 12.7C8.96 12.47 9 12.24 9 12C9 11.76 8.96 11.53 8.91 11.3L15.96 7.19C16.5 7.69 17.21 8 18 8C19.66 8 21 6.66 21 5C21 3.34 19.66 2 18 2C16.34 2 15 3.34 15 5C15 5.24 15.04 5.47 15.09 5.7L8.04 9.81C7.5 9.31 6.79 9 6 9C4.34 9 3 10.34 3 12C3 13.66 4.34 15 6 15C6.79 15 7.5 14.69 8.04 14.19L15.16 18.35C15.11 18.56 15.08 18.78 15.08 19C15.08 20.61 16.39 21.92 18 21.92C19.61 21.92 20.92 20.61 20.92 19C20.92 17.39 19.61 16.08 18 16.08Z" fill="currentColor"/>
          </svg>
        </button>
        
        {showShareMenu && (
          <div className="share-menu">
            <div className="share-menu-header">
              <h4>Share this page</h4>
              <button className="close-share" onClick={() => setShowShareMenu(false)}>×</button>
            </div>
            <div className="share-options">
              <button onClick={() => shareContent('whatsapp')} className="share-option whatsapp">
                <svg className="share-icon" width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91 0-5.45-4.45-9.9-9.91-9.9zm0 18.2c-1.5 0-2.96-.4-4.25-1.15l-.3-.18-3.12.82.83-3.04-.2-.31c-.8-1.35-1.22-2.9-1.22-4.48 0-4.6 3.74-8.34 8.34-8.34 4.6 0 8.34 3.74 8.34 8.34 0 4.6-3.74 8.34-8.34 8.34zm4.57-6.24c-.25-.12-1.47-.73-1.7-.81-.23-.08-.4-.12-.57.12-.17.24-.66.81-.81.98-.15.17-.3.19-.55.07-.25-.12-1.06-.39-2.02-1.25-.75-.67-1.25-1.5-1.4-1.75-.15-.25-.02-.38.11-.51.12-.12.27-.31.4-.47.13-.16.18-.27.27-.45.09-.18.05-.34-.03-.48-.08-.14-.57-1.38-.78-1.89-.21-.51-.42-.44-.57-.44-.15 0-.33-.02-.5-.02s-.46.07-.7.33c-.24.26-.92.9-.92 2.2 0 1.3.94 2.55 1.08 2.73.14.18 1.86 2.84 4.5 3.98.63.27 1.12.43 1.5.55.63.2 1.2.17 1.65.1.5-.07 1.55-.63 1.77-1.24.22-.61.22-1.13.16-1.24-.06-.11-.22-.18-.47-.3z"/>
                </svg>
                WhatsApp
              </button>
              <button onClick={() => shareContent('instagram')} className="share-option instagram">
                <svg className="share-icon" width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2c2.717 0 3.056.01 4.122.06 1.065.05 1.79.217 2.428.465.66.254 1.216.598 1.772 1.153a4.908 4.908 0 0 1 1.153 1.772c.249.638.415 1.363.465 2.428.05 1.066.06 1.405.06 4.122 0 2.717-.01 3.056-.06 4.122-.05 1.065-.217 1.79-.465 2.428a4.883 4.883 0 0 1-1.153 1.772 4.915 4.915 0 0 1-1.772 1.153c-.638.249-1.363.415-2.428.465-1.066.05-1.405.06-4.122.06-2.717 0-3.056-.01-4.122-.06-1.065-.05-1.79-.217-2.428-.465a4.89 4.89 0 0 1-1.772-1.153 4.904 4.904 0 0 1-1.153-1.772c-.249-.638-.415-1.363-.465-2.428C2.013 15.056 2 14.717 2 12c0-2.717.01-3.056.06-4.122.05-1.065.217-1.79.465-2.428a4.88 4.88 0 0 1 1.153-1.772A4.897 4.897 0 0 1 5.45 2.525c.638-.249 1.363-.415 2.428-.465C8.944 2.013 9.283 2 12 2zm0 5a5 5 0 1 0 0 10 5 5 0 0 0 0-10zm6.5-.25a1.25 1.25 0 0 0-2.5 0 1.25 1.25 0 0 0 2.5 0zM12 9a3 3 0 1 1 0 6 3 3 0 0 1 0-6z"/>
                </svg>
                Instagram
              </button>
              <button onClick={() => shareContent('facebook')} className="share-option facebook">
                <svg className="share-icon" width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1v2h3v3h-3v6.95c5.05-.5 9-4.76 9-9.95z"/>
                </svg>
                Facebook
              </button>
              <button onClick={() => shareContent('twitter')} className="share-option twitter">
                <svg className="share-icon" width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M22.46 6c-.77.35-1.6.58-2.46.69.88-.53 1.56-1.37 1.88-2.38-.83.5-1.75.85-2.72 1.05C18.37 4.5 17.26 4 16 4c-2.35 0-4.27 1.92-4.27 4.29 0 .34.04.67.11.98C8.28 9.09 5.11 7.38 3 4.79c-.37.63-.58 1.37-.58 2.15 0 1.49.75 2.81 1.91 3.56-.71 0-1.37-.2-1.95-.5v.03c0 2.08 1.48 3.82 3.44 4.21a4.22 4.22 0 0 1-1.93.07 4.28 4.28 0 0 0 4 2.98 8.521 8.521 0 0 1-5.33 1.84c-.34 0-.68-.02-1.02-.06C3.44 20.29 5.7 21 8.12 21 16 21 20.33 14.46 20.33 8.79c0-.19 0-.37-.01-.56.84-.6 1.56-1.36 2.14-2.23z"/>
                </svg>
                Twitter/X
              </button>
              <button onClick={() => shareContent('linkedin')} className="share-option linkedin">
                <svg className="share-icon" width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3c0-1.4-.6-2.4-1.8-2.4-1 0-1.7.7-1.9 1.3h-.1v-1.1h-2.1v7.5h2.1v-4.2c0-.9.2-1.7 1.2-1.7 1 0 1.1.8 1.1 1.7v4.2h2.1M7 8.8c.7 0 1.2-.5 1.2-1.2 0-.7-.5-1.2-1.2-1.2-.7 0-1.2.5-1.2 1.2 0 .7.5 1.2 1.2 1.2M5.9 18.5h2.2v-7.5H5.9v7.5z"/>
                </svg>
                LinkedIn
              </button>
              <button onClick={() => shareContent('copy')} className="share-option copy">
                <svg className="share-icon" width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M16 1H4c-1.1 0-2 .9-2 2v14h2V3h12V1zm3 4H8c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h11c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2zm0 16H8V7h11v14z"/>
                </svg>
                Copy Link
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Scroll to Top Button */}
      {showScrollTop && (
        <button 
          className="floating-btn scroll-top-btn"
          onClick={scrollToTop}
          aria-label="Scroll to top"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 4L12 20M12 4L18 10M12 4L6 10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
      )}
    </div>
  );
};

// Loader Component with the new image
const Loader = () => {
  return (
    <div className="loader-container">
      <div className="loader-content">
        {/* New Image from postimg.cc */}
        <div className="loader-image-container">
          <img 
            src="https://i.postimg.cc/76NkQN2T/631663911-941393348446423-527384203706587613-n-removebg-preview.png" 
            alt="Magnet eBike" 
            className="loader-bike-image"
          />
        </div>
        <div className="loader-text">
          <h2>Magnet E-B⚡ke</h2>
          <p>Powering your ride...</p>
        </div>
        <div className="loader-dots">
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>
    </div>
  );
};

function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate initial loading time
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2500);

    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return <Loader />;
  }

  return (
    <Router>
      <AuthProvider>
        <div className="app">
          <div className="layout">
            <Navbar />
            <div className="right-section">
              <ScrollToTop />
              <main className="main-content">
                <Routes>
                  <Route path="/" element={<HomePage />} />
                  <Route path="/products" element={<ProductsPage />} />
                  <Route path="/client" element={<ClientPage />} />
                  <Route path="/about" element={<AboutPage />} />
                  <Route path="/contact" element={<ContactPage />} />
                  <Route path="/admin/login" element={<AdminLogin />} />
                  <Route path="/admin/dashboard" element={
                    <ProtectedRoute>
                      <AdminDashboard />
                    </ProtectedRoute>
                  } />
                </Routes>
              </main>
              <Footer />
            </div>
          </div>
          <FloatingButtons />
        </div>
      </AuthProvider>
    </Router>
  );
}

export default App;