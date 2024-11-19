import React from 'react';
import './AboutUs.css';
import '@fortawesome/fontawesome-free/css/all.min.css';



function About() {
  return (
    <div className="about-us-page">
      <header className="header">
        <h1>About Us</h1>
        <p className="para">Some information about the website</p>
      </header>

      <nav className="navbar">
        <ul>
          <li>
            <h3>ABOUT:</h3>
            <p>
              THRIFTY IS A WEBSITE WHERE YOU CAN SHOP FOR PRE-LOVED CLOTHES !!
              YOU CAN EITHER SHOP, SELL, OR DONATE YOUR CLOTHES. OUR WEBSITE
              STRIVES TO DONATE CLOTHES TO THE LESS FORTUNATE AND ALSO STRIVES
              TO DECREASE WASTE ON THIS PLANET.
            </p>
          </li>
          <li>
            <h3>HELP US:</h3>
            <p>
              YOU CAN ALSO DONATE ANY NUMBER OF CLOTHES AS WE GIVE THEM AWAY TO
              INSTITUTIONS IN NEED.
            </p>
          </li>
        </ul>
      </nav>
      <div className="social-icons-container">
        <h3>Follow Us</h3>
        <div className="social-icons">
          <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer">
            <i className="fab fa-instagram icon"></i>
          </a>
          <a href="https://www.twitter.com" target="_blank" rel="noopener noreferrer">
            <i className="fab fa-twitter icon"></i>
          </a>
          <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer">
            <i className="fab fa-facebook icon"></i>
          </a>
        </div>
      </div>

      <footer className="footer1">
        <div className="footer-content">
          <div className="footer-section">
            <h3>THRIFTY!!</h3>
            <h4>Latest Blog Post:</h4>
          </div>
        </div>
        <div className="footer-bottom">
          <p>© 2010 – 2020 Privacy — Terms</p>
        </div>
      </footer>
    </div>
  );
}

export default About;
