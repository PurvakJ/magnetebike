import React, { useState, useEffect, useCallback } from 'react';
import { getProducts } from '../services/api';
import './Product.css';

const ProductsPage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedProduct, setSelectedProduct] = useState(null);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await getProducts();
      setProducts(response.data);
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setLoading(false);
    }
  };

  const openFullScreen = (product) => {
    setSelectedProduct(product);
    setSelectedImage(product.image || 'https://via.placeholder.com/400');
    document.body.style.overflow = 'hidden';
  };

  const closeFullScreen = () => {
    setSelectedImage(null);
    setSelectedProduct(null);
    document.body.style.overflow = 'auto';
  };

  // Wrap handleKeyDown in useCallback to prevent unnecessary re-renders
  const handleKeyDown = useCallback((e) => {
    if (e.key === 'Escape') {
      closeFullScreen();
    }
  }, []); // Empty dependency array since closeFullScreen is stable

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'auto';
    };
  }, [handleKeyDown]); // Added handleKeyDown as dependency

  return (
    <div className="products-page">
      <div className="container">
        <h1 className="page-title">Our Electric Bikes</h1>
        
        <div className="products-header">
          <p className="products-count">{products.length} Models Available</p>
        </div>

        {loading ? (
          <div className="loading-container">
            <div className="spinner"></div>
          </div>
        ) : (
          <>
            <div className="products-grid">
              {products.map((product) => (
                <div key={product.id} className="product-card-large">
                  <div className="product-image" onClick={() => openFullScreen(product)}>
                    <img src={product.image || 'https://via.placeholder.com/400'} alt={product.name} />
                    <div className="image-overlay">
                      <span className="zoom-icon">🔍</span>
                      <span>Click to enlarge</span>
                    </div>
                  </div>
                  <div className="product-info">
                    <h2>{product.name}</h2>
                    <p className="product-description">{product.description}</p>
                    <div className="product-price">₹{product.price}</div>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>

      {/* Full Screen Image Modal */}
      {selectedImage && (
        <div className="fullscreen-modal" onClick={closeFullScreen}>
          <button className="modal-close" onClick={closeFullScreen}>✕</button>
          <button className="modal-prev" onClick={(e) => {
            e.stopPropagation();
            const currentIndex = products.findIndex(p => p.id === selectedProduct?.id);
            if (currentIndex > 0) {
              const prevProduct = products[currentIndex - 1];
              setSelectedProduct(prevProduct);
              setSelectedImage(prevProduct.image || 'https://via.placeholder.com/400');
            }
          }}>❮</button>
          
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <img src={selectedImage} alt={selectedProduct?.name} />
            {selectedProduct && (
              <div className="modal-info">
                <h2>{selectedProduct.name}</h2>
                <p>{selectedProduct.description}</p>
                <div className="modal-price">₹{selectedProduct.price}</div>
                <button className="btn btn-primary">Buy Now</button>
              </div>
            )}
          </div>
          
          <button className="modal-next" onClick={(e) => {
            e.stopPropagation();
            const currentIndex = products.findIndex(p => p.id === selectedProduct?.id);
            if (currentIndex < products.length - 1) {
              const nextProduct = products[currentIndex + 1];
              setSelectedProduct(nextProduct);
              setSelectedImage(nextProduct.image || 'https://via.placeholder.com/400');
            }
          }}>❯</button>
        </div>
      )}
    </div>
  );
};

export default ProductsPage;