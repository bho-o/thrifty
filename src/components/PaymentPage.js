import React from "react";
import "./paymentPage.css";

function PaymentPage() {
return (
    <div className="payment-page">
      {/* Header */}
    <header className="header2">
        <h1 className="logo">THRIFTY!</h1>
        <div className="nav-links">
        <a href="#shop">Shop</a>
        <a href="#sell">Sell</a>
        <a href="#cart">Cart</a>
        <a href="#profile">Profile</a>
        <button className="signup-button">Sign Up</button>
        </div>
    </header>

      {/* Main Content */}
    <main className="main">
        <div className="payment-container">
        <h2>Payment Info.</h2>
        <form className="payment-form">
            {/* Payment Method */}
            <div className="form-group">
            <label>
                <input type="radio" name="payment-method" defaultChecked />
                Credit Card
            </label>
            <label>
                <input type="radio" name="payment-method" />
                PayPal
            </label>
            </div>

            {/* Card Info */}
            <div className="form-group">
            <label>
                Name on Card:
                <input type="text" placeholder="John Carter" />
            </label>
            </div>
            <div className="form-group">
            <label>
                Card Number:
                <input type="text" placeholder="**** **** **** 2153" />
            </label>
            </div>
            <div className="form-group">
            <label>
                Expiration Date:
                <input type="text" placeholder="MM / YYYY" />
            </label>
            <label>
                CVV:
                <input type="text" placeholder="123" />
            </label>
            </div>

            {/* Submit Button */}
            <button type="submit" className="checkout-button">
            Check Out
            </button>
        </form>
        </div>

        {/* Thank You Message */}
        <p className="thank-you">THANK YOU FOR CHOOSING THRIFTY!</p>
    </main>
    </div>
);
}

export default PaymentPage;
