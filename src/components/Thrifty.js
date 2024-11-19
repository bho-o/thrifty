import React, { useState } from 'react';
import { ShoppingBag, Heart, User, LogIn } from 'lucide-react';
import Sell from './Sell';
import Donate from './Donate';
import Shop from './Shop';
import Cart from './Cart';
import Profile from './Profile_page';
import Signup from './Signup_page';
import About from './About';
import image from '../Assets/images.jpeg'
import './thrifty.css'; // Import the CSS file

export default function Thrifty() {
  const [activeTab, setActiveTab] = useState('home');
  const [showSellOptions, setShowSellOptions] = useState(false); // State for Sell/Donate options

  // Function to render content based on the active tab
  const renderContent = () => {
    switch (activeTab) {
      case 'shop':
        return <Shop />;
      case 'sell':
        return <Sell />;
      case 'donate':
        return <Donate />;
      case 'cart':
        return <Cart />;
      case 'profile':
        return <Profile />;
      case 'signup':
        return <Signup />;
      case 'about':
        return <About />;
      default:
        return (
          <section className="home-section">
            <div className="home-content">
              <div className="home-text">
                <h2 className="home-subtitle">
                  Your Style
                  <br />
                  Your Budget
                  <br />
                  Your Thrift
                </h2>
                <button
                  onClick={() => setActiveTab('about')}
                  className="about-button"
                >
                  ABOUT US
                </button>
              </div>
              <div className="home-image">
                <img
                  src={image}
                  alt="Thrifty shopping"
                />
              </div>
            </div>
          </section>
        );
    }
  };

  return (
    <div className="thrifty-container">
      <header className="thrifty-header">
        <div className="header-content">
          {/* Thrifty Logo Click to go back to home */}
          <div 
            className="brand-logo"
            onClick={() => setActiveTab('home')} // Return to 'home' on click
          >
            THRIFTY!
          </div>

          <nav className="nav-menu">
            <button onClick={() => setActiveTab('shop')} className="nav-button">
              <ShoppingBag className="icon" />
              Shop
            </button>

            {/* Sell/Donate Dropdown (Toggle visibility when Sell button is clicked) */}
            <div className="sell-menu-wrapper">
              <button
                onClick={() => setShowSellOptions(!showSellOptions)} // Toggle on click
                className="nav-button"
              >
                <Heart className="icon" />
                Sell
              </button>
              {showSellOptions && (
                <div className="sell-options">
                  <button
                    onClick={() => setActiveTab('sell')}
                    className="dropdown-option"
                  >
                    Sell
                  </button>
                  <button
                    onClick={() => setActiveTab('donate')}
                    className="dropdown-option"
                  >
                    Donate
                  </button>
                </div>
              )}
            </div>

            <button onClick={() => setActiveTab('cart')} className="nav-button">
              <ShoppingBag className="icon" />
              Cart
            </button>
            <button
              onClick={() => setActiveTab('profile')}
              className="nav-button"
            >
              <User className="icon" />
              Profile
            </button>
            <button
              onClick={() => setActiveTab('signup')}
              className="signup-button"
            >
              <LogIn className="icon" />
              Sign Up
            </button>
          </nav>
        </div>
      </header>
      <main className="thrifty-main">{renderContent()}</main>
      <footer className="thrifty-footer">
        © 2024 Thrifty. All rights reserved.
      </footer>
    </div>
  );
}
