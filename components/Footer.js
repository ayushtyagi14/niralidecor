'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import { FaInstagram, FaFacebook, FaPinterest, FaYoutube, FaMapMarkerAlt, FaPhone, FaEnvelope } from 'react-icons/fa';
import './Footer.css';


const Footer = () => {
  const [email, setEmail] = useState('');
  const [subscribeStatus, setSubscribeStatus] = useState('');

  const handleSubscribe = async (e) => {
    e.preventDefault();

    if (!email) return;

    try {
      setSubscribeStatus('');

      const res = await fetch('/api/newsletter', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();

      if (!res.ok) {
        const message = data?.error || data?.message || 'Something went wrong. Please try again.';
        setSubscribeStatus(message);
        return;
      }

      setSubscribeStatus('Thank you for subscribing!');
      setEmail('');
      setTimeout(() => setSubscribeStatus(''), 3000);
    } catch (error) {
      console.error('Error subscribing to newsletter:', error);
      setSubscribeStatus('Something went wrong. Please try again.');
    }
  };

  return (
    <footer className="footer-container">
      {/* Main Footer Content */}
      <div className="footer-main">
        <div className="footer-content">
          {/* Quick Links Section */}
          <div className="footer-section">
            <h3 className="footer-heading">Quick Links</h3>
            <div className="footer-links-grid">
              <div className="footer-links-column">
                <Link href="/" className="footer-link">Home</Link>
                <Link href="/about-us" className="footer-link">About Us</Link>
                <Link href="/contact-us" className="footer-link">Contact Us</Link>
                <Link href="/blog" className="footer-link">Blog</Link>
              </div>
              <div className="footer-links-column">
                <Link href="/portfolio" className="footer-link">Portfolio</Link>
                <Link href="/service/wedding-decor" className="footer-link">Services</Link>
                <Link href="/faq" className="footer-link">FAQ's</Link>
                <Link href="/testimonials" className="footer-link">Testimonials</Link>
              </div>
            </div>
            {/* Social Media Links (Follow Us) */}
            <div className="footer-social-section">
              <h4 className="footer-social-heading">Follow Us</h4>
              <div className="footer-social-icons">
                <a href="https://www.instagram.com/niralidecor" target="_blank" rel="noopener noreferrer" className="footer-social-link instagram" aria-label="Instagram">
                  <FaInstagram />
                </a>
                <a href="https://www.facebook.com/niraliweddingandeventdesigns/" target="_blank" rel="noopener noreferrer" className="footer-social-link facebook" aria-label="Facebook">
                  <FaFacebook />
                </a>
                <a href="https://pinterest.com" target="_blank" rel="noopener noreferrer" className="footer-social-link pinterest" aria-label="Pinterest">
                  <FaPinterest />
                </a>
                <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="footer-social-link youtube" aria-label="YouTube">
                  <FaYoutube />
                </a>
              </div>
            </div>
          </div>

          {/* Contact Information Section */}
          <div className="footer-section">
            <h3 className="footer-heading">Contact Information</h3>
            <div className="footer-contact-locations">
              {/* Location 1: Middlesex, NJ */}
              <div className="footer-location">
                <div className="footer-contact-item">
                  <FaMapMarkerAlt className="footer-icon" />
                  <span>Middlesex, NJ</span>
                </div>
                <div className="footer-contact-item">
                  <FaPhone className="footer-icon" />
                  <a href="tel:(609) 703-5879" className="footer-contact-link">(609) 703-5879</a>
                </div>
                <div className="footer-contact-item">
                  <FaEnvelope className="footer-icon" />
                  <a href="mailto:niralidecor@gmail.com" className="footer-contact-link">niralidecor@gmail.com</a>
                </div>
              </div>

              {/* Location 2: Atlanta, Georgia */}
              <div className="footer-location">
                <div className="footer-contact-item">
                  <FaMapMarkerAlt className="footer-icon" />
                  <span>Atlanta, GA</span>
                </div>
                <div className="footer-contact-item">
                  <FaPhone className="footer-icon" />
                  <a href="tel:(609) 703-5879" className="footer-contact-link">(609) 703-5879</a>
                </div>
                <div className="footer-contact-item">
                  <FaEnvelope className="footer-icon" />
                  <a href="mailto:niralidecor@gmail.com" className="footer-contact-link">niralidecor@gmail.com</a>
                </div>
              </div>
            </div>
          </div>

          {/* Newsletter Section */}
          <div className="footer-section">
            <h3 className="footer-heading">Stay Inspired</h3>
            <p className="footer-newsletter-text">
              Subscribe to get decor ideas & wedding inspiration delivered to your inbox.
            </p>
            <form onSubmit={handleSubscribe} className="footer-newsletter-form">
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="footer-newsletter-input"
                required
              />
              <button type="submit" className="footer-newsletter-button">
                Subscribe
              </button>
            </form>
            {subscribeStatus && (
              <p className="footer-subscribe-status">{subscribeStatus}</p>
            )}
          </div>
        </div>
      </div>

      {/* Awards/Badges Section */}
      <div className="footer-awards">
        <div className="footer-awards-content">
          <img
            src="https://www.maharaniweddings.com/images/Badges/MW_Badge_2013.png"
            alt="maharani wedding badge nirali decor"
            className="footer-award-badge"
          />
          <h1 className="footer-copyright lg:block hidden">
            &copy; {new Date().getFullYear()} Nirali Decor. All Rights Reserved.
          </h1>
          <div className="footer-awards-group">
            <img
              src="https://cdn1.weddingwire.com/img/badges/2025/badge-weddingawards_en_US.png"
              alt="wedding wire nirali decor 2025 award"
              className="footer-award-badge"
            />
            <img
              src="https://cdn1.weddingwire.com/img/badges/2023/badge-weddingawards_en_US.png"
              alt="wedding wire nirali decor 2023 award"
              className="footer-award-badge"
            />
            <img
              src="https://cdn1.weddingwire.com/img/badges/2018/badge-weddingawards_en_US.png"
              alt="wedding wire nirali decor 2018 award"
              className="footer-award-badge"
            />
          </div>
        </div>
        <h1 className="footer-copyright lg:hidden block">
          &copy; {new Date().getFullYear()} Nirali Decor. All Rights Reserved.
        </h1>
      </div>
    </footer>
  );
};

export default Footer;
