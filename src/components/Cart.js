import React from 'react';
import './cart.css';

function Cart({ items, updateCart }) {
  const removeFromCart = (index) => {
    const newItems = items.filter((_, i) => i !== index);
    updateCart(newItems);
  };

  const calculateTotal = () => {
    return items.reduce((total, item) => total + item.price, 0).toFixed(2);
  };

  return (
    <div className="cart-container">
      <header className="header1">
        <div className="cart-icon">🛒</div>
      </header>

      <main className="main-content">
        <div className="info">
          <div className="info-card">
            {items.map((item, index) => (
              <div key={index} className="info-row large">
                <span>{item.name}</span>
                <span>${item.price.toFixed(2)}</span>
                <button onClick={() => removeFromCart(index)}>Remove</button>
              </div>
            ))}
          </div>

          <div className="order-summary">
            <div className="info-row small">
              <strong>Total:</strong> ${calculateTotal()}
            </div>
            <div className="info-row small">
              <button className="checkout-button">Proceed to Checkout</button>
            </div>
          </div>
        </div>

        {/* Order History Section */}
        <div className="order-history-section">
          <div className="order-history"></div>
        </div>
      </main>
    </div>
  );
}

export default Cart;