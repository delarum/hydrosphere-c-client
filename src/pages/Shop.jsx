// client/src/pages/Shop.jsx
import React, { useState, useEffect, useRef } from 'react';
import { useAuth } from '../context/AuthContext';
import { Link } from 'react-router-dom';
import axios from 'axios';
import '../styles/shop.css';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const Shop = () => {
  const { user, isAuthenticated } = useAuth();
  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState('all');
  const [sort, setSort] = useState('featured');
  const [cart, setCart] = useState([]);
  const [showCart, setShowCart] = useState(false);
  const [purchaseAnimation, setPurchaseAnimation] = useState(null);
  const [userImpact, setUserImpact] = useState(null);
  const impactRef = useRef(null);

  const categories = [
    { id: 'all', label: 'All', icon: '🌿' },
    { id: 'fashion', label: 'Fashion', icon: '👕' },
    { id: 'home', label: 'Home', icon: '🏠' },
    { id: 'accessories', label: 'Accessories', icon: '👜' },
    { id: 'tech', label: 'Tech', icon: '💻' },
    { id: 'art', label: 'Art', icon: '🎨' }
  ];

  useEffect(() => {
    fetchProducts();
    if (isAuthenticated) fetchUserImpact();
  }, [category, sort, isAuthenticated]);

  const fetchProducts = async () => {
    try {
      const { data } = await axios.get(`${API_URL}/shop/products`, {
        params: { category, sort }
      });
      setProducts(data.products);
    } catch (error) {
      console.error('Failed to fetch products');
    }
  };

  const fetchUserImpact = async () => {
    try {
      const token = localStorage.getItem('token');
      const { data } = await axios.get(`${API_URL}/shop/my-impact`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setUserImpact(data.impact);
    } catch (error) {
      console.error('Failed to fetch impact');
    }
  };

  const addToCart = (product) => {
    setCart(prev => {
      const existing = prev.find(item => item._id === product._id);
      if (existing) {
        return prev.map(item => 
          item._id === product._id 
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
    setShowCart(true);
  };

  const removeFromCart = (productId) => {
    setCart(prev => prev.filter(item => item._id !== productId));
  };

  const updateQuantity = (productId, delta) => {
    setCart(prev => prev.map(item => {
      if (item._id === productId) {
        const newQty = Math.max(1, item.quantity + delta);
        return { ...item, quantity: newQty };
      }
      return item;
    }));
  };

  const calculateCartImpact = () => {
    return cart.reduce((acc, item) => ({
      plastic: acc.plastic + (item.impact.plasticRemoved * item.quantity),
      co2: acc.co2 + (item.impact.co2Prevented * item.quantity),
      water: acc.water + (item.impact.waterSaved * item.quantity),
      items: acc.items + (item.impact.itemsRecycled * item.quantity)
    }), { plastic: 0, co2: 0, water: 0, items: 0 });
  };

  const handleCheckout = async () => {
    if (!isAuthenticated) {
      alert('Please sign in to complete your purchase');
      return;
    }

    const cartImpact = calculateCartImpact();
    
    try {
      const token = localStorage.getItem('token');
      const { data } = await axios.post(`${API_URL}/shop/order`, {
        items: cart.map(item => ({ productId: item._id, quantity: item.quantity })),
        shippingAddress: { street: 'TBD', city: 'Nairobi', country: 'Kenya' }
      }, {
        headers: { Authorization: `Bearer ${token}` }
      });

      // Trigger animation
      setPurchaseAnimation({
        plastic: cartImpact.plastic,
        co2: cartImpact.co2,
        water: cartImpact.water,
        items: cartImpact.items
      });

      // Scroll to impact section
      setTimeout(() => {
        impactRef.current?.scrollIntoView({ behavior: 'smooth' });
      }, 500);

      // Clear cart after animation
      setTimeout(() => {
        setCart([]);
        setShowCart(false);
        setPurchaseAnimation(null);
        fetchUserImpact();
      }, 6000);

    } catch (error) {
      alert('Checkout failed: ' + error.response?.data?.message);
    }
  };

  const cartTotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const cartImpact = calculateCartImpact();

  return (
    <div className="shop-page">
      {/* Hero Section */}
      <section className="shop-hero">
        <div className="shop-hero-bg"></div>
        <div className="shop-hero-content">
          <span className="shop-hero-badge">♻️ Sustainable Shopping</span>
          <h1>Turn Trash Into <span className="highlight">Treasure</span></h1>
          <p>Every purchase directly funds ocean plastic removal. Shop products made from 100% recycled materials.</p>
          
          <div className="hero-impact-counter">
            <div className="counter-item">
              <span className="counter-number" data-target="24750">24,750</span>
              <span className="counter-label">kg plastic removed</span>
            </div>
            <div className="counter-item">
              <span className="counter-number" data-target="156000">156,000</span>
              <span className="counter-label">items recycled</span>
            </div>
          </div>
        </div>
        
        {/* Floating recycled items */}
        <div className="floating-products">
          <div className="float-item bottle">🧴</div>
          <div className="float-item bag">👜</div>
          <div className="float-item shirt">👕</div>
          <div className="float-item chair">🪑</div>
        </div>
      </section>

      {/* Recycling Process Education */}
      <section className="recycling-process">
        <div className="process-container">
          <h2>From Ocean Trash to Your Door</h2>
          <p className="process-subtitle">See how we transform pollution into premium products</p>
          
          <div className="process-steps">
            <div className="process-step">
              <div className="step-number">1</div>
              <div className="step-icon">🎣</div>
              <h3>Collection</h3>
              <p>Local fishermen collect plastic from coastlines and rivers, earning income for every kilogram.</p>
              <div className="step-stats">500+ collectors across East Africa</div>
            </div>
            
            <div className="process-connector">
              <div className="connector-line"></div>
              <div className="connector-arrow">→</div>
            </div>
            
            <div className="process-step">
              <div className="step-number">2</div>
              <div className="step-icon">🏭</div>
              <h3>Processing</h3>
              <p>Plastic is sorted, cleaned, and transformed into high-quality raw materials in our partner facilities.</p>
              <div className="step-stats">98% purity rate achieved</div>
            </div>
            
            <div className="process-connector">
              <div className="connector-line"></div>
              <div className="connector-arrow">→</div>
            </div>
            
            <div className="process-step">
              <div className="step-number">3</div>
              <div className="step-icon">✂️</div>
              <h3>Crafting</h3>
              <p>Artisans and manufacturers create beautiful, durable products from recycled materials.</p>
              <div className="step-stats">200+ local artisans employed</div>
            </div>
            
            <div className="process-connector">
              <div className="connector-line"></div>
              <div className="connector-arrow">→</div>
            </div>
            
            <div className="process-step">
              <div className="step-number">4</div>
              <div className="step-icon">📦</div>
              <h3>Delivery</h3>
              <p>Carbon-neutral shipping delivers your purchase with complete impact tracking.</p>
              <div className="step-stats">100% plastic-free packaging</div>
            </div>
          </div>
          
          <div className="process-impact-banner">
            <div className="impact-icon">🌍</div>
            <div className="impact-text">
              <strong>Every $10 spent removes 1kg of plastic from the ocean</strong>
              <span>Verified by third-party audit • Real-time tracking</span>
            </div>
          </div>
        </div>
      </section>

      {/* Shop Section */}
      <section className="shop-section">
        <div className="shop-header">
          <div className="shop-filters">
            <div className="category-tabs">
              {categories.map(cat => (
                <button
                  key={cat.id}
                  className={`category-tab ${category === cat.id ? 'active' : ''}`}
                  onClick={() => setCategory(cat.id)}
                >
                  <span className="tab-icon">{cat.icon}</span>
                  {cat.label}
                </button>
              ))}
            </div>
            
            <select 
              className="sort-select"
              value={sort}
              onChange={(e) => setSort(e.target.value)}
            >
              <option value="featured">Featured</option>
              <option value="impact">Highest Impact</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
            </select>
          </div>
          
          {/* User Impact Summary (if logged in) */}
          {userImpact && (
            <div className="user-impact-bar" ref={impactRef}>
              <span className="impact-title">Your Impact</span>
              <div className="impact-metrics">
                <div className="metric">
                  <span className="metric-value">{userImpact.plasticRemoved.toFixed(1)}</span>
                  <span className="metric-unit">kg plastic</span>
                </div>
                <div className="metric">
                  <span className="metric-value">{userImpact.itemsRecycled}</span>
                  <span className="metric-unit">items</span>
                </div>
                <div className="metric">
                  <span className="metric-value">{userImpact.co2Prevented.toFixed(1)}</span>
                  <span className="metric-unit">kg CO₂</span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Purchase Animation Overlay */}
        {purchaseAnimation && (
          <div className="purchase-celebration">
            <div className="celebration-content">
              <div className="celebration-icon">🎉</div>
              <h2>Thank You for Making a Difference!</h2>
              
              <div className="celebration-impact">
                <div className="impact-animation plastic">
                  <div className="animation-circle">
                    <span className="animation-icon">🧴</span>
                    <svg className="progress-ring" viewBox="0 0 100 100">
                      <circle className="ring-bg" cx="50" cy="50" r="45"/>
                      <circle className="ring-progress" cx="50" cy="50" r="45"/>
                    </svg>
                  </div>
                  <div className="animation-text">
                    <span className="animation-number">{purchaseAnimation.plastic.toFixed(2)}</span>
                    <span className="animation-label">kg plastic removed</span>
                  </div>
                </div>
                
                <div className="impact-animation items">
                  <div className="animation-circle">
                    <span className="animation-icon">♻️</span>
                    <svg className="progress-ring" viewBox="0 0 100 100">
                      <circle className="ring-bg" cx="50" cy="50" r="45"/>
                      <circle className="ring-progress" cx="50" cy="50" r="45"/>
                    </svg>
                  </div>
                  <div className="animation-text">
                    <span className="animation-number">{Math.round(purchaseAnimation.items)}</span>
                    <span className="animation-label">items recycled</span>
                  </div>
                </div>
                
                <div className="impact-animation co2">
                  <div className="animation-circle">
                    <span className="animation-icon">🌱</span>
                    <svg className="progress-ring" viewBox="0 0 100 100">
                      <circle className="ring-bg" cx="50" cy="50" r="45"/>
                      <circle className="ring-progress" cx="50" cy="50" r="45"/>
                    </svg>
                  </div>
                  <div className="animation-text">
                    <span className="animation-number">{purchaseAnimation.co2.toFixed(1)}</span>
                    <span className="animation-label">kg CO₂ prevented</span>
                  </div>
                </div>
              </div>
              
              <p className="celebration-message">
                Your purchase just funded the removal of {purchaseAnimation.plastic.toFixed(2)}kg of ocean plastic!
              </p>
            </div>
            
            {/* Confetti particles */}
            <div className="confetti-container">
              {[...Array(50)].map((_, i) => (
                <div key={i} className="confetti" style={{
                  left: `${Math.random() * 100}%`,
                  animationDelay: `${Math.random() * 2}s`,
                  backgroundColor: ['#013137', '#297376', '#5c9396', '#c1d9de'][Math.floor(Math.random() * 4)]
                }}></div>
              ))}
            </div>
          </div>
        )}

        {/* Products Grid */}
        <div className="products-grid">
          {products.map((product, index) => (
            <div 
              key={product._id} 
              className="product-card"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {product.badge && (
                <span className={`product-badge ${product.badge.toLowerCase()}`}>
                  {product.badge}
                </span>
              )}
              
              <div className="product-image">
                <img src={product.image} alt={product.name} />
                <div className="product-overlay">
                  <button 
                    className="quick-add-btn"
                    onClick={() => addToCart(product)}
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
              
              <div className="product-info">
                <span className="product-category">{product.category}</span>
                <h3 className="product-name">{product.name}</h3>
                <p className="product-description">{product.description}</p>
                
                <div className="product-impact">
                  <div className="impact-mini">
                    <span className="mini-icon">🧴</span>
                    <span className="mini-value">{product.impact.plasticRemoved}kg</span>
                  </div>
                  <div className="impact-mini">
                    <span className="mini-icon">♻️</span>
                    <span className="mini-value">{product.impact.itemsRecycled}</span>
                  </div>
                </div>
                
                <div className="product-footer">
                  <span className="product-price">${product.price}</span>
                  <div className="product-rating">
                    <span className="stars">{'★'.repeat(Math.floor(product.rating))}</span>
                    <span className="count">({product.reviews})</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Shopping Cart Sidebar */}
      <div className={`cart-sidebar ${showCart ? 'open' : ''}`}>
        <div className="cart-header">
          <h3>Your Cart</h3>
          <button className="close-cart" onClick={() => setShowCart(false)}>×</button>
        </div>
        
        <div className="cart-items">
          {cart.length === 0 ? (
            <div className="cart-empty">
              <span className="empty-icon">🛒</span>
              <p>Your cart is empty</p>
              <span className="empty-hint">Add items to see your impact</span>
            </div>
          ) : (
            <>
              {cart.map(item => (
                <div key={item._id} className="cart-item">
                  <img src={item.image} alt={item.name} className="cart-item-img" />
                  <div className="cart-item-details">
                    <h4>{item.name}</h4>
                    <div className="cart-item-impact">
                      <span>🧴 {item.impact.plasticRemoved * item.quantity}kg</span>
                    </div>
                    <div className="cart-item-controls">
                      <button onClick={() => updateQuantity(item._id, -1)}>-</button>
                      <span>{item.quantity}</span>
                      <button onClick={() => updateQuantity(item._id, 1)}>+</button>
                      <button 
                        className="remove-btn"
                        onClick={() => removeFromCart(item._id)}
                      >
                        🗑️
                      </button>
                    </div>
                  </div>
                  <span className="cart-item-price">${item.price * item.quantity}</span>
                </div>
              ))}
              
              <div className="cart-impact-summary">
                <h4>Your Impact from this order:</h4>
                <div className="impact-grid">
                  <div className="impact-cell">
                    <span className="cell-icon">🧴</span>
                    <span className="cell-value">{cartImpact.plastic.toFixed(2)}kg</span>
                    <span className="cell-label">plastic</span>
                  </div>
                  <div className="impact-cell">
                    <span className="cell-icon">♻️</span>
                    <span className="cell-value">{Math.round(cartImpact.items)}</span>
                    <span className="cell-label">items</span>
                  </div>
                  <div className="impact-cell">
                    <span className="cell-icon">🌱</span>
                    <span className="cell-value">{cartImpact.co2.toFixed(1)}kg</span>
                    <span className="cell-label">CO₂</span>
                  </div>
                  <div className="impact-cell">
                    <span className="cell-icon">💧</span>
                    <span className="cell-value">{cartImpact.water.toFixed(0)}L</span>
                    <span className="cell-label">water</span>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
        
        {cart.length > 0 && (
          <div className="cart-footer">
            <div className="cart-total">
              <span>Total</span>
              <span className="total-price">${cartTotal.toFixed(2)}</span>
            </div>
            <button className="checkout-btn" onClick={handleCheckout}>
              Complete Purchase
              <span className="checkout-impact">Remove {cartImpact.plastic.toFixed(2)}kg plastic</span>
            </button>
          </div>
        )}
      </div>
      
      {/* Cart Toggle Button */}
      <button 
        className={`cart-toggle ${showCart ? 'hidden' : ''}`}
        onClick={() => setShowCart(true)}
      >
        <span className="cart-icon">🛒</span>
        {cart.length > 0 && <span className="cart-count">{cart.reduce((a, b) => a + b.quantity, 0)}</span>}
      </button>

      {/* Cart Backdrop */}
      {showCart && <div className="cart-backdrop" onClick={() => setShowCart(false)}></div>}
    </div>
  );
};

export default Shop;