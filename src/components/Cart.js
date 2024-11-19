import React from 'react';
import './cart.css';
import './Shop.js';
function Cart() {
  return (
    <div className="cart-container">
      <header className="header1">
        <div className="cart-icon">🛒</div>
      </header>

      <main className="main-content">
        <div className="info">
        <div className="info-card">
          <div className="info-row large"></div>
          <div className="info-row large"></div>
          <div className="info-row large"></div>
        </div>

        <div className="order-summary">
          <div className="info-row small"></div>
          <div className="info-row small"></div>
          <div className="info-row small"></div>
        </div>
        

      {/* Order History Section */}
      <div className="order-history-section">
          <div className="order-history"></div>
        </div>
        </div>
      </main>
    </div>
    
  );
}

export default Cart;
