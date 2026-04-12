// client/src/pages/Shop.jsx
import React, { useState, useEffect, useRef } from 'react';
import { useAuth } from '../context/AuthContext';
import axios from 'axios';
import '../styles/shop.css';
import Navbar from '../components/navbar';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const Shop = () => {
  const { isAuthenticated } = useAuth();

  const [products, setProducts]                   = useState([]);
  const [loading, setLoading]                     = useState(true);
  const [error, setError]                         = useState('');
  const [category, setCategory]                   = useState('all');
  const [sort, setSort]                           = useState('');       // '' = natural DB order (featured first via seed)
  const [cart, setCart]                           = useState([]);
  const [showCart, setShowCart]                   = useState(false);
  const [purchaseAnimation, setPurchaseAnimation] = useState(null);
  const [userImpact, setUserImpact]               = useState(null);
  const [checkoutLoading, setCheckoutLoading]     = useState(false);
  const impactRef = useRef(null);

  const categories = [
    { id: 'all',         label: 'All',         icon: '🌿' },
    { id: 'fashion',     label: 'Fashion',     icon: '👕' },
    { id: 'home',        label: 'Home',        icon: '🏠' },
    { id: 'accessories', label: 'Accessories', icon: '👜' },
    { id: 'tech',        label: 'Tech',        icon: '💻' },
    { id: 'art',         label: 'Art',         icon: '🎨' },
  ];

  useEffect(() => { fetchProducts(); }, [category, sort]);
  useEffect(() => { if (isAuthenticated) fetchUserImpact(); }, [isAuthenticated]);

  // ── Fetch products ──────────────────────────────────────────────────────────
  const fetchProducts = async () => {
    setLoading(true);
    setError('');
    try {
      const params = {};
      if (category !== 'all') params.category = category;
      if (sort)               params.sort     = sort;   // price-low | price-high | impact only

      const { data } = await axios.get(`${API_URL}/shop/products`, { params });
      if (!data.success) throw new Error(data.message || 'Server error');
      setProducts(data.products);
    } catch (err) {
      setError(err.response?.data?.message || err.message || 'Failed to load products');
    } finally {
      setLoading(false);
    }
  };

  // ── Fetch user impact ───────────────────────────────────────────────────────
  const fetchUserImpact = async () => {
    try {
      const token = localStorage.getItem('token');
      const { data } = await axios.get(`${API_URL}/shop/my-impact`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (data.success) setUserImpact(data.impact);
    } catch {
      // Non-critical — silent fail
    }
  };

  // ── Cart helpers ────────────────────────────────────────────────────────────
  const addToCart = (product) => {
    if (product.stock === 0) return;
    setCart(prev => {
      const existing = prev.find(i => i._id === product._id);
      return existing
        ? prev.map(i => i._id === product._id ? { ...i, quantity: i.quantity + 1 } : i)
        : [...prev, { ...product, quantity: 1 }];
    });
    setShowCart(true);
  };

  const removeFromCart = (id) => setCart(prev => prev.filter(i => i._id !== id));

  const updateQuantity = (id, delta) =>
    setCart(prev =>
      prev.map(i => i._id === id ? { ...i, quantity: Math.max(1, i.quantity + delta) } : i)
    );

  // ── Impact math ─────────────────────────────────────────────────────────────
  const calcImpact = (items) =>
    items.reduce(
      (acc, i) => ({
        plastic: acc.plastic + (i.impact?.plasticRemoved || 0) * i.quantity,
        co2:     acc.co2    + (i.impact?.co2Prevented    || 0) * i.quantity,
        water:   acc.water  + (i.impact?.waterSaved      || 0) * i.quantity,
        items:   acc.items  + (i.impact?.itemsRecycled   || 0) * i.quantity,
      }),
      { plastic: 0, co2: 0, water: 0, items: 0 }
    );

  // ── Checkout ────────────────────────────────────────────────────────────────
  const handleCheckout = async () => {
    if (!isAuthenticated) { alert('Please sign in to complete your purchase'); return; }
    if (cart.length === 0) return;

    const impact = calcImpact(cart);
    setCheckoutLoading(true);
    try {
      const token = localStorage.getItem('token');
      await axios.post(
        `${API_URL}/shop/order`,
        {
          items: cart.map(i => ({ productId: i._id, quantity: i.quantity })),
          shippingAddress: { street: 'TBD', city: 'Nairobi', country: 'Kenya' },
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setPurchaseAnimation(impact);
      setTimeout(() => impactRef.current?.scrollIntoView({ behavior: 'smooth' }), 400);
      setTimeout(() => {
        setCart([]);
        setShowCart(false);
        setPurchaseAnimation(null);
        fetchProducts();
        fetchUserImpact();
      }, 6000);
    } catch (err) {
      alert('Checkout failed: ' + (err.response?.data?.message || err.message));
    } finally {
      setCheckoutLoading(false);
    }
  };

  const cartImpact = calcImpact(cart);
  const cartTotal  = cart.reduce((s, i) => s + i.price * i.quantity, 0);
  const cartCount  = cart.reduce((s, i) => s + i.quantity, 0);

  // ── JSX ─────────────────────────────────────────────────────────────────────
  return (
    <>
      <Navbar />
      <div className="shop-page">

        {/* ── Hero ── */}
        <section className="shop-hero">
          <div className="shop-hero-bg" />
          <div className="shop-hero-content">
            <span className="shop-hero-badge">♻️ Sustainable Shopping</span>
            <h1>Turn Trash Into <span className="highlight">Treasure</span></h1>
            <p>Every purchase directly funds water plastic removal. Shop products made from 100% recycled materials.</p>
            <div className="hero-impact-counter">
              <div className="counter-item">
                <span className="counter-number">24,750</span>
                <span className="counter-label">kg plastic removed</span>
              </div>
              <div className="counter-item">
                <span className="counter-number">156,000</span>
                <span className="counter-label">items recycled</span>
              </div>
            </div>
          </div>
          <div className="floating-products">
            <div className="float-item bottle">🧴</div>
            <div className="float-item bag">👜</div>
            <div className="float-item shirt">👕</div>
            <div className="float-item chair">🪑</div>
          </div>
        </section>

        {/* ── Recycling Process ── */}
        <section className="recycling-process">
          <div className="process-container">
            <h2>From recycled Trash to Your Door</h2>
            <p className="process-subtitle">See how we transform pollution into premium products</p>
            <div className="process-steps">
              {[
                { n:'1', icon:'🎣', title:'Collection',  body:'Local fishermen collect plastic from coastlines and rivers, earning income for every kilogram.', stat:'500+ collectors across East Africa' },
                { n:'2', icon:'🏭', title:'Processing',  body:'Plastic is sorted, cleaned, and transformed into high-quality raw materials in our partner facilities.', stat:'98% purity rate achieved' },
                { n:'3', icon:'✂️', title:'Crafting',    body:'Artisans and manufacturers create beautiful, durable products from recycled materials.', stat:'200+ local artisans employed' },
                { n:'4', icon:'📦', title:'Delivery',    body:'Carbon-neutral shipping delivers your purchase with complete impact tracking.', stat:'100% plastic-free packaging' },
              ].map((step, i, arr) => (
                <React.Fragment key={step.n}>
                  <div className="process-step">
                    <div className="step-number">{step.n}</div>
                    <span className="step-icon">{step.icon}</span>
                    <h3>{step.title}</h3>
                    <p>{step.body}</p>
                    <div className="step-stats">{step.stat}</div>
                  </div>
                  {i < arr.length - 1 && (
                    <div className="process-connector">
                      <div className="connector-line" />
                      <div className="connector-arrow">→</div>
                    </div>
                  )}
                </React.Fragment>
              ))}
            </div>
            <div className="process-impact-banner">
              <div className="impact-icon">🌍</div>
              <div className="impact-text">
                <strong>Every $10 spent removes 1kg of plastic from the our water bodies</strong>
                <span>Verified by third-party audit • Real-time tracking</span>
              </div>
            </div>
          </div>
        </section>

        {/* ── Shop Section ── */}
        <section className="shop-section">
          <div className="shop-header">

            {/* Filters row */}
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
              <select className="sort-select" value={sort} onChange={e => setSort(e.target.value)}>
                <option value="">Featured</option>
                <option value="impact">Highest Impact</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
              </select>
            </div>

            {/* Personal impact bar (auth only) */}
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

          {/* Purchase celebration overlay */}
          {purchaseAnimation && (
            <div className="purchase-celebration">
              <div className="celebration-content">
                <div className="celebration-icon">🎉</div>
                <h2>Thank You for Making a Difference!</h2>
                <div className="celebration-impact">
                  {[
                    { icon:'🧴', value: purchaseAnimation.plastic.toFixed(2), label:'kg plastic removed' },
                    { icon:'♻️', value: Math.round(purchaseAnimation.items),  label:'items recycled'     },
                    { icon:'🌱', value: purchaseAnimation.co2.toFixed(1),     label:'kg CO₂ prevented'   },
                  ].map(({ icon, value, label }) => (
                    <div key={label} className="impact-animation">
                      <div className="animation-circle">
                        <span className="animation-icon">{icon}</span>
                        <svg className="progress-ring" viewBox="0 0 100 100">
                          <circle className="ring-bg"       cx="50" cy="50" r="45" />
                          <circle className="ring-progress" cx="50" cy="50" r="45" />
                        </svg>
                      </div>
                      <div className="animation-text">
                        <span className="animation-number">{value}</span>
                        <span className="animation-label">{label}</span>
                      </div>
                    </div>
                  ))}
                </div>
                <p className="celebration-message">
                  Your purchase just funded the removal of {purchaseAnimation.plastic.toFixed(2)}kg of ocean plastic!
                </p>
              </div>
              <div className="confetti-container">
                {[...Array(50)].map((_, i) => (
                  <div key={i} className="confetti" style={{
                    left: `${Math.random() * 100}%`,
                    animationDelay: `${Math.random() * 2}s`,
                    backgroundColor: ['#013137','#297376','#5c9396','#c1d9de'][i % 4],
                  }} />
                ))}
              </div>
            </div>
          )}

          {/* Loading skeletons */}
          {loading && (
            <div className="products-loading">
              {[...Array(6)].map((_, i) => <div key={i} className="product-skeleton" />)}
            </div>
          )}

          {/* Error */}
          {error && !loading && (
            <div className="products-error">
              <span>⚠️</span>
              <p>{error}</p>
              <button onClick={fetchProducts}>Try again</button>
            </div>
          )}

          {/* Empty */}
          {!loading && !error && products.length === 0 && (
            <div className="products-empty">
              <span>🌊</span>
              <p>No products found in this category yet.</p>
            </div>
          )}

          {/* Products grid */}
          {!loading && !error && products.length > 0 && (
            <div className="products-grid">
              {products.map((product, index) => (
                <div
                  key={product._id}
                  className="product-card"
                  style={{ animationDelay: `${index * 0.07}s` }}
                >
                  {product.badge && (
                    <span className={`product-badge ${product.badge.toLowerCase()}`}>
                      {product.badge}
                    </span>
                  )}

                  <div className="product-image">
                    <img
                      src={product.image}
                      alt={product.name}
                      onError={e => { e.target.src = 'https://placehold.co/400x300/013137/c1d9de?text=Product'; }}
                    />
                    <div className="product-overlay">
                      <button
                        className="quick-add-btn"
                        onClick={() => addToCart(product)}
                        disabled={product.stock === 0}
                      >
                        {product.stock === 0 ? 'Out of Stock' : 'Add to Cart'}
                      </button>
                    </div>
                    {product.stock === 0 && <div className="out-of-stock-overlay">Out of Stock</div>}
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
                        <span className="mini-value">{product.impact.itemsRecycled} items</span>
                      </div>
                    </div>

                    <div className="product-footer">
                      <span className="product-price">${product.price.toFixed(2)}</span>
                      <div className="product-rating">
                        <span className="stars">{'★'.repeat(Math.round(product.rating))}{'☆'.repeat(5 - Math.round(product.rating))}</span>
                        <span className="count">({product.reviews})</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>

        {/* ── Cart Sidebar ── */}
        <div className={`cart-sidebar ${showCart ? 'open' : ''}`}>
          <div className="cart-header">
            <h3>
              Your Cart
              {cartCount > 0 && <span className="cart-header-count">{cartCount}</span>}
            </h3>
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
                    <img
                      src={item.image}
                      alt={item.name}
                      className="cart-item-img"
                      onError={e => { e.target.src = 'https://placehold.co/80x80/013137/c1d9de?text=Item'; }}
                    />
                    <div className="cart-item-details">
                      <h4>{item.name}</h4>
                      <div className="cart-item-impact">
                        🧴 {(item.impact.plasticRemoved * item.quantity).toFixed(2)}kg removed
                      </div>
                      <div className="cart-item-controls">
                        <button onClick={() => updateQuantity(item._id, -1)}>−</button>
                        <span>{item.quantity}</span>
                        <button onClick={() => updateQuantity(item._id, 1)}>+</button>
                        <button className="remove-btn" onClick={() => removeFromCart(item._id)}>🗑️</button>
                      </div>
                    </div>
                    <span className="cart-item-price">${(item.price * item.quantity).toFixed(2)}</span>
                  </div>
                ))}

                <div className="cart-impact-summary">
                  <h4>Your impact from this order:</h4>
                  <div className="impact-grid">
                    {[
                      { icon:'🧴', value:`${cartImpact.plastic.toFixed(2)}kg`, label:'plastic'  },
                      { icon:'♻️', value: Math.round(cartImpact.items),         label:'items'    },
                      { icon:'🌱', value:`${cartImpact.co2.toFixed(1)}kg`,      label:'CO₂'      },
                      { icon:'💧', value:`${cartImpact.water.toFixed(0)}L`,     label:'water'    },
                    ].map(({ icon, value, label }) => (
                      <div key={label} className="impact-cell">
                        <span className="cell-icon">{icon}</span>
                        <span className="cell-value">{value}</span>
                        <span className="cell-label">{label}</span>
                      </div>
                    ))}
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
              <button
                className={`checkout-btn ${checkoutLoading ? 'loading' : ''}`}
                onClick={handleCheckout}
                disabled={checkoutLoading}
              >
                {checkoutLoading ? 'Processing…' : 'Complete Purchase'}
                {!checkoutLoading && (
                  <span className="checkout-impact">Remove {cartImpact.plastic.toFixed(2)}kg plastic</span>
                )}
              </button>
            </div>
          )}
        </div>

        {/* Floating cart FAB */}
        <button
          className={`cart-toggle ${showCart ? 'hidden' : ''}`}
          onClick={() => setShowCart(true)}
          aria-label="Open cart"
        >
          <span className="cart-icon">🛒</span>
          {cartCount > 0 && <span className="cart-count">{cartCount}</span>}
        </button>

        {showCart && <div className="cart-backdrop" onClick={() => setShowCart(false)} />}

      </div>
    </>
  );
};

export default Shop;
