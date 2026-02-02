'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import { FaInstagram, FaFacebook, FaPinterest, FaYoutube, FaMapMarkerAlt, FaPhone, FaEnvelope } from 'react-icons/fa';
import { FaTiktok } from 'react-icons/fa6';
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
                <Link href="/faq" className="footer-link">{"FAQ's"}</Link>
                <Link href="/testimonials" className="footer-link">Testimonials</Link>
              </div>
            </div>
            {/* Social Media Links (Follow Us) */}
            <div className="footer-social-section">
              <h4 className="footer-social-heading">Follow Us</h4>
              <div className="footer-social-icons">
                <a href="https://www.facebook.com/profile.php?id=61587084800669" target="_blank" rel="noopener noreferrer" className="footer-social-link facebook" aria-label="Facebook">
                  <FaFacebook />
                </a>
                <a href="https://www.instagram.com/niralidecor" target="_blank" rel="noopener noreferrer" className="footer-social-link instagram" aria-label="Instagram">
                  <FaInstagram />
                </a>
                <a href="https://in.pinterest.com/Niralidecorweddings/" target="_blank" rel="noopener noreferrer" className="footer-social-link pinterest" aria-label="Pinterest">
                  <FaPinterest />
                </a>
                <a href="https://www.tiktok.com/@niralidecor" target="_blank" rel="noopener noreferrer" className="footer-social-link tiktok" aria-label="TikTok">
                  <FaTiktok />
                </a>
                <a href="https://www.youtube.com/@NiraliDecor" target="_blank" rel="noopener noreferrer" className="footer-social-link youtube" aria-label="YouTube">
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

          {/* Facebook Embed Section (replaces newsletter) */}
          <div className="footer-section">
            <h3 className="footer-heading">Facebook Feeds</h3>
            <div className="footer-facebook-embed">
              <iframe
                title="Nirali Decor Facebook Page"
                src="https://www.facebook.com/plugins/page.php?href=https%3A%2F%2Fwww.facebook.com%2Fniraliweddingandeventdesigns%2F&tabs=timeline&width=340&height=300&small_header=true&adapt_container_width=true&hide_cover=false&show_facepile=false"
                width="100%"
                height="340"
                style={{ border: 'none', overflow: 'hidden', borderRadius: '12px' }}
                scrolling="no"
                frameBorder="0"
                allow="encrypted-media; picture-in-picture; clipboard-write"
              />
            </div>
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
            <a
              href="https://cdn1.weddingwire.com/img/badges/2026/badge-weddingawards_en_US.png"
              target="_blank"
              rel="nofollow noopener noreferrer"
            >
              <img
                src="/assets/badge-weddingawards_en_US.png"
                alt=", 2026 WeddingWire Couples' Choice Awards winner"
                className="footer-award-badge"
              />
            </a>
            <a
              href="http://www.maharaniweddings.com/platinum-vendor-guide/"
              target="_blank"
              rel="nofollow noopener noreferrer"
            >
              <img
                src="/assets/MW_Badge_PG_2013.png"
                alt="PLATINUM GUIDE VENDOR - MAHARANI WEDDINGS"
                className="footer-award-badge"
              />
            </a>
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
