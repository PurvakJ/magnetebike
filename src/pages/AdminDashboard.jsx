import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { 
  getProducts, addProduct, 
  getAppointments, getReviews 
} from '../services/api';
import { FaBox, FaCalendarCheck, FaStar, FaTrash, FaEdit, FaSignOutAlt } from 'react-icons/fa';
import './AdminDashboard.css';

const AdminDashboard = () => {
  const { logout, adminUser, loading: authLoading } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('products');
  const [products, setProducts] = useState([]);
  const [appointments, setAppointments] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showProductModal, setShowProductModal] = useState(false);
  const [newProduct, setNewProduct] = useState({
    name: '',
    description: '',
    price: '',
    image: ''
  });

  useEffect(() => {
    // If not authenticated after auth loading, redirect
    if (!authLoading && !localStorage.getItem('adminToken')) {
      navigate('/admin/login');
      return;
    }
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [authLoading, navigate]); // Added navigate to dependencies

  const fetchData = async () => {
    setLoading(true);
    try {
      const [productsRes, appointmentsRes, reviewsRes] = await Promise.all([
        getProducts(),
        getAppointments(),
        getReviews()
      ]);
      setProducts(productsRes.data);
      setAppointments(appointmentsRes.data);
      setReviews(reviewsRes.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddProduct = async (e) => {
    e.preventDefault();
    try {
      await addProduct(newProduct);
      setShowProductModal(false);
      setNewProduct({ name: '', description: '', price: '', image: '' });
      fetchData();
      alert('Product added successfully!');
    } catch (error) {
      alert('Error adding product');
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/admin/login');
  };

  if (authLoading) {
    return <div className="loading">Loading dashboard...</div>;
  }

  const stats = {
    products: products.length,
    appointments: appointments.length,
    reviews: reviews.length,
    averageRating: reviews.length > 0 
      ? (reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length).toFixed(1)
      : 0
  };

  return (
    <div className="admin-dashboard">
      <div className="admin-header">
        <div className="container">
          <div className="admin-header-content">
            <h1>Admin Dashboard</h1>
            <div className="admin-info">
              <span>Welcome, {adminUser}</span>
              <button onClick={handleLogout} className="btn-logout">
                <FaSignOutAlt /> Logout
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="container">
        {/* Stats Cards */}
        <div className="admin-stats">
          <div className="stat-card">
            <FaBox className="stat-icon" />
            <div className="stat-info">
              <h3>{stats.products}</h3>
              <p>Products</p>
            </div>
          </div>
          <div className="stat-card">
            <FaCalendarCheck className="stat-icon" />
            <div className="stat-info">
              <h3>{stats.appointments}</h3>
              <p>Appointments</p>
            </div>
          </div>
          <div className="stat-card">
            <FaStar className="stat-icon" />
            <div className="stat-info">
              <h3>{stats.averageRating}</h3>
              <p>Avg Rating</p>
            </div>
          </div>
          <div className="stat-card">
            <FaStar className="stat-icon" />
            <div className="stat-info">
              <h3>{stats.reviews}</h3>
              <p>Total Reviews</p>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="admin-tabs">
          <button 
            className={activeTab === 'products' ? 'tab-active' : ''} 
            onClick={() => setActiveTab('products')}
          >
            Products Management
          </button>
          <button 
            className={activeTab === 'appointments' ? 'tab-active' : ''} 
            onClick={() => setActiveTab('appointments')}
          >
            Appointments
          </button>
          <button 
            className={activeTab === 'reviews' ? 'tab-active' : ''} 
            onClick={() => setActiveTab('reviews')}
          >
            Reviews Management
          </button>
        </div>

        {/* Products Tab */}
        {activeTab === 'products' && (
          <div className="admin-section">
            <div className="section-header">
              <h2>Products</h2>
              <button className="btn-add" onClick={() => setShowProductModal(true)}>
                + Add New Product
              </button>
            </div>
            
            {loading ? (
              <div className="loading">Loading...</div>
            ) : (
              <div className="products-table">
                <table>
                  <thead>
                    <tr>
                      <th>ID</th>
                      <th>Name</th>
                      <th>Description</th>
                      <th>Price</th>
                      <th>Image</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {products.map((product) => (
                      <tr key={product.id}>
                        <td>{product.id}</td>
                        <td>{product.name}</td>
                        <td>{product.description}</td>
                        <td>${product.price}</td>
                        <td>
                          <img src={product.image || 'https://via.placeholder.com/50'} alt={product.name} style={{width: '50px'}} />
                        </td>
                        <td>
                          <button className="btn-edit"><FaEdit /></button>
                          <button className="btn-delete"><FaTrash /></button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}

        {/* Appointments Tab */}
        {activeTab === 'appointments' && (
          <div className="admin-section">
            <h2>Test Ride Appointments</h2>
            {loading ? (
              <div className="loading">Loading...</div>
            ) : appointments.length === 0 ? (
              <p className="no-data">No appointments yet.</p>
            ) : (
              <div className="appointments-list">
                {appointments.map((appointment, index) => (
                  <div key={index} className="appointment-card">
                    <div className="appointment-header">
                      <h3>{appointment.name}</h3>
                      <span className="status pending">Pending</span>
                    </div>
                    <p><strong>Phone:</strong> {appointment.phone}</p>
                    <p><strong>Message:</strong> {appointment.message || 'No message'}</p>
                    <div className="appointment-actions">
                      <button className="btn-confirm">Confirm</button>
                      <button className="btn-delete">Delete</button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Reviews Tab */}
        {activeTab === 'reviews' && (
          <div className="admin-section">
            <h2>Customer Reviews</h2>
            {loading ? (
              <div className="loading">Loading...</div>
            ) : reviews.length === 0 ? (
              <p className="no-data">No reviews yet.</p>
            ) : (
              <div className="reviews-list">
                {reviews.map((review, index) => (
                  <div key={index} className="review-card">
                    <div className="review-header">
                      <h3>{review.name}</h3>
                      <div className="rating">{'⭐'.repeat(review.rating)}</div>
                    </div>
                    <p>{review.comment}</p>
                    <div className="review-actions">
                      <button className="btn-edit">Feature</button>
                      <button className="btn-delete">Delete</button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Add Product Modal */}
        {showProductModal && (
          <div className="modal-overlay" onClick={() => setShowProductModal(false)}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
              <h2>Add New Product</h2>
              <form onSubmit={handleAddProduct}>
                <div className="form-group">
                  <label>Product Name</label>
                  <input
                    type="text"
                    value={newProduct.name}
                    onChange={(e) => setNewProduct({...newProduct, name: e.target.value})}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Description</label>
                  <textarea
                    value={newProduct.description}
                    onChange={(e) => setNewProduct({...newProduct, description: e.target.value})}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Price ($)</label>
                  <input
                    type="number"
                    value={newProduct.price}
                    onChange={(e) => setNewProduct({...newProduct, price: e.target.value})}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Image URL</label>
                  <input
                    type="text"
                    value={newProduct.image}
                    onChange={(e) => setNewProduct({...newProduct, image: e.target.value})}
                    placeholder="https://example.com/image.jpg"
                  />
                </div>
                <div className="modal-actions">
                  <button type="button" onClick={() => setShowProductModal(false)}>Cancel</button>
                  <button type="submit">Add Product</button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;